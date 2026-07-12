import { useState, useEffect } from 'react';
import { 
  Activity, 
  CloudRain, 
  Zap, 
  Brain, 
  Sparkles, 
  Compass, 
  ShieldAlert, 
  Heart, 
  BrainCircuit, 
  Puzzle,
  Check
} from 'lucide-react';

interface ConteudoProps {
  onSelectArticle: (articleId: string) => void;
}

export default function Conteudo({ onSelectArticle }: ConteudoProps) {
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
    // Periodically update to catch changes
    const interval = setInterval(checkProgress, 1000);
    return () => clearInterval(interval);
  }, []);
  const articlesList = [
    {
      id: 'ansiedade',
      title: '1. Ansiedade',
      category: 'Psicologia Clínica',
      icon: Activity,
      summary: 'Entenda os sintomas, como lidar e formas de aliviar o estresse no dia a dia com a ajuda da Terapia Cognitivo-Comportamental.'
    },
    {
      id: 'depressao',
      title: '2. Depressão',
      category: 'Psicologia Clínica',
      icon: CloudRain,
      summary: 'Como identificar os sinais, causas e a importância do tratamento adequado para resgatar o entusiasmo e a autonomia.'
    },
    {
      id: 'burnout',
      title: '3. Burnout',
      category: 'Psicologia Clínica',
      icon: Zap,
      summary: 'Reconheça os sinais de esgotamento físico e emocional crônico no ambiente de trabalho e saiba como recuperar seu equilíbrio.'
    },
    {
      id: 'tdah',
      title: '4. TDAH',
      category: 'Neuropsicologia',
      icon: Brain,
      summary: 'Sintomas comuns de déficit de atenção e hiperatividade em adultos, diagnóstico e ferramentas práticas de foco.'
    },
    {
      id: 'autoestima',
      title: '5. Autoestima',
      category: 'Crescimento Pessoal',
      icon: Sparkles,
      summary: 'Como fortalecer sua autoconfiança, calar a voz da autocrítica destrutiva e construir uma relação respeitosa consigo mesma.'
    },
    {
      id: 'autoconhecimento',
      title: '6. Autoconhecimento',
      category: 'Crescimento Pessoal',
      icon: Compass,
      summary: 'Descubra como olhar para dentro e decifrar seus valores, crenças e necessidades transforma suas escolhas e sua vida.'
    },
    {
      id: 'narcisismo',
      title: '7. Narcisismo',
      category: 'Relações Saudáveis',
      icon: ShieldAlert,
      summary: 'Compreenda os traços de personalidade narcisista, como identificar ciclos de manipulação emocional e resgatar sua identidade.'
    },
    {
      id: 'relacionamentos',
      title: '8. Relacionamentos',
      category: 'Relações Saudáveis',
      icon: Heart,
      summary: 'Dúvidas e desafios comuns em vínculos afetivos, dependência emocional, limites pessoais e comunicação assertiva.'
    },
    {
      id: 'tcc',
      title: '9. Abordagem TCC',
      category: 'Abordagem Clínica',
      icon: BrainCircuit,
      summary: 'Saiba como a Terapia Cognitivo-Comportamental atua modificando pensamentos disfuncionais e comportamentos automáticos.'
    },
    {
      id: 'autismo',
      title: '10. Autismo (TEA)',
      category: 'Neuropsicologia',
      icon: Puzzle,
      summary: 'Compreenda os sinais e o alívio que o diagnóstico tardio de Autismo Nível 1 traz para adultos na compreensão da sua biografia.'
    }
  ];

  return (
    <section className="py-20 md:py-28 px-4 max-w-6xl mx-auto relative z-10" id="conteudos">
      
      {/* Decorative Top Stars */}
      <div className="flex justify-center gap-1.5 text-[#C47D68] text-sm tracking-wide mb-3 select-none">
        ✦ ✦ ✦
      </div>
      
      <header className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <h2 className="font-serif font-medium text-4xl md:text-5xl text-[#2C3C34] tracking-tight mb-4">
          Espaço de Conhecimento
        </h2>
        <p className="font-sans font-light text-[#64746B] text-base md:text-[1.05rem] leading-[1.75] max-w-2xl mx-auto tracking-wide">
          Textos informativos e práticos fundamentados na ciência cognitiva para ajudar você a decifrar seus padrões emocionais diários.
        </p>
      </header>

      {/* ARTICLE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {articlesList.map((article) => {
          const IconComponent = article.icon;
          return (
            <button 
              key={article.id}
              onClick={() => {
                onSelectArticle(article.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-white border border-[#E8E2D8] rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-xs hover:border-[#6B8374] hover:shadow-md hover:-translate-y-[2px] transition-all duration-400 text-left cursor-pointer focus:outline-none"
            >
              <div>
                {/* Category & Icon Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#6B8374]/10 text-[#6B8374] text-[0.7rem] font-semibold tracking-wider px-3 py-1.5 rounded-full uppercase">
                      {article.category}
                    </span>
                    {completedArticles[article.id] && (
                      <span className="bg-[#607762]/10 text-[#607762] text-[0.62rem] font-bold tracking-wider px-2 py-0.5 rounded-md uppercase flex items-center gap-0.5 border border-[#607762]/20">
                        <Check className="w-3 h-3" /> Feito
                      </span>
                    )}
                  </div>
                  <div className="p-2.5 bg-[#FAF8F5] rounded-xl text-[#6B8374] group-hover:bg-[#6B8374] group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Title & Summary */}
                <h3 className="font-serif text-2xl font-bold text-[#2C3C34] group-hover:text-[#6B8374] transition-colors leading-tight mb-3">
                  {article.title}
                </h3>
                
                <p className="text-sm font-light text-[#64746B] leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              {/* Action Link Row */}
              <div className="text-xs font-semibold text-[#7A8B7C] tracking-wider uppercase flex items-center gap-1.5 pt-4 border-t border-neutral-100 group-hover:text-[#6B8374] transition-colors">
                Ler artigo completo <span>&rarr;</span>
              </div>
            </button>
          );
        })}
      </div>

    </section>
  );
}
