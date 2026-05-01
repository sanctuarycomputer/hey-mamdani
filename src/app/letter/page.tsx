"use client";

import Link from "next/link";
import { useState } from "react";

import FitText from "../FitText";

const demands = [
  { label: "Build a Public Internet" },
  { label: "Free Internet for All", href: "https://internetforall.nyc/" },
  { label: "City-Owned Payment Rails" },
  { label: "Real-Time Housing Data" },
  { label: "Improve 311" },
  { label: "Curb AI Expansion" },
  { label: "Public Comment on Every Bill" },
  { label: "Real-Time Budget Tracking" },
  { label: "Office of AI Accountability" },
  { label: "Opt Out of Biometric Surveillance" },
  { label: "Regulate Self-Driving Taxis" },
  { label: "Food Rescue Platform" },
];

type Mode = "letter" | "form" | "submitted";

export default function LetterPage() {
  const [mode, setMode] = useState<Mode>("letter");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showName, setShowName] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      } else {
        setError(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const ctaClasses =
    "block w-full border-t-8 border-brand-navy bg-brand-yellow py-4 text-center font-display text-lg font-bold tracking-wide text-brand-navy hover:bg-brand-yellow/90 md:text-xl";

  return (
    <div className="min-h-[100dvh] bg-neutral-500 p-4 md:p-8">
      <div className="mx-auto flex h-[calc(100dvh-2rem)] w-full max-w-[640px] flex-col overflow-hidden border-8 border-brand-navy bg-white md:h-[calc(100dvh-4rem)]">
        {/* Top bar with close — letter mode goes home, other modes return to letter */}
        <div className="flex justify-end px-6 pt-4">
          {mode === "letter" ? (
            <Link
              href="/"
              aria-label="Close"
              className="font-display text-xl leading-none text-brand-navy hover:opacity-70"
            >
              X
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setMode("letter")}
              aria-label="Back to letter"
              className="font-display text-xl leading-none text-brand-navy hover:opacity-70"
            >
              X
            </button>
          )}
        </div>

        {mode === "letter" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 pb-8 text-brand-navy md:px-12">
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

              <p className="mt-4 font-serif text-base leading-snug">
                These recommendations came out of an open-format participatory
                event called{" "}
                <em className="italic">
                  Open Assembly: A Prompt Towards Civic Engagement
                </em>{" "}
                held at Index Greenpoint on March 10th, 2026, co-presented
                with a committee of leading organizations in the civic
                technology field including Mozilla Foundation, Polis,
                RadicalxChange, Metagov and New_ Public.
              </p>

              <h2 className="mt-8 font-serif text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
                We believe the city should:
              </h2>

              <ol className="mt-4 space-y-1 font-display text-base leading-tight tracking-tight">
                {demands.map((item, i) => (
                  <li key={item.label} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs text-white">
                      {i + 1}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {item.label} ↗
                      </a>
                    ) : (
                      item.label
                    )}
                  </li>
                ))}
              </ol>

              <h2 className="mt-8 font-serif text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl">
                We want to help improve the lives of New Yorkers.
              </h2>

              <p className="mt-6 font-serif text-4xl font-bold tracking-tighter md:text-5xl">
                EMAIL US!
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
                  Garden3d
                </p>
                <img
                  src="/assets/apple.svg"
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
            <div className="flex-1 overflow-y-auto px-6 pb-8 text-brand-navy md:px-12">
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
            <div className="flex flex-1 flex-col items-center justify-center px-6 pb-8 text-center text-brand-navy md:px-12">
              <h1 className="font-serif text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl">
                Thank you{name ? `, ${name}` : ""}!
              </h1>
              <p className="mt-4 font-serif text-base leading-snug">
                Your signature has been added to the letter.
              </p>
              <img
                src="/assets/apple.svg"
                alt=""
                aria-hidden
                className="mt-8 h-20 w-auto"
              />
            </div>
            <Link href="/" className={ctaClasses}>
              BACK TO HOME
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
