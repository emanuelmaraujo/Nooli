# Arquitetura Nooli

## Objetivo

A Nooli usa uma URL própria e permanente no QR Code e no NFC. O comportamento da placa é definido pelo seu tipo de produto.

## Hot path

    QR/NFC
      ↓
    go.DOMINIO/CODIGO
      ↓
    Cloudflare Worker
      ↓
    Cloudflare KV
      ↓
    ativa? → 302 para o destino
    nova?  → fluxo de ativação do produto

Vercel e Supabase ficam fora do redirecionamento normal.

## Tipos de produto

A arquitetura não trata toda placa como igual.

Cada lote e cada placa possuem `product_type`.

Inicialmente:

- `google_review` → Nooli Review, ativo;
- `direct_link` → Nooli Link, futuro;
- `nooli_page` → Nooli Page, futuro.

Assim, uma placa Google abre uma configuração específica do Google. Uma placa personalizada futura poderá abrir outro onboarding sem alterar a infraestrutura física.

Detalhes: `docs/PRODUCTS.md`.

## Componentes

- Cloudflare Worker: redirect público;
- Cloudflare KV: código → estado/destino;
- Cloudflare Analytics Engine: métricas;
- Supabase: usuários, organizações, produtos, placas, lotes, ativação e histórico;
- Vercel: site, painel, onboarding e APIs administrativas.

## Escala

Cenário de referência:

    15.000 placas × 50 acessos/dia = 750.000/dia
    ≈ 22,5 milhões/mês

## Identidade

Cada placa possui um `public_code` aleatório de 10 caracteres.

Exemplo:

    7KQ9X2M4PZ

Ele é público e aparece na URL física.

No MVP Nooli Review, a propriedade é confirmada por e-mail no primeiro uso, e não por uma senha impressa.

## Estados

- manufactured
- available
- claiming
- activated
- suspended
- retired

## Sincronização

Ao ativar ou alterar o destino:

    painel/API
       ↓
    Supabase
       ↓
    Cloudflare KV

O Supabase é a fonte de verdade. O KV é a camada operacional do redirect.
