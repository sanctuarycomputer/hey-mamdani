"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

import LetterBody from "./LetterBody";

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
        className="relative mx-auto flex h-full w-full min-w-0 max-w-[640px] flex-col overflow-hidden border-8 border-brand-navy bg-white md:h-[calc(100dvh-4rem)]"
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
              <LetterBody />
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
