# Torvya

Plataforma para conectar experiências físicas ao digital usando QR Code + NFC e redirecionamento dinâmico.

O primeiro produto, **Torvya Review**, reduz o atrito entre o cliente e a avaliação de uma empresa no Google.

## Produto atual

### Torvya Review

Fluxo do cliente:

    QR ou NFC
        ↓
    go.DOMINIO
        ↓
    Cloudflare Worker
        ↓
    placa não ativada → primeiro acesso Torvya
    placa ativada     → Google direto

No primeiro acesso o responsável informa somente:

- e-mail;
- link de avaliação do Google ou Place ID.

A confirmação ocorre por magic link.

## QR + NFC com links distintos

A produção usa endpoints independentes:

    QR  → https://go.DOMINIO/q/CODIGO_QR
    NFC → https://go.DOMINIO/n/CODIGO_NFC

O pareamento é feito lendo um item e depois o outro.

Isso permite tratar tags NFC como um estoque independente, sem precisar manter a mesma sequência física das placas.

Veja:

- `docs/ONBOARDING.md`
- `docs/PRODUCTION.md`

## Arquitetura

- **Cloudflare Worker** — redirect rápido;
- **Cloudflare KV** — mapa endpoint → estado/destino;
- **Cloudflare Analytics Engine** — métricas de redirect;
- **Supabase** — Auth, organizações, placas, endpoints, claims e histórico;
- **Vercel + Next.js** — site, primeiro acesso, painel e rotas administrativas;
- **GitHub** — código, CI e documentação.

## Site

Páginas públicas principais:

- `/` — apresentação;
- `/como-funciona` — fluxo completo;
- `/solucoes` — produtos e evolução da plataforma;
- `/faq`;
- `/support`;
- `/legal`;
- `/termos`;
- `/privacidade`;
- `/cookies`;
- `/trocas-e-devolucoes`;
- `/acessibilidade`.

## Geração de lote

    npm run generate:batch -- --count=1000 --batch=lote-001 --product=google_review --base=https://go.DOMINIO

O gerador cria arquivos separados para a gráfica e para o estoque NFC.

Depois que o lote e suas placas existirem no Supabase, registre os códigos físicos:

    npm run register:endpoints -- --batch=lote-001

O comando valida o lote, evita sobrescrever códigos conflitantes e cadastra QR e NFC em `plate_endpoints`.

## Banco

Migrations:

- `0001_initial_schema.sql` — base;
- `0002_torvya_endpoint_pairing.sql` — QR/NFC independentes e pareamento.

## Identidade

A marca pública é **Torvya**.

Os identificadores técnicos legados, como o `product_type` `nooli_page`, podem permanecer temporariamente para evitar migrações destrutivas sem benefício funcional.

## Antes da venda pública

Preencher as variáveis de identificação empresarial, suporte e privacidade, revisar os textos legais conforme o enquadramento real da operação e validar o primeiro lote físico completo.
