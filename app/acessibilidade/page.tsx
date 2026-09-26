import { LegalPage } from "../../components/legal-page";

export const metadata = { title: "Acessibilidade" };

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="acessibilidade"
      title="Uma experiência que precisa funcionar para mais pessoas."
      description="A Nooli adota acessibilidade como requisito de produto, não como acabamento."
    >
      <h2>Direção de desenvolvimento</h2>
      <ul>
        <li>navegação por teclado e foco visível;</li>
        <li>contraste adequado nos temas claro e escuro;</li>
        <li>estrutura semântica e rótulos para controles;</li>
        <li>respeito a preferências de redução de movimento;</li>
        <li>textos compreensíveis e interfaces responsivas;</li>
        <li>testes contínuos com boas práticas internacionais, incluindo WCAG.</li>
      </ul>

      <h2>Limitações</h2>
      <p>
        O produto está em desenvolvimento. Se encontrar uma barreira, use o suporte para
        descrevê-la. A correção de problemas de acessibilidade deve ser tratada como
        prioridade de produto.
      </p>
    </LegalPage>
  );
}
