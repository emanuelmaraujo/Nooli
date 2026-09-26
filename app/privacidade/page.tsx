import { LegalPage } from "../../components/legal-page";
import { legalIdentity } from "../../lib/legal";

export const metadata = { title: "Privacidade e LGPD" };

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="privacidade · LGPD"
      title="Privacidade sem letras miúdas."
      description="Como a Torvya trata dados pessoais no site, painel, suporte e ativação das placas."
    >
      <h2>Quem controla os dados</h2>
      <p>O controlador é {legalIdentity.legalName}. Solicitações sobre privacidade podem ser feitas por {legalIdentity.privacyEmail || "nosso canal de privacidade, que será publicado antes do lançamento comercial"}.</p>

      <h2>Dados que podemos tratar</h2>
      <ul>
        <li>e-mail e dados da conta;</li>
        <li>informações necessárias a compra, entrega, suporte e faturamento, quando aplicáveis;</li>
        <li>configuração das placas, códigos de mídia, destino e histórico operacional;</li>
        <li>dados técnicos necessários a segurança, sessão, autenticação e prevenção de abuso;</li>
        <li>métricas operacionais e agregadas, com minimização sempre que possível.</li>
      </ul>

      <h2>Finalidades</h2>
      <p>Usamos os dados para autenticar o responsável, conectar QR e NFC, ativar e administrar placas, prestar suporte, manter segurança, cumprir obrigações legais e melhorar o serviço.</p>

      <h2>Compartilhamento e operadores</h2>
      <p>Podemos utilizar fornecedores de infraestrutura, autenticação, hospedagem, mensageria, analytics estritamente necessário e pagamentos. O acesso deve ser limitado ao necessário para prestar cada serviço. A Torvya não vende dados pessoais.</p>

      <h2>Transferências internacionais</h2>
      <p>Alguns provedores de infraestrutura podem processar dados fora do Brasil. Quando isso ocorrer, a Torvya deve adotar mecanismos compatíveis com a LGPD e com as regras aplicáveis da ANPD.</p>

      <h2>Retenção e segurança</h2>
      <p>Os dados são mantidos pelo tempo necessário às finalidades, obrigações legais, exercício regular de direitos e prevenção de fraude. Adotamos medidas técnicas e organizacionais proporcionais aos riscos, sem prometer segurança absoluta.</p>

      <h2>Seus direitos</h2>
      <p>Nos termos aplicáveis da LGPD, o titular pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio, eliminação, portabilidade, informações sobre compartilhamento e revisão ou revogação quando cabível.</p>

      <p className="legal-date">Última atualização: setembro de 2026.</p>
    </LegalPage>
  );
}
