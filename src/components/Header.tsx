import { useState, useEffect } from 'react';

export default function Header() {
  const words = ["sua ansiedade.", "seus relacionamentos.", "sua saúde mental.", "você."];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Typewriter effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2200);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 45 : 90);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  // Blink effect for cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="pt-6 pb-20 md:pb-32 text-center w-full" id="inicio">
      {/* Elegant Widescreen Decorative Banner with soft bottom blending */}
      <div className="w-full overflow-hidden mb-10 md:mb-12 bg-[#FAF8F5]">
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="w-full h-[180px] sm:h-[280px] md:h-[380px] overflow-hidden rounded-2xl border border-[#E8E2D8]/40 shadow-xs bg-[#FAF8F5]">
            <img 
              src="https://i.ibb.co/Ld2BkQdf/Banner-clinica-definitivo.jpg" 
              alt="Banner decorativo" 
              className="w-full h-full object-cover object-center select-none pointer-events-none block"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Soft bottom-only feathered gradient blending with the page background */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#f3eee7] via-[#f3eee7]/40 to-transparent pointer-events-none rounded-b-2xl" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2C2A27] leading-tight tracking-tight min-h-[140px] sm:min-h-[120px] md:min-h-[144px] lg:min-h-[180px] flex flex-col justify-center items-center">
          <span className="block">Encontre um espaço seguro para cuidar de</span>
          <span className="text-[#607762] italic font-medium relative inline-block md:mt-2 min-h-[1.2em]">
            {words[index].substring(0, subIndex)}
            <span className={`inline-block w-[2px] h-[1.1em] bg-[#607762] ml-1 absolute -right-[4px] top-[10%] transition-opacity duration-100 ${blink ? 'opacity-100' : 'opacity-0'}`}></span>
          </span>
        </h1>
      </div>
    </header>
  );
}
