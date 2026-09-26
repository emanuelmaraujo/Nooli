# Primeiro acesso e ativação — Torvya

## Torvya Review

O produto inicial é focado em avaliações do Google.

A experiência foi desenhada para ter o mínimo de campos possível no primeiro acesso.

## Fluxo físico QR + NFC

QR Code e NFC possuem códigos e URLs diferentes:

    QR  → https://go.DOMINIO/q/CODIGO_QR
    NFC → https://go.DOMINIO/n/CODIGO_NFC

Eles não precisam ser separados previamente em pares durante a produção.

### Pareamento

1. leia o QR ou a tag NFC;
2. a Torvya guarda o primeiro item por até 15 minutos;
3. leia o item do outro tipo;
4. o backend valida se ambos pertencem ao estoque Torvya;
5. o NFC é associado à placa correspondente ao QR;
6. os dois endpoints passam a representar a mesma placa.

Não dependemos da Web NFC API. Cada leitura simplesmente abre uma URL Torvya no navegador.

## Ativação do cliente

Depois do pareamento:

1. QR ou NFC abre o domínio de redirect;
2. o Worker identifica a placa ainda não ativada;
3. encaminha para `/activate/google/CODIGO_CANONICO`;
4. o responsável informa somente:
   - e-mail;
   - link direto para avaliação no Google ou Place ID;
5. a Torvya envia um magic link;
6. o responsável confirma o e-mail;
7. a placa passa para `activated`;
8. os dois endpoints são sincronizados no Cloudflare KV;
9. próximos acessos vão diretamente ao destino configurado.

## Sem senha

O primeiro acesso usa confirmação por e-mail.

Controles atuais:

- claim expira em 30 minutos;
- um claim aberto por placa;
- pareamento físico expira em 15 minutos;
- QR e NFC são validados contra o estoque cadastrado;
- uma tag NFC não pode ser vinculada a duas placas;
- o código público não funciona como senha.

## Recuperação

Erros de pareamento levam para uma tela explícita de recuperação e para o suporte.

A URL pública física continua desacoplada do destino final. O destino pode ser alterado no servidor sem regravar o QR ou a tag NFC.
