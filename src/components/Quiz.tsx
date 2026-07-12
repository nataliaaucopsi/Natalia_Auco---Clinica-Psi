import { useState } from 'react';

type QuizStep = 1 | 2 | 3 | 4 | 'result';

export default function Quiz() {
  const [step, setStep] = useState<QuizStep>(1);
  const [score, setScore] = useState(0);

  const handleNext = (points: number) => {
    setScore((prev) => prev + points);
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
  };

  const handleFinish = (points: number) => {
    const finalScore = score + points;
    setScore(finalScore);
    setStep('result');
  };

  const resetQuiz = () => {
    setScore(0);
    setStep(1);
  };

  const getProgressWidth = () => {
    if (step === 'result') return '100%';
    return `${(step / 4) * 100}%`;
  };

  return (
    <section className="py-12 md:py-20 px-4 max-w-xl mx-auto" id="autoavaliacao">
      <div className="bg-white/70 backdrop-blur-md border border-[#E8E2D8]/80 rounded-[28px] p-6 md:p-10 shadow-sm flex flex-col justify-center min-h-[420px] relative overflow-hidden">
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-500 via-neutral-100 to-neutral-500"></div>

        <div className="relative z-10 w-full">
          {step !== 'result' && (
            <div className="w-full h-1 bg-[#85A48E]/10 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-[#607762] transition-all duration-500 ease-out"
                style={{ width: getProgressWidth() }}
              ></div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-[#2C2A27] text-xl font-serif font-medium leading-relaxed text-center mb-8">
                Como tem estado a sua qualidade de sono nos últimos dias?
              </h3>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleNext(0)}
                  className="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:bg-[#607762]/3 hover:text-[#607762] transition-all duration-300"
                >
                  Durmo bem e acordo descansada(o).
                </button>
                <button 
                  onClick={() => handleNext(1)}
                  className="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:bg-[#607762]/3 hover:text-[#607762] transition-all duration-300"
                >
                  Demoro para dormir ou acordo no meio da noite.
                </button>
                <button 
                  onClick={() => handleNext(2)}
                  className="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:bg-[#607762]/3 hover:text-[#607762] transition-all duration-300"
                >
                  Sinto cansaço extremo, mesmo após horas de sono.
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-[#2C2A27] text-xl font-serif font-medium leading-relaxed text-center mb-8">
                Com que frequência você sente dificuldade de concentração?
              </h3>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleNext(0)}
                  className="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:bg-[#607762]/3 hover:text-[#607762] transition-all duration-300"
                >
                  Raramente, consigo focar bem nas metas.
                </button>
                <button 
                  onClick={() => handleNext(1)}
                  className="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:bg-[#607762]/3 hover:text-[#607762] transition-all duration-300"
                >
                  Às vezes me pego adiando tarefas por cansaço.
                </button>
                <button 
                  onClick={() => handleNext(2)}
                  className="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:bg-[#607762]/3 hover:text-[#607762] transition-all duration-300"
                >
                  Constantemente sinto sobrecarga mental.
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-[#2C2A27] text-xl font-serif font-medium leading-relaxed text-center mb-8">
                Como você gerencia momentos de estresse?
              </h3>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleNext(0)}
                  className="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:bg-[#607762]/3 hover:text-[#607762] transition-all duration-300"
                >
                  Consigo manter o controle emocional.
                </button>
                <button 
                  onClick={() => handleNext(1)}
                  className="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:bg-[#607762]/3 hover:text-[#607762] transition-all duration-300"
                >
                  Sinto desconforto físico temporário.
                </button>
                <button 
                  onClick={() => handleNext(2)}
                  className="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:bg-[#607762]/3 hover:text-[#607762] transition-all duration-300"
                >
                  Fico absorvida(o) pelos pensamentos.
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <h3 className="text-[#2C2A27] text-xl font-serif font-medium leading-relaxed text-center mb-8">
                Como estão suas interações atualmente?
              </h3>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleFinish(0)}
                  className="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:bg-[#607762]/3 hover:text-[#607762] transition-all duration-300"
                >
                  Equilibradas e estáveis.
                </button>
                <button 
                  onClick={() => handleFinish(1)}
                  className="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:bg-[#607762]/3 hover:text-[#607762] transition-all duration-300"
                >
                  Evitando interações por cansaço.
                </button>
                <button 
                  onClick={() => handleFinish(2)}
                  className="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:bg-[#607762]/3 hover:text-[#607762] transition-all duration-300"
                >
                  Com conflitos frequentes.
                </button>
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="text-center animate-fade-in">
              <div className="text-3xl font-serif font-semibold text-[#2C2A27] mb-4">
                Obrigada por compartilhar.
              </div>
              <p className="text-[#5D5A56] text-sm md:text-base leading-relaxed font-light mb-8 px-2 md:px-6">
                {score <= 3 
                  ? "Seus níveis de estresse parecem moderados. Manter o equilíbrio é fundamental. Que tal um espaço focado no seu autoconhecimento?" 
                  : "Seus níveis de sobrecarga parecem elevados. É importante dar atenção a esses sinais. Vamos construir ferramentas de alívio juntos?"}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a 
                  href="https://wa.me/5512991766972?text=Ol%C3%A1%2C%20Nat%C3%A1lia!%20Fiz%20o%20seu%20teste%20de%20autoavalia%C3%A7%C3%A3o%20e%20gostaria%20de%20agendar%20uma%20consulta."
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#607762] hover:bg-[#4a5d4e] text-white text-center py-4 px-8 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Agendar sessão online
                </a>
                <button 
                  onClick={resetQuiz}
                  className="text-xs uppercase tracking-widest text-[#8C8273] hover:text-[#2C2A27] transition-colors font-semibold"
                >
                  Refazer o teste
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
