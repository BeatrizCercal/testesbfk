# Bia Fashion Kids — Protótipo de E-commerce

Protótipo (prospect) de loja virtual para a **Bia Fashion Kids**, construído com **Next.js 14 (App Router) + React + TypeScript + Tailwind CSS**.

O layout foi inspirado na estrutura do site da **Loja Milon** (header com barra de categorias, hero em carrossel, grade de produtos e footer institucional), com a identidade visual adaptada às cores e ao estilo da logo da Bia Fashion Kids (rosa, dourado e azul-céu).

## ✨ O que está incluso

- **TopBar** — faixa de avisos (frete grátis, parcelamento, trocas) com efeito de marquee.
- **Header** — logo, busca, conta/favoritos/carrinho e menu de categorias (fixo no topo), com menu responsivo para mobile.
- **Hero Carousel** — carrossel autoplay com 3 slides, setas, indicadores (dots) e respeito a `prefers-reduced-motion`.
- **Categorias** — grade de atalhos (Meninas, Meninos, Bebês, Calçados, Casacos, Acessórios).
- **Barra de benefícios** — frete grátis, parcelamento, troca fácil, compra segura.
- **Grade de produtos** — com abas de filtro por categoria (dados mockados em `data/products.ts`).
- **Banner promocional**.
- **Newsletter** — captura de e-mail com cupom.
- **Footer** — colunas institucionais, redes sociais, bandeiras de pagamento e selo de segurança.

Toda a ilustração de produtos e o logo estão em **SVG** (`components/icons`), servindo como placeholder até você substituir pelas fotos reais e pelo `.png` da logo.

## 🎨 Identidade visual

As cores em `tailwind.config.ts` (`brand.pink`, `brand.gold`, `brand.sky`, `brand.cream`, `brand.ink`) foram extraídas da logo enviada. As fontes usadas são **Baloo 2** (títulos, estilo lúdico/infantil) e **Nunito** (textos), carregadas via `next/font/google`.

## 🚀 Como rodar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## 🏗️ Build de produção

```bash
npm run build
npm run start
```

## 📁 Estrutura principal

```
app/
  layout.tsx        # layout raiz, fontes e metadata
  page.tsx           # monta a home juntando as seções
  globals.css         # estilos globais e tokens utilitários
components/
  Header.tsx, TopBar.tsx, HeroCarousel.tsx
  CategoryGrid.tsx, BenefitsBar.tsx
  ProductGrid.tsx, ProductCard.tsx, PromoBanner.tsx
  Newsletter.tsx, Footer.tsx
  icons/              # Logo.tsx e ilustrações SVG das roupas
data/
  products.ts         # produtos, categorias e links de navegação (mock)
```

## 🔜 Próximos passos sugeridos

1. Substituir `components/icons/Logo.tsx` pelo `.png`/`.svg` oficial (basta usar `<Image src="/logo.png" .../>` no lugar do componente `<Logo />`).
2. Trocar as ilustrações SVG dos produtos por fotos reais.
3. Conectar `data/products.ts` a uma fonte real (CMS, planilha ou plataforma de e-commerce como VTEX/Shopify/Nuvemshop).
4. Implementar carrinho, checkout e autenticação de fato (hoje os botões são apenas visuais).
