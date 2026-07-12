import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Battery, Frown, HelpCircle, ArrowRight } from 'lucide-react';

type MoodType = 'ansioso' | 'esgotado' | 'triste' | 'confuso';

export default function AcolhimentoWidget() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const baseWhatsappUrl = "https://wa.me/5512991766972?text=";

  const messages: Record<MoodType, { text: string; title: string; msgWhatsapp: string }> = {
    ansioso: {
      title: "Para a ansiedade",
      text: "O futuro não precisa ser resolvido agora. Respire fundo, inspire contando até 4, segure por 4 e expire lentamente em 6 tempos. Traga sua mente de volta para este exato segundo. Você está segura(o) aqui.",
      msgWhatsapp: "Olá, Natália! Senti um pouco de ansiedade hoje no seu site e gostaria de conversar mais sobre as sessões de terapia online."
    },
    esgotado: {
      title: "Para o esgotamento",
      text: "Sua mente e seu corpo estão pedindo uma pausa, não uma cobrança por mais produtividade. Desconecte-se um pouco do que drena suas energias. Descansar também é cuidar de si.",
      msgWhatsapp: "Olá, Natália! Tenho me sentido bastante esgotada(o) ultimamente e decidi buscar ajuda na terapia online. Como funcionam os horários?"
    },
    triste: {
      title: "Para a tristeza",
      text: "Permita-se sentir, sem se julgar. Validar sua dor é o primeiro passo para o acolhimento. Lembre-se de que nenhum sentimento é permanente. Dias nublados também fazem parte do processo.",
      msgWhatsapp: "Olá, Natália! Vi o seu card sobre o acolhimento para dias tristes e gostaria de entender melhor como funciona o processo da terapia online."
    },
    confuso: {
      title: "Para a confusão mental",
      text: "Quando tudo parecer um turbilhão, tente focar em apenas uma pequena coisa de cada vez. Não precisamos organizar todos os pensamentos de uma vez só para começarmos a nos cuidar.",
      msgWhatsapp: "Olá, Natália! Me sinto um pouco confusa(o) sobre o que estou passando e gostaria de agendar uma sessão de terapia online para me organizar melhor."
    }
  };

  const handleSelectMood = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleReset = () => {
    setSelectedMood(null);
  };

  return (
    <div id="acolhimento-interativo" className="relative w-full max-w-[540px] mx-auto bg-white border border-[#E8E2D8] rounded-[24px] p-8 md:p-12 shadow-xs hover:shadow-md transition-shadow duration-300 text-center overflow-hidden min-h-[420px] flex flex-col justify-center">
      {/* Tactile Analog Noise Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>')`
        }}
      />

      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          {!selectedMood ? (
            <motion.div
              key="selection-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col h-full justify-center"
            >
              <h3 className="font-serif text-2xl md:text-3.5xl text-[#2C2B29] font-medium leading-tight mb-2 tracking-tight">
                Como está o seu mundo interno hoje? 
              </h3>
              <span className="font-sans text-xs md:text-sm font-light text-[#68655E] mb-8 block leading-relaxed max-w-sm mx-auto">
                Selecione o estado que melhor te descreve neste instante:
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => handleSelectMood('ansioso')}
                  className="group bg-white border border-[#E8E2D8] p-6 rounded-2xl flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-4 cursor-pointer hover:border-[#7A8B7C]/50 hover:bg-[#FAFAF9] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7A8B7C]/5 flex items-center justify-center text-[#7A8B7C] group-hover:text-[#C97D67] group-hover:bg-[#C97D67]/5 transition-all duration-300">
                    <Clock className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="text-sm font-medium text-[#2C2B29] group-hover:text-[#2C2B29] tracking-wide font-sans">
                    Ansiosa(o)
                  </span>
                </button>

                <button 
                  onClick={() => handleSelectMood('esgotado')}
                  className="group bg-white border border-[#E8E2D8] p-6 rounded-2xl flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-4 cursor-pointer hover:border-[#7A8B7C]/50 hover:bg-[#FAFAF9] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7A8B7C]/5 flex items-center justify-center text-[#7A8B7C] group-hover:text-[#C97D67] group-hover:bg-[#C97D67]/5 transition-all duration-300">
                    <Battery className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="text-sm font-medium text-[#2C2B29] group-hover:text-[#2C2B29] tracking-wide font-sans">
                    Esgotada(o)
                  </span>
                </button>

                <button 
                  onClick={() => handleSelectMood('triste')}
                  className="group bg-white border border-[#E8E2D8] p-6 rounded-2xl flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-4 cursor-pointer hover:border-[#7A8B7C]/50 hover:bg-[#FAFAF9] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7A8B7C]/5 flex items-center justify-center text-[#7A8B7C] group-hover:text-[#C97D67] group-hover:bg-[#C97D67]/5 transition-all duration-300">
                    <Frown className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="text-sm font-medium text-[#2C2B29] group-hover:text-[#2C2B29] tracking-wide font-sans">
                    Triste
                  </span>
                </button>

                <button 
                  onClick={() => handleSelectMood('confuso')}
                  className="group bg-white border border-[#E8E2D8] p-6 rounded-2xl flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-4 cursor-pointer hover:border-[#7A8B7C]/50 hover:bg-[#FAFAF9] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7A8B7C]/5 flex items-center justify-center text-[#7A8B7C] group-hover:text-[#C97D67] group-hover:bg-[#C97D67]/5 transition-all duration-300">
                    <HelpCircle className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="text-sm font-medium text-[#2C2B29] group-hover:text-[#2C2B29] tracking-wide font-sans">
                    Confusa(o)
                  </span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="response-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col h-full justify-center"
            >
              <div className="response-text border-l-2 border-[#7A8B7C] bg-[#FAFAF9] p-6 rounded-r-2xl rounded-l-xs text-left mb-8">
                <strong className="font-serif text-lg md:text-xl text-[#2C2B29] font-semibold block mb-3 leading-tight">
                  {messages[selectedMood].title}:
                </strong>
                <p className="font-sans text-sm text-[#68655E] leading-relaxed font-light">
                  {messages[selectedMood].text}
                </p>
              </div>
              
              <a 
                href={baseWhatsappUrl + encodeURIComponent(messages[selectedMood].msgWhatsapp)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-button w-full inline-flex items-center justify-center gap-2.5 bg-[#7A8B7C] hover:bg-[#2C2B29] text-white py-4 px-6 rounded-full font-medium text-sm transition-all duration-400 hover:-translate-y-0.5 shadow-xs hover:shadow-md"
              >
                Conversar num espaço seguro
                <ArrowRight className="w-4 h-4" />
              </a>
              
              <button 
                onClick={handleReset}
                className="back-btn mt-6 self-center bg-transparent border-0 text-[#68655E] hover:text-[#2C2B29] font-sans text-xs font-medium uppercase tracking-wider border-b border-transparent hover:border-[#2C2B29] pb-0.5 cursor-pointer transition-colors"
              >
                Escolher outro sentimento
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
