"use client";

import { useEffect, useRef } from "react";

export default function FitText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const style = getComputedStyle(parent);
      const padX =
        parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const availableWidth = parent.clientWidth - padX;
      if (availableWidth <= 0) return;
      el.style.fontSize = "100px";
      const textWidth = el.scrollWidth;
      if (textWidth === 0) return;
      const ratio = availableWidth / textWidth;
      el.style.fontSize = `${100 * ratio}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    if (el.parentElement) ro.observe(el.parentElement);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "inline-block", whiteSpace: "nowrap" }}
    >
      {children}
    </div>
  );
}
