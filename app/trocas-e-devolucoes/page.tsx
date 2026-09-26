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
      <p>
        Nas hipóteses em que o direito de arrependimento do Código de Defesa do Consumidor
        for aplicável, o consumidor poderá exercê-lo no prazo legal de 7 dias, contado
        conforme a legislação. O canal eletrônico usado para a compra não será o único
        meio disponível para solicitar atendimento.
      </p>

      <h2>Produto com vício</h2>
      <p>
        A garantia legal segue os prazos e condições do Código de Defesa do Consumidor.
        Para produtos duráveis, o CDC prevê prazo de 90 dias para reclamar de vícios
        aparentes ou de fácil constatação, sem prejuízo das regras específicas para vício
        oculto.
      </p>

      <h2>Produto personalizado</h2>
      <p>
        Personalização, produção sob encomenda e início de execução podem alterar a
        análise jurídica de um caso concreto. A Torvya não utilizará esta página para
        excluir automaticamente direitos obrigatórios do consumidor.
      </p>

      <h2>Como pedir atendimento</h2>
      <p>
        Entre em contato pelo e-mail {legalIdentity.supportEmail || "de suporte que será publicado antes do início das vendas"}.
        Informe o número do pedido, descrição do problema e, se necessário, fotos ou
        outras evidências que ajudem na análise.
      </p>

      <h2>Reembolsos</h2>
      <p>
        Quando o reembolso for devido, o procedimento considerará o meio de pagamento e
        as regras legais aplicáveis. A confirmação da solicitação deverá ser enviada ao
        consumidor.
      </p>
    </LegalPage>
  );
}
