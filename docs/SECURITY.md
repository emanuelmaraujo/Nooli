# Segurança

## Primeiro lote sem senha física

O MVP da Nooli Review não usa uma senha impressa ou digitada pelo cliente.

A proteção do primeiro acesso é feita por confirmação de e-mail:

1. a pessoa escaneia ou aproxima a placa;
2. informa o link de avaliação do Google;
3. informa o nome do negócio e o e-mail responsável;
4. a Nooli envia um magic link;
5. a configuração só é concluída depois da confirmação.

## Risco conhecido

O código público do QR/NFC pode ser lido por qualquer pessoa. Portanto ele nunca deve funcionar como credencial secreta.

Sem um segredo físico, alguém com acesso antecipado à placa pode tentar iniciar um claim.

Mitigações atuais:

- confirmação obrigatória por e-mail;
- claim temporário;
- somente um claim aberto por placa;
- placa deve ficar embalada até a entrega;
- suporte/admin terá processo de recuperação.

Evolução futura para revenda em escala:

- QR ou código de ativação de uso único dentro da embalagem;
- sem necessidade de senha memorável;
- o código público da placa continua separado da credencial de ativação.

## Regras

- nunca usar public_code como senha;
- token do Cloudflare somente no servidor;
- service role do Supabase somente no servidor;
- aplicar rate limiting em ativação, login e alteração de destino;
- validar o destino conforme o tipo de produto;
- Nooli Review aceita somente destinos Google compatíveis;
- não gravar dados pessoais no Cloudflare Analytics Engine;
- manter trilha de alteração de destino.
