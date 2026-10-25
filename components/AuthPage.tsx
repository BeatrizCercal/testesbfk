"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Blob, Cloud, Heart, Rainbow, Sparkle, Star } from "./decor/Shapes";

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
    title: "Do bebê ao juvenil, desde 2014!",
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
    <main className={`auth-page auth-page--${mode}`}>
      {/* Elementos orgânicos, como na página inicial */}
      <Blob className="auth-decor kids-float--slow kids-float" color="var(--color-pink-light)" style={{ width: 380, left: -140, top: -120 }} />
      <Blob className="auth-decor kids-float" color="var(--color-sky-light)" style={{ width: 420, right: -160, bottom: -160 }} />
      <Blob className="auth-decor kids-float kids-decor--desktop" color="#fffbd0" style={{ width: 160, right: "12%", top: 60 }} />
      <Rainbow className="auth-decor kids-wiggle kids-decor--desktop" style={{ width: 120, left: "9%", bottom: "14%" }} />
      <Cloud className="auth-decor kids-float kids-decor--desktop" style={{ width: 90, left: "16%", top: "18%" }} />
      <Cloud className="auth-decor kids-float--slow kids-float kids-decor--desktop" style={{ width: 70, right: "18%", bottom: "20%" }} />
      <Star className="auth-decor kids-twinkle" color="var(--color-yellow)" style={{ width: 30, left: "7%", top: "40%" }} />
      <Star className="auth-decor kids-twinkle" color="var(--color-sky)" style={{ width: 22, right: "8%", top: "30%", animationDelay: "0.6s" }} />
      <Sparkle className="auth-decor kids-twinkle" color="var(--color-pink)" style={{ width: 22, right: "26%", top: "10%", animationDelay: "1.2s" }} />
      <Heart className="auth-decor kids-beat kids-decor--desktop" color="var(--color-pink)" style={{ width: 24, left: "24%", bottom: "10%" }} />

      <div className="auth-shell">
        <section className="auth-card">
          <Link href="/" className="auth-logo-link" aria-label="Bia Fashion Kids - página inicial">
            <Image
              src="/logo/biafashionkids-logo.jpg"
              alt="Bia Fashion Kids"
              width={64}
              height={64}
              className="auth-logo"
            />
          </Link>
          <div className="auth-card__content">
            <Link href="/" className="auth-back-link">
              <span aria-hidden="true">←</span>
              Voltar para a loja
            </Link>

            <nav className="auth-switch" aria-label="Entrar ou criar conta">
              <Link href="/entrar" aria-current={isLogin ? "page" : undefined}>
                Entrar
              </Link>
              <Link href="/cadastrar-se" aria-current={!isLogin ? "page" : undefined}>
                Criar conta
              </Link>
            </nav>

            <span className="auth-card__eyebrow">{text.eyebrow}</span>
            <h1>{text.title}</h1>
            <p className="auth-card__description">{text.description}</p>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="auth-row">
                  <label className="auth-field">
                    Nome
                    <input
                      required
                      name="name"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Seu nome"
                    />
                  </label>
                  <label className="auth-field">
                    Sobrenome
                    <input
                      required
                      name="surname"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Seu sobrenome"
                    />
                  </label>
                </div>
              )}

              <label className="auth-field">
                E-mail
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@email.com"
                />
              </label>

              {!isLogin && (
                <label className="auth-field">
                  Telefone
                  <input
                    required
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(00) 00000-0000"
                  />
                </label>
              )}

              <label className="auth-field">
                Senha
                <input
                  required
                  name="password"
                  type="password"
                  minLength={6}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder="Digite sua senha"
                />
              </label>

              {!isLogin && (
                <label className="auth-field">
                  Confirme sua senha
                  <input
                    required
                    name="passwordConfirmation"
                    type="password"
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Digite a senha novamente"
                  />
                </label>
              )}

              {isLogin ? (
                <div className="auth-forgot">
                  <Link href="#">
                    Esqueci minha senha
                  </Link>
                </div>
              ) : (
                <label className="auth-terms">
                  <input required type="checkbox" />
                  <span>
                    Li e aceito os <Link href="#" >termos de uso</Link> e a{" "}
                    <Link href="#" >política de privacidade</Link>.
                  </span>
                </label>
              )}

              <button
                type="submit"
                className="auth-submit"
              >
                {text.submit}
              </button>

              {submitted && (
                <p role="status" className="auth-feedback">
                  Formulário pronto. A integração com a conta será conectada na próxima etapa.
                </p>
              )}
            </form>

            <p className="auth-alternate">
              {text.alternate}{" "}
              <Link href={text.alternateHref}>
                {text.alternateAction}
              </Link>
            </p>
            {isLogin && (
              <div className="auth-admin">
                <p>Acesso da equipe da loja</p>
                <Link href="/admin">
                  Acessar painel administrativo
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
