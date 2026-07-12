import { useRef, useState, useEffect } from 'react';
import { reviewsData } from '../data/reviews';

export default function Reviews() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const [canReadMore, setCanReadMore] = useState<Record<number, boolean>>({});

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector('.review-card');
      if (card) {
        const scrollAmount = (card as HTMLElement).offsetWidth + 24;
        carouselRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Check which reviews actually overflow 3 lines on mount
  useEffect(() => {
    const checkOverflow = () => {
      const updatedCanReadMore: Record<number, boolean> = {};
      reviewsData.forEach((review) => {
        const element = document.getElementById(`review-text-${review.id}`);
        if (element) {
          // Check if scrollHeight is greater than clientHeight
          const isOverflowing = element.scrollHeight > element.clientHeight;
          updatedCanReadMore[review.id] = isOverflowing;
        }
      });
      setCanReadMore(updatedCanReadMore);
    };

    // Small delay to ensure elements are rendered
    const timer = setTimeout(checkOverflow, 200);
    window.addEventListener('resize', checkOverflow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  return (
    <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto" id="depoimentos">
      
      {/* HEADER & RATING SUMMARY */}
      <header className="text-center mb-12">
        <h2 className="font-serif font-semibold text-3xl md:text-4.5xl text-[#2A2F2B] leading-tight tracking-tight mb-8">
          Veja o que os pacientes estão dizendo do atendimento
        </h2>
        
        <div className="inline-flex flex-col sm:flex-row items-center justify-between bg-white border border-[#E8E2D8] rounded-[24px] sm:rounded-full py-5 px-6 md:px-8 shadow-xs gap-4 sm:gap-12 max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="font-serif font-semibold text-3xl text-[#2C2A27]">5,0</span>
            <div className="flex text-[#F59E0B] text-lg tracking-xs">★★★★★</div>
            <span className="text-[#6B7270] text-sm font-medium">11 avaliações no Google</span>
          </div>
          <a 
            href="https://www.google.com/search?hl=pt-BR&gl=br&q=Psic%C3%B3loga+Nat%C3%A1lia+Auco" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[#7A9B82] hover:bg-[#65856D] text-white text-xs md:text-sm font-medium py-3 px-6 rounded-full transition-all duration-300 whitespace-nowrap shadow-xs"
          >
            Avalie-nos no Google
          </a>
        </div>
      </header>

      {/* CAROUSEL WRAPPER */}
      <div className="relative">
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 no-scrollbar items-start"
        >
          {reviewsData.map((review) => {
            const isExpanded = !!expandedCards[review.id];
            const hasMore = canReadMore[review.id] !== false; // Default to true if not measured yet

            return (
              <article 
                key={review.id}
                className="review-card flex-shrink-0 w-[310px] md:w-[340px] bg-white border border-[#E8E2D8] rounded-[22px] p-6 md:p-8 snap-start shadow-xs hover:border-[#d8d0c3] hover:shadow-md transition-all duration-400 flex flex-col"
                style={{ 
                  height: isExpanded ? 'auto' : '310px',
                  minHeight: '310px'
                }}
              >
                {/* User Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-serif font-semibold text-lg flex-shrink-0"
                    style={{ backgroundColor: review.avatarBg }}
                  >
                    {review.avatarLetter}
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg text-[#2A2F2B] flex items-center gap-1.5">
                      {review.name}
                      <span className="inline-block w-3.5 h-3.5 bg-[#10B981] rounded-full relative" title="Avaliação Verificada">
                        <span className="absolute left-[4.5px] top-[2.5px] w-[4px] h-[7px] border-white border-r-2 border-b-2 rotate-45 transform"></span>
                      </span>
                    </h3>
                    <div className="text-xs text-[#6B7270] mt-0.5">{review.date}</div>
                  </div>
                </div>

                {/* Stars */}
                <div className="text-[#F59E0B] text-sm tracking-xs mb-4">
                  {'★'.repeat(review.stars)}
                </div>

                {/* Review Text Area */}
                <div className="flex-1 flex flex-col justify-between">
                  <p 
                    id={`review-text-${review.id}`}
                    className={`text-sm md:text-[0.95rem] font-light text-[#6B7270] leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}
                  >
                    {review.text}
                  </p>
                  
                  {/* Show toggle button only if text exceeds height */}
                  {hasMore && (
                    <button 
                      onClick={() => toggleExpand(review.id)}
                      className="text-left text-xs font-semibold text-[#7A9B82] hover:text-[#65856D] hover:underline mt-4 pt-2 border-t border-neutral-100/50 cursor-pointer transition-colors"
                    >
                      {isExpanded ? 'Ler menos' : 'Leia mais'}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-center gap-3 mt-6 px-2">
          <button 
            onClick={() => scrollCarousel('left')}
            className="w-11 h-11 rounded-full bg-white border border-[#E8E2D8] text-[#2A2F2B] flex items-center justify-center cursor-pointer shadow-xs hover:bg-[#f3eee7] hover:border-[#6B7270] transition-all duration-300"
            aria-label="Avaliações Anteriores"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button 
            onClick={() => scrollCarousel('right')}
            className="w-11 h-11 rounded-full bg-white border border-[#E8E2D8] text-[#2A2F2B] flex items-center justify-center cursor-pointer shadow-xs hover:bg-[#f3eee7] hover:border-[#6B7270] transition-all duration-300"
            aria-label="Próximas Avaliações"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

    </section>
  );
}
