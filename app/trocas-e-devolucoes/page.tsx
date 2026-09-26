import { LegalPage } from "../../components/legal-page";
import { legalIdentity } from "../../lib/legal";

export const metadata = { title: "Trocas e devoluções" };

export default function ReturnsPage() {
  return (
    <LegalPage
      eyebrow="consumidor"
      title="Trocas, devoluções e arrependimento."
      description="Um caminho claro para solicitar atendimento antes e depois da compra."
    >
      <h2>Compras fora do estabelecimento</h2>
      <p>Nas hipóteses em que o direito de arrependimento previsto no Código de Defesa do Consumidor for aplicável, o consumidor poderá exercê-lo dentro do prazo legal.</p>

      <h2>Produto com vício</h2>
      <p>A garantia legal segue os prazos e condições previstos na legislação brasileira, inclusive as regras aplicáveis a vícios aparentes, de fácil constatação e ocultos.</p>

      <h2>Produto personalizado</h2>
      <p>Personalização e produção sob encomenda podem exigir análise do caso concreto, mas a Torvya não usa esta condição para excluir automaticamente direitos obrigatórios do consumidor.</p>

      <h2>Como pedir atendimento</h2>
      <p>Entre em contato pelo e-mail {legalIdentity.supportEmail || "de suporte que será publicado antes do início das vendas"}. Informe o número do pedido e descreva a solicitação.</p>

      <h2>Reembolsos</h2>
      <p>Quando devido, o reembolso seguirá o meio de pagamento e as regras legais aplicáveis, com confirmação da solicitação ao consumidor.</p>
    </LegalPage>
  );
}
