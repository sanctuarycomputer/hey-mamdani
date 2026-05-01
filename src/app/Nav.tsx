"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  // True once the hero (the navy band at the top) has scrolled out of the
  // viewport. While it's still visible we keep the white pill; once we're
  // past it the pill flips to navy/white so it stays legible against the
  // page sections below.
  const [pastHero, setPastHero] = useState(false);
  // Briefly toggled on each time pastHero becomes true to retrigger the
  // CSS wiggle animation on the Sign The Letter pill.
  const [wiggle, setWiggle] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pastHero) return;
    setWiggle(true);
    const t = setTimeout(() => setWiggle(false), 500);
    return () => clearTimeout(t);
  }, [pastHero]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent text-white">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-end gap-2 px-6 py-3">
        <a
          href="/"
          className="whitespace-nowrap rounded-full bg-black px-4 py-1 text-sm font-bold text-white"
        >
          Home
        </a>
        <Link
          href="?letter=open"
          scroll={false}
          className={`whitespace-nowrap rounded-full px-4 py-1 font-serif text-sm font-bold tracking-tighter transition-colors ${
            pastHero
              ? "bg-brand-navy text-white"
              : "bg-white text-black"
          } ${wiggle ? "animate-wiggle" : ""}`}
        >
          Sign The Letter
        </Link>
      </div>
    </header>
  );
}
