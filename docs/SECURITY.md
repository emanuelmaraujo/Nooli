# Segurança

## Código público não é senha

    public_code != activation_secret

O public_code fica visível no QR e no NFC.

## Ativação

Fluxo:

1. cliente cria/entra na conta;
2. informa public_code;
3. informa activation_secret;
4. backend valida o hash;
5. placa é vinculada à organização;
6. segredo é consumido;
7. mudanças futuras exigem login.

## Regras

- armazenar somente hash do activation_secret;
- nunca colocar segredo em URL;
- nunca enviar segredo ao KV;
- token do Cloudflare só no servidor;
- service role do Supabase só no servidor;
- aplicar rate limiting em ativação, login e troca de destino;
- validar URLs de destino e aceitar somente http/https.
