# Produção física — Torvya

## Placa

Especificação de referência:

- acrílico 12 × 12 cm;
- 2 mm;
- impressão variável com QR Code;
- tag NFC NTAG213 aplicada depois;
- dupla-face/EVA aplicada depois da tag.

Montagem:

    acrílico
      ↓
    tag NFC
      ↓
    EVA / dupla-face
      ↓
    liner

## QR e NFC são independentes

Cada tecnologia possui seu próprio código público e sua própria URL:

    QR  → https://go.DOMINIO/q/CODIGO_QR
    NFC → https://go.DOMINIO/n/CODIGO_NFC

Não existe mais obrigação operacional de manter a tag NFC número 001 junto da placa número 001.

A correspondência final é criada por leitura física na Torvya.

## Geração

Exemplo:

    npm run generate:batch -- --count=1000 --batch=lote-001 --product=google_review --base=https://go.DOMINIO

Saída:

    exports/lote-001/
    ├── factory.csv
    ├── inventory.csv
    ├── nfc-inventory.csv
    └── qr/
        └── ...

### factory.csv

Usado pela gráfica para impressão variável dos QR Codes.

### nfc-inventory.csv

Usado para gravação das tags NFC. Cada tag recebe um endereço `/n/CODIGO`.

### inventory.csv

Inventário de produção. A coluna de correspondência é apenas auxiliar; o vínculo real deve ser confirmado pelo fluxo de pareamento.

## Ordem recomendada

1. configurar domínio definitivo;
2. publicar Worker;
3. aplicar migrations;
4. gerar lote piloto;
5. importar/registrar endpoints QR e NFC;
6. enviar QR para impressão;
7. gravar tags NFC;
8. montar uma placa;
9. ler QR ou NFC;
10. ler o outro;
11. confirmar pareamento;
12. testar ativação;
13. testar os dois acessos após ativação;
14. só então escalar o lote.

## Segurança de produção

- não usar UID do chip NFC como identificador comercial;
- não colocar segredo no QR Code;
- não tratar código público como senha;
- validar códigos de estoque no backend;
- não bloquear a tag como somente leitura antes do QA;
- após o QA, a tag pode ser bloqueada porque o destino muda no servidor e não no chip.
