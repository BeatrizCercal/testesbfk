import type { CSSProperties } from "react";

/**
 * Formas decorativas em SVG usadas para dar a estética infantil ao site.
 * Todas usam apenas as cores da paleta (variáveis de styles/theme.css)
 * e são marcadas como aria-hidden, pois são puramente visuais.
 */

type ShapeProps = {
  className?: string;
  style?: CSSProperties;
  color?: string;
};

export function Blob({ className = "", style, color = "var(--color-sky-light)" }: ShapeProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <path
        fill={color}
        d="M43.5,-61.3C55.8,-52.1,64.6,-38.6,70.2,-23.6C75.8,-8.6,78.2,7.9,73.1,21.8C68,35.7,55.4,47,41.5,56.2C27.6,65.4,12.4,72.5,-3.3,77C-19,81.5,-35.2,83.4,-46.6,75.6C-58,67.8,-64.6,50.3,-70.3,33.2C-76,16.1,-80.8,-0.6,-76.4,-14.7C-72,-28.8,-58.4,-40.3,-44.4,-49.1C-30.4,-57.9,-15.2,-64,0.3,-64.4C15.8,-64.8,31.2,-70.5,43.5,-61.3Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export function Star({ className = "", style, color = "var(--color-sky)" }: ShapeProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z"
      />
    </svg>
  );
}

/** Estrelinha de quatro pontas (brilho) */
export function Sparkle({ className = "", style, color = "var(--color-pink)" }: ShapeProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill={color} d="M12 0c.8 6.4 2.6 8.9 12 12-9.4 3.1-11.2 5.6-12 12-.8-6.4-2.6-8.9-12-12C9.4 8.9 11.2 6.4 12 0Z" />
    </svg>
  );
}

export function Heart({ className = "", style, color = "var(--color-pink)" }: ShapeProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill={color}
        d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.2c2-.2 3.9.8 5.4 2.7 1.5-1.9 3.4-2.9 5.4-2.7 3.6.3 5.7 4 4.2 7.5C19.5 16.4 12 21 12 21Z"
      />
    </svg>
  );
}

export function Cloud({ className = "", style, color = "#ffffff" }: ShapeProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 40" aria-hidden="true" focusable="false">
      <path
        fill={color}
        stroke="var(--color-sky-medium)"
        strokeWidth="2"
        d="M16 38C8.3 38 3 33.2 3 27c0-5.6 4.4-10 10-10.6C14.4 9.4 20.2 4 27.5 4c6.2 0 11.4 3.9 13.4 9.4 1.2-.4 2.4-.6 3.6-.6 6.6 0 11.9 5 12.4 11.4 3.4 1.1 5.6 4 5.6 7.4 0 3.9-3.5 6.4-8 6.4H16Z"
      />
    </svg>
  );
}

/** Arco-íris com as três cores da paleta */
export function Rainbow({ className = "", style }: ShapeProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 70" aria-hidden="true" focusable="false">
      <g fill="none" strokeLinecap="round" strokeWidth="9">
        <path d="M12 64a48 48 0 0 1 96 0" stroke="var(--color-pink)" />
        <path d="M24 64a36 36 0 0 1 72 0" stroke="var(--color-sky)" />
        <path d="M36 64a24 24 0 0 1 48 0" stroke="var(--color-sky-medium)" />
      </g>
      <g fill="#ffffff">
        <circle cx="8" cy="62" r="7" />
        <circle cx="18" cy="58" r="9" />
        <circle cx="28" cy="63" r="6" />
        <circle cx="92" cy="63" r="6" />
        <circle cx="102" cy="58" r="9" />
        <circle cx="112" cy="62" r="7" />
      </g>
    </svg>
  );
}

/** Linha ondulada (rabisco) usada abaixo de títulos */
export function Squiggle({ className = "", style, color = "var(--color-sky)" }: ShapeProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 16" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        d="M3 8c9-8 18-8 27 0s18 8 27 0 18-8 27 0 18 8 27 0 9-4 6-2"
      />
    </svg>
  );
}

/** Pequeno rabisco em espiral, como um traço feito à mão */
export function Doodle({ className = "", style, color = "var(--color-pink)" }: ShapeProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 24" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        d="M2 18c6-1 10-6 9-10-1-3.5-5-2.5-4.5 1 .6 4.6 7.8 8.5 14.5 6.5 5-1.5 8-6 15-7"
      />
    </svg>
  );
}
