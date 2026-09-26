# Primeiro acesso e ativação

## Nooli Review — produto inicial

Por enquanto a Nooli será vendida somente como placa de avaliações do Google.

Não existe escolha de WhatsApp, Instagram ou link genérico na ativação desse produto.

Fluxo:

1. QR/NFC abre `go.DOMINIO/CODIGO`;
2. o Worker identifica que a placa ainda não foi ativada;
3. encaminha para `app.DOMINIO/activate/google/CODIGO`;
4. o dono cola o link de avaliação do Google ou informa um Place ID;
5. informa nome do negócio e e-mail;
6. a Nooli envia um magic link;
7. o dono confirma o e-mail;
8. a placa passa para `activated`;
9. próximos acessos vão direto ao Google.

## Sem senha no primeiro lote

A Nooli Review não exige uma senha física.

Isso reduz atrito, mas cria um risco: alguém com acesso à placa antes do comprador pode iniciar uma configuração.

Mitigações:

- e-mail obrigatório;
- claim expira;
- um claim aberto por placa;
- recuperação administrativa;
- manter a placa embalada até a instalação.

Para canais de revenda, a evolução recomendada é um QR/código de ativação de uso único dentro da embalagem, sem transformar o QR público em senha.

## Mais de uma tela de ativação

O roteamento é definido por `product_type`.

Exemplo:

    google_review → /activate/google/CODIGO
    direct_link   → /activate/link/CODIGO
    nooli_page    → /activate/page/CODIGO

Isso permite criar produtos diferentes no futuro sem misturar as experiências.

## Contato com a Nooli

Cada produto físico deve acompanhar um cartão simples com:

- marca Nooli;
- instrução de primeiro uso;
- QR de suporte;
- WhatsApp;
- e-mail;
- endereço do painel.

O site também mantém `/support` e botão persistente de contato.
