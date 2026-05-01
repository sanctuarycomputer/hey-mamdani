import { randomUUID } from "crypto";

import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { SIGNATURES_TAG } from "@/lib/signatures";

interface SignResponse {
  success: boolean;
  message: string;
  status: "signed" | "error";
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<SignResponse>> {
  try {
    const body = await request.json();
    const { name, email, showName } = body as {
      name?: unknown;
      email?: unknown;
      showName?: unknown;
    };

    // Name is required.
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Name is required.", status: "error" },
        { status: 400 },
      );
    }

    const normalizedName = name.trim();

    // The contacts endpoint requires an email. If the signer didn't supply
    // one, generate an anonymous placeholder so the API accepts the row.
    let normalizedEmail: string;
    let isAnonymous = false;
    if (email && typeof email === "string" && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          {
            success: false,
            message: "Please enter a valid email address.",
            status: "error",
          },
          { status: 400 },
        );
      }
      normalizedEmail = email.toLowerCase().trim();
    } else {
      normalizedEmail = `anonymous-${randomUUID()}@heymamdani.nyc`;
      isAnonymous = true;
    }

    // Only `email`, `sources`, and `metadata` are persisted by the stacks
    // contacts endpoint — name & showName go inside metadata.
    const apiBody = {
      email: normalizedEmail,
      sources: ["g3d:hey_mamdani"],
      metadata: {
        name: normalizedName,
        showName: !!showName,
        anonymous: isAnonymous,
        signedAt: new Date().toISOString(),
      },
    };

    const response = await fetch("https://stacks.garden3d.net/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.STACKS_API_KEY!,
      },
      body: JSON.stringify(apiBody),
    });

    if (response.ok) {
      // Bust the signatures cache so the homepage list re-fetches the
      // updated set of signers on the next render — for everyone, not
      // just the user who just signed.
      revalidateTag(SIGNATURES_TAG);

      return NextResponse.json(
        {
          success: true,
          message: "Thank you for signing!",
          status: "signed",
        },
        { status: 201 },
      );
    } else {
      console.error("Sign error:", response.statusText);
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong. Please try again later.",
          status: "error",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Sign error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
        status: "error",
      },
      { status: 500 },
    );
  }
}
