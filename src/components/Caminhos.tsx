import { useRef, useState } from 'react';
import { pathCardsData } from '../data/paths';

export default function Caminhos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const scrollToCard = (index: number) => {
    if (trackRef.current) {
      const children = Array.from(trackRef.current.children) as HTMLElement[];
      if (children[index]) {
        const targetChild = children[index];
        const containerWidth = trackRef.current.clientWidth;
        const cardWidth = targetChild.clientWidth;
        
        // Centering calculation
        const scrollLeft = targetChild.offsetLeft - (containerWidth - cardWidth) / 2;
        trackRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
        setActiveCardIndex(index);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    let nextIndex = direction === 'left' ? activeCardIndex - 1 : activeCardIndex + 1;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= pathCardsData.length) nextIndex = pathCardsData.length - 1;
    scrollToCard(nextIndex);
  };

  const handleScroll = () => {
    if (trackRef.current) {
      const children = Array.from(trackRef.current.children) as HTMLElement[];
      const containerLeft = trackRef.current.getBoundingClientRect().left;
      const containerCenter = containerLeft + trackRef.current.clientWidth / 2;
      
      let closestIndex = 0;
      let minDistance = Infinity;
      
      children.forEach((child, idx) => {
        const childRect = child.getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;
        const distance = Math.abs(childCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });
      
      setActiveCardIndex(closestIndex);
    }
  };

  // Helper to render matching SVGs from their source code
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        );
      case 'Shield':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case 'Sun':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        );
      case 'Eye':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      case 'Activity':
      default:
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        );
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto" id="caminhos">
      <header className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-serif font-light text-4xl md:text-5xl text-[#2C3E35] tracking-tight mb-6">
          Talvez você se reconheça em alguns desses caminhos.
        </h2>
        <p className="font-serif font-medium text-lg md:text-xl text-[#7A8B7B] leading-relaxed italic">
          A ansiedade e o esgotamento sutil costumam se disfarçar de rotina normal. Identificar esses padrões com acolhimento é o verdadeiro início do seu alívio.
        </p>
      </header>

      <div className="relative px-2 md:px-16">
        {/* Navigation Arrows for Desktop */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#E8E2D8] text-[#2C3E35] hidden md:flex items-center justify-center cursor-pointer z-10 shadow-md hover:border-[#7A8B7C] hover:text-[#7A8B7C] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Anterior"
          disabled={activeCardIndex === 0}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#E8E2D8] text-[#2C3E35] hidden md:flex items-center justify-center cursor-pointer z-10 shadow-md hover:border-[#7A8B7C] hover:text-[#7A8B7C] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Próximo"
          disabled={activeCardIndex === pathCardsData.length - 1}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Track */}
        <div 
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory py-6 px-3 no-scrollbar"
        >
          {pathCardsData.map((card) => {
            const isFlipped = !!flippedCards[card.id];
            return (
              <div 
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="flex-shrink-0 w-[300px] md:w-[320px] h-[440px] snap-center cursor-pointer perspective"
              >
                <div 
                  className={`relative w-full h-full preserve-3d transition-transform duration-700 ease-out ${isFlipped ? 'rotate-y-180' : ''}`}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 bg-white border border-[#E8E2D8] rounded-[22px] p-8 flex flex-col justify-between shadow-sm backface-hidden">
                    <div>
                      <div className="text-[#C27A68] mb-6">
                        {renderIcon(card.iconName)}
                      </div>
                      <h3 className="font-serif text-2xl font-semibold text-[#2C3E35] mb-4 leading-tight">
                        {card.title}
                      </h3>
                      <p className="text-sm font-light text-[#4A534D] leading-relaxed">
                        {card.symptom}
                      </p>
                    </div>
                    <div className="text-xs font-semibold text-[#7A8B7B] tracking-wider uppercase flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                      Ver o alívio <span>&rarr;</span>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 bg-[#FAFAFA] border border-[#E8E2D8] rounded-[22px] p-8 flex flex-col justify-center items-start shadow-sm rotate-y-180 backface-hidden">
                    <span className="text-[0.72rem] font-semibold text-[#C27A68] tracking-widest uppercase mb-4">
                      Na Terapia
                    </span>
                    <p className="font-serif text-lg font-light text-[#2C3E35] leading-relaxed">
                      {card.relief}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center justify-center gap-5 mt-6">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              scroll('left');
            }}
            className="w-10 h-10 rounded-full bg-white border border-[#E8E2D8] text-[#2C3E35] flex items-center justify-center active:scale-95 transition-transform shadow-sm cursor-pointer"
            aria-label="Anterior"
            disabled={activeCardIndex === 0}
            style={{ opacity: activeCardIndex === 0 ? 0.4 : 1 }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex flex-col items-center gap-1.5 px-1">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#7A8B7B]">
              Arraste para o lado
            </span>
            <div className="flex gap-2 justify-center">
              {pathCardsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToCard(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeCardIndex === idx 
                      ? 'w-6 bg-[#7A8B7B]' 
                      : 'w-2 bg-[#7A8B7B]/30 hover:bg-[#7A8B7B]/50'
                  }`}
                  aria-label={`Ir para caminho ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              scroll('right');
            }}
            className="w-10 h-10 rounded-full bg-white border border-[#E8E2D8] text-[#2C3E35] flex items-center justify-center active:scale-95 transition-transform shadow-sm cursor-pointer"
            aria-label="Próximo"
            disabled={activeCardIndex === pathCardsData.length - 1}
            style={{ opacity: activeCardIndex === pathCardsData.length - 1 ? 0.4 : 1 }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
