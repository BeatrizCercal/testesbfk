# Bia Fashion Kids

Loja virtual demonstrativa feita com Next.js, React, TypeScript, JSON e CSS.

## Tecnologias

- **Next.js e React** organizam as páginas e os componentes.
- **TypeScript** descreve os dados e ajuda a encontrar erros no código.
- **JSON** guarda os produtos e as categorias do catálogo.
- **CSS** define a aparência do site. As cores compartilhadas ficam em `styles/theme.css`.

## Pastas principais

```text
app/                  páginas e rotas do site
components/           partes reutilizáveis das páginas
components/icons/     ícones das roupas
data/catalog/         dados em JSON
data/products.ts      tipos e funções do catálogo
public/               imagens e arquivos públicos
styles/               estilos CSS e cores do tema
```

## Catálogo

Edite `data/catalog/products.json` para alterar produtos e categorias. Os tipos usados pelo TypeScript e a função de formatação de preços ficam em `data/products.ts`.

## Estilos

Os estilos existentes estão em `styles/site.css`. As cores do tema ficam centralizadas em `styles/theme.css`, em variáveis CSS como `--color-pink`, `--color-sky` e `--color-text`.

Para criar uma nova aparência, adicione uma classe CSS em `styles/site.css` e use o nome dessa classe no componente. Não é necessário instalar ou configurar um framework de CSS.

## Executar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Criar a versão de produção

```bash
npm run build
npm run start
```
