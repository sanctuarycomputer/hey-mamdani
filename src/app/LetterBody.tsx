import partnersData from "@/data/partners.json";
import FitText from "./FitText";

// Plain-text comma-and list of partner names (no links inside the letter).
function partnerNames(): string {
  const ps = partnersData.partners.filter(
    (p) => "participant" in p && p.participant === true,
  );
  if (ps.length === 0) return "PARTICIPANTS WILL BE LISTED HERE";
  if (ps.length === 1) return ps[0].name;
  return (
    ps
      .slice(0, -1)
      .map((p) => p.name)
      .join(", ") +
    " and " +
    ps[ps.length - 1].name
  );
}

const demands: { label: string; href?: string }[] = [
  { label: "Build a Public Internet" },
  { label: "Setup City-owned Payment Rails" },
  { label: "Host Real-time Housing Data" },
  { label: "Improve 311" },
  { label: "Curb AI Expansion" },
  { label: "Provide Free Internet for All" },
  { label: "Add Public Comments on City Bills" },
  { label: "Install Live Budget Tracking" },
  { label: "Establish Office of AI Accountability" },
  { label: "Offer Opt-out to Biometric Surveillance" },
  { label: "Regulate Self-driving Taxis" },
  { label: "Run a Food Rescue Platform" },
];

// The body of the open letter. Rendered inside the modal on the homepage and,
// bare, on the /letter/print route used to generate public/letter.pdf.
//
// `variant="print"` swaps the auto-fitting email line (FitText/fitty, which
// depends on client-side measurement) for a fixed large size so the PDF
// capture is deterministic.
export default function LetterBody({
  variant = "modal",
}: {
  variant?: "modal" | "print";
}) {
  return (
    <>
      <p className="font-serif text-base">Dear Mr. Mamdani,</p>

      <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl">
        NYC is lagging behind in tech and the world is changing fast!
      </h1>

      <p className="mt-6 font-serif text-base leading-snug">
        Your campaign ran on a vision of a city that works for every New
        Yorker. But the digital layer underneath that promise is in rough
        shape.
      </p>

      <p className="mt-4 font-serif text-base leading-snug">
        We are submitting a proposal of 12 recommendations for your
        consideration on how civic technology could improve the everyday lives
        of New Yorkers.
      </p>

      <h2 className="mt-8 font-serif text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
        We believe the city should:
      </h2>

      <ol className="mt-4 space-y-2 text-base font-bold leading-snug tracking-[-0.04em] md:text-xl">
        {demands.map((item, i) => (
          <li key={item.label} className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm text-white md:h-7 md:w-7">
              {i + 1}
            </span>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {item.label} {"↗︎"}
              </a>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ol>

      <p className="mt-6 font-serif text-base leading-snug">
        These recommendations came out of an open-format participatory event
        called{" "}
        <em className="italic">
          Open Assembly: A Prompt Towards Civic Engagement
        </em>{" "}
        held at Index Greenpoint on March 10th, 2026.
      </p>
      <p className="mt-4 font-serif text-base leading-snug">
        We gathered 100 local technologists &amp; experts from leading
        organizations in the civic technology field including {partnerNames()}{" "}
        to dream up what a tech-enabled NYC looks like.
      </p>

      <h2 className="mt-8 font-serif text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl">
        We want to help improve the lives of New Yorkers.
      </h2>

      <p className="mt-6 font-serif text-4xl font-bold tracking-tighter md:text-5xl">
        PLS EMAIL US!
      </p>
      {variant === "print" ? (
        <p className="mt-1 font-serif text-5xl font-bold tracking-tighter">
          <a href="mailto:hello@heymamdani.nyc" className="underline">
            hello@heymamdani.nyc
          </a>
        </p>
      ) : (
        <FitText className="mt-1 font-serif font-bold tracking-tighter">
          <a href="mailto:hello@heymamdani.nyc" className="underline">
            hello@heymamdani.nyc
          </a>
        </FitText>
      )}

      <div className="mt-8 flex items-end justify-end gap-3 pb-4">
        <p className="font-serif text-sm italic leading-tight">
          Sincerely,
          <br />
          <a
            href="https://garden3d.net"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Garden3d
          </a>
        </p>
        <img
          src="/assets/apple-outline.svg"
          alt=""
          aria-hidden
          className="h-16 w-auto"
        />
      </div>
    </>
  );
}
