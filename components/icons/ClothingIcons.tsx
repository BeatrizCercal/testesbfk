import type { SVGProps } from "react";

/**
 * A small library of hand-drawn-style SVG clothing icons used as
 * placeholder artwork throughout the storefront (product cards, category
 * tiles, hero illustration) until real product photography is uploaded.
 * Every icon takes the same props as a normal <svg>, so callers can size
 * and position them with Tailwind classes.
 */

export function DressIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M100 18c-11 0-20 8-20 18 0 3 .6 5.8 1.7 8.3L54 66c-6 3-10 9-10 16v10l14 4-6 96c-.6 9 6.4 17 15.5 17h65c9.1 0 16.1-8 15.5-17l-6-96 14-4V82c0-7-4-13-10-16l-27.7-21.7c1.1-2.5 1.7-5.3 1.7-8.3 0-10-9-18-20-18Z"
        fill="#F8C2DA"
        stroke="#A24372"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M75 66c8 8 17 12 25 12s17-4 25-12" stroke="#A24372" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="96" r="5" fill="#C2578A" />
      <circle cx="100" cy="116" r="5" fill="#C2578A" />
      <circle cx="100" cy="136" r="5" fill="#C2578A" />
    </svg>
  );
}

export function PoloIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M70 30 44 44c-6 3-10 9-10 16l4 30 16-6v98c0 6 5 11 11 11h70c6 0 11-5 11-11v-98l16 6 4-30c0-7-4-13-10-16L130 30c-4 10-16 17-30 17s-26-7-30-17Z"
        fill="#7ED2EC"
        stroke="#369CC0"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M70 30c4 10 16 17 30 17s26-7 30-17" stroke="#1F6E8C" strokeWidth="4" strokeLinecap="round" />
      <rect x="86" y="80" width="30" height="34" rx="4" fill="#5AC0E3" stroke="#369CC0" strokeWidth="3" />
    </svg>
  );
}

export function OnesieIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M66 24c0-4 3-8 8-8h52c5 0 8 4 8 8v20l14 8c5 3 8 8 8 14v18l-14 4v34c0 5-3 9-8 11l6 42c1 8-5 15-13 15h-16l-1-24-1 24H84c-8 0-14-7-13-15l6-42c-5-2-8-6-8-11v-34l-14-4V66c0-6 3-11 8-14l14-8V24Z"
        fill="#FBE28A"
        stroke="#D6A50E"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="100" cy="70" r="4" fill="#C2578A" />
      <circle cx="100" cy="86" r="4" fill="#C2578A" />
      <circle cx="100" cy="102" r="4" fill="#C2578A" />
    </svg>
  );
}

export function ShortsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M40 30h120l6 60-8 60h-26l-8-58-8 58H90l-8-58-8 58H48l-8-60Z"
        fill="#C2578A"
        stroke="#84345C"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M40 52h120" stroke="#84345C" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function ShoeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16 108c0-14 10-24 24-26l30-6c8-10 20-24 34-34 10-8 22 2 20 12l-4 16 30 4c22 3 40 12 44 30 1 6-3 12-9 12H24c-4 0-8-3-8-8Z"
        fill="#5AC0E3"
        stroke="#D6A50E"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M70 76c14 6 40 6 60 0" stroke="#D6A50E" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function JacketIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M72 26 46 40c-6 3-10 9-10 16l4 34 16-6v98c0 6 5 10 10 10h68c5 0 10-4 10-10v-98l16 6 4-34c0-7-4-13-10-16l-26-14-10 8-28 0-10-8Z"
        fill="#5AC0E3"
        stroke="#1F6E8C"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M100 48v144" stroke="#1F6E8C" strokeWidth="3" strokeDasharray="2 6" />
      <path d="M64 34c8 12 22 18 36 18s28-6 36-18" stroke="#1F6E8C" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function AccessoryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="100" cy="100" r="58" fill="#FBE28A" stroke="#D6A50E" strokeWidth="4" />
      <path d="M100 42v20M100 138v20M42 100h20M138 100h20" stroke="#D6A50E" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="100" r="22" fill="#C2578A" stroke="#84345C" strokeWidth="3" />
    </svg>
  );
}
