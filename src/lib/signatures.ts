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

export async function fetchSignatures(): Promise<Signature[]> {
  try {
    const res = await fetch(
      "https://stacks.garden3d.net/api/contacts?source=g3d:hey_mamdani",
      {
        headers: { "X-Api-Key": process.env.STACKS_API_KEY ?? "" },
        cache: "no-store",
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
