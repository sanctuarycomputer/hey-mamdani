"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

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

const demands = [
  { label: "Build a Public Internet" },
  { label: "Setup City-owned Payment Rails" },
  { label: "Host Real-time Housing Data" },
  { label: "Improve 311" },
  { label: "Curb AI Expansion" },
  { label: "Provide Free Internet for All", href: "https://internetforall.nyc/" },
  { label: "Add Public Comments on City Bills" },
  { label: "Install Live Budget Tracking" },
  { label: "Establish Office of AI Accountability" },
  { label: "Offer Opt-Out to Biometric Surveillance" },
  { label: "Regulate Self-driving Taxis" },
  { label: "Run a Food Rescue Platform" },
];

type Mode = "letter" | "form" | "submitted";

function LetterModalInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = searchParams.get("letter") === "open";

  const [mode, setMode] = useState<Mode>("letter");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showName, setShowName] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const close = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("letter");
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }, [searchParams, router, pathname]);

  // Reset transient state when the modal is dismissed.
  useEffect(() => {
    if (!isOpen) {
      setMode("letter");
      setError(null);
    }
  }, [isOpen]);

  // ESC closes the modal.
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, showName }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setMode("submitted");
        // Refresh the homepage signatures list so the new name appears.
        router.refresh();
      } else {
        setError(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const ctaClasses =
    "block w-full cursor-pointer border-t-8 border-brand-navy bg-brand-yellow py-4 text-center font-display text-lg font-bold tracking-wide text-brand-navy hover:bg-brand-yellow/90 md:text-xl";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sign the letter to Mayor Mamdani"
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-white/70 p-4 md:items-center md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="relative mx-auto flex h-full w-full max-w-[640px] flex-col overflow-hidden border-8 border-brand-navy bg-white md:h-[calc(100dvh-4rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (X) — form mode steps back to the letter; letter and submitted dismiss the modal. */}
        <button
          type="button"
          onClick={mode === "form" ? () => setMode("letter") : close}
          aria-label={mode === "form" ? "Back to letter" : "Close"}
          className="absolute right-6 top-4 z-10 cursor-pointer font-display text-2xl leading-none text-brand-navy hover:opacity-70"
        >
          ✕
        </button>

        {mode === "letter" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 pb-8 pt-10 text-brand-navy md:px-12">
              <p className="font-serif text-base">Dear Mr. Mamdani,</p>

              <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl">
                NYC is lagging behind in tech and the world is changing fast!
              </h1>

              <p className="mt-6 font-serif text-base leading-snug">
                Your campaign ran on a vision of a city that works for every
                New Yorker. But the digital layer underneath that promise is
                in rough shape.
              </p>

              <p className="mt-4 font-serif text-base leading-snug">
                We are submitting a proposal of 12 recommendations for your
                consideration on how civic technology could improve the
                everyday lives of New Yorkers.
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
                These recommendations came out of an open-format participatory
                event called{" "}
                <em className="italic">
                  Open Assembly: A Prompt Towards Civic Engagement
                </em>{" "}
                held at Index Greenpoint on March 10th, 2026.
              </p>
              <p className="mt-4 font-serif text-base leading-snug">
                We gathered over 100 local NY technologist &amp; experts -
                including participants from leading organizations in the civic
                technology field including {partnerNames()} - to dream up what
                a tech-enabled NYC looks like.
              </p>

              <h2 className="mt-8 font-serif text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl">
                We want to help improve the lives of New Yorkers.
              </h2>

              <p className="mt-6 font-serif text-4xl font-bold tracking-tighter md:text-5xl">
                PLS EMAIL US!
              </p>
              <FitText className="mt-1 font-serif font-bold tracking-tighter">
                <a href="mailto:hello@heymamdani.nyc" className="underline">
                  hello@heymamdani.nyc
                </a>
              </FitText>

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
            </div>

            <button
              type="button"
              onClick={() => setMode("form")}
              className={ctaClasses}
            >
              NEW YORKERS, SIGN THE LETTER
            </button>
          </>
        )}

        {mode === "form" && (
          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 overflow-y-auto px-6 pb-8 pt-10 text-brand-navy md:px-12">
              <h1 className="font-serif text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl">
                Sign the letter.
              </h1>
              <p className="mt-3 font-serif text-base leading-snug">
                Add your name to the letter to Mayor Mamdani.{" "}
                <strong className="font-bold">
                  Email is optional and never shown publicly.
                </strong>
              </p>

              <label className="mt-6 block">
                <span className="font-serif text-base font-bold">
                  Name <span className="font-normal italic">(required)</span>
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Zohran Mamdani"
                  className="mt-1 block w-full border-2 border-brand-navy bg-white px-3 py-2 font-serif text-base outline-none focus:border-brand-red"
                  autoComplete="name"
                />
              </label>

              <label className="mt-4 block">
                <span className="font-serif text-base font-bold">
                  Email <span className="font-normal italic">(optional)</span>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="zohran@nyc.gov"
                  className="mt-1 block w-full border-2 border-brand-navy bg-white px-3 py-2 font-serif text-base outline-none focus:border-brand-red"
                  autoComplete="email"
                />
                <span className="mt-1 block font-serif text-xs italic">
                  Your email will never be shown publicly.
                </span>
              </label>

              <label className="mt-6 flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={showName}
                  onChange={(e) => setShowName(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-brand-navy"
                />
                <span className="font-serif text-base">
                  List my name as a signee on the home page.
                </span>
              </label>

              {error && (
                <p
                  role="alert"
                  className="mt-4 font-serif text-sm font-bold text-brand-red"
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`${ctaClasses} disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {submitting ? "ADDING…" : "ADD MY SIGNATURE"}
            </button>
          </form>
        )}

        {mode === "submitted" && (
          <>
            <div className="flex flex-1 flex-col items-center justify-center px-6 pb-8 pt-10 text-center text-brand-navy md:px-12">
              <h1 className="font-serif text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl">
                Thank you{name ? `, ${name}` : ""}!
              </h1>
              <p className="mt-4 font-serif text-base leading-snug">
                Your signature has been added to the letter.
              </p>
              <img
                src="/assets/apple-outline.svg"
                alt=""
                aria-hidden
                className="mt-8 h-20 w-auto"
              />
            </div>
            <button type="button" onClick={close} className={ctaClasses}>
              BACK TO HOME
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function LetterModal() {
  return (
    <Suspense fallback={null}>
      <LetterModalInner />
    </Suspense>
  );
}
