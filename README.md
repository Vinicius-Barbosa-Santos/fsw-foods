# FSW Foods

Aplicação de delivery com foco em experiência de compra: exploração de restaurantes e produtos, favoritos, carrinho, pedidos e autenticação com Google. Construída em Next.js (App Router), Prisma (PostgreSQL), Tailwind CSS e NextAuth.

## Visão Geral

- Explorar restaurantes recomendados e categorias.
- Ver detalhes do restaurante (imagem hero, info de entrega, categorias e produtos).
- Ver detalhes de produto, controlar quantidade e adicionar ao carrinho.
- Carrinho com resumo de valores e finalização de pedido.
- Meus pedidos: histórico e ação de refazer pedido.
- Favoritos: marcar e listar restaurantes preferidos.
- Busca de restaurantes com mensagem quando não há resultados.
- Páginas adaptadas para desktop com grid centralizada.

## Tecnologias

- Next.js 14 (App Router) e React 18
- Tailwind CSS + Radix UI
- Prisma ORM + PostgreSQL
- NextAuth (Google)
- Vercel (deploy)

## Estrutura do Projeto

- `app/`
  - `_components/`: componentes reutilizáveis (header, listas, item de produto/restaurante, UI)
  - `_actions/`: ações de servidor (ex.: criar pedido, favoritar restaurante)
  - `_context/`: contexto do carrinho
  - `_helpers/`: utilitários (formatação de preço, helpers de restaurante)
  - `_hooks/`: hooks (favoritar restaurante)
  - `_lib/`: prisma, auth e utils
  - `restaurants/`, `products/`, `categories/`, `my-orders/`: páginas/rotas
- `prisma/`: `schema.prisma`, `migrations/`, `seed.ts`
- `public/`: imagens estáticas

## Funcionalidades Principais

- Autenticação Google (NextAuth + Prisma Adapter)
- Home com: busca, categorias, banners, produtos e restaurantes recomendados
- Página de restaurante: imagem, info de entrega, categorias, produtos e favoritos
- Página de produto: detalhes, quantidade, descontos, complementares e carrinho
- Categorias: lista de produtos por categoria
- Recomendados: produtos e restaurantes com grid responsiva
- Busca: resultados e mensagem amigável quando vazio
- Meus favoritos e Meus pedidos

## Modelos (Prisma)

Principais modelos: `User`, `Restaurant`, `Product`, `Category`, `Order`, `OrderProduct`, `UserFavoriteRestaurant`, `Account`, `Session`, `VerificationToken`. Veja `prisma/schema.prisma` para detalhes de campos e relacionamentos.

## Variáveis de Ambiente

Crie `.env` com:

```env
DATABASE_URL="postgresql://user:pass@host:port/db?schema=public"
NEXTAUTH_SECRET="<um_segredo_forte>"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="<id>"
GOOGLE_CLIENT_SECRET="<secret>"
```

Em produção (Vercel):

- `NEXTAUTH_URL` = `https://<seu-projeto>.vercel.app`
- Gere um `NEXTAUTH_SECRET` forte (ex.: `openssl rand -base64 32`)

## Banco de Dados

- Configure um Postgres (Neon, Supabase, Vercel Postgres, etc.).
- Rode as migrações no banco remoto:

```bash
export DATABASE_URL="<url_remota>"
npx prisma migrate deploy
```

- (Opcional) Popular dados:

```bash
npx prisma db seed
```

## Desenvolvimento Local

Instale dependências e rode em dev:

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`. Para login com Google, configure o app OAuth no Google Cloud e defina `Authorized redirect URI` para:

- Desenvolvimento: `http://localhost:3000/api/auth/callback/google`
- Produção: `https://<seu-projeto>.vercel.app/api/auth/callback/google`

## Scripts

- `dev`: inicia o servidor de desenvolvimento
- `build`: build de produção
- `start`: inicia servidor após build
- `lint`: linter

## Deploy (Vercel)

1. Suba o código para o GitHub (branch `main`/`master`).
2. Importe o repositório na Vercel (New Project) e configure variáveis:
   - `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
3. Rode migrações no banco remoto antes do primeiro deploy (`npx prisma migrate deploy`).
4. Faça o deploy. A Vercel detecta Next.js automaticamente.

Caso veja erro `EBADPLATFORM` de SWC:

- Remova binários específicos de plataforma do `package.json` (já ajustado removendo `@next/swc-darwin-x64`).
- Dispare um redeploy limpando cache se necessário.

## Páginas

- `/` Home: busca, categorias, promo banners, recomendados
- `/restaurants`: busca com resultados e vazio
- `/restaurants/recommended`: restaurantes recomendados
- `/restaurants/[id]`: detalhes do restaurante
- `/products/recommended`: produtos recomendados
- `/products/[id]`: detalhes do produto
- `/categories/[id]/products`: produtos por categoria
- `/my-orders`: meus pedidos
- `/my-favorite-restaurants`: favoritos

## Contribuição

Contribuições são bem-vindas. Abra issues e pull requests com melhorias, correções ou novas funcionalidades.

## Licença

Este projeto é para fins educacionais/demonstração. Adapte e inclua uma licença se necessário.
