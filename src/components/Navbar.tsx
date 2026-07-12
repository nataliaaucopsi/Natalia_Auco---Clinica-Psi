import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, BookOpen, Check } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onSelectArticle: (articleId: string | null) => void;
  activeArticleId: string | null;
}

export default function Navbar({ onNavigate, onSelectArticle, activeArticleId }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [completedArticles, setCompletedArticles] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const checkProgress = () => {
      try {
        const saved = localStorage.getItem('natalia_interacted_articles_v3');
        if (saved) {
          setCompletedArticles(JSON.parse(saved));
        } else {
          setCompletedArticles({});
        }
      } catch (e) {
        console.error(e);
      }
    };

    checkProgress();
    const interval = setInterval(checkProgress, 1000);

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      clearInterval(interval);
    };
  }, []);

  const articlesList = [
    { id: 'ansiedade', title: '1. Ansiedade' },
    { id: 'depressao', title: '2. Depressão' },
    { id: 'burnout', title: '3. Burnout' },
    { id: 'tdah', title: '4. TDAH' },
    { id: 'autoestima', title: '5. Autoestima' },
    { id: 'autoconhecimento', title: '6. Autoconhecimento' },
    { id: 'narcisismo', title: '7. Narcisismo' },
    { id: 'relacionamentos', title: '8. Relacionamentos' },
    { id: 'tcc', title: '9. Abordagem TCC' },
    { id: 'autismo', title: '10. Autismo (TEA)' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (sectionId: string) => {
    setIsOpen(false);
    setDropdownOpen(false);
    onSelectArticle(null); // Return to home view
    setTimeout(() => {
      onNavigate(sectionId);
    }, 100);
  };

  const handleArticleClickInMenu = (articleId: string) => {
    setIsOpen(false);
    setDropdownOpen(false);
    onSelectArticle(articleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || activeArticleId 
        ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D8] py-4 shadow-xs' 
        : 'bg-[#f3eee7]/40 backdrop-blur-xs py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <button 
          onClick={() => {
            onSelectArticle(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 cursor-pointer group text-left focus:outline-none"
        >
          <div className="w-10 h-10 border border-[#607762]/20 rounded-lg flex items-center justify-center bg-white shadow-xs group-hover:border-[#607762]/60 transition-colors shrink-0 p-0.5">
            <img 
              src="https://i.ibb.co/TxksJxHm/Nat-lia-1.png" 
              alt="Logo Natália Auco" 
              className="w-full h-full object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="font-serif text-lg md:text-xl font-medium text-[#2C2A27] tracking-tight group-hover:text-[#607762] transition-colors leading-none">
              Natália Auco
            </div>
            <div className="text-[10px] text-[#8C8273] tracking-[1.5px] uppercase mt-0.5 font-sans">
              Psicóloga Clínica
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-5">
          
          <button 
            onClick={() => handleTabClick('inicio')}
            className="text-sm font-medium text-[#5D5A56] hover:text-[#607762] border border-transparent hover:border-[#607762] px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none"
          >
            Início
          </button>

          <button 
            onClick={() => handleTabClick('sobre-mim')}
            className="text-sm font-medium text-[#5D5A56] hover:text-[#607762] border border-transparent hover:border-[#607762] px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none"
          >
            Sobre mim
          </button>

          <button 
            onClick={() => handleTabClick('jornada')}
            className="text-sm font-medium text-[#5D5A56] hover:text-[#607762] border border-transparent hover:border-[#607762] px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none"
          >
            Como funciona a terapia
          </button>

          {/* Educational Content Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
              }
              setDropdownOpen(true);
            }}
            onMouseLeave={() => {
              hoverTimeoutRef.current = setTimeout(() => {
                setDropdownOpen(false);
              }, 300);
            }}
          >
            <button 
              onClick={() => handleTabClick('conteudos')}
              className="text-sm font-medium text-[#5D5A56] hover:text-[#607762] border border-transparent hover:border-[#607762] px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1 cursor-pointer focus:outline-none"
            >
              Conteúdo
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute right-1/2 translate-x-1/2 mt-2 w-72 bg-white border border-[#E8E2D8] rounded-2xl shadow-lg py-3 transition-all duration-300 z-50 ${
              dropdownOpen 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 translate-y-2 pointer-events-none'
            }`}>
              <div className="px-4 py-1 border-b border-[#E8E2D8]/50 pb-2 mb-2 flex items-center gap-2 text-xs text-[#8C8273] font-semibold tracking-wider uppercase">
                <BookOpen className="w-3.5 h-3.5 text-[#607762]" />
                Artigos e Estudos
              </div>
              <div className="max-h-[440px] overflow-y-auto no-scrollbar px-1">
                {articlesList.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => handleArticleClickInMenu(art.id)}
                    className="w-full text-left px-3 py-2 text-xs text-[#5D5A56] hover:text-[#607762] hover:bg-[#607762]/5 rounded-xl transition-all font-medium flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#607762]/40"></span>
                      <span>{art.title}</span>
                    </div>
                    {completedArticles[art.id] && (
                      <Check className="w-3.5 h-3.5 text-[#607762] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => handleTabClick('duvidas-frequentes')}
            className="text-sm font-medium text-[#5D5A56] hover:text-[#607762] border border-transparent hover:border-[#607762] px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none"
          >
            Dúvidas
          </button>

          <button 
            onClick={() => handleTabClick('aplicativo-exclusivo')}
            className="text-sm font-medium text-[#5D5A56] hover:text-[#607762] border border-transparent hover:border-[#607762] px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none"
          >
            Aplicativo exclusivo
          </button>

          {/* CTA Button */}
          <a 
            href="https://wa.me/5512991766972"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#607762] hover:bg-[#4a5d4e] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-xs hover:shadow-md uppercase tracking-wider text-center flex items-center justify-center min-w-[140px]"
          >
            Agendar Consulta
          </a>

        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#2C2A27] hover:text-[#607762] transition-colors cursor-pointer focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      <div className={`lg:hidden fixed inset-x-0 top-[72px] bg-[#FAF8F5] border-b border-[#E8E2D8] px-6 py-6 transition-all duration-400 ease-in-out shadow-md z-40 max-h-[calc(100vh-72px)] overflow-y-auto ${
        isOpen 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="flex flex-col gap-5">
          
          <button 
            onClick={() => handleTabClick('inicio')}
            className="text-left text-base font-semibold text-[#2C2A27] py-1 border-b border-[#E8E2D8]/30"
          >
            Início
          </button>

          <button 
            onClick={() => handleTabClick('sobre-mim')}
            className="text-left text-base font-semibold text-[#2C2A27] py-1 border-b border-[#E8E2D8]/30"
          >
            Sobre mim
          </button>

          <button 
            onClick={() => handleTabClick('jornada')}
            className="text-left text-base font-semibold text-[#2C2A27] py-1 border-b border-[#E8E2D8]/30"
          >
            Como funciona a terapia
          </button>

          {/* Educational Content Nested List */}
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => handleTabClick('conteudos')}
              className="text-left text-base font-semibold text-[#2C2A27] py-1 border-b border-[#E8E2D8]/30 flex items-center justify-between"
            >
              Conteúdo
              <ChevronDown className="w-4 h-4 text-[#8C8273]" />
            </button>
            <div className="grid grid-cols-2 gap-2 pl-3 pt-1">
              {articlesList.map((art) => (
                <button
                  key={art.id}
                  onClick={() => handleArticleClickInMenu(art.id)}
                  className="text-left py-1 text-xs text-[#5D5A56] hover:text-[#607762] transition-colors font-medium flex items-center justify-between gap-1.5"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1 h-1 rounded-full bg-[#607762] shrink-0"></span>
                    <span className="truncate">{art.title.replace(/^\d+\.\s*/, '')}</span>
                  </div>
                  {completedArticles[art.id] && (
                    <Check className="w-3.5 h-3.5 text-[#607762] shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => handleTabClick('duvidas-frequentes')}
            className="text-left text-base font-semibold text-[#2C2A27] py-1 border-b border-[#E8E2D8]/30"
          >
            Dúvidas
          </button>

          <button 
            onClick={() => handleTabClick('aplicativo-exclusivo')}
            className="text-left text-base font-semibold text-[#2C2A27] py-1 border-b border-[#E8E2D8]/30"
          >
            Aplicativo exclusivo
          </button>

          <a 
            href="https://wa.me/5512991766972"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#607762] text-white text-center py-3.5 rounded-full font-semibold transition-all duration-300 shadow-sm uppercase tracking-wider text-sm mt-2"
          >
            Agendar Consulta via WhatsApp
          </a>

        </div>
      </div>
    </nav>
  );
}
