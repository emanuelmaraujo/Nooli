import { LegalPage } from "../../components/legal-page";

export const metadata = { title: "Termos de uso" };

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="termos de uso"
      title="Regras para usar a Nooli."
      description="Termos iniciais do serviço digital, do painel e das placas inteligentes."
    >
      <h2>1. O serviço</h2>
      <p>
        A Nooli fornece produtos físicos com QR Code e/ou NFC associados a uma
        infraestrutura de redirecionamento e gestão. O produto inicial, Nooli Review,
        direciona para uma URL de avaliação do Google configurada pelo cliente.
      </p>

      <h2>2. Conta e ativação</h2>
      <p>
        O responsável deve fornecer informações verdadeiras, manter controle do e-mail
        usado na ativação e proteger o acesso à conta. A configuração de uma placa pode
        exigir confirmação por e-mail ou outro mecanismo antifraude.
      </p>

      <h2>3. Destinos permitidos</h2>
      <p>
        Não é permitido usar a Nooli para fraude, phishing, malware, conteúdo ilegal,
        violação de direitos de terceiros ou qualquer finalidade que exponha usuários a
        risco. A Nooli pode suspender um destino quando houver indícios razoáveis de
        abuso, obrigação legal ou risco de segurança.
      </p>

      <h2>4. Plataformas de terceiros</h2>
      <p>
        Google, WhatsApp, Instagram e outros serviços são independentes da Nooli. A
        disponibilidade, políticas e funcionamento desses serviços são definidos pelos
        respectivos titulares. A Nooli não garante manutenção permanente de recursos
        que dependem exclusivamente de terceiros.
      </p>

      <h2>5. Avaliações</h2>
      <p>
        A Nooli facilita o acesso ao local de avaliação; ela não cria avaliações, não
        compra opiniões e não deve ser usada para manipular notas ou selecionar somente
        clientes satisfeitos. O estabelecimento continua responsável por observar as
        regras da plataforma utilizada.
      </p>

      <h2>6. Disponibilidade e alterações</h2>
      <p>
        Podemos evoluir o serviço, corrigir falhas e alterar componentes técnicos. Para
        placas já vendidas, a arquitetura é planejada para preservar a URL física sempre
        que tecnicamente possível.
      </p>

      <h2>7. Relações de consumo</h2>
      <p>
        Quando houver relação de consumo, estes termos não afastam direitos obrigatórios
        previstos na legislação brasileira.
      </p>

      <p className="legal-date">Versão inicial: setembro de 2026.</p>
    </LegalPage>
  );
}
