import { fetchSignatures } from "@/lib/signatures";

export default async function Signatures() {
  const signatures = await fetchSignatures();
  if (signatures.length === 0) return null;

  return (
    <section className="bg-brand-navy text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-12 pt-2 text-center">
        <p className="font-serif text-sm font-light italic tracking-tight">
          supported by:
        </p>
        <ul className="mt-3">
          {signatures.map((sig, i) => (
            <li
              key={`${sig.name}-${sig.signedAt ?? i}`}
              className="font-serif text-2xl font-bold leading-tight tracking-tighter md:text-3xl"
            >
              {sig.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
