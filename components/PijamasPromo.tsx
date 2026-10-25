import Image from "next/image";

export function PijamasPromo() {
  return (
    <section className="bg-white py-10" aria-label="Promoção Liquída Inverno">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-8">
        <h2 className="text-2xl font-extrabold tracking-wide text-black">Promo | Liquída Inverno</h2>
        <div className="mx-auto mt-2 h-1 w-14 bg-black" />
      </div>

      <div className="relative mt-8 h-[220px] w-full overflow-hidden sm:h-[340px] lg:h-[520px]">
        <Image
          src="/footer/promos_1.png"
          alt="Até 50% OFF Outlet e na Loja Principal Promoção Progressiva até 40% OFF"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
