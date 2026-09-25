# Arquitetura Nooli

## Objetivo

A Nooli usa uma URL própria e permanente no QR Code e no NFC. O destino final pode ser trocado sem reimprimir a placa.

## Hot path

    QR/NFC
      ↓
    go.DOMINIO/CODIGO
      ↓
    Cloudflare Worker
      ↓
    Cloudflare KV
      ↓
    302 → destino

Vercel e Supabase ficam fora do redirecionamento normal.

## Componentes

- Cloudflare Worker: redirect público.
- Cloudflare KV: código → destino.
- Cloudflare Analytics Engine: métricas.
- Supabase: usuários, organizações, placas, lotes, ativação e histórico.
- Vercel: site, painel e APIs administrativas.

## Escala

Cenário de referência:

    15.000 placas × 50 acessos/dia = 750.000/dia
    ≈ 22,5 milhões/mês

## Identidade

Cada placa tem:

- public_code: público e aleatório, 10 caracteres.
- activation_secret: segredo separado, nunca igual ao código público.

O segredo de ativação é usado uma vez para vincular a placa a uma conta e depois deixa de ser necessário.

## Estados

- manufactured
- available
- activated
- suspended
- retired

## Sincronização

Ao alterar o destino:

    painel → API → Supabase → Cloudflare KV

O Supabase é a fonte de verdade; o KV é a camada de leitura rápida.
