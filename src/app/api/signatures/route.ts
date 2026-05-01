import { NextResponse } from "next/server";

interface Signature {
  name: string;
  signedAt?: string;
}

interface StacksContact {
  email: string;
  sources: string[];
  metadata: {
    name?: string;
    showName?: boolean;
    anonymous?: boolean;
    signedAt?: string;
  };
}

export async function GET(): Promise<
  NextResponse<{ signatures: Signature[] }>
> {
  try {
    const response = await fetch(
      "https://stacks.garden3d.net/api/contacts?source=g3d:hey_mamdani",
      {
        headers: { "X-Api-Key": process.env.STACKS_API_KEY! },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("Signatures fetch error:", response.statusText);
      return NextResponse.json({ signatures: [] }, { status: 500 });
    }

    const contacts = (await response.json()) as StacksContact[];

    // Only surface signatures whose owner explicitly opted in via showName,
    // and never expose the email field.
    const signatures: Signature[] = contacts
      .filter(
        (c) =>
          c.metadata?.showName === true &&
          typeof c.metadata.name === "string" &&
          c.metadata.name.trim().length > 0,
      )
      .map((c) => ({
        name: c.metadata.name as string,
        signedAt: c.metadata.signedAt,
      }))
      // Newest first when signedAt is present, falling back to name order.
      .sort((a, b) => {
        if (a.signedAt && b.signedAt) {
          return b.signedAt.localeCompare(a.signedAt);
        }
        return a.name.localeCompare(b.name);
      });

    return NextResponse.json({ signatures });
  } catch (error) {
    console.error("Signatures fetch error:", error);
    return NextResponse.json({ signatures: [] }, { status: 500 });
  }
}
