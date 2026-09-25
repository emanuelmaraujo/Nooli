# Primeiro acesso e ativação

## Decisão do MVP

A Nooli não exige uma senha impressa na placa.

No primeiro acesso de uma placa ainda não ativada:

1. QR/NFC abre `go.DOMINIO/CODIGO`.
2. O Worker vê que a placa está `unclaimed`.
3. Redireciona para `app.DOMINIO/activate/CODIGO`.
4. O dono escolhe o destino e informa o nome do negócio + e-mail.
5. A Nooli envia um magic link para esse e-mail.
6. Ao abrir o link, a placa é vinculada à conta.
7. A partir daí, os próximos QR/NFC vão direto ao destino.

Isso evita senha para memorizar e mantém um passo de verificação de contato.

## Risco conhecido

Sem um código secreto físico, a primeira pessoa que tiver acesso à placa pode tentar iniciar o cadastro.

Mitigações do MVP:

- confirmação obrigatória por e-mail;
- claim expira em 30 minutos;
- apenas um claim aberto por placa;
- suporte/admin pode recuperar uma placa;
- recomenda-se manter a placa embalada até a instalação.

Para lotes maiores ou canais de revenda, existe uma evolução sem exigir digitação de senha: um QR de ativação de uso único dentro da embalagem.

## Contato com a Nooli

O produto físico deve acompanhar um cartão/panfleto pequeno com:

- logo Nooli;
- texto "Precisa configurar ou trocar o destino?";
- QR para o site/suporte;
- WhatsApp;
- e-mail;
- endereço `app.DOMINIO`.

Além disso, o site mantém um botão de suporte persistente e uma página `/support`.
