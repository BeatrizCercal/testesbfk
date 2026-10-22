"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

type AuthMode = "login" | "signup";

type AuthPageProps = {
  mode: AuthMode;
};

const content = {
  login: {
    eyebrow: "Minha conta",
    title: "Que bom ter você de volta!",
    description: "Entre para acompanhar seus pedidos e adicionar seus looks preferidos no carrinho.",
    submit: "Entrar na minha conta",
    alternate: "Ainda não tem uma conta?",
    alternateAction: "Cadastre-se",
    alternateHref: "/cadastrar-se",
  },
  signup: {
    eyebrow: "Crie sua conta",
    title: "Tudo pronto para descobrir os looks mais lindos",
    description: "Cadastre-se para ter uma experiência mais prática na Bia Fashion Kids.",
    submit: "Criar minha conta",
    alternate: "Já tem uma conta?",
    alternateAction: "Entrar",
    alternateHref: "/entrar",
  },
} as const;

export function AuthPage({ mode }: AuthPageProps) {
  const isLogin = mode === "login";
  const text = content[mode];
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-[calc(100vh-88px)] bg-brand-cream px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-xl2 bg-white shadow-card lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-brand-pink-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 top-16 h-64 w-64 rounded-full border-[28px] border-white/10" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border-[34px] border-brand-sky-400/60" />
          <div className="relative z-10">
            <Link href="/" aria-label="Voltar para a página inicial">
              <Image
                src="/logo/biafashionkids-logo.jpg"
                alt="Bia Fashion Kids"
                width={74}
                height={74}
                className="h-[74px] w-[74px] rounded-full border-4 border-white object-cover"
              />
            </Link>
            <p className="mt-12 max-w-xs text-sm font-bold uppercase tracking-[0.24em] text-brand-sky-100">
              Bia Fashion Kids
            </p>
            <p className="mt-4 max-w-sm text-3xl font-bold leading-tight text-white">
              Desde 2014, do bebê ao juvenil!
            </p>
          </div>
          <p className="relative z-10 max-w-xs text-sm leading-6 text-white/80">
            Moda infantil escolhida para acompanhar cada fase com conforto e estilo.
          </p>
        </aside>

        <section className="px-5 py-8 sm:px-12 sm:py-12 lg:px-16">
          <div className="mx-auto max-w-md">
            <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-brand-ink lg:hidden">
              <span aria-hidden="true">←</span>
              Voltar para a loja
            </Link>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-pink-500">{text.eyebrow}</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-brand-ink sm:text-4xl">{text.title}</h1>
            <p className="mt-4 max-w-lg leading-6 text-brand-ink/65">{text.description}</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-bold text-brand-ink">
                    Nome
                    <input
                      required
                      name="name"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Seu nome"
                      className="mt-2 w-full rounded-lg border border-brand-ink/15 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-brand-ink/35 focus:border-brand-pink-500 focus:ring-2 focus:ring-brand-pink-100"
                    />
                  </label>
                  <label className="block text-sm font-bold text-brand-ink">
                    Sobrenome
                    <input
                      required
                      name="surname"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Seu sobrenome"
                      className="mt-2 w-full rounded-lg border border-brand-ink/15 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-brand-ink/35 focus:border-brand-pink-500 focus:ring-2 focus:ring-brand-pink-100"
                    />
                  </label>
                </div>
              )}

              <label className="block text-sm font-bold text-brand-ink">
                E-mail
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@email.com"
                  className="mt-2 w-full rounded-lg border border-brand-ink/15 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-brand-ink/35 focus:border-brand-pink-500 focus:ring-2 focus:ring-brand-pink-100"
                />
              </label>

              {!isLogin && (
                <label className="block text-sm font-bold text-brand-ink">
                  Telefone
                  <input
                    required
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(00) 00000-0000"
                    className="mt-2 w-full rounded-lg border border-brand-ink/15 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-brand-ink/35 focus:border-brand-pink-500 focus:ring-2 focus:ring-brand-pink-100"
                  />
                </label>
              )}

              <label className="block text-sm font-bold text-brand-ink">
                Senha
                <input
                  required
                  name="password"
                  type="password"
                  minLength={6}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder="Digite sua senha"
                  className="mt-2 w-full rounded-lg border border-brand-ink/15 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-brand-ink/35 focus:border-brand-pink-500 focus:ring-2 focus:ring-brand-pink-100"
                />
              </label>

              {!isLogin && (
                <label className="block text-sm font-bold text-brand-ink">
                  Confirme sua senha
                  <input
                    required
                    name="passwordConfirmation"
                    type="password"
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Digite a senha novamente"
                    className="mt-2 w-full rounded-lg border border-brand-ink/15 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-brand-ink/35 focus:border-brand-pink-500 focus:ring-2 focus:ring-brand-pink-100"
                  />
                </label>
              )}

              {isLogin ? (
                <div className="flex justify-end">
                  <Link href="#" className="text-sm font-bold text-brand-pink-600 transition hover:text-brand-pink-800">
                    Esqueci minha senha
                  </Link>
                </div>
              ) : (
                <label className="flex items-start gap-3 text-sm leading-5 text-brand-ink/70">
                  <input required type="checkbox" className="mt-1 h-4 w-4 accent-brand-pink-500" />
                  <span>
                    Li e aceito os <Link href="#" className="font-bold text-brand-pink-600">termos de uso</Link> e a{" "}
                    <Link href="#" className="font-bold text-brand-pink-600">política de privacidade</Link>.
                  </span>
                </label>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-brand-pink-500 px-5 py-3.5 font-bold text-white shadow-soft transition hover:bg-brand-pink-600"
              >
                {text.submit}
              </button>

              {submitted && (
                <p role="status" className="rounded-lg bg-brand-sky-100 px-4 py-3 text-sm font-medium text-brand-ink">
                  Formulário pronto. A integração com a conta será conectada na próxima etapa.
                </p>
              )}
            </form>

            <p className="mt-8 text-center text-sm text-brand-ink/65">
              {text.alternate}{" "}
              <Link href={text.alternateHref} className="font-bold text-brand-pink-600 hover:text-brand-pink-800">
                {text.alternateAction}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
