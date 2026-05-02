import partnersData from "@/data/partners.json";
import { loadInlineSvg } from "@/lib/inline-svg";

export default function PartnersStrip({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`mx-auto flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6 md:gap-x-8 md:gap-y-4 lg:gap-x-10 ${className}`}
    >
      {partnersData.partners.map((p) => {
        const svg = p.logo ? loadInlineSvg(p.logo) : null;
        const scale = "scale" in p && typeof p.scale === "number" ? p.scale : 1;
        return (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center justify-center [height:calc(var(--logo-scale,1)*0.875rem)] sm:[height:calc(var(--logo-scale,1)*1rem)] md:[height:calc(var(--logo-scale,1)*1.25rem)] lg:[height:calc(var(--logo-scale,1)*1.75rem)]"
            style={
              scale !== 1
                ? ({ "--logo-scale": scale } as React.CSSProperties)
                : undefined
            }
          >
            {svg ? (
              <span
                aria-label={p.name}
                className="flex h-full items-center [&>svg]:h-full [&>svg]:w-auto"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            ) : (
              <span className="text-xs font-bold md:text-sm">{p.name}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}
