import Link from "next/link";

import partnersData from "@/data/partners.json";
import sliderData from "@/data/slider.json";
import FitText from "./FitText";
import Nav from "./Nav";
import PartnersStrip from "./PartnersStrip";
import Signatures from "./Signatures";

function partnerLinks(): React.ReactNode {
  const ps = partnersData.partners.filter(
    (p) => "participant" in p && p.participant === true,
  );
  if (ps.length === 0) return "PARTICIPANTS WILL BE LISTED HERE";
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
      <Nav />

      <section id="hero" className="bg-brand-navy">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 pb-6 pt-20">
          <img src="/assets/logo.svg" alt="Hey Mamdani!" className="relative z-10 w-full max-w-[1100px]" fetchPriority="high" decoding="async" />
          <img
            src="/assets/now-is-the-time-mobile.svg"
            alt="NOW is the time to reimagine our city's relationship with technology."
            className="-mt-2 block w-full md:hidden"
          />
          <img
            src="/assets/now-is-the-time.svg"
            alt="NOW is the time to reimagine our city's relationship with technology."
            className="hidden w-full max-w-[900px] md:-mt-12 md:block lg:-mt-24"
          />
        </div>
      </section>

      <section className="overflow-hidden bg-brand-yellow text-black">
        <div className="mx-auto flex w-full max-w-[1200px] items-stretch justify-between gap-2 px-6 pt-6 md:gap-10 md:pt-8">
          <div className="flex items-center pb-6 md:pb-8">
            <p className="font-serif text-4xl font-bold leading-[1.05] tracking-[-0.06em] md:text-5xl lg:text-6xl">
              &ldquo;Working New Yorkers know what they need{" "}
              <span className="whitespace-nowrap">to thrive&rdquo;</span>
              <span className="mt-2 block font-serif text-lg italic tracking-[-0.06em] md:mt-3 md:text-2xl lg:text-3xl">
                Mayor Zohran Kwame Mamdani
              </span>
            </p>
          </div>
          <img
            src="/assets/portrait.svg"
            alt=""
            aria-hidden
            className="-mr-24 h-72 w-auto shrink-0 self-end sm:-mr-16 sm:h-72 md:mr-0 md:h-72 lg:h-96"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="bg-brand-lavender text-brand-navy">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-10">
          <a
            href="mailto:hello@heymamdani.nyc"
            aria-label="Email hello@heymamdani.nyc"
            className="block md:hidden"
          >
            <img
              src="/assets/hey-zohran-mobile.svg"
              alt="Hey Zohran, we want to help make civic technology awesome. Please email us: hello@heymamdani.nyc"
              className="block w-full"
              loading="lazy"
              decoding="async"
            />
          </a>
          <img
            src="/assets/hey-zohran-big.svg"
            alt="Hey Zohran, we want to help make civic technology awesome."
            className="hidden w-full md:block"
            loading="lazy"
            decoding="async"
          />
          <div className="hidden md:block">
            <FitText className="block font-display font-black leading-none tracking-tight">
              <a href="mailto:hello@heymamdani.nyc" className="underline">
                HELLO@HEYMAMDANI.NYC
              </a>
            </FitText>
          </div>
          <PartnersStrip className="mt-8 text-brand-navy" />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 px-6 py-6 md:grid-cols-2">
          <img
            src="/assets/infra-lagging-behind.svg"
            alt="NYC infra is lagging behind"
            className="w-full"
            loading="lazy"
            decoding="async"
          />
          <img
            src="/assets/world-is-changing-fast.svg"
            alt="The world is changing fast"
            className="w-full"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-6 text-center">
          <p className="text-[18pt] font-bold leading-[22pt] tracking-[-0.04em] md:text-[25pt] md:leading-[28pt]">
            Your campaign ran on a vision of a city that works for every New
            Yorker. But the digital layer underneath that promise is in rough
            shape.
          </p>
        </div>
      </section>

      <section className="bg-white pb-2 pt-6">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [padding-inline:max(1.5rem,calc((100vw-1100px)/2+1.5rem))] [scroll-padding-inline-start:max(1.5rem,calc((100vw-1100px)/2+1.5rem))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sliderData.items.map((item, i) => (
            <div
              key={item.title}
              className="flex w-[85vw] max-w-[400px] shrink-0 snap-start flex-col border-8 border-brand-red bg-white p-5 text-black md:p-6"
            >
              <div className="text-[18pt] font-bold leading-[22pt] tracking-[-0.04em] text-brand-red md:text-[25pt] md:leading-[28pt]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mb-3 text-[18pt] font-bold leading-[22pt] tracking-[-0.04em] text-brand-red md:text-[25pt] md:leading-[28pt]">
                {item.title}
              </div>
              <p className="text-base font-bold leading-snug tracking-[-0.04em] md:text-lg">
                {item.body}
              </p>
              <a
                href={item.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-4 text-sm text-brand-red underline"
              >
                Source {"↗︎"}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto w-full max-w-[1100px] space-y-6 px-6 py-8 text-center text-[18pt] font-bold leading-[22pt] tracking-[-0.04em] md:space-y-8 md:py-10 md:text-[25pt] md:leading-[28pt]">
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

      <section className="relative overflow-hidden bg-brand-red bg-[url('/assets/step-and-repeat.svg')] bg-[length:400px_auto] bg-repeat py-32 md:py-40">
        <div className="relative mx-auto w-full max-w-[1200px] px-6">
          <div className="relative mx-auto max-w-[700px]">
            <img
              src="/assets/taxi.svg"
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute -top-20 left-[4%] z-10 w-24 -rotate-12 md:w-28"
            />
            <img
              src="/assets/cat.svg"
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute -top-20 right-[4%] z-10 w-24 rotate-6 md:w-28"
            />
            <img
              src="/assets/pizza.svg"
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute -bottom-20 right-[4%] z-10 w-24 rotate-6 md:w-28"
            />
            <img
              src="/assets/rat.svg"
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute -bottom-20 left-[4%] z-10 w-24 -rotate-6 md:w-28"
            />
            <div className="relative border-8 border-black bg-white p-4 text-black md:p-8">
              <h2 className="whitespace-nowrap text-5xl font-bold leading-none tracking-[-0.04em] md:text-6xl">
                NYC Should&hellip;
              </h2>
              <ol className="mt-3 space-y-2 text-[18pt] font-bold leading-[22pt] tracking-[-0.04em] md:mt-4 md:text-[25pt] md:leading-[28pt]">
                {([
                  { label: "Build a Public Internet" },
                  { label: "Setup City-owned Payment Rails" },
                  { label: "Host Real-time Housing Data" },
                  { label: "Improve 311" },
                  { label: "Curb AI Expansion" },
                  { label: "Provide Free Internet for All", href: "https://internetforall.nyc/" },
                  { label: "Add Public Comments on City Bills" },
                  { label: "Install Live Budget Tracking" },
                  { label: "Establish Office of AI Accountability" },
                  { label: "Offer Opt-out to Biometric Surveillance" },
                  { label: "Regulate Self-driving Taxis" },
                  { label: "Run a Food Rescue Platform" },
                ] as { label: string; href?: string }[]).map((item, i) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="mt-[0.15em] flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-sm text-white">
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
        </div>
      </section>

      <section className="bg-brand-yellow text-black">
        <div className="mx-auto w-full max-w-[1200px] px-6 pt-10 text-center">
          <p className="mx-auto max-w-[1100px] font-serif text-[18pt] font-bold leading-[22pt] tracking-tighter">
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
            held at Index Greenpoint on March 10th, 2026.
          </p>
          <p className="mx-auto mt-4 max-w-[1100px] font-serif text-[18pt] font-bold leading-[22pt] tracking-tighter">
            We gathered 100 local technologists &amp; experts from leading
            organizations in the civic technology field including{" "}
            {partnerLinks()} to dream up what a tech-enabled NYC looks like.
          </p>

          <div className="mx-auto mt-8 aspect-video w-full max-w-[1100px] overflow-hidden bg-black">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/m7XwOxExLnc"
              title="Hey Mamdani"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <h2 className="mx-auto mt-10 max-w-[1100px] text-left text-5xl font-bold leading-none tracking-[-0.04em] md:text-6xl">
            Our Coalition Includes:
          </h2>
        </div>

        <div className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-10 [padding-inline:max(1.5rem,calc((100vw-1100px)/2))] [scroll-padding-inline-start:max(1.5rem,calc((100vw-1100px)/2))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {partnersData.partners
            .filter(
              (p): p is typeof p & { description: string } =>
                p.partner === true && "description" in p && !!p.description,
            )
            .map((p, i) => (
              <div
                key={p.name}
                className="flex w-[85vw] max-w-[400px] shrink-0 snap-start flex-col border-8 border-black bg-white p-5 text-black md:p-6"
              >
                <div className="text-[18pt] font-bold leading-[22pt] tracking-[-0.04em] md:text-[25pt] md:leading-[28pt]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mb-3 text-[18pt] font-bold leading-[22pt] tracking-[-0.04em] md:text-[25pt] md:leading-[28pt]">
                  {p.name}
                </div>
                <p className="text-base font-bold leading-snug tracking-[-0.04em] md:text-lg">
                  {p.description}
                </p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-4 text-sm underline"
                >
                  Visit {"↗︎"}
                </a>
              </div>
            ))}
        </div>
      </section>

      <section className="bg-black text-brand-yellow">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-10 text-center">
          <a
            href="mailto:hello@heymamdani.nyc"
            aria-label="Email hello@heymamdani.nyc"
            className="block md:hidden"
          >
            <img
              src="/assets/we-can-help-mobile.svg"
              alt="We can help. Please email: hello@heymamdani.nyc"
              className="block w-full"
              loading="lazy"
              decoding="async"
            />
          </a>
          <img
            src="/assets/we-can-help-big.svg"
            alt="We can help"
            className="hidden w-full md:block"
            loading="lazy"
            decoding="async"
          />
          <div className="hidden md:block">
            <FitText className="block font-display font-black leading-none tracking-tight">
              <a href="mailto:hello@heymamdani.nyc" className="underline">
                HELLO@HEYMAMDANI.NYC
              </a>
            </FitText>
          </div>
          <PartnersStrip className="mt-8 text-brand-yellow" />
        </div>
      </section>

      <footer className="bg-brand-navy text-white">
        <div className="mx-auto w-full max-w-[1200px] px-6 pb-6 pt-12 text-center">
          <p className="font-serif text-4xl font-bold leading-[1.1] tracking-tighter md:text-5xl lg:text-7xl xl:text-8xl">
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
              loading="lazy"
              decoding="async"
              className="h-16 w-auto md:h-24 lg:h-28"
            />
          </div>
        </div>
      </footer>

      <Signatures />
    </div>
  );
}
