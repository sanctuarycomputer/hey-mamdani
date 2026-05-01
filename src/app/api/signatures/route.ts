import { NextResponse } from "next/server";

import { fetchSignatures, Signature } from "@/lib/signatures";

export async function GET(): Promise<
  NextResponse<{ signatures: Signature[] }>
> {
  const signatures = await fetchSignatures();
  return NextResponse.json({ signatures });
}
