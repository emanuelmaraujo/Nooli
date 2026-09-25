# Configuração do Cloudflare

Faça estes passos somente depois de comprar o domínio definitivo.

## 1. Adicionar o domínio

1. Adicione o domínio no Cloudflare.
2. Troque os nameservers no registrador.
3. Aguarde a zona ficar Active.

## 2. Subdomínios

Padrão:

- DOMINIO → site público
- app.DOMINIO → painel na Vercel
- go.DOMINIO → Worker de redirecionamento

## 3. Worker

Crie um Worker chamado:

    nuli-redirect-prod

Ele deve:

- aceitar GET e HEAD;
- validar o código;
- consultar o KV;
- retornar 302;
- não chamar Supabase no hot path;
- registrar analytics assíncrono;
- tratar código inexistente, placa suspensa e placa ainda não ativada.

## 4. KV

Crie:

    nuli-redirects-prod

Binding no Worker:

    REDIRECTS

Chave:

    r:PUBLIC_CODE

Valor sugerido:

    {"url":"https://destino.com","enabled":true,"v":1}

## 5. Analytics Engine

Binding:

    ANALYTICS

Registrar somente:

- public_code;
- timestamp;
- país;
- status;
- tipo de dispositivo quando disponível.

Não registrar activation_secret, e-mail ou outro dado pessoal.

## 6. Rota

Associe:

    go.DOMINIO/*

Teste com:

    curl -I https://go.DOMINIO/TESTE

## 7. Token Cloudflare para a Vercel

Crie um API Token exclusivo e com privilégio mínimo para o KV do projeto.

Variáveis na Vercel:

    CLOUDFLARE_ACCOUNT_ID
    CLOUDFLARE_KV_NAMESPACE_ID
    CLOUDFLARE_API_TOKEN

Nunca usar NEXT_PUBLIC_ nesses segredos.

## 8. Ambientes

Separe Production e Preview/Staging. Nunca use o KV de produção em Preview.

## 9. Checklist antes de imprimir

- [ ] domínio comprado
- [ ] zona Active
- [ ] go.DOMINIO funcionando
- [ ] Worker publicado
- [ ] KV criado
- [ ] 20 códigos piloto carregados
- [ ] QR testado em Android e iPhone
- [ ] NFC testado no produto montado
- [ ] alteração de destino testada
- [ ] tratamento de código inexistente testado
- [ ] só então gerar o lote de 1.000+
