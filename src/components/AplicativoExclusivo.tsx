import { useState } from 'react';
import { Calendar, CheckCircle2, DollarSign, ShieldCheck, Smartphone, Palette, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AplicativoExclusivo() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      url: "https://i.ibb.co/dwwQ3q1N/Chat-GPT-Image-10-de-jul-de-2026-17-12-32.png",
      alt: "Aplicativo da Clínica - Tela Principal",
      title: "Sua Saúde Mental"
    },
    {
      url: "https://i.ibb.co/fY8W7jvn/Chat-GPT-Image-10-de-jul-de-2026-18-21-55.png",
      alt: "Aplicativo da Clínica - Personalização de Cores",
      title: "Tema Personalizável"
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="aplicativo-exclusivo" className="py-20 md:py-28 bg-[#F5F0E9] border-t border-[#E8E2D8] scroll-mt-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#868C81] bg-[#607762]/10 px-3 py-1.5 rounded-full inline-block mb-4 font-sans">
            Diferencial Clínico
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2C2B29] leading-tight font-medium tracking-tight">
            Aplicativo Exclusivo da Clínica
          </h2>
          <div className="w-16 h-[2px] bg-[#607762]/40 mx-auto mt-5"></div>
        </div>

        {/* 1. Introduction Text (Now at the top) */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4 px-4">
          <h3 className="font-serif text-2.5xl md:text-3.5xl text-[#2C2B29] leading-snug">
            Sua jornada de autodescoberta sempre organizada.
          </h3>
          <p className="text-[#5D5A56] text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Com o aplicativo exclusivo da nossa clínica, você tem autonomia e tranquilidade para acompanhar o seu tratamento em tempo real. Esqueça planilhas complexas, anotações perdidas ou a preocupação de esquecer as suas consultas.
          </p>
        </div>
      </div>

      {/* 2. Full-Width Carousel Area (Ocupando a largura toda) */}
      <div className="w-full bg-[#EAE3D8]/40 py-10 md:py-14 mb-16 border-y border-[#E8E2D8]/50 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative flex flex-col items-center">
          
          {/* Main Carousel Wrapper */}
          <div className="relative w-full max-w-3xl flex items-center justify-center">
            
            {/* Left Control Arrow */}
            <button 
              onClick={handlePrev}
              className="absolute left-2 md:-left-16 z-10 p-3 rounded-full bg-white/95 border border-[#E8E2D8] text-[#607762] hover:bg-[#607762] hover:text-white transition-all duration-300 shadow-md focus:outline-none cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Carousel Item with Zoomable Action */}
            <div 
              onClick={() => setActiveImage(images[currentIndex].url)}
              className="relative w-full max-w-md md:max-w-xl group cursor-pointer rounded-[32px] overflow-hidden shadow-[0_25px_55px_rgba(96,119,98,0.18)] border border-[#E8E2D8] transition-all duration-500 hover:-translate-y-1 bg-white p-3.5"
            >
              <div className="relative overflow-hidden rounded-[24px] aspect-[16/9] md:aspect-[1.5/1] bg-[#FAF8F5] flex items-center justify-center">
                <img 
                  src={images[currentIndex].url} 
                  alt={images[currentIndex].alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                {/* Visual Overlay Zoom Indicator */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3.5 bg-white/95 rounded-full text-[#607762] shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300 flex items-center gap-2">
                    <ZoomIn className="w-5 h-5" />
                    <span className="text-xs font-bold font-sans pr-1">Dar Zoom</span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="text-center mt-3.5 pb-1">
                <span className="text-[11px] text-[#8C8273] font-sans font-extrabold tracking-wider uppercase bg-[#F5F0E9] px-3.5 py-1.5 rounded-full inline-block border border-[#E8E2D8]/40">
                  {images[currentIndex].title}
                </span>
              </div>
            </div>

            {/* Right Control Arrow */}
            <button 
              onClick={handleNext}
              className="absolute right-2 md:-right-16 z-10 p-3 rounded-full bg-white/95 border border-[#E8E2D8] text-[#607762] hover:bg-[#607762] hover:text-white transition-all duration-300 shadow-md focus:outline-none cursor-pointer"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel Dots Indicator */}
          <div className="flex gap-2.5 mt-8">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-[#607762]' : 'w-2.5 bg-[#607762]/25 hover:bg-[#607762]/50'
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* 3. Feature Cards Grid & Remaining details (Now at the bottom) */}
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Feature Cards Grid (Expanded to 5 items) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="p-6 bg-white border border-[#E8E2D8] rounded-2xl space-y-3 shadow-xs hover:shadow-sm transition-all duration-300">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#607762]/10 text-[#607762] rounded-lg">
                  <Calendar className="w-4 h-4" />
                </div>
                <h4 className="font-sans font-bold text-sm text-[#2C2B29]">Agenda Integrada</h4>
              </div>
              <p className="text-xs text-[#8C8273] font-light leading-relaxed">
                Consulte os horários das suas próximas consultas e mantenha sua rotina organizada com facilidade.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D8] rounded-2xl space-y-3 shadow-xs hover:shadow-sm transition-all duration-300">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#607762]/10 text-[#607762] rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h4 className="font-sans font-bold text-sm text-[#2C2B29]">Presença Simples</h4>
              </div>
              <p className="text-xs text-[#8C8273] font-light leading-relaxed">
                Confirme ou desmarque sessões agendadas com apenas alguns toques, sem burocracias.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D8] rounded-2xl space-y-3 shadow-xs hover:shadow-sm transition-all duration-300">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#607762]/10 text-[#607762] rounded-lg">
                  <DollarSign className="w-4 h-4" />
                </div>
                <h4 className="font-sans font-bold text-sm text-[#2C2B29]">Painel Financeiro</h4>
              </div>
              <p className="text-xs text-[#8C8273] font-light leading-relaxed">
                Visualize seu histórico, consulte faturas e acesse recibos para reembolso de forma transparente.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D8] rounded-2xl space-y-3 shadow-xs hover:shadow-sm transition-all duration-300">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#607762]/10 text-[#607762] rounded-lg">
                  <Palette className="w-4 h-4" />
                </div>
                <h4 className="font-sans font-bold text-sm text-[#2C2B29]">Temas de Cores</h4>
              </div>
              <p className="text-xs text-[#8C8273] font-light leading-relaxed">
                Personalize o aplicativo com seu tema favorito! Escolha entre 4 cores sofisticadas: <strong className="text-[#3a7cb5]">Azul</strong>, <strong className="text-[#c77a93]">Rosa</strong>, <strong className="text-[#607762]">Verde</strong> ou o acolhedor <strong className="text-[#3A3530]">Escuro</strong>.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D8] rounded-2xl space-y-3 shadow-xs hover:shadow-sm transition-all duration-300 sm:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#607762]/10 text-[#607762] rounded-lg">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-sans font-bold text-sm text-[#2C2B29]">Segurança & Sigilo Absoluto</h4>
              </div>
              <p className="text-xs text-[#8C8273] font-light leading-relaxed">
                Seus dados e registros protegidos por criptografia de ponta e em conformidade estrita com a LGPD, garantindo total privacidade para a sua jornada clínica.
              </p>
            </div>

          </div>

          {/* Acesso Imediato Card */}
          <div className="bg-white border border-[#E8E2D8] p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-5 shadow-xs">
            <div className="p-3.5 bg-[#607762] text-white rounded-xl shrink-0 flex items-center justify-center">
              <Smartphone className="w-6 h-6 animate-pulse" />
            </div>
            <div className="text-center sm:text-left space-y-1.5">
              <h4 className="font-sans text-xs font-extrabold text-[#2C2B29] uppercase tracking-wider">Acesso Imediato Incluso</h4>
              <p className="text-xs text-[#5D5A56] font-light leading-relaxed">
                Sem taxas adicionais: o aplicativo é um benefício exclusivo e gratuito para todos os pacientes ativos da clínica. Suas chaves de acesso seguro são fornecidas na primeira consulta.
              </p>
            </div>
          </div>

          {/* Bottom Statement */}
          <div className="bg-[#607762]/5 border-l-2 border-[#607762] p-4 rounded-r-xl">
            <p className="text-xs md:text-sm text-[#5D5A56] font-light italic leading-relaxed">
              "Um diferencial exclusivo pensado cuidadosamente para oferecer mais praticidade, previsibilidade e acolhimento em cada etapa da sua evolução terapêutica."
            </p>
          </div>

        </div>

      </div>

      {/* Lightbox Modal (Zoomed View) with Close ("X") Button */}
      {activeImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            {/* Close button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(null);
              }}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors focus:outline-none cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={activeImage} 
              alt="Visualização ampliada do aplicativo" 
              className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </section>
  );
}
