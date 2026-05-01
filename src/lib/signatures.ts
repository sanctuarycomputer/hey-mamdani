export interface Signature {
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

// Cache tag used to invalidate the signatures fetch from elsewhere
// (e.g. the /api/sign route after a successful submission).
export const SIGNATURES_TAG = "signatures";

export async function fetchSignatures(): Promise<Signature[]> {
  try {
    const res = await fetch(
      "https://stacks.garden3d.net/api/contacts?source=g3d:hey_mamdani",
      {
        headers: { "X-Api-Key": process.env.STACKS_API_KEY ?? "" },
        // Cache aggressively for fast page renders; we'll bust this tag
        // from the sign route the moment a new signature is added. The
        // 5-minute revalidate is a safety net in case the tag flush is
        // ever skipped (e.g. a stacks write that bypasses /api/sign).
        next: { tags: [SIGNATURES_TAG], revalidate: 300 },
      },
    );

    if (!res.ok) {
      console.error("Signatures fetch error:", res.statusText);
      return [];
    }

    const contacts = (await res.json()) as StacksContact[];

    return contacts
      .filter(
        (c) =>
          c.metadata?.showName === true &&
          typeof c.metadata.name === "string" &&
          c.metadata.name.trim().length > 0,
      )
      .map((c) => ({
        name: (c.metadata.name as string).trim(),
        signedAt: c.metadata.signedAt,
      }))
      .sort((a, b) => {
        if (a.signedAt && b.signedAt) {
          return b.signedAt.localeCompare(a.signedAt);
        }
        return a.name.localeCompare(b.name);
      });
  } catch (error) {
    console.error("Signatures fetch error:", error);
    return [];
  }
}
