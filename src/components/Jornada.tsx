export default function Jornada() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#F5F2EB]/50 to-[#f3eee7]/50" id="jornada">
      <div className="max-w-6xl mx-auto">
        
        {/* ROADMAP / ACCORDIONS */}
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif font-semibold text-4xl md:text-5xl text-[#2C2B29] tracking-tight mb-4">
            Como funciona a jornada terapêutica?
          </h2>
          <p className="font-serif italic text-lg md:text-xl text-[#68655E]">
            Um processo estruturado, seguro e acolhedor para transformar a sobrecarga em clareza emocional.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Col 1: A Estrutura Prática */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="font-serif text-2xl font-semibold text-[#7A8B7C] flex items-center gap-3 px-2 mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              A Estrutura Prática
            </h3>

            <details className="group bg-white border border-[#E8E2D8] rounded-[22px] p-6 shadow-xs hover:shadow-sm hover:translate-y-[-2px] transition-all duration-300" open>
              <summary className="list-none flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-4">
                  <span className="font-serif italic font-semibold text-[#C97D67]">01</span>
                  <span className="font-serif font-semibold text-lg text-[#2C2B29] group-open:text-[#7A8B7C] transition-colors">O Agendamento</span>
                </div>
                <svg className="w-5 h-5 text-[#D2CDC3] group-open:rotate-180 group-open:text-[#7A8B7C] transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 ml-8 text-sm font-light text-[#68655E] leading-relaxed">
                Escolha seu horário ideal de forma simples e imediata através da nossa agenda online integrada, pensada para não interferir na sua rotina.
              </p>
            </details>

            <details className="group bg-white border border-[#E8E2D8] rounded-[22px] p-6 shadow-xs hover:shadow-sm hover:translate-y-[-2px] transition-all duration-300">
              <summary className="list-none flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-4">
                  <span className="font-serif italic font-semibold text-[#C97D67]">02</span>
                  <span className="font-serif font-semibold text-lg text-[#2C2B29] group-open:text-[#7A8B7C] transition-colors">O Ambiente Seguro</span>
                </div>
                <svg className="w-5 h-5 text-[#D2CDC3] group-open:rotate-180 group-open:text-[#7A8B7C] transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 ml-8 text-sm font-light text-[#68655E] leading-relaxed">
                Antes da sessão, você recebe um link exclusivo, criptografado e totalmente seguro para a nossa consulta por vídeo.
              </p>
            </details>

            <details className="group bg-white border border-[#E8E2D8] rounded-[22px] p-6 shadow-xs hover:shadow-sm hover:translate-y-[-2px] transition-all duration-300">
              <summary className="list-none flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-4">
                  <span className="font-serif italic font-semibold text-[#C97D67]">03</span>
                  <span className="font-serif font-semibold text-lg text-[#2C2B29] group-open:text-[#7A8B7C] transition-colors">A Consulta</span>
                </div>
                <svg className="w-5 h-5 text-[#D2CDC3] group-open:rotate-180 group-open:text-[#7A8B7C] transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 ml-8 text-sm font-light text-[#68655E] leading-relaxed">
                Conversamos profundamente sobre suas demandas e vivências em um ambiente de absoluto sigilo ético e livre de julgamentos.
              </p>
            </details>
          </div>

          {/* Col 2: Center Artwork SVG */}
          <div className="lg:col-span-4 flex justify-center py-6">
            <div className="w-full max-w-[300px] animate-pulse-subtle">
              <svg viewBox="0 0 400 400" fill="none" className="w-full h-auto drop-shadow-xs">
                <circle cx="200" cy="200" r="140" fill="#FFFFFF" stroke="#E8E2D8" strokeWidth="1" />
                <path d="M100 280 C100 210, 140 210, 150 210 C160 210, 165 220, 160 235 C155 255, 140 300, 115 300 C105 300, 100 295, 100 280 Z" fill="#E8E2D8" />
                <circle cx="130" cy="190" r="12" fill="#C97D67" />
                <circle cx="140" cy="130" r="30" fill="#FFFFFF" stroke="#7A8B7C" strokeWidth="1.5"/>
                <path d="M150 150 L145 145" fill="none" stroke="#7A8B7C" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M120 130 C120 115, 135 110, 145 120 C155 130, 130 145, 125 130" stroke="#C97D67" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
                <path d="M310 280 C310 210, 270 210, 260 210 C250 210, 245 220, 250 235 C255 255, 270 300, 295 300 C305 300, 310 295, 310 280 Z" fill="#7A8B7C" opacity="0.9" />
                <circle cx="280" cy="180" r="10" fill="#F5F2EB" />
                <path d="M150 140 C175 160, 200 195, 240 205" stroke="#7A8B7C" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" opacity="0.6"/>
              </svg>
            </div>
          </div>

          {/* Col 3: A Evolução Clínica */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="font-serif text-2xl font-semibold text-[#7A8B7C] flex items-center gap-3 px-2 mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              A Evolução Clínica
            </h3>

            <details className="group bg-white border border-[#E8E2D8] rounded-[22px] p-6 shadow-xs hover:shadow-sm hover:translate-y-[-2px] transition-all duration-300" open>
              <summary className="list-none flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-4">
                  <span className="font-serif italic font-semibold text-[#C97D67]">01</span>
                  <span className="font-serif font-semibold text-lg text-[#2C2B29] group-open:text-[#7A8B7C] transition-colors">Mapeamento</span>
                </div>
                <svg className="w-5 h-5 text-[#D2CDC3] group-open:rotate-180 group-open:text-[#7A8B7C] transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 ml-8 text-sm font-light text-[#68655E] leading-relaxed">
                Identificamos juntos os seus nós emocionais, gatilhos de ansiedade e padrões invisíveis, criando um espaço para desabafar sem reservas.
              </p>
            </details>

            <details className="group bg-white border border-[#E8E2D8] rounded-[22px] p-6 shadow-xs hover:shadow-sm hover:translate-y-[-2px] transition-all duration-300">
              <summary className="list-none flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-4">
                  <span className="font-serif italic font-semibold text-[#C97D67]">02</span>
                  <span className="font-serif font-semibold text-lg text-[#2C2B29] group-open:text-[#7A8B7C] transition-colors">Alívio Prático</span>
                </div>
                <svg className="w-5 h-5 text-[#D2CDC3] group-open:rotate-180 group-open:text-[#7A8B7C] transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 ml-8 text-sm font-light text-[#68655E] leading-relaxed">
                Com a TCC, traduzimos o entendimento clínico em alívio imediato, reestruturando os pensamentos e comportamentos que aprisionam você.
              </p>
            </details>

            <details className="group bg-white border border-[#E8E2D8] rounded-[22px] p-6 shadow-xs hover:shadow-sm hover:translate-y-[-2px] transition-all duration-300">
              <summary className="list-none flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-4">
                  <span className="font-serif italic font-semibold text-[#C97D67]">03</span>
                  <span className="font-serif font-semibold text-lg text-[#2C2B29] group-open:text-[#7A8B7C] transition-colors">Autonomia</span>
                </div>
                <svg className="w-5 h-5 text-[#D2CDC3] group-open:rotate-180 group-open:text-[#7A8B7C] transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 ml-8 text-sm font-light text-[#68655E] leading-relaxed">
                Consolidamos suas vitórias para que você termine o processo com independência, sabendo solucionar desafios futuros com clareza.
              </p>
            </details>
          </div>

        </div>

        {/* ABORDAGEM CLÍNICA TCC PREMIUM BOX */}
        <div className="max-w-3xl mx-auto bg-white border border-[#E8E2D8] rounded-[24px] p-8 md:p-14 shadow-sm relative overflow-hidden">
          {/* Subtle paper background */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-500 via-neutral-100 to-neutral-500"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-[#7A8B7C] tracking-widest uppercase border-b border-[#7A8B7C]/30 pb-1 mb-8">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Abordagem Clínica
            </div>

            <h3 className="font-serif text-3xl md:text-4xl font-medium text-[#2C2B29] leading-tight mb-8">
              Ciência e acolhimento direcionados ao seu bem-estar
            </h3>
            
            <div className="space-y-6 text-[#68655E] font-light leading-relaxed text-[1.02rem]">
              <p>
                Meus atendimentos são inteiramente guiados pela <strong className="text-[#2C2B29] font-medium">Terapia Cognitivo-Comportamental (TCC)</strong>. Trata-se de uma abordagem de psicoterapia amplamente reconhecida por sua clareza, especificidade e objetividade, estruturada com um foco central na sua realidade presente e na resolução ativa de problemas.
              </p>
              <p>
                O alicerce da TCC baseia-se na compreensão de que a forma como pensamos e interpretamos o mundo molda diretamente como nos sentimos e agimos. Compreendemos que os padrões cognitivos — seus pensamentos automáticos e crenças mais profundas — podem ser monitorados, ressignificados e modificados.
              </p>
              <p>
                Como resultado prático desse processo, conseguimos alcançar os comportamentos e a estabilidade que você deseja. Para que isso aconteça de forma consistente, a TCC dispõe de um valioso conjunto de <strong className="text-[#2C2B29] font-medium">técnicas científicas</strong> que são aplicadas nas sessões e ensinadas a você, promovendo sua total autonomia fora do consultório.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
