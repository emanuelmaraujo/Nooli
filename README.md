# Nooli

Plataforma para placas físicas com QR Code + NFC e redirecionamento dinâmico.

A URL gravada fisicamente nunca aponta direto para o destino final. Ela aponta para a Nooli, permitindo ativação, troca de destino e evolução do produto sem reimprimir a placa.

## Produto atual

### Nooli Review

O primeiro produto comercial é exclusivamente para avaliações do Google.

Fluxo:

    QR / NFC
       ↓
    https://go.DOMINIO/CODIGO
       ↓
    Cloudflare Worker
       ↓
    placa nova?
       ├─ sim → /activate/google/CODIGO
       └─ não → Google Review direto

Na primeira configuração o cliente informa:

- link de avaliação do Google ou Place ID;
- nome do negócio;
- e-mail responsável.

A confirmação ocorre por magic link. Não existe senha física no MVP.

## Produtos futuros

A arquitetura já diferencia produtos por `product_type`.

- `google_review` → Nooli Review — ativo agora;
- `direct_link` → Nooli Link — futuro;
- `nooli_page` → Nooli Page — futuro.

A Nooli Page será uma página própria e moderna do negócio, com múltiplos blocos e destinos, em vez de uma simples lista de links.

Veja `docs/PRODUCTS.md`.

## Arquitetura

- Cloudflare Worker: recebe cada leitura e responde com redirecionamento HTTP.
- Cloudflare KV: guarda o mapa código público → estado/destino.
- Cloudflare Analytics Engine: métricas sem inserir cada clique no banco principal.
- Supabase: autenticação, clientes, organizações, produtos, lotes, placas, ativação e histórico.
- Vercel + Next.js: site, painel, onboarding e APIs administrativas.
- GitHub: código e documentação.

O Supabase e a Vercel não participam de cada redirect normal.

## Escala alvo

A arquitetura foi desenhada para 1.000, 5.000, 10.000, 15.000+ placas.

Cenário de referência:

    15.000 placas × 50 acessos/dia
    = 750.000 redirects/dia
    ≈ 22,5 milhões/mês

## Identidade física

Cada placa possui um `public_code` aleatório.

Exemplo:

    public_code: 7KQ9X2M4PZ
    redirect_url: https://go.DOMINIO/7KQ9X2M4PZ

QR e NFC da mesma placa recebem exatamente a mesma URL.

O código é público e nunca é usado como senha.

## Geração em massa

Exemplo para o produto atual:

    npm run generate:batch -- --count=1000 --batch=lote-001 --product=google_review --base=https://go.DOMINIO

Saída:

    exports/lote-001/
    ├── factory.csv
    ├── inventory.csv
    └── qr/
        └── ...

O `factory.csv` contém o necessário para produção e correspondência QR/NFC.

## Domínios

Estrutura planejada:

- `DOMINIO` → site público;
- `app.DOMINIO` → painel e configuração na Vercel;
- `go.DOMINIO` → redirect no Cloudflare.

O domínio definitivo precisa estar configurado e validado antes de gerar o lote físico final.

## Documentação

- `docs/ARCHITECTURE.md` — arquitetura e escala.
- `docs/PRODUCTS.md` — Nooli Review, Link e Page.
- `docs/CLOUDFLARE.md` — configuração manual do Cloudflare.
- `docs/PRODUCTION.md` — QR/NFC e produção física.
- `docs/SECURITY.md` — segurança e primeiro claim.
- `docs/ONBOARDING.md` — fluxo de primeiro acesso.
- `supabase/migrations/0001_initial_schema.sql` — banco inicial.

## Estado

- [x] Arquitetura definida
- [x] Tipos de produto modelados
- [x] Nooli Review definido como produto inicial
- [x] Landing page inicial
- [x] Login passwordless
- [x] Ativação Google dedicada
- [x] Claim por e-mail
- [x] Dashboard inicial
- [x] Worker Cloudflare base
- [x] Sincronização de placa ativada para KV implementada
- [x] Gerador de lote com product_type
- [x] Documentação Cloudflare
- [ ] Domínio definitivo comprado
- [ ] Projeto Supabase visível no conector e migration aplicada
- [ ] Projeto Vercel visível no conector e variáveis configuradas
- [ ] Worker publicado
- [ ] Primeiro lote piloto físico validado


## Site comercial 2026

A evolução do site está no branch `feat/pro-site-market-legal` e inclui:

- tema claro/escuro com preferência persistente;
- página `/solucoes` com ecossistema multiplataforma;
- `/legal`, `/termos`, `/privacidade`, `/cookies`;
- `/trocas-e-devolucoes`, `/acessibilidade`, `/faq`;
- identificação comercial parametrizada por variáveis;
- canal específico para privacidade/LGPD;
- pesquisa de mercado consolidada em `docs/MARKET_RESEARCH.md`.

Antes de habilitar checkout/venda direta, preencher razão social/nome empresarial,
documento, endereço, suporte, preço, frete, prazos e revisar os documentos com
assessoria jurídica/contábil adequada ao enquadramento da operação.
