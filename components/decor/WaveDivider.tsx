type WaveDividerProps = {
  /** Cor da seção de cima */
  from: string;
  /** Cor da seção de baixo */
  to: string;
  /** Inverte o desenho da onda horizontalmente, para variar entre seções */
  flip?: boolean;
};

/** Divisor ondulado entre duas seções, no lugar de um corte reto. */
export function WaveDivider({ from, to, flip = false }: WaveDividerProps) {
  return (
    <div className="kids-wave" style={{ backgroundColor: from }} aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={flip ? { transform: "scaleX(-1)" } : undefined}
        focusable="false"
      >
        <path
          fill={to}
          d="M0,48 C120,16 240,8 360,28 C480,48 600,76 720,64 C840,52 960,8 1080,12 C1200,16 1320,48 1440,40 L1440,80 L0,80 Z"
        />
      </svg>
    </div>
  );
}
