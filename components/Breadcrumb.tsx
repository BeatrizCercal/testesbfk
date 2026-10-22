import Link from "next/link";

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 512 512" aria-hidden="true">
      <polygon
        fill="black"
        points="442.531,218 344.828,120.297 256,31.469 167.172,120.297 69.438,218.047 0,287.469 39.984,327.453 109.406,258.031 207.156,160.281 256,111.438 304.844,160.281 402.531,257.984 472.016,327.453 512,287.469"
      />
      <polygon
        fill="black"
        points="85.719,330.375 85.719,480.531 274.75,480.531 274.75,361.547 343.578,361.547 343.578,480.531 426.281,480.531 426.281,330.328 256.016,160.063"
      />
    </svg>
  );
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 py-4 sm:px-8">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        <li>
          <Link href="/" className="flex items-center gap-1.5 hover:text-black">
            <HomeIcon />
            Página inicial
          </Link>
        </li>
        <li aria-hidden="true" className="text-gray-300">
          |
        </li>
        <li className="font-bold uppercase text-black">{current}</li>
      </ol>
    </nav>
  );
}
