import { LegalPage } from "../../components/legal-page";

export const metadata = { title: "Termos de uso" };

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="termos de uso"
      title="Regras para usar a Torvya."
      description="Condições do serviço digital, painel e produtos físicos conectados."
    >
      <h2>1. O serviço</h2>
      <p>A Torvya fornece produtos físicos com QR Code e/ou NFC conectados a uma infraestrutura de redirecionamento e gestão. O produto inicial, Torvya Review, facilita o acesso a uma URL de avaliação do Google configurada pelo cliente.</p>

      <h2>2. Ativação e pareamento</h2>
      <p>QR e NFC podem possuir identificadores próprios. No primeiro uso, o responsável conecta os dois meios, informa o destino e confirma a configuração pelo e-mail informado.</p>

      <h2>3. Uso permitido</h2>
      <p>Não é permitido usar a Torvya para fraude, phishing, malware, conteúdo ilegal, violação de direitos ou qualquer finalidade que exponha usuários a risco. Destinos podem ser suspensos em caso de indícios razoáveis de abuso, risco de segurança ou obrigação legal.</p>

      <h2>4. Plataformas de terceiros</h2>
      <p>Google, WhatsApp, Instagram e outros serviços são independentes da Torvya. Disponibilidade, políticas e funcionamento desses serviços são definidos pelos respectivos titulares.</p>

      <h2>5. Avaliações</h2>
      <p>A Torvya facilita o acesso ao local de avaliação; não cria avaliações, não compra opiniões e não deve ser usada para selecionar apenas clientes satisfeitos ou manipular notas. O estabelecimento é responsável por observar as regras da plataforma utilizada.</p>

      <h2>6. Disponibilidade</h2>
      <p>O serviço pode evoluir, receber correções e alterações técnicas. A arquitetura busca preservar as URLs físicas e a continuidade das placas sempre que tecnicamente possível.</p>

      <h2>7. Direitos do consumidor</h2>
      <p>Quando houver relação de consumo, estes termos não excluem direitos obrigatórios previstos na legislação brasileira.</p>

      <p className="legal-date">Última atualização: setembro de 2026.</p>
    </LegalPage>
  );
}
