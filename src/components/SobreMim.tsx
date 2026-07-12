import { useState } from 'react';

type TabType = 'abordagem' | 'areas' | 'idiomas';

export default function SobreMim() {
  const [activeTab, setActiveTab] = useState<TabType>('abordagem');

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start" id="sobre-mim">
      
      {/* 1. SEÇÃO BIOGRAFIA: Ocupa 7 colunas */}
      <div className="lg:col-span-7 bg-white/60 backdrop-blur-md border border-[#E8E2D8] rounded-[28px] p-6 md:p-12 shadow-sm relative overflow-hidden">
        {/* Textura de papel muito sutil */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-500 via-neutral-100 to-neutral-500"></div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          {/* Portrait com corte elegante */}
          <div className="w-full max-w-[240px] md:max-w-[220px] aspect-[4/5] rounded-2xl overflow-hidden bg-[#E8E2D8] shadow-sm flex-shrink-0">
            <img 
              src="https://i.ibb.co/95hvXbz/Nat-Site.jpg" 
              alt="Natália Auco - Psicóloga" 
              className="w-full h-full object-cover grayscale-[10%] brightness-[1.05]"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Biography Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#2C2A27] mb-6 tracking-tight">
              Sobre mim
            </h2>
            <div className="space-y-4 text-[#5D5A56] font-light leading-relaxed text-[1.02rem]">
              <p>
                Sou <strong className="text-[#607762] font-semibold">Natália Auco</strong>, psicóloga e pós-graduanda em Terapia Cognitivo-Comportamental (TCC). Acredito em um processo que vai além da escuta: é sobre organizar e transformar o que hoje te trava.
              </p>
              <p>
                No meu trabalho, ajudo você a identificar padrões invisíveis — pensamentos automáticos e autocríticas — para construirmos juntos novas formas de pensar, sentir e agir, mais alinhadas com quem você deseja ser.
              </p>
              <p>
                A terapia aqui é um espaço de atenção aos detalhes, com estratégia, clareza e, acima de tudo, acolhimento.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CARD PERFIL PROFISSIONAL / ABAS: Ocupa 5 colunas */}
      <div className="lg:col-span-5 bg-white/70 backdrop-blur-md border border-[#E8E2D8]/80 rounded-[28px] p-6 md:p-8 shadow-sm flex flex-col justify-center min-h-[400px]">
        
        <div className="text-center mb-6">
          <span className="inline-block bg-[#607762] text-white text-[0.7rem] font-semibold tracking-[0.8px] px-3.5 py-1 rounded-full uppercase">
            CRP 06/208635
          </span>
        </div>

        {/* Tabs System */}
        <div className="flex bg-[#E8E2D8]/40 rounded-xl p-1 mb-6 gap-1">
          <button 
            onClick={() => setActiveTab('abordagem')}
            className={`flex-1 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === 'abordagem' ? 'bg-white text-[#607762] shadow-sm' : 'text-[#5D5A56] hover:text-[#2C2A27]'}`}
          >
            Abordagem
          </button>
          <button 
            onClick={() => setActiveTab('areas')}
            className={`flex-1 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === 'areas' ? 'bg-white text-[#607762] shadow-sm' : 'text-[#5D5A56] hover:text-[#2C2A27]'}`}
          >
            Especialidades
          </button>
          <button 
            onClick={() => setActiveTab('idiomas')}
            className={`flex-1 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === 'idiomas' ? 'bg-white text-[#607762] shadow-sm' : 'text-[#5D5A56] hover:text-[#2C2A27]'}`}
          >
            Idiomas
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="min-h-[180px]">
          {activeTab === 'abordagem' && (
            <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8] transition-opacity duration-300">
              <h3 className="text-[#607762] font-semibold text-lg mb-3">
                Terapia Cognitivo-Comportamental
              </h3>
              <p className="text-[#5D5A56] text-sm md:text-base leading-relaxed font-light">
                Uma abordagem estruturada, focada no presente e colaborativa. Trabalhamos na reestruturação de padrões de pensamentos e comportamentos para desenvolver ferramentas práticas de bem-estar.
              </p>
            </div>
          )}

          {activeTab === 'areas' && (
            <div className="flex flex-wrap gap-2 justify-center py-2">
              {[
                'Ansiedade', 'Depressão', 'Relacionamentos', 
                'Dependência emocional', 'LGBTQIA+', 'Burnout', 
                'Autismo Nível 1', 'TDAH'
              ].map((area) => (
                <span 
                  key={area}
                  className="bg-white border border-[#E8E2D8] px-4 py-2 rounded-full text-xs md:text-sm text-[#4A4743] font-medium shadow-2xs hover:border-[#607762] hover:text-[#607762] transition-colors duration-300"
                >
                  {area}
                </span>
              ))}
            </div>
          )}

          {activeTab === 'idiomas' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-[#E8E2D8] text-sm text-[#2C2A27]">
                <span className="font-medium">Português</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-[#E8E2D8] text-sm text-[#2C2A27]">
                <span className="font-medium">Espanhol</span>
              </div>
            </div>
          )}
        </div>

      </div>

    </section>
  );
}
