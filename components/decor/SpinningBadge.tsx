import { Heart } from "./Shapes";

type SpinningBadgeProps = {
  /** Texto que gira em volta do selo */
  text?: string;
  className?: string;
};

/**
 * Selo circular com texto girando ao redor e um coração no centro,
 * inspirado nos selos "New Collection" de lojas infantis.
 */
export function SpinningBadge({
  text = "Novidades • Bia Fashion Kids • ",
  className = "",
}: SpinningBadgeProps) {
  return (
    <span className={`kids-badge ${className}`} aria-hidden="true">
      <svg className="kids-badge__ring" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <defs>
          <path id="kids-badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text>
          <textPath href="#kids-badge-circle" textLength="276">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="kids-badge__center">
        <Heart className="kids-badge__heart" color="#ffffff" />
      </span>
    </span>
  );
}
