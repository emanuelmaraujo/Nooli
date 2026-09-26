import { Logo } from "../../components/logo";
import { LoginForm } from "../../components/login-form";

export const metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <main className="auth-shell">
      <div className="auth-container">
        <Logo />
        <section className="auth-card glass">
          <div className="eyebrow">painel torvya</div>
          <h1>Entre sem senha.</h1>
          <p>Informe seu e-mail e a Torvya envia um link seguro para você acessar suas placas.</p>
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
