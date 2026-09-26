import { LegalPage } from "../../components/legal-page";

export const metadata = { title: "Perguntas frequentes" };

export default function FaqPage() {
  return (
    <LegalPage
      eyebrow="faq"
      title="Perguntas frequentes."
      description="Respostas objetivas sobre QR Code, NFC, Google Avaliações, pareamento e uso da Torvya."
    >
      <h2>Precisa instalar aplicativo?</h2>
      <p>Não. O fluxo acontece no navegador do celular após a leitura do QR Code ou aproximação NFC em aparelho compatível.</p>

      <h2>QR e NFC usam o mesmo link?</h2>
      <p>Não. Cada meio recebe uma URL Torvya própria. No primeiro acesso, o cliente usa um deles e depois lê o outro para vincular ambos à mesma placa e ao mesmo destino.</p>

      <h2>Por que usar links diferentes?</h2>
      <p>Isso simplifica a produção, permite identificar o meio utilizado e evita depender de uma associação prévia entre QR e NFC na fábrica.</p>

      <h2>O que preciso informar na primeira configuração?</h2>
      <p>Somente o e-mail responsável e o link de avaliação do Google. Depois, a Torvya pede o segundo meio da placa e envia a confirmação por e-mail.</p>

      <h2>Se o link do Google mudar, preciso trocar a placa?</h2>
      <p>Não. O objetivo da Torvya é manter as URLs físicas estáveis e permitir a atualização do destino digital.</p>

      <h2>A Torvya garante avaliações positivas?</h2>
      <p>Não. A Torvya reduz o atrito para acessar a avaliação. Nota e conteúdo continuam sendo escolhas livres do usuário.</p>

      <h2>Posso oferecer prêmio por avaliação positiva?</h2>
      <p>O estabelecimento deve observar as regras da plataforma utilizada. A Torvya não foi desenhada para comprar, fabricar ou filtrar avaliações positivas.</p>

      <h2>A placa funciona em metal?</h2>
      <p>O desempenho NFC depende da tag e da superfície. Aplicações sobre metal podem exigir tag anti-metal ou camada apropriada.</p>
    </LegalPage>
  );
}
