# Produção física

## Placa

Especificação atual:

- acrílico 12 × 12 cm;
- 2 mm;
- impressão variável com QR;
- NFC NTAG213 aplicado depois;
- dupla-face/EVA aplicado depois do NFC.

Montagem:

    acrílico
      ↓
    NTAG213
      ↓
    EVA / dupla-face
      ↓
    liner

## Regra principal

O QR e o NFC da mesma placa usam exatamente a mesma URL:

    https://go.DOMINIO/PUBLIC_CODE

## Ordem

1. comprar o domínio;
2. configurar Cloudflare;
3. gerar 20 peças piloto;
4. testar QR + NFC;
5. aprovar;
6. gerar lote de 1.000+;
7. enviar QR para a gráfica;
8. receber as placas;
9. aplicar os NFCs na mesma sequência;
10. testar;
11. aplicar dupla-face;
12. embalar.

## Correspondência

Não usar UID do chip como identificador comercial.

Use o public_code:

    placa 000001 ↔ public_code A...
    placa 000002 ↔ public_code B...

## Segurança de produção

Não bloquear NFC como read-only antes de passar no QA.

Depois de validado, o NFC pode ser bloqueado como somente leitura porque o destino muda no servidor, não no chip.
