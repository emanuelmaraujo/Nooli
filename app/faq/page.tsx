import { LegalPage } from "../../components/legal-page";

export const metadata = { title: "Perguntas frequentes" };

export default function FaqPage() {
  return (
    <LegalPage
      eyebrow="faq"
      title="Perguntas frequentes."
      description="Respostas objetivas sobre NFC, QR Code, Google Avaliações, ativação e expansão da Torvya."
    >
      <h2>Precisa instalar aplicativo?</h2>
      <p>Não. O acesso acontece pelo navegador após a leitura do QR Code ou aproximação NFC em aparelho compatível.</p>

      <h2>QR e NFC levam para o mesmo lugar?</h2>
      <p>Sim. Na mesma placa, os dois usam a mesma URL pública da Torvya e seguem a mesma configuração.</p>

      <h2>Se o link do Google mudar, preciso trocar a placa?</h2>
      <p>Não. A proposta da Torvya é manter a URL física estável e permitir a atualização do destino pelo painel.</p>

      <h2>A Torvya garante avaliações 5 estrelas?</h2>
      <p>Não. A Torvya apenas reduz o atrito para o cliente acessar a tela de avaliação. O conteúdo e a nota são escolhidos livremente pelo usuário.</p>

      <h2>Posso oferecer prêmio por avaliação positiva?</h2>
      <p>O estabelecimento deve observar as regras da plataforma utilizada. A Torvya não foi desenhada para comprar, fabricar ou filtrar avaliações positivas.</p>

      <h2>Vai funcionar só com Google?</h2>
      <p>O primeiro produto comercial é o Torvya Review. A arquitetura já prevê Torvya Link e Torvya Page para outros destinos e experiências.</p>

      <h2>A placa funciona em metal?</h2>
      <p>O desempenho NFC depende do tipo de tag e da superfície. Instalações em metal exigem validação e, em alguns casos, solução anti-metal/ferrite.</p>
    </LegalPage>
  );
}
