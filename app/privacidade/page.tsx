import { LegalPage } from "../../components/legal-page";
import { legalIdentity } from "../../lib/legal";

export const metadata = { title: "Privacidade" };

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="privacidade · LGPD"
      title="Aviso de privacidade."
      description="Como a Torvya pretende tratar dados pessoais no site, no painel e durante a ativação das placas."
    >
      <h2>Quem controla os dados</h2>
      <p>
        O controlador é {legalIdentity.legalName}. Para solicitações relacionadas a
        privacidade, use {legalIdentity.privacyEmail || "o canal de privacidade que será publicado antes do lançamento comercial"}.
      </p>

      <h2>Dados que podemos tratar</h2>
      <ul>
        <li>nome do negócio e dados da conta;</li>
        <li>nome, e-mail e telefone do responsável, quando fornecidos;</li>
        <li>informações necessárias à compra, entrega, suporte e faturamento;</li>
        <li>dados técnicos de segurança, sessão e autenticação;</li>
        <li>configuração e histórico das placas vinculadas à conta;</li>
        <li>métricas agregadas de acesso, evitando coleta excessiva sempre que possível.</li>
      </ul>

      <h2>Para que usamos</h2>
      <p>
        Para criar e proteger a conta, ativar e administrar placas, prestar suporte,
        cumprir obrigações legais e contratuais, prevenir fraude e melhorar o serviço.
        Quando uma finalidade depender de consentimento, ele deverá ser solicitado de
        forma específica e poderá ser revogado nos casos previstos em lei.
      </p>

      <h2>Compartilhamento</h2>
      <p>
        Podemos usar provedores de infraestrutura e operação, como hospedagem,
        autenticação, mensageria e pagamentos. Cada integração deve ser limitada ao que
        for necessário para executar o serviço. Não vendemos dados pessoais.
      </p>

      <h2>Retenção e segurança</h2>
      <p>
        Os dados serão mantidos pelo período necessário à finalidade informada,
        obrigações legais, exercício regular de direitos e prevenção a fraude. A Torvya
        adota controles técnicos e organizacionais compatíveis com os riscos do serviço,
        sem prometer segurança absoluta.
      </p>

      <h2>Seus direitos</h2>
      <p>
        Conforme aplicável, você pode solicitar confirmação de tratamento, acesso,
        correção, anonimização, bloqueio, eliminação, portabilidade, informações sobre
        compartilhamento e revogação de consentimento. A solicitação deve ser feita
        primeiro à Torvya pelos canais publicados nesta página.
      </p>

      <h2>Atualizações</h2>
      <p>
        Este aviso poderá ser atualizado conforme o produto evoluir. Mudanças relevantes
        serão comunicadas de maneira compatível com a relação mantida com o usuário.
      </p>

      <p className="legal-date">Versão inicial: setembro de 2026.</p>
    </LegalPage>
  );
}
