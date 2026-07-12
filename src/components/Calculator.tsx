import { useState } from 'react';

export default function Calculator() {
  const [screenTime, setScreenTime] = useState(4); // default 4 hours/day

  const totalWeeklyHours = 168;
  const screenWeeklyHours = screenTime * 7;
  const therapyTimeHours = 50 / 60; // 50 minutes in hours (0.833h)

  const screenPercentage = ((screenWeeklyHours / totalWeeklyHours) * 100).toFixed(1);
  const therapyPercentage = ((therapyTimeHours / totalWeeklyHours) * 100).toFixed(2);

  const getSlogan = () => {
    if (screenTime >= 6) {
      return "Sua mente está consumida por estímulos constantes. Uma hora de terapia pode mudar seu ritmo.";
    } else if (screenTime >= 4) {
      return "Você dedica um tempo considerável às telas. Reservar um espaço para si mesma(o) fará toda a diferença.";
    } else {
      return "Mesmo com hábitos equilibrados, o autocuidado direcionado traz clareza e inteligência emocional.";
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 max-w-4xl mx-auto" id="calculadora">
      <div className="bg-white border border-[#E8E2D8] rounded-[28px] p-8 md:p-14 shadow-sm relative overflow-hidden">
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-500 via-neutral-100 to-neutral-500"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column: Interactive Slider */}
          <div className="md:col-span-6">
            <span className="inline-block bg-[#C97D67]/10 text-[#C97D67] text-[0.72rem] font-semibold tracking-wider px-3.5 py-1.5 rounded-full uppercase mb-4">
              Equilíbrio e Rotina
            </span>
            <h3 className="font-serif text-3xl font-semibold text-[#2C2B29] leading-tight mb-4">
              Quanto da sua semana você dedica a si?
            </h3>
            <p className="text-sm text-[#68655E] font-light leading-relaxed mb-8">
              Ajuste o controle abaixo para estimar quantas horas você passa olhando telas ou redes sociais por dia. Veja o contraste com o tempo necessário para cuidar da sua mente.
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-medium text-[#2C2B29]">
                <span>Tempo diário de telas:</span>
                <span className="text-[#607762] font-semibold text-lg">{screenTime} {screenTime === 1 ? 'hora' : 'horas'}</span>
              </div>
              
              <input 
                type="range" 
                min="1" 
                max="12" 
                step="1"
                value={screenTime}
                onChange={(e) => setScreenTime(Number(e.target.value))}
                className="w-full h-1.5 bg-[#85A48E]/20 rounded-lg appearance-none cursor-pointer accent-[#607762]"
              />
              <div className="flex justify-between text-[11px] text-[#A19D94] font-medium uppercase tracking-wide">
                <span>Pouco (1h)</span>
                <span>Moderado (6h)</span>
                <span>Intenso (12h)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Comparative Stats */}
          <div className="md:col-span-6 bg-[#FAF8F5] border border-[#F1ECE5] rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full">
            <div className="space-y-6">
              
              {/* Screen Stats */}
              <div>
                <div className="text-xs text-[#A19D94] uppercase tracking-wider font-semibold">Telas na sua semana</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif text-3.5xl font-semibold text-[#C97D67]">{screenWeeklyHours}h</span>
                  <span className="text-sm font-light text-[#68655E]">({screenPercentage}% do tempo total)</span>
                </div>
              </div>

              {/* Therapy Stats */}
              <div>
                <div className="text-xs text-[#A19D94] uppercase tracking-wider font-semibold">Uma sessão de terapia (50 min)</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif text-3.5xl font-semibold text-[#607762]">0,83h</span>
                  <span className="text-sm font-light text-[#68655E]">({therapyPercentage}% do tempo total)</span>
                </div>
              </div>

              {/* Progress Bar Visualizer */}
              <div className="pt-2">
                <div className="w-full h-3 bg-neutral-200/60 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-[#C97D67] transition-all duration-500 ease-out"
                    style={{ width: `${screenPercentage}%` }}
                    title="Telas"
                  ></div>
                  <div 
                    className="h-full bg-[#607762] transition-all duration-500 ease-out"
                    style={{ width: `${therapyPercentage}%` }}
                    title="Terapia"
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-[#A19D94] font-semibold uppercase tracking-wider mt-2">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#C97D67] rounded-full inline-block"></span> Telas</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#607762] rounded-full inline-block"></span> Terapia</span>
                </div>
              </div>

            </div>

            <div className="border-t border-[#EAE4DB] mt-8 pt-6">
              <p className="text-xs italic text-[#5D5A56] leading-relaxed">
                {getSlogan()}
              </p>
              <button 
                onClick={() => scrollToSection('autoavaliacao')}
                className="mt-6 w-full text-center bg-[#607762] hover:bg-[#2C2B29] text-white text-xs md:text-sm font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-2xs hover:shadow-sm"
              >
                Avalie seus níveis de estresse
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
