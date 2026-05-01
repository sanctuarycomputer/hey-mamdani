import Link from "next/link";

import partnersData from "@/data/partners.json";
import sliderData from "@/data/slider.json";
import FitText from "./FitText";
import PartnersStrip from "./PartnersStrip";
import Signatures from "./Signatures";

function partnerLinks(): React.ReactNode {
  const ps = partnersData.partners;
  return ps.map((p, i) => {
    const sep =
      i === 0 ? "" : i === ps.length - 1 ? " and " : ", ";
    return (
      <span key={p.name}>
        {sep}
        <a href={p.url} target="_blank" rel="noopener noreferrer">
          {p.name}
        </a>
      </span>
    );
  });
}

export default function Home() {
  return (
    <div className="flex w-full flex-col">
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
            className="whitespace-nowrap rounded-full bg-white px-4 py-1 font-serif text-sm font-bold tracking-tighter text-black"
          >
            Sign The Letter
          </Link>
        </div>
      </header>

      <section className="bg-brand-navy">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 pb-6 pt-20">
          <img src="/assets/logo.svg" alt="Hey Mamdani!" className="relative z-10 w-full max-w-[1100px]" />
          <div className="relative -mt-2 w-full md:-mt-12 lg:-mt-24">
            <img
              src="/assets/now-is-the-time.svg"
              alt="NOW is the time to reimagine our city's relationship with technology."
              className="block w-[75%]"
            />
            <Link
              href="?letter=open"
              scroll={false}
              aria-label="Read our letter"
              className="absolute -bottom-6 right-0 block w-[45%] -rotate-3 md:-bottom-8 md:w-[38%] lg:-bottom-12 lg:w-[35%]"
            >
              <img
                src="/assets/read-our-letter.svg"
                alt="Read our letter"
                className="block w-full"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-yellow text-black">
        <div className="mx-auto flex w-full max-w-[1200px] items-stretch justify-between gap-4 px-6 pt-6 md:gap-10 md:pt-8">
          <div className="flex items-center pb-6 md:pb-8">
            <p className="font-serif text-3xl font-bold leading-[1.05] tracking-[-0.06em] md:text-5xl lg:text-6xl">
              &ldquo;Working New Yorkers know what they need to thrive&rdquo;
              <span className="mt-2 block font-serif text-lg italic tracking-[-0.06em] md:mt-3 md:text-2xl lg:text-3xl">
                Zohran Mamdani
              </span>
            </p>
          </div>
          <img
            src="/assets/portrait.svg"
            alt=""
            className="h-32 w-auto shrink-0 self-end sm:h-44 md:h-56 lg:h-72"
          />
        </div>
      </section>

      <section className="bg-white text-brand-navy">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-10 text-center">
          <img
            src="/assets/hey-zohran.svg"
            alt="Hey Zohran, we want to help make civic technology awesome."
            className="w-full"
          />
          <FitText className="font-display font-black tracking-tight">
            PLS EMAIL US:{" "}
            <a href="mailto:hello@heymamdani.nyc" className="underline">
              HELLO@HEYMAMDANI.NYC
            </a>
          </FitText>
          <PartnersStrip className="mt-6 text-brand-navy" />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 px-6 py-6 md:grid-cols-2">
          <img
            src="/assets/infra-lagging-behind.svg"
            alt="NYC infra is lagging behind"
            className="w-full"
          />
          <img
            src="/assets/world-is-changing-fast.svg"
            alt="The world is changing fast"
            className="w-full"
          />
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto w-full max-w-[700px] px-6 py-6 text-center">
          <p className="text-[18pt] font-bold leading-[22pt] tracking-[-0.04em] md:text-[25pt] md:leading-[28pt]">
            Your campaign ran on a vision of a city that works for every New
            Yorker. But the digital layer underneath that promise is in rough
            shape.
          </p>
        </div>
      </section>

      <section className="bg-white pb-2 pt-6">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 [scroll-padding-inline:1.5rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sliderData.items.map((item, i) => (
            <div
              key={item.title}
              className="flex w-[85vw] max-w-[320px] shrink-0 snap-start flex-col border-8 border-brand-red bg-white p-5 text-black"
            >
              <div className="font-display text-3xl text-brand-red">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mb-2 font-bold text-brand-red">
                {item.title}
              </div>
              <p className="text-sm font-bold leading-snug tracking-[-0.04em]">{item.body}</p>
              <a
                href={item.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-4 text-xs text-brand-red underline"
              >
                Source {"↗︎"}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto w-full max-w-[700px] space-y-6 px-6 py-8 text-center text-[18pt] font-bold leading-[22pt] tracking-[-0.04em] md:space-y-8 md:py-10 md:text-[25pt] md:leading-[28pt]">
          <p>
            Free buses, frozen rents and an office of mass engagement all have
            to run through this layer.{" "}
            <span className="underline">
              If civic technology doesn&apos;t work, the promises don&apos;t
              either.
            </span>
          </p>
          <p>
            We are submitting a proposal of 12 recommendations for your
            consideration on how civic technology could improve the everyday
            lives of New Yorkers.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-red bg-[url('/assets/step-and-repeat.svg')] bg-[length:177px_auto] bg-repeat py-10">
        <div className="relative mx-auto w-full max-w-[1200px] px-6">
          <div className="relative mx-auto max-w-[700px]">
            <img
              src="/assets/taxi.svg"
              alt=""
              aria-hidden
              className="absolute -left-8 -top-12 z-10 w-28"
            />
            <img
              src="/assets/cat.svg"
              alt=""
              aria-hidden
              className="absolute -right-8 -top-12 z-10 w-28"
            />
            <img
              src="/assets/pizza.svg"
              alt=""
              aria-hidden
              className="absolute -bottom-10 -left-8 z-10 w-24"
            />
            <img
              src="/assets/rat.svg"
              alt=""
              aria-hidden
              className="absolute -bottom-10 -right-8 z-10 w-24"
            />
            <ol className="relative space-y-2 border-8 border-black bg-white p-4 text-[18pt] font-bold leading-[22pt] tracking-[-0.04em] text-black md:p-8 md:text-[25pt] md:leading-[28pt]">
              {[
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
              ].map((item, i) => (
                <li key={item.label} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-sm text-white">
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
          </div>
        </div>
      </section>

      <section className="bg-brand-yellow text-black">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-10 text-center">
          <p className="mx-auto max-w-[700px] font-serif text-[18pt] font-bold leading-[22pt] tracking-tighter">
            These recommendations came out of an open-format participatory
            event called{" "}
            <a
              href="https://www.instagram.com/p/DVMRkwugaCz/?img_index=1"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans italic"
            >
              Open Assembly: A Prompt Towards Civic Engagement
            </a>{" "}
            held at Index Greenpoint on March 10th, 2026, co-presented with a
            committee of leading organizations in the civic technology field
            including {partnerLinks()}.
          </p>

          <div className="mx-auto mt-8 flex aspect-video w-full max-w-[1100px] items-center justify-center bg-black text-white/70">
            VIDEO
          </div>

          <img
            src="/assets/we-can-help.svg"
            alt="We can help"
            className="mx-auto mt-10 w-full max-w-[1100px]"
          />
          <div className="mx-auto mt-3 max-w-[1100px]">
            <FitText className="font-display font-black tracking-tight">
              PLS EMAIL US:{" "}
              <a href="mailto:hello@heymamdani.nyc">HELLO@HEYMAMDANI.NYC</a>
            </FitText>
          </div>

          <PartnersStrip className="mt-6 text-black" />
        </div>
      </section>

      <footer className="bg-brand-navy text-white">
        <div className="mx-auto w-full max-w-[1200px] px-6 pb-6 pt-12 text-center">
          <p className="font-serif text-4xl font-bold leading-[1.1] tracking-tighter md:text-5xl lg:text-7xl">
            If you are not Mamdani,
            <br />
            Please{" "}
            <Link href="?letter=open" scroll={false} className="underline">
              Sign The Letter
            </Link>
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 md:gap-4">
            <p className="font-serif text-sm font-bold leading-[1.1] tracking-tight md:text-lg lg:text-xl">
              Thank
              <br />
              You!
            </p>
            <img
              src="/assets/apple.svg"
              alt=""
              aria-hidden
              className="h-16 w-auto md:h-24 lg:h-28"
            />
          </div>
        </div>
      </footer>

      <Signatures />
    </div>
  );
}
