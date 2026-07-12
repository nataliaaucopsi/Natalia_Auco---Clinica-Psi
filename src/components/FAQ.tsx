import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Como funciona a terapia online? É tão segura quanto a presencial?",
      answer: "Completamente segura. A psicoterapia online oferece exatamente a mesma eficácia, acolhimento e rigor técnico do formato presencial, mas com a grande facilidade de se ajustar à sua rotina. Seus atendimentos acontecem por meio de salas de videochamada criptografadas, garantindo absoluto sigilo e privacidade. Para vivenciar esse momento de cuidado da melhor forma, basta reservar um local tranquilo e reservado, conferir sua conexão com a internet e fazer uso de fones de ouvido."
    },
    {
      id: 2,
      question: "O tratamento tem um fim previsto ou farei terapia para sempre?",
      answer: "O foco principal do nosso trabalho é construir a sua emancipação emocional. Por isso, a terapia adota uma postura ativa, colaborativa e estruturada, desenhada com começo, meio e fim delineados. O propósito central é munir você de ferramentas práticas e reflexivas baseadas na sua realidade, permitindo que você desafie demandas limitantes e se posicione como o próprio gestor da sua mente, caminhando com segurança em direção à alta clínica."
    },
    {
      id: 3,
      question: "O que é a Terapia Cognitivo-Comportamental (TCC) e como ela ajuda?",
      answer: "A TCC é uma abordagem da psicologia amplamente respaldada por pesquisas científicas mundiais, apontada pela comunidade médica como o padrão-ouro para o tratamento de quadros de ansiedade, estresse crônico e burnout. Ela atua de forma prática e focada no presente, auxiliando você a identificar, analisar e reestruturar os esquemas de pensamento automáticos e disfuncionais que geram as suas crises de medo, exaustão e paralisia comportamental."
    },
    {
      id: 4,
      question: "Como saber se este é o momento certo para eu buscar psicoterapia?",
      answer: "Se você sente que a ansiedade, a autocobrança excessiva ou o esgotamento profissional estão roubando a leveza dos seus dias e afetando sua saúde, o momento é agora. Não é necessário esperar atingir um limite insuportável de dor para se cuidar; a psicoterapia funciona como um ato preventivo e organizador, restabelecendo o seu protagonismo e impedindo que o sofrimento emocional paralise seus planos e relacionamentos."
    },
    {
      id: 5,
      question: "Qual a frequência estabelecida e o tempo de duração de cada consulta?",
      answer: "Cada sessão tem o tempo dedicado de 50 minutos e ocorre em caráter semanal. Essa consistência e regularidade no início do processo são pilares fundamentais para construir o vínculo terapêutico e sustentar a sua evolução clínica. Conforme você avança, ganha estabilidade e atinge suas metas, o espaçamento entre as consultas pode ser reajustado de forma gradual, sempre em comum acordo e respeitando o seu tempo."
    },
    {
      id: 6,
      question: "Posso ter total certeza de que tudo o que eu disser será confidencial?",
      answer: "Sem dúvidas. A confidencialidade e o sigilo absoluto são premissas éticas inegociáveis que norteiam toda a minha conduta profissional, amparadas estritamente pelo Código de Ética do Psicólogo. Tudo o que é compartilhado, sentido e trabalhado em nossas sessões permanece protegido sob absoluto segredo profissional. As únicas exceções legais ocorrem exclusivamente em situações extremas que envolvam risco iminente à integridade física do paciente ou de terceiros."
    },
    {
      id: 7,
      question: "Como funciona a política de valores e investimento das consultas?",
      answer: "Em total alinhamento e respeito às diretrizes institucionais do Conselho Federal de Psicologia (CFP), detalhes financeiros sobre honorários e pacotes terapêuticos não são expostos publicamente de forma aberta. Todos os valores de investimento são repassados de maneira transparente e humanizada diretamente em nosso primeiro contato privado. Fique à vontade para enviar uma mensagem para entender as modalidades de atendimento disponíveis."
    },
    {
      id: 8,
      question: "Você realiza atendimentos credenciados por convênio médico?",
      answer: "Os atendimentos da clínica são realizados exclusivamente de forma particular. Essa escolha garante que o seu acompanhamento receba um tempo de dedicação premium, com planejamento clínico individualizado fora da sessão e total autonomia de agenda. Contudo, se o seu plano de saúde contar com a modalidade de livre escolha e reembolso, forneço os recibos e relatórios técnicos necessários para que você solicite a restituição dos valores junto à sua operadora."
    },
    {
      id: 9,
      question: "O que acontece se eu precisar desmarcar ou reagendar um horário?",
      answer: "O nosso espaço é pautado pelo respeito mútuo. Caso surja algum imprevisto profissional ou pessoal, você pode solicitar o cancelamento ou o reagendamento da sua sessão sem custos adicionais, desde que o aviso seja feito com antecedência mínima de 24 horas. Esse prazo nos permite reorganizar os horários da clínica com responsabilidade e disponibilizar a vaga para outro paciente que possa necessitar de um encaixe urgente."
    }
  ];

  const toggleItem = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 md:py-28 px-4 max-w-[820px] mx-auto relative z-10" id="duvidas-frequentes">
      
      <header className="text-center mb-16 md:mb-20">
        <h2 className="font-serif font-medium text-4xl md:text-5xl text-[#2C3C34] tracking-tight relative inline-block pb-4">
          Dúvidas frequentes
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[1px] bg-[#C47D68] opacity-80"></span>
        </h2>
      </header>

      <div className="flex flex-col gap-5">
        {faqData.map((item) => {
          const isOpen = openId === item.id;
          return (
            <article 
              key={item.id}
              className={`group bg-white border rounded-[22px] p-6 md:p-8 transition-all duration-500 ease-in-out shadow-xs hover:-translate-y-[2px] ${
                isOpen 
                  ? 'border-[#6B8374] shadow-md' 
                  : 'border-[#E8E2D8] hover:border-[#6B8374]/30 hover:shadow-md'
              }`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full text-left flex justify-between items-center gap-6 cursor-pointer select-none focus:outline-none"
              >
                <span className="font-serif text-lg md:text-xl font-semibold text-[#2C3C34] leading-snug">
                  {item.question}
                </span>
                
                {/* Control Trigger Button */}
                <div className={`w-9 h-9 border rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                  isOpen 
                    ? 'bg-[#2C3C34] text-white border-[#2C3C34]' 
                    : 'bg-[#F8F6F2] text-[#2C3C34] border-[#E8E2D8] group-hover:bg-[#6B8374] group-hover:text-white group-hover:border-[#6B8374]'
                }`}>
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={`transition-transform duration-500 ${isOpen ? 'rotate-[135deg]' : ''}`}
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </button>

              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden`}
                style={{ 
                  maxHeight: isOpen ? '400px' : '0',
                  opacity: isOpen ? 1 : 0,
                  marginTop: isOpen ? '1.5rem' : '0'
                }}
              >
                <div className="pt-6 border-t border-[#E8E2D8] font-sans text-[1.05rem] font-light leading-[1.85] text-[#64746B] tracking-wide">
                  {item.answer}
                </div>
              </div>
            </article>
          );
        })}
      </div>

    </section>
  );
}
