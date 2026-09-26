import { LegalPage } from "../../components/legal-page";

export const metadata = { title: "Cookies e tecnologias" };

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="cookies e tecnologias"
      title="Só o que tiver uma finalidade."
      description="Como a Torvya usa armazenamento local, sessão e eventuais tecnologias de medição."
    >
      <h2>Essenciais</h2>
      <p>Podemos usar cookies ou mecanismos equivalentes necessários para autenticação, segurança, pareamento temporário de QR e NFC, balanceamento e funcionamento do painel.</p>

      <h2>Preferências</h2>
      <p>O tema claro ou escuro pode ser salvo localmente no navegador. Essa escolha não precisa identificar o usuário.</p>

      <h2>Métricas opcionais</h2>
      <p>Se ferramentas opcionais de analytics, publicidade ou remarketing forem adicionadas, a Torvya deverá avaliar a base legal e oferecer controles adequados antes da ativação dessas tecnologias.</p>

      <h2>Terceiros</h2>
      <p>Ao seguir um link para uma plataforma externa, o usuário passa a estar sujeito também às políticas e tecnologias daquele fornecedor.</p>
    </LegalPage>
  );
}
