"use client";

import { useEffect, useRef, type ReactNode } from "react";

type CursorProps = {
  children: ReactNode;
  name: string;
  cursorColor: string;
  customSVG: ReactNode;
  svgClassName: string;
};

export function Cursor({
  children,
  name,
  cursorColor,
  customSVG,
  svgClassName,
}: CursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.style.opacity = "1";
      document.body.classList.add("custom-cursor-enabled");
    };

    const hideCursor = () => {
      cursor.style.opacity = "0";
      document.body.classList.remove("custom-cursor-enabled");
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.documentElement.addEventListener("pointerleave", hideCursor);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", hideCursor);
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, []);

  return (
    <>
      {children}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="custom-cursor"
        style={{ "--cursor-color": cursorColor } as React.CSSProperties}
      >
        {customSVG ? (
          <span className={svgClassName}>{customSVG}</span>
        ) : (
          <span className="custom-cursor__dot" />
        )}
        <span className="custom-cursor__label">{name}</span>
      </div>
    </>
  );
}
