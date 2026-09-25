# Nuli

Plataforma para placas físicas com QR Code + NFC e redirecionamento dinâmico.

O endereço gravado fisicamente no QR e no NFC nunca aponta direto para Google, WhatsApp, Instagram etc. Ele aponta para um endereço curto da Nuli. O destino pode ser alterado depois sem reimprimir a placa.

## Arquitetura

- Cloudflare Worker: recebe cada leitura e responde com redirecionamento HTTP.
- Cloudflare KV: guarda o mapa código público → destino para leitura rápida.
- Cloudflare Analytics Engine: métricas de acesso sem gravar cada clique no banco principal.
- Supabase: autenticação, clientes, organizações, lotes, placas, ativação e histórico.
- Vercel + Next.js: site, painel e APIs administrativas.
- GitHub: código e documentação.

Fluxo público:

    QR / NFC
       ↓
    https://go.DOMINIO/CODIGO
       ↓
    Cloudflare Worker
       ↓
    Cloudflare KV
       ↓
    HTTP 302
       ↓
    Destino configurado

O Supabase e a Vercel não participam de cada redirecionamento.

## Escala alvo

A arquitetura foi desenhada para 1.000, 5.000, 10.000, 15.000+ placas.

Cenário de referência:

    15.000 placas × 50 acessos/dia
    = 750.000 redirects/dia
    ≈ 22,5 milhões/mês

## Identidade de cada placa

Cada placa recebe dois valores diferentes:

- public_code: público, aleatório, impresso no QR e gravado no NFC.
- activation_secret: secreto, separado, usado para reivindicar a placa.

Nunca usar o mesmo valor como código público e senha.

Exemplo:

    public_code: 7KQ9X2M4PZ
    redirect_url: https://go.DOMINIO/7KQ9X2M4PZ
    activation_secret: Q7KM-9P2X-T4ZR-6W8N

QR e NFC da mesma placa recebem exatamente a mesma redirect_url.

## Domínios

Nenhum domínio definitivo deve ficar hardcoded. Estrutura planejada:

- DOMINIO → site público
- app.DOMINIO → painel na Vercel
- go.DOMINIO → Worker do Cloudflare

Antes de imprimir o primeiro lote físico, o domínio precisa estar comprado, configurado e testado.

## Documentação

- docs/ARCHITECTURE.md — arquitetura e decisões técnicas.
- docs/CLOUDFLARE.md — tudo que precisa ser feito manualmente no Cloudflare.
- docs/PRODUCTION.md — geração de lotes, QR/NFC e produção física.
- docs/SECURITY.md — ativação e segurança.
- supabase/migrations/0001_initial_schema.sql — modelo inicial do banco.

## Estado

- [x] Arquitetura definida
- [x] Modelo de ativação definido
- [x] Estratégia de escala definida
- [x] Procedimento Cloudflare documentado
- [ ] Domínio definitivo comprado
- [ ] Cloudflare configurado
- [ ] Migração aplicada no Supabase
- [ ] Vercel conectado e configurado
- [ ] Worker publicado
- [ ] Gerador de lote finalizado
- [ ] Fluxo de ativação implementado
- [ ] Primeiro lote piloto validado
