# Produtos Nooli

A infraestrutura física é compartilhada, mas cada tipo de placa possui um fluxo de ativação próprio.

## 1. Nooli Review — ativo agora

`product_type = google_review`

Produto atual: placa física focada exclusivamente em avaliações do Google.

Primeiro acesso:

    QR/NFC
      ↓
    go.DOMINIO/CODIGO
      ↓
    Worker identifica placa não ativada
      ↓
    app.DOMINIO/activate/google/CODIGO
      ↓
    link/Place ID do Google + negócio + e-mail
      ↓
    confirmação por magic link
      ↓
    próximos acessos → Google direto

O cliente não escolhe WhatsApp, Instagram ou URL genérica nessa tela.

## 2. Nooli Link — futuro

`product_type = direct_link`

Placa personalizada com um destino direto escolhível.

Possíveis destinos:

- WhatsApp;
- Instagram;
- cardápio;
- site;
- pagamento;
- outra URL.

Terá um fluxo próprio em `/activate/link/[code]`.

## 3. Nooli Page — futuro

`product_type = nooli_page`

Uma página pública hospedada pela Nooli, mais moderna que uma simples lista de links.

Ideias:

- hero da marca;
- foto/logo;
- botões e cards;
- WhatsApp;
- Instagram;
- localização;
- Google Reviews;
- cardápio/catálogo;
- horários;
- promoções;
- CTA principal;
- analytics;
- temas e motion;
- blocos reorganizáveis.

URL futura:

    nooli.com/p/slug-do-negocio

A placa continua apontando para `go.DOMINIO/CODIGO`; o destino do redirect pode ser a Nooli Page.

## Regra arquitetural

O produto é definido no lote e copiado para cada placa em `product_type`.

Isso permite gerar lotes diferentes sem alterar QR, NFC, Worker ou código físico.
