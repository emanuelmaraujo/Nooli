import { LegalPage } from "../../components/legal-page";

export const metadata = { title: "Cookies" };

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="cookies e tecnologias"
      title="Pouco rastreamento. Finalidade clara."
      description="A Torvya pretende usar apenas o necessário para funcionamento, segurança e métricas compatíveis com a experiência."
    >
      <h2>Essenciais</h2>
      <p>
        Podem ser usados para sessão autenticada, proteção contra abuso, balanceamento,
        preferências essenciais e recursos necessários ao funcionamento do painel.
      </p>

      <h2>Preferências</h2>
      <p>
        O tema claro ou escuro pode ser salvo localmente no navegador para respeitar sua
        escolha. Essa preferência não precisa identificar você.
      </p>

      <h2>Métricas</h2>
      <p>
        Caso métricas opcionais sejam habilitadas no site comercial, a Torvya deverá
        avaliar a base legal aplicável e disponibilizar controles de consentimento quando
        necessários. Métricas operacionais de segurança e disponibilidade podem ter
        fundamento diferente.
      </p>

      <h2>Terceiros</h2>
      <p>
        Links para plataformas externas levam você aos ambientes desses fornecedores, que
        possuem suas próprias políticas e tecnologias de rastreamento.
      </p>
    </LegalPage>
  );
}
