import partnersData from "@/data/partners.json";
import fs from "node:fs";
import path from "node:path";

function isLightColor(raw: string): boolean {
  const s = raw.trim().toLowerCase();
  if (s === "white" || s === "transparent" || s === "none") return true;
  const hex = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (hex) {
    let h = hex[1];
    if (h.length === 3)
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return (r + g + b) / 3 > 220;
  }
  const rgb = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgb) {
    return (
      (parseInt(rgb[1], 10) + parseInt(rgb[2], 10) + parseInt(rgb[3], 10)) /
        3 >
      220
    );
  }
  return false;
}

function rewriteCssDecls(css: string): string {
  return css.replace(
    /(fill|stroke)\s*:\s*([^;}\n]+)/gi,
    (_m, prop: string, value: string) =>
      isLightColor(value) ? `${prop}: none` : `${prop}: currentColor`,
  );
}

function loadSvg(logoPath: string): string | null {
  try {
    const filePath = path.join(process.cwd(), "public", logoPath);
    let svg = fs.readFileSync(filePath, "utf-8");

    svg = svg.replace(/<\?xml[\s\S]*?\?>/g, "");
    svg = svg.replace(/<!DOCTYPE[\s\S]*?>/gi, "");
    svg = svg.replace(/<!--[\s\S]*?-->/g, "");

    svg = svg.replace(
      /<style[^>]*>([\s\S]*?)<\/style>/gi,
      (_m, css: string) => `<style>${rewriteCssDecls(css)}</style>`,
    );

    svg = svg.replace(
      /\s+(fill|stroke)="([^"]*)"/gi,
      (match, attr: string, value: string) => {
        if (value.trim().toLowerCase() === "none") return match;
        if (isLightColor(value)) return ` ${attr}="none"`;
        return "";
      },
    );

    svg = svg.replace(/style="([^"]*)"/gi, (_m, body: string) => {
      const rewritten = rewriteCssDecls(body);
      return `style="${rewritten}"`;
    });

    svg = svg.replace(/<svg([^>]*?)>/g, (_m, attrs: string) => {
      const cleaned = attrs.replace(/\s+fill="[^"]*"/gi, "");
      return `<svg${cleaned} fill="currentColor">`;
    });

    return svg;
  } catch {
    return null;
  }
}

export default function PartnersStrip({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12 md:gap-y-6 ${className}`}
    >
      {partnersData.partners.map((p) => {
        const svg = p.logo ? loadSvg(p.logo) : null;
        const scale = "scale" in p && typeof p.scale === "number" ? p.scale : 1;
        return (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center justify-center [height:calc(var(--logo-scale,1)*1.5rem)] md:[height:calc(var(--logo-scale,1)*2.5rem)]"
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
