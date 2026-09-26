import { LegalPage } from "../../components/legal-page";

export const metadata = { title: "Acessibilidade" };

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="acessibilidade"
      title="Acesso precisa funcionar para mais pessoas."
      description="A Torvya trata acessibilidade como requisito de produto."
    >
      <h2>Diretrizes de desenvolvimento</h2>
      <ul>
        <li>estrutura semântica, rótulos e hierarquia compreensível;</li>
        <li>navegação por teclado e foco visível;</li>
        <li>contraste adequado nos temas claro e escuro;</li>
        <li>respeito à preferência de redução de movimento;</li>
        <li>campos com instruções e mensagens de erro identificáveis;</li>
        <li>layout responsivo e compatível com tecnologias assistivas;</li>
        <li>evolução contínua com referência às WCAG.</li>
      </ul>

      <h2>Encontrou uma barreira?</h2>
      <p>Use o suporte para descrever o problema, o dispositivo e a tecnologia assistiva utilizada, quando aplicável. Problemas de acessibilidade devem ser tratados como defeitos de experiência.</p>
    </LegalPage>
  );
}
