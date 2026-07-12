import { useState, useEffect, DragEvent } from 'react';
import { ArrowLeft, ArrowRight, Brain, Sparkles, Compass, Eye, Heart, BrainCircuit, Puzzle, Activity, ShieldAlert, Check } from 'lucide-react';

const articlesOrdered = [
  { id: 'ansiedade', title: 'Ansiedade' },
  { id: 'depressao', title: 'Depressão' },
  { id: 'burnout', title: 'Burnout' },
  { id: 'tdah', title: 'TDAH' },
  { id: 'autoestima', title: 'Autoestima' },
  { id: 'autoconhecimento', title: 'Autoconhecimento' },
  { id: 'narcisismo', title: 'Narcisismo' },
  { id: 'relacionamentos', title: 'Relacionamentos' },
  { id: 'tcc', title: 'Abordagem TCC' },
  { id: 'autismo', title: 'Autismo (TEA)' }
];

const articleMilestones: Record<string, {
  percentageBefore: number;
  percentageAfter: number;
  currentWidgetName: string;
  nextStopTitle: string;
  nextStopDesc: string;
  nextArticleId: string | null;
  hook: string;
}> = {
  ansiedade: {
    percentageBefore: 0,
    percentageAfter: 10,
    currentWidgetName: "Raio-X Mental",
    nextStopTitle: "Depressão",
    nextStopDesc: "depressão",
    nextArticleId: "depressao",
    hook: "Você sabia que a ansiedade persistente e a sobrecarga mental não tratadas funcionam como um vazamento silencioso de energia que, a longo prazo, pode desbocar em um quadro de depressão profunda? Compreender a relação íntima entre esses dois estados é o próximo passo essencial da sua jornada. No próximo capítulo, falaremos detalhadamente sobre a depressão."
  },
  depressao: {
    percentageBefore: 10,
    percentageAfter: 20,
    currentWidgetName: "Mapeamento Vital",
    nextStopTitle: "Termômetro de Exaustão",
    nextStopDesc: "termômetro de exaustão",
    nextArticleId: "burnout",
    hook: "Quando a bateria emocional atinge níveis críticos, o corpo e a mente começam a sinalizar uma pane total. Muitas vezes confundimos exaustão profissional com tristeza crônica. Descubra como a pressão e o esgotamento no trabalho moldam a sua mente através do nosso Termômetro de Exaustão no próximo artigo."
  },
  burnout: {
    percentageBefore: 20,
    percentageAfter: 30,
    currentWidgetName: "Termômetro de Exaustão",
    nextStopTitle: "Desmistificando o Foco",
    nextStopDesc: "desmistificando o foco",
    nextArticleId: "tdah",
    hook: "Muitos adultos sofrem com esgotamento extremo (Burnout) tentando compensar, sem saber, um cérebro atípico. A exaustão pode ser o resultado de uma vida inteira lutando contra a desatenção e a hiperatividade mental silenciosa. Descubra a verdade por trás do foco e da procrastinação crônica no próximo conteúdo."
  },
  tdah: {
    percentageBefore: 30,
    percentageAfter: 40,
    currentWidgetName: "Desmistificando o Foco",
    nextStopTitle: "Espelho da Autovalorização",
    nextStopDesc: "espelho da autovalorização",
    nextArticleId: "autoestima",
    hook: "Uma mente que lida constantemente com críticas, esquecimentos e cobranças por produtividade acaba internalizando a sensação de insuficiência. Isso corrói a autoimagem e destrói o amor-próprio. No próximo artigo, use o Espelho da Autovalorização para reconstruir os pilares da sua autoestima."
  },
  autoestima: {
    percentageBefore: 40,
    percentageAfter: 50,
    currentWidgetName: "Espelho da Autovalorização",
    nextStopTitle: "Prateleiras Mentais",
    nextStopDesc: "prateleiras mentais",
    nextArticleId: "autoconhecimento",
    hook: "Para curar a autoestima, precisamos primeiro olhar para dentro e mapear o que realmente valorizamos, organizando nossas gavetas emocionais. Sem se conhecer de verdade, é impossível se amar. No próximo passo, monte suas Prateleiras Mentais em um exercício interativo de autodescoberta."
  },
  autoconhecimento: {
    percentageBefore: 50,
    percentageAfter: 60,
    currentWidgetName: "Prateleiras Mentais",
    nextStopTitle: "Raio-X da Empatia",
    nextStopDesc: "raio-x da empatia",
    nextArticleId: "narcisismo",
    hook: "À medida que organizamos nosso mundo interno, percebemos que o equilíbrio entre o amor de si e a empatia com o outro é uma linha tênue. Como diferenciar uma autoestima saudável de dinâmicas de poder e egocentrismo? No próximo artigo, desvende os mistérios das relações abusivas no Raio-X da Empatia."
  },
  narcisismo: {
    percentageBefore: 60,
    percentageAfter: 70,
    currentWidgetName: "Raio-X da Empatia",
    nextStopTitle: "Portais da Conexão",
    nextStopDesc: "portais da conexão",
    nextArticleId: "relacionamentos",
    hook: "As marcas deixadas por relações desgastantes ou perfis egocêntricos moldam diretamente a forma como nos apegamos e confiamos nas pessoas hoje. Como criar conexões saudáveis após tantas feridas? Conheça os seus padrões de apego e abra os Portais da Conexão no próximo conteúdo."
  },
  relacionamentos: {
    percentageBefore: 70,
    percentageAfter: 80,
    currentWidgetName: "Portais da Conexão",
    nextStopTitle: "Máquina do Tempo Cognitiva",
    nextStopDesc: "máquina do tempo cognitiva",
    nextArticleId: "tcc",
    hook: "Nossos padrões nos relacionamentos são governados por crenças profundas e pensamentos automáticos formados na infância. Mas e se você pudesse reescrever esses pensamentos em tempo real? Descubra o poder da Máquina do Tempo Cognitiva na nossa introdução prática à Terapia Cognitivo-Comportamental."
  },
  tcc: {
    percentageBefore: 80,
    percentageAfter: 90,
    currentWidgetName: "Máquina do Tempo Cognitiva",
    nextStopTitle: "Linha do Tempo do Neurodesenvolvimento",
    nextStopDesc: "linha do tempo do neurodesenvolvimento",
    nextArticleId: "autismo",
    hook: "A reestruturação de pensamentos e comportamentos nos mostra que cada cérebro funciona sob regras e conexões neurais únicas. Compreender a neurodiversidade e os sinais de autismo em adultos é o ápice do respeito à individualidade. No próximo artigo, navegue pela Linha do Tempo do Neurodesenvolvimento."
  },
  autismo: {
    percentageBefore: 90,
    percentageAfter: 100,
    currentWidgetName: "Linha do Tempo",
    nextStopTitle: "",
    nextStopDesc: "",
    nextArticleId: null,
    hook: ""
  }
};

interface ArticleReaderProps {
  articleId: string;
  onBack: () => void;
  onNavigateToArticle: (articleId: string) => void;
}

export default function ArticleReader({ articleId, onBack, onNavigateToArticle }: ArticleReaderProps) {
  const currentIndex = articlesOrdered.findIndex(art => art.id === articleId);
  const prevArticle = currentIndex > 0 ? articlesOrdered[currentIndex - 1] : null;
  const nextArticle = currentIndex < articlesOrdered.length - 1 ? articlesOrdered[currentIndex + 1] : null;

  // Track completed status of interactive widgets for each article
  const [interactedArticles, setInteractedArticles] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('natalia_interacted_articles_v3');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('natalia_interacted_articles_v3', JSON.stringify(interactedArticles));
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  }, [interactedArticles]);

  // States for Depressão: Battery Level
  const [batteryLevel, setBatteryLevel] = useState<number>(60);

  // States for Ansiedade: Active X-ray hotspot
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [visitedHotspots, setVisitedHotspots] = useState<string[]>([]);

  const handleHotspotActivate = (hotspot: string) => {
    setActiveHotspot(hotspot);
    setVisitedHotspots(prev => {
      if (!prev.includes(hotspot)) {
        return [...prev, hotspot];
      }
      return prev;
    });
  };

  // State for showing completion pop-up at 100% progress
  const [showCompletionPopup, setShowCompletionPopup] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // States for Burnout: Symptom Tag Classifier
  const initialTags = [
    { id: 's1', text: 'Não descanso nem no domingo' },
    { id: 's2', text: 'Irritação com clientes e colegas' },
    { id: 's3', text: 'Cansaço que não passa com o sono' },
    { id: 's4', text: 'Sentimento de incompetência constante' },
    { id: 's5', text: 'Tensão muscular facial e cervical' },
    { id: 's6', text: 'Mudanças bruscas de humor no trabalho' },
    { id: 's7', text: 'Sensação de "vazio" emocional' },
    { id: 's8', text: 'Isolamento social e profissional' },
  ];
  const [availableTags, setAvailableTags] = useState(initialTags);
  const [comumZone, setComumZone] = useState<typeof initialTags>([]);
  const [cronicoZone, setCronicoZone] = useState<typeof initialTags>([]);
  const [burnoutResult, setBurnoutResult] = useState<string | null>(null);

  const moveTag = (tagId: string, targetZone: 'available' | 'comum' | 'cronico') => {
    let tagToMove: typeof initialTags[0] | undefined;
    
    // Find tag in any zone
    tagToMove = availableTags.find(t => t.id === tagId);
    if (tagToMove) setAvailableTags(prev => prev.filter(t => t.id !== tagId));
    
    if (!tagToMove) {
      tagToMove = comumZone.find(t => t.id === tagId);
      if (tagToMove) setComumZone(prev => prev.filter(t => t.id !== tagId));
    }
    
    if (!tagToMove) {
      tagToMove = cronicoZone.find(t => t.id === tagId);
      if (tagToMove) setCronicoZone(prev => prev.filter(t => t.id !== tagId));
    }

    if (!tagToMove) return;

    // Move to target
    if (targetZone === 'available') {
      setAvailableTags(prev => [...prev, tagToMove!]);
    } else if (targetZone === 'comum') {
      setComumZone(prev => [...prev, tagToMove!]);
    } else if (targetZone === 'cronico') {
      setCronicoZone(prev => [...prev, tagToMove!]);
    }
    
    // Clear result if tags changed
    setBurnoutResult(null);
  };

  const handleCheckBurnoutResults = () => {
    const totalClassified = comumZone.length + cronicoZone.length;
    const cronicoCount = cronicoZone.length;

    if (totalClassified < 3) {
      setBurnoutResult(`Por favor, ordene pelo menos 3 sintomas antes de conferir os resultados. (Restam ${availableTags.length} sintomas na caixa de cima).`);
      return;
    }

    if (cronicoCount === 0) {
      setBurnoutResult(`Você identificou ${comumZone.length} sinais de cansaço ou sobrecarga leve. Embora não configure esgotamento crônico, é um importante sinal de alerta para rever sua rotina. A psicoterapia pode te ajudar a estabelecer limites saudáveis, organizar sua rotina de descanso e gerenciar o estresse antes que ele se acumule.`);
    } else if (cronicoCount <= 3) {
      setBurnoutResult(`Você identificou ${cronicoCount} sinais de alerta severos de esgotamento. O início do esgotamento afeta diretamente o seu equilíbrio emocional, físico e a sua produtividade. Na terapia, trabalhamos de forma personalizada para identificar os principais gatilhos de sobrecarga no seu trabalho, desenvolvendo estratégias eficientes de enfrentamento e recuperação do bem-estar.`);
    } else {
      setBurnoutResult(`Atenção: Você identificou ${cronicoCount} sinais de Esgotamento Crônico de Burnout. Um ciclo de exaustão constante e prolongada é prejudicial para a sua saúde mental e física. A psicoterapia oferece um espaço seguro e especializado para tratar o esgotamento, ajudando você a reestruturar suas demandas, aprender a delegar, estabelecer limites firmes e resgatar o prazer em sua vida pessoal e profissional.`);
    }
  };

  // States for TDAH: myths cards flipped state
  const [flippedTdah, setFlippedTdah] = useState<Record<number, boolean>>({});

  // States for Autoestima: scratch tiles
  const [scratchedTiles, setScratchedTiles] = useState<Record<number, boolean>>({});

  // States for Narcissism: Decision Tree Step
  const [narcissismStep, setNarcissismStep] = useState<string>('layer-1');

  // States for Relationships: Door Test Selection
  const [relationshipsDoor, setRelationshipsDoor] = useState<string>('gate-selection');

  // States for TCC: Time Machine Slider Value
  const [tccSliderValue, setTccSliderValue] = useState<number>(50);

  // States for Autism: Chronological Timeline Phase Index
  const [autismTimelineIndex, setAutismTimelineIndex] = useState<number>(0);

  // States for Autoconhecimento: Prateleiras Mentais (Shelves)
  const initialShelfCards = [
    { id: 'saude', label: 'Saúde e Disposição', weight: 3 },
    { id: 'intelectual', label: 'Desenvolvimento Intelectual', weight: 1 },
    { id: 'emocional', label: 'Equilíbrio Emocional', weight: 3 },
    { id: 'social-contrib', label: 'Contribuição Social', weight: 1 },
    { id: 'financeiro', label: 'Recursos Financeiros', weight: 2 },
    { id: 'proposito', label: 'Realização e Propósito', weight: 2 },
    { id: 'vidadigital', label: 'Vida Social', weight: 2 },
    { id: 'amor', label: 'Relacionamento Amoroso', weight: 3 },
    { id: 'familia', label: 'Família', weight: 3 },
    { id: 'lazer', label: 'Hobbies e Diversão', weight: 2 },
    { id: 'felicidade', label: 'Plenitude e Felicidade', weight: 3 },
    { id: 'espiritualidade', label: 'Espiritualidade', weight: 1 },
  ];

  const [shelfPool, setShelfPool] = useState(initialShelfCards);
  const [shelfMax, setShelfMax] = useState<typeof initialShelfCards>([]);
  const [shelfMid, setShelfMid] = useState<typeof initialShelfCards>([]);
  const [shelfMin, setShelfMin] = useState<typeof initialShelfCards>([]);
  const [selectedShelfCard, setSelectedShelfCard] = useState<typeof initialShelfCards[0] | null>(null);

  const [shelfResultCalculated, setShelfResultCalculated] = useState(false);
  const [shelfScore, setShelfScore] = useState(0);
  const [shelfPercentage, setShelfPercentage] = useState(0);
  const [shelfInterpretation, setShelfInterpretation] = useState('');
  const [shelfInsights, setShelfInsights] = useState<string[]>([]);

  // Function to move shelf card
  const moveShelfCard = (cardId: string, targetZone: 'pool' | 'max' | 'mid' | 'min') => {
    let cardToMove: typeof initialShelfCards[0] | undefined;

    // Find card and remove from current zone
    cardToMove = shelfPool.find(c => c.id === cardId);
    if (cardToMove) {
      setShelfPool(prev => prev.filter(c => c.id !== cardId));
    } else {
      cardToMove = shelfMax.find(c => c.id === cardId);
      if (cardToMove) {
        setShelfMax(prev => prev.filter(c => c.id !== cardId));
      } else {
        cardToMove = shelfMid.find(c => c.id === cardId);
        if (cardToMove) {
          setShelfMid(prev => prev.filter(c => c.id !== cardId));
        } else {
          cardToMove = shelfMin.find(c => c.id === cardId);
          if (cardToMove) {
            setShelfMin(prev => prev.filter(c => c.id !== cardId));
          }
        }
      }
    }

    if (!cardToMove) return;

    // Add to target zone
    if (targetZone === 'pool') {
      setShelfPool(prev => [...prev, cardToMove!]);
    } else if (targetZone === 'max') {
      setShelfMax(prev => [...prev, cardToMove!]);
    } else if (targetZone === 'mid') {
      setShelfMid(prev => [...prev, cardToMove!]);
    } else if (targetZone === 'min') {
      setShelfMin(prev => [...prev, cardToMove!]);
    }

    // Reset calculation if changes occur
    setShelfResultCalculated(false);
  };

  const handleDragStart = (e: DragEvent, card: typeof initialShelfCards[0]) => {
    e.dataTransfer.setData('cardId', card.id);
  };

  const handleDrop = (e: DragEvent, targetZone: 'pool' | 'max' | 'mid' | 'min') => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    if (cardId) {
      moveShelfCard(cardId, targetZone);
    }
  };

  const handleCardClick = (card: typeof initialShelfCards[0]) => {
    if (selectedShelfCard?.id === card.id) {
      setSelectedShelfCard(null);
    } else {
      setSelectedShelfCard(card);
    }
  };

  const handleZoneClick = (targetZone: 'pool' | 'max' | 'mid' | 'min') => {
    if (selectedShelfCard) {
      moveShelfCard(selectedShelfCard.id, targetZone);
      setSelectedShelfCard(null);
    }
  };

  const handleCalculateShelf = () => {
    const totalPlaced = shelfMax.length + shelfMid.length + shelfMin.length;
    if (totalPlaced < 4) {
      alert('Para uma análise consistente, organize pelo menos 4 cartões nas prateleiras mentais.');
      return;
    }

    let score = 0;
    score += shelfMax.length * 2;
    score += shelfMid.length * 1;

    const percentage = Math.round((score / 24) * 100);
    setShelfScore(score);
    setShelfPercentage(percentage);

    let interp = '';
    if (score >= 20) {
      interp = `
        <p><strong>🌿 Estado visual muito equilibrado.</strong></p>
        <p style="margin-top: 8px;">Você demonstra estar dedicando atenção às principais áreas da sua vida. Isso não significa que tudo esteja perfeito, mas mostra um esforço importante para manter uma rotina mais equilibrada. A psicoterapia pode ajudar você a fortalecer ainda mais esse processo, prevenir sobrecargas futuras e desenvolver estratégias para lidar com desafios antes que eles se tornem maiores.</p>
      `;
    } else if (score >= 13) {
      interp = `
        <p><strong>🌱 Equilíbrio intermediário.</strong></p>
        <p style="margin-top: 8px;">Algumas áreas importantes estão recebendo atenção, enquanto outras parecem estar ficando um pouco para trás. Isso acontece com muitas pessoas quando a rotina fica intensa. A terapia pode ajudar você a compreender melhor essas prioridades, reorganizar sua rotina e encontrar formas mais saudáveis de distribuir sua energia.</p>
      `;
    } else {
      interp = `
        <p><strong>🍂 Poucas áreas priorizadas.</strong></p>
        <p style="margin-top: 8px;">Parece que várias áreas importantes da sua vida estão ficando na última prateleira. Quando muitas responsabilidades ocupam todo o espaço, é comum que o cuidado consigo mesmo acabe sendo deixado de lado. A psicoterapia pode ser um espaço seguro para reorganizar essas prioridades, compreender o que está acontecendo e construir uma rotina mais equilibrada.</p>
      `;
    }
    setShelfInterpretation(interp);

    // Insights crossings
    const insights: string[] = [];
    const inMinIds = shelfMin.map(c => c.id);

    const saudeAbandonada = inMinIds.includes('saude');
    const emocionalAbandonado = inMinIds.includes('emocional');

    if (saudeAbandonada && emocionalAbandonado) {
      insights.push(`
        <strong>💛 Sua saúde física e emocional ficaram juntas na última prateleira.</strong><br/>
        Isso pode ser um sinal de que você vem direcionando energia para muitas demandas e pouco para si mesmo. Que tal reservar um momento para olhar com mais carinho para você?
      `);
    } else {
      if (saudeAbandonada) {
        insights.push(`
          Percebemos que sua saúde ficou em segundo plano. Ela costuma ser a base para cuidar de todas as outras áreas da vida.
        `);
      }
      if (emocionalAbandonado) {
        insights.push(`
          Seu equilíbrio emocional também apareceu entre as áreas menos cuidadas. Às vezes seguimos funcionando por muito tempo antes de perceber o quanto estamos sobrecarregados.
        `);
      }
    }

    if (inMinIds.includes('familia') && inMinIds.includes('amor') && inMinIds.includes('vidadigital')) {
      insights.push(`
        As conexões afetivas também ficaram em segundo plano. Manter vínculos saudáveis costuma ser uma fonte importante de apoio e bem-estar.
      `);
    }

    if (inMinIds.includes('lazer')) {
      insights.push(`
        Momentos de lazer não são perda de tempo. Eles ajudam o cérebro a descansar, recuperar energia e lidar melhor com os desafios do dia a dia.
      `);
    }

    setShelfInsights(insights);
    setShelfResultCalculated(true);
  };

  // Automatically mark as interacted based on widget state changes
  useEffect(() => {
    if (articleId === 'ansiedade' && visitedHotspots.length >= 2) {
      setInteractedArticles(prev => ({ ...prev, ansiedade: true }));
    }
    if (articleId === 'depressao' && batteryLevel !== 60) {
      setInteractedArticles(prev => ({ ...prev, depressao: true }));
    }
    if (articleId === 'burnout' && burnoutResult !== null) {
      if (burnoutResult.indexOf('Por favor') === -1) {
        setInteractedArticles(prev => ({ ...prev, burnout: true }));
      }
    }
    if (articleId === 'tdah' && Object.keys(flippedTdah).length >= 3) {
      setInteractedArticles(prev => ({ ...prev, tdah: true }));
    }
    if (articleId === 'autoestima' && Object.keys(scratchedTiles).length >= 20) {
      setInteractedArticles(prev => ({ ...prev, autoestima: true }));
    }
    if (articleId === 'autoconhecimento' && shelfResultCalculated) {
      setInteractedArticles(prev => ({ ...prev, autoconhecimento: true }));
    }
    if (articleId === 'narcisismo' && narcissismStep.startsWith('outcome-')) {
      setInteractedArticles(prev => ({ ...prev, narcisismo: true }));
    }
    if (articleId === 'relacionamentos' && relationshipsDoor.startsWith('outcome-')) {
      setInteractedArticles(prev => ({ ...prev, relacionamentos: true }));
    }
    if (articleId === 'tcc' && tccSliderValue !== 50) {
      setInteractedArticles(prev => ({ ...prev, tcc: true }));
    }
    if (articleId === 'autismo' && autismTimelineIndex >= 1) {
      setInteractedArticles(prev => ({ ...prev, autismo: true }));
    }
  }, [
    articleId,
    visitedHotspots,
    batteryLevel,
    burnoutResult,
    flippedTdah,
    scratchedTiles,
    shelfResultCalculated,
    narcissismStep,
    relationshipsDoor,
    tccSliderValue,
    autismTimelineIndex
  ]);

  const currentMilestone = articleMilestones[articleId] || {
    percentageBefore: 0,
    percentageAfter: 10,
    currentWidgetName: "Mapeamento",
    nextStopTitle: "",
    nextStopDesc: "",
    nextArticleId: null,
    hook: ""
  };
  const hasInteracted = !!interactedArticles[articleId];
  const completedCount = Object.keys(interactedArticles).filter(k => interactedArticles[k]).length;
  const progressPercent = Math.round((completedCount / 10) * 100);

  useEffect(() => {
    if (progressPercent === 100) {
      const hasSeen = localStorage.getItem('seen_natalia_completion_popup_v2');
      if (!hasSeen) {
        setShowCompletionPopup(true);
      }
    } else {
      setShowCompletionPopup(false);
    }
  }, [progressPercent]);

  const handleCloseCompletionPopup = () => {
    setShowCompletionPopup(false);
    localStorage.setItem('seen_natalia_completion_popup_v2', 'true');
  };

  return (
    <article className="min-h-screen bg-[#FAF8F5] text-[#2C2A27] pt-24 pb-36 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#7A8B7C] hover:text-[#607762] transition-colors mb-8 cursor-pointer focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </button>

        {/* Render 1. ANSIEDADE */}
        {articleId === 'ansiedade' && (
          <div className="space-y-16">
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] shadow-xs overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                
                {/* SVG mind transition Left panel */}
                <div className="lg:w-[45%] bg-[#F8F7F4] flex items-center justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#E8E2D8]">
                  <div className="w-full max-w-[280px] aspect-square flex items-center justify-center">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-auto" role="img" aria-label="Ilustração abstrata">
                      <path d="M40 100 C 50 150, 70 50, 85 110 C 95 150, 110 70, 120 100 C 130 130, 150 100, 180 100" 
                            stroke="#B9855A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="100" cy="100" r="60" stroke="#868C81" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
                      <circle cx="100" cy="100" r="85" stroke="#E8E2D8" strokeWidth="1"/>
                    </svg>
                  </div>
                </div>

                {/* Article Content Right panel */}
                <div className="lg:w-[55%] p-8 md:p-14 flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#868C81] mb-3">Psicologia Clínica</span>
                  <h1 className="font-serif text-3xl md:text-4.5xl text-[#33312E] leading-tight mb-6 font-medium">Ansiedade</h1>
                  
                  <div className="space-y-4 text-sm md:text-base font-light leading-relaxed text-[#5C6356]">
                    <p>
                      A ansiedade é uma resposta natural do nosso organismo diante de situações de perigo, desafios ou mudanças. Ela faz parte da vida e, em muitos momentos, pode até ser útil, ajudando-nos a agir com mais atenção e preparo. No entanto, quando se torna intensa, frequente ou aparece sem um motivo claro, pode começar a causar sofrimento e interferir na qualidade de vida.
                    </p>
                    <p>
                      Pessoas que convivem com a ansiedade costumam relatar preocupações constantes, dificuldade para relaxar, sensação de que algo ruim está prestes a acontecer, irritabilidade, dificuldade de concentração e alterações no sono. Também é comum que o corpo manifeste sinais como coração acelerado, falta de ar, tensão muscular, tremores, suor excessivo ou desconforto no estômago.
                    </p>
                    <p>
                      Muitas vezes, quem sofre com ansiedade acredita que precisa "aprender a controlar" tudo sozinho ou que isso faz parte da sua personalidade. Porém, viver em estado constante de alerta não precisa ser normal. A ansiedade pode estar relacionada a experiências de vida, padrões de pensamento, estresse acumulado e diversos outros fatores que merecem ser compreendidos com cuidado.
                    </p>
                    <p>
                      A psicoterapia oferece um espaço seguro para entender as causas da ansiedade, identificar os gatilhos que mantêm esse ciclo e desenvolver estratégias para lidar com as emoções de forma mais saudável. O objetivo não é eliminar completamente a ansiedade — afinal, ela faz parte da experiência humana —, mas fazer com que ela deixe de controlar sua vida.
                    </p>
                  </div>

                  <a 
                    href="https://wa.me/5512991766972" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 bg-[#B9855A] hover:bg-[#A3724A] text-white font-medium text-sm px-8 py-3 rounded-full shadow-xs hover:shadow-md transition-all duration-300 w-fit text-center"
                  >
                    Agendar Consulta
                  </a>
                </div>

              </div>
            </section>

            {/* X-Ray Timeline Interactive Widget */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] p-8 md:p-14 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Visual Scanner Column */}
                <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E8E2D8]/50 rounded-2xl p-8 relative overflow-hidden flex flex-col items-center">
                  <div className="relative w-full max-w-[240px]">
                    
                    {/* Hotspots overlapping body outline SVG */}
                    <button 
                      onClick={() => handleHotspotActivate('head')}
                      onMouseEnter={() => handleHotspotActivate('head')}
                      onMouseLeave={() => setActiveHotspot(null)}
                      className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[28%] h-[20%] rounded-full cursor-crosshair z-20 group focus:outline-none"
                      aria-label="Scan mental"
                    >
                      <div className={`absolute inset-0 bg-[#FAF8F5]/45 backdrop-blur-[14px] border border-[#E8E2D8]/30 rounded-full flex items-center justify-center transition-all duration-300 ${activeHotspot === 'head' ? 'opacity-0 scale-90' : 'opacity-100'}`}>
                        <span className="w-1.5 h-1.5 bg-[#6E7E70] rounded-full opacity-60"></span>
                      </div>
                    </button>

                    <button 
                      onClick={() => handleHotspotActivate('throat')}
                      onMouseEnter={() => handleHotspotActivate('throat')}
                      onMouseLeave={() => setActiveHotspot(null)}
                      className="absolute top-[26%] left-1/2 -translate-x-1/2 w-[18%] h-[12%] rounded-full cursor-crosshair z-20 group focus:outline-none"
                      aria-label="Scan garganta"
                    >
                      <div className={`absolute inset-0 bg-[#FAF8F5]/45 backdrop-blur-[14px] border border-[#E8E2D8]/30 rounded-full flex items-center justify-center transition-all duration-300 ${activeHotspot === 'throat' ? 'opacity-0 scale-90' : 'opacity-100'}`}>
                        <span className="w-1.5 h-1.5 bg-[#6E7E70] rounded-full opacity-60"></span>
                      </div>
                    </button>

                    <button 
                      onClick={() => handleHotspotActivate('chest')}
                      onMouseEnter={() => handleHotspotActivate('chest')}
                      onMouseLeave={() => setActiveHotspot(null)}
                      className="absolute top-[38%] left-1/2 -translate-x-1/2 w-[32%] h-[22%] rounded-full cursor-crosshair z-20 group focus:outline-none"
                      aria-label="Scan peito"
                    >
                      <div className={`absolute inset-0 bg-[#FAF8F5]/45 backdrop-blur-[14px] border border-[#E8E2D8]/30 rounded-full flex items-center justify-center transition-all duration-300 ${activeHotspot === 'chest' ? 'opacity-0 scale-90' : 'opacity-100'}`}>
                        <span className="w-1.5 h-1.5 bg-[#6E7E70] rounded-full opacity-60"></span>
                      </div>
                    </button>

                    <button 
                      onClick={() => handleHotspotActivate('belly')}
                      onMouseEnter={() => handleHotspotActivate('belly')}
                      onMouseLeave={() => setActiveHotspot(null)}
                      className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[32%] h-[22%] rounded-full cursor-crosshair z-20 group focus:outline-none"
                      aria-label="Scan estômago"
                    >
                      <div className={`absolute inset-0 bg-[#FAF8F5]/45 backdrop-blur-[14px] border border-[#E8E2D8]/30 rounded-full flex items-center justify-center transition-all duration-300 ${activeHotspot === 'belly' ? 'opacity-0 scale-90' : 'opacity-100'}`}>
                        <span className="w-1.5 h-1.5 bg-[#6E7E70] rounded-full opacity-60"></span>
                      </div>
                    </button>

                    {/* SVG Human outline */}
                    <svg viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                      <rect width="320" height="420" rx="12" fill="#FAF8F5" />
                      
                      {/* Body base contours drawn FIRST so they are beautifully behind detail drawings */}
                      <path d="M160 106 C180 106 192 92 192 70 C192 48 180 36 160 36 C140 36 128 48 128 70 C128 92 140 106 160 106 Z" fill="#E8E2D8" opacity="0.5" stroke="#D3CFC7" strokeWidth="1.5" />
                      <path d="M152 106 L152 130 L168 130 L168 106 Z" fill="#E8E2D8" opacity="0.5" />
                      {/* Enlarged puppet belly: base curve expanded on left (72 instead of 82) and right (248 instead of 238), extended to Y=315 */}
                      <path d="M100 156 C120 136 138 130 160 130 C182 130 200 136 220 156 C238 176 248 220 248 315 L72 315 C72 220 82 176 100 156 Z" fill="#E8E2D8" opacity="0.5" stroke="#D3CFC7" strokeWidth="1.5" />

                      {/* Head: Scribbly lines representing busy mind */}
                      <path d="M140 60 C130 85 185 50 150 70 C125 80 180 85 160 55 C145 50 140 70 170 75 C185 80 150 95 165 90 C175 85 135 65 145 80 C155 95 180 65 155 60" stroke="#C67A63" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      
                      {/* Throat: Small rope with a knot */}
                      <g stroke="#C67A63" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M148 116 Q160 120 172 116" />
                        <path d="M155 118 C153 112, 161 110, 160 118 C159 126, 167 124, 165 118" />
                        <path d="M165 118 C167 112, 159 110, 160 118 C161 126, 153 124, 155 118" />
                        <path d="M158 122 C157 127, 154 129, 155 133" />
                        <path d="M162 122 C163 127, 166 129, 165 133" />
                      </g>
                      
                      {/* Chest: Beautifully styled dumbbell (halter) */}
                      <g stroke="#C67A63" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="125" y="168" width="6" height="24" rx="2" fill="#FAF8F5" />
                        <rect x="131" y="164" width="8" height="32" rx="2.5" fill="#FAF8F5" />
                        <path d="M139 180 L181 180" strokeWidth="4.5" />
                        <path d="M148 180 L172 180" stroke="#FAF8F5" strokeWidth="1.5" strokeDasharray="2 2" />
                        <rect x="181" y="164" width="8" height="32" rx="2.5" fill="#FAF8F5" />
                        <rect x="189" y="168" width="6" height="24" rx="2" fill="#FAF8F5" />
                      </g>
                      
                      {/* Belly: Highly polished, 3D ice cube shapes clustered together lower down in the expanded belly */}
                      <g transform="translate(130, 264) rotate(15 9 9)">
                        <rect x="0" y="0" width="18" height="18" rx="3.5" stroke="#6E7E70" strokeWidth="1.8" fill="#FAF8F5" />
                        <path d="M2.5 2.5 L15.5 2.5 M2.5 2.5 L2.5 15.5" stroke="#6E7E70" strokeWidth="0.8" opacity="0.5" />
                        <path d="M15.5 5 L15.5 15.5 L5 15.5" stroke="#6E7E70" strokeWidth="0.8" opacity="0.5" />
                        <path d="M5 5 L13 13" stroke="#6E7E70" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
                      </g>
                      <g transform="translate(152, 274) rotate(-20 8 8)">
                        <rect x="0" y="0" width="16" height="16" rx="3" stroke="#6E7E70" strokeWidth="1.8" fill="#FAF8F5" />
                        <path d="M2.5 2.5 L13.5 2.5 M2.5 2.5 L2.5 13.5" stroke="#6E7E70" strokeWidth="0.8" opacity="0.5" />
                        <path d="M13.5 4 L13.5 13.5 L4 13.5" stroke="#6E7E70" strokeWidth="0.8" opacity="0.5" />
                        <path d="M4 4 L11 11" stroke="#6E7E70" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
                      </g>
                      <g transform="translate(142, 284) rotate(40 7.5 7.5)">
                        <rect x="0" y="0" width="15" height="15" rx="3" stroke="#6E7E70" strokeWidth="1.8" fill="#FAF8F5" />
                        <path d="M2 2 L13 2 M2 2 L2 13" stroke="#6E7E70" strokeWidth="0.8" opacity="0.5" />
                        <path d="M13 3.5 L13 13 L3.5 13" stroke="#6E7E70" strokeWidth="0.8" opacity="0.5" />
                        <path d="M3.5 3.5 L11.5 11.5" stroke="#6E7E70" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
                      </g>
                    </svg>

                  </div>

                  {/* Active response overlays - positioned closer to the body SVG, larger text */}
                  <div className="mt-1 w-full text-center h-16 flex items-center justify-center">
                    {activeHotspot === 'head' && (
                      <span className="font-serif italic text-base md:text-lg text-[#C67A63] bg-white border border-[#E8E2D8] px-5 py-2.5 rounded-xl shadow-xs transition-all duration-300">
                        Pensamentos bagunçados - Sobrecarga mental
                      </span>
                    )}
                    {activeHotspot === 'throat' && (
                      <span className="font-serif italic text-base md:text-lg text-[#C67A63] bg-white border border-[#E8E2D8] px-5 py-2.5 rounded-xl shadow-xs transition-all duration-300">
                        Nó na garganta - Angústia
                      </span>
                    )}
                    {activeHotspot === 'chest' && (
                      <span className="font-serif italic text-base md:text-lg text-[#C67A63] bg-white border border-[#E8E2D8] px-5 py-2.5 rounded-xl shadow-xs transition-all duration-300">
                        Aperto no peito - Tristeza
                      </span>
                    )}
                    {activeHotspot === 'belly' && (
                      <span className="font-serif italic text-base md:text-lg text-[#C67A63] bg-white border border-[#E8E2D8] px-5 py-2.5 rounded-xl shadow-xs transition-all duration-300">
                        Frio na barriga - Ansiedade
                      </span>
                    )}
                    {!activeHotspot && (
                      <span className="text-xs font-mono uppercase tracking-widest text-[#8C8273] transition-all duration-300">
                        Passe o mouse ou clique para olhar por dentro
                      </span>
                    )}
                  </div>
                </div>

                {/* Narrative Column */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6E7E70] border-b border-[#6E7E70]/25 pb-1 mb-4 w-fit">Mapeamento Clínico</span>
                  <h2 className="font-serif text-3xl text-[#2B302C] leading-tight mb-6 font-medium">
                    Por fora parece que está tudo bem, mas por dentro...
                  </h2>
                  <p className="text-[#626B64] text-[1.02rem] font-light leading-relaxed mb-6">
                    A sobrecarga mental e os conflitos emocionais silenciosos costumam se esconder atrás de uma superfície estável. Muitas vezes, o corpo manifesta fisicamente o que a mente tenta calar através de dores invisíveis e respostas involuntárias. Olhar de perto para essas zonas de tensão é o primeiro passo para resgatar o controle ativo da sua própria história.
                  </p>
                  <p className="border-l-2 border-[#C67A63] pl-4 font-serif text-lg font-medium italic text-[#4A554B]">
                    Se você sentir que precisa desabafar sobre o que está escondido por trás do seu sorriso, agende uma sessão de acolhimento.
                  </p>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* Render 2. DEPRESSÃO */}
        {articleId === 'depressao' && (
          <div className="space-y-16">
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] shadow-xs overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                
                {/* SVG Left panel */}
                <div className="lg:w-[45%] bg-[#F8F7F4] flex items-center justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#E8E2D8]">
                  <div className="w-full max-w-[280px] aspect-square flex items-center justify-center">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-auto" role="img" aria-label="Ilustração de acolhimento">
                      <path d="M35 70 C 50 70, 55 145, 95 145 C 135 145, 140 75, 165 75" 
                            stroke="#868C81" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="165" cy="75" r="4" fill="#B9855A"/>
                      <circle cx="100" cy="100" r="65" stroke="#E8E2D8" strokeWidth="1" strokeDasharray="3 5"/>
                      <path d="M70 100 A 30 30 0 0 0 130 100" stroke="#B9855A" strokeWidth="1" opacity="0.4" strokeDasharray="2 2"/>
                    </svg>
                  </div>
                </div>

                {/* Content Right panel */}
                <div className="lg:w-[55%] p-8 md:p-14 flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#868C81] mb-3">Psicologia Clínica</span>
                  <h1 className="font-serif text-3xl md:text-4.5xl text-[#33312E] leading-tight mb-6 font-medium">Depressão</h1>
                  
                  <div className="space-y-4 text-sm md:text-base font-light leading-relaxed text-[#5C6356]">
                    <p>
                      A depressão vai muito além de sentir tristeza. Trata-se de uma condição que afeta a forma como a pessoa pensa, sente e percebe a própria vida. Ela pode provocar uma sensação constante de vazio, desânimo, perda de interesse por atividades que antes eram prazerosas e uma dificuldade intensa para realizar até mesmo tarefas simples do dia a dia.
                    </p>
                    <p>
                      Além do sofrimento emocional, também podem surgir alterações no sono, no apetite, na energia, na concentração e na autoestima. Muitas pessoas se sentem culpadas por não conseguirem "reagir" ou acreditam que estão sendo fracas, quando, na verdade, estão enfrentando um problema que merece atenção e cuidado.
                    </p>
                    <p>
                      A depressão pode surgir por diferentes motivos, como fatores biológicos, experiências difíceis, perdas, estresse prolongado ou uma combinação de diversos aspectos. Cada história é única e, por isso, cada processo de tratamento também precisa respeitar as necessidades individuais.
                    </p>
                    <p>
                      A psicoterapia auxilia na compreensão das causas do sofrimento, fortalece recursos emocionais e ajuda a reconstruir o sentido da vida de forma gradual. Em alguns casos, o acompanhamento médico também pode ser recomendado para complementar o tratamento.
                    </p>
                  </div>

                  <a 
                    href="https://wa.me/5512991766972" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 bg-[#B9855A] hover:bg-[#A3724A] text-white font-medium text-sm px-8 py-3 rounded-full shadow-xs hover:shadow-md transition-all duration-300 w-fit text-center"
                  >
                    Agendar Consulta
                  </a>
                </div>

              </div>
            </section>

            {/* Human Battery Interactive Widget */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] p-8 md:p-14 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Battery Visual Column */}
                <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E8E2D8]/50 rounded-2xl p-8 flex flex-col items-center justify-center">
                  
                  {/* Percentage Display */}
                  <div className="font-serif text-5xl font-medium text-[#2B302C] mb-6 h-14 select-none">
                    {batteryLevel}%
                  </div>

                  {/* Battery SVG Container */}
                  <div className="w-[170px] h-[85px] border-2 border-[#E8E2D8] rounded-2xl p-1 relative mb-8 bg-white flex items-center">
                    <div className="w-full h-full rounded-xl bg-[#FAF8F5] overflow-hidden">
                      <div 
                        className={`h-full rounded-lg transition-all duration-500 ${
                          batteryLevel === 15 ? 'bg-[#C67A63]' : 'bg-[#6E7E70]'
                        }`}
                        style={{ width: `${batteryLevel}%` }}
                      ></div>
                    </div>
                    {/* Battery Cap */}
                    <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-2 h-6 bg-[#E8E2D8] rounded-r-md"></div>
                  </div>

                  {/* Discrete Custom Slider */}
                  <div className="w-full max-w-[260px] space-y-4">
                    <div className="flex justify-between text-[10px] text-[#8C8273] font-semibold tracking-wider uppercase">
                      <span>Nível Crítico</span>
                      <span>Restaurado</span>
                    </div>
                    <div className="relative flex items-center h-6">
                      <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        step="1"
                        value={
                          batteryLevel === 15 ? 1 :
                          batteryLevel === 40 ? 2 :
                          batteryLevel === 60 ? 3 :
                          batteryLevel === 80 ? 4 : 5
                        }
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (val === 1) setBatteryLevel(15);
                          else if (val === 2) setBatteryLevel(40);
                          else if (val === 3) setBatteryLevel(60);
                          else if (val === 4) setBatteryLevel(80);
                          else setBatteryLevel(100);
                        }}
                        className="w-full h-1 bg-[#E8E2D8] rounded-lg appearance-none cursor-pointer accent-[#6E7E70]"
                        aria-label="Ajustar nível de bateria humana"
                      />
                    </div>
                    <div className="flex justify-between text-[11px] font-medium font-sans text-[#626B64]">
                      <button onClick={() => setBatteryLevel(15)} className={`px-1.5 py-0.5 rounded ${batteryLevel === 15 ? 'bg-[#C67A63] text-white font-bold' : ''}`}>15%</button>
                      <button onClick={() => setBatteryLevel(40)} className={`px-1.5 py-0.5 rounded ${batteryLevel === 40 ? 'bg-[#6E7E70] text-white font-bold' : ''}`}>40%</button>
                      <button onClick={() => setBatteryLevel(60)} className={`px-1.5 py-0.5 rounded ${batteryLevel === 60 ? 'bg-[#6E7E70] text-white font-bold' : ''}`}>60%</button>
                      <button onClick={() => setBatteryLevel(80)} className={`px-1.5 py-0.5 rounded ${batteryLevel === 80 ? 'bg-[#6E7E70] text-white font-bold' : ''}`}>80%</button>
                      <button onClick={() => setBatteryLevel(100)} className={`px-1.5 py-0.5 rounded ${batteryLevel === 100 ? 'bg-[#6E7E70] text-white font-bold' : ''}`}>100%</button>
                    </div>
                  </div>

                  <span className="mt-6 text-[10px] text-[#8C8273] uppercase tracking-widest font-mono">Arraste ou clique para ajustar</span>
                </div>

                {/* Battery Narrative Column */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6E7E70] border-b border-[#6E7E70]/25 pb-1 mb-4 w-fit">Mapeamento Vital</span>
                  <h2 className="font-serif text-3xl text-[#2B302C] leading-tight mb-6 font-medium">
                    A perda persistente de energia não é apenas cansaço
                  </h2>
                  <p className="text-[#626B64] text-[1.02rem] font-light leading-relaxed mb-6">
                    Diferente da exaustão comum que melhora após uma noite de sono, o esgotamento profundo da depressão atua como um vazamento contínuo em suas reservas vitais. Monitorar o nível da sua disposição diária ajuda a identificar quando o corpo deixa de operar em ritmo saudável e passa a lutar apenas para sobreviver.
                  </p>
                  
                  {/* Dynamic reaction box */}
                  <div className="mt-2 min-h-24">
                    {batteryLevel === 15 && (
                      <div className="border-l-2 border-[#C67A63] pl-4 py-1 transition-all duration-300">
                        <p className="font-serif text-lg font-medium italic text-[#C67A63]">
                          Sua bateria está na reserva de emergência. O esgotamento é profundo e qualquer esforço parece insustentável. Viver sob constante sobrecarga drena a vitalidade; este nível exige acolhimento e cuidado profissional imediato.
                        </p>
                      </div>
                    )}
                    {batteryLevel === 40 && (
                      <div className="border-l-2 border-[#B9855A] pl-4 py-1 transition-all duration-300">
                        <p className="font-serif text-lg font-medium italic text-[#B9855A]">
                          Você começa a perceber que tem algo de errado: a energia oscila e o desânimo tenta se instalar. A boa notícia é que, identificando esses sinais agora, com o suporte terapêutico certo, dá para resolver logo antes que vire um colapso completo.
                        </p>
                      </div>
                    )}
                    {batteryLevel === 60 && (
                      <div className="border-l-2 border-[#6E7E70] pl-4 py-1 transition-all duration-300">
                        <p className="font-serif text-lg font-medium italic text-[#4A554B]">
                          Sua disposição está moderada, mas você já sente o peso da rotina acumulada. Estabelecer limites saudáveis e garantir pequenas pausas de descanso impede que o seu rendimento entre em declínio.
                        </p>
                      </div>
                    )}
                    {batteryLevel === 80 && (
                      <div className="border-l-2 border-[#6E7E70] pl-4 py-1 transition-all duration-300">
                        <p className="font-serif text-lg font-medium italic text-[#4A554B]">
                          Sua energia está em um ótimo nível de funcionamento. Você se sente presente e capaz de gerenciar os desafios diários. Continuar praticando o autocuidado ativo preserva essa vitalidade de forma consistente.
                        </p>
                      </div>
                    )}
                    {batteryLevel === 100 && (
                      <div className="border-l-2 border-[#6E7E70] pl-4 py-1 transition-all duration-300">
                        <p className="font-serif text-lg font-medium italic text-[#4A554B]">
                          Sua bateria está totalmente carregada e em perfeito equilíbrio. Desfrute dessa clareza e vigor, lembrando que a psicoterapia é o caminho perfeito para manter suas reservas vitais sempre protegidas e abundantes.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* Render 3. BURNOUT */}
        {articleId === 'burnout' && (
          <div className="space-y-16">
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] shadow-xs overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                
                {/* SVG Left panel */}
                <div className="lg:w-[45%] bg-[#F8F7F4] flex items-center justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#E8E2D8]">
                  <div className="w-full max-w-[280px] aspect-square flex items-center justify-center">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-auto" role="img" aria-label="Ilustração de limites">
                      <path d="M40 110 C 70 110, 80 145, 100 145 C 120 145, 130 110, 160 110" 
                            stroke="#868C81" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="100" cy="145" r="4.5" fill="#B9855A"/>
                      <line x1="60" y1="80" x2="140" y2="80" stroke="#E8E2D8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 6"/>
                      <line x1="75" y1="65" x2="125" y2="65" stroke="#B9855A" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                    </svg>
                  </div>
                </div>

                {/* Content Right panel */}
                <div className="lg:w-[55%] p-8 md:p-14 flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#868C81] mb-3">Psicologia Clínica</span>
                  <h1 className="font-serif text-3xl md:text-4.5xl text-[#33312E] leading-tight mb-6 font-medium">Burnout</h1>
                  
                  <div className="space-y-4 text-sm md:text-base font-light leading-relaxed text-[#5C6356]">
                    <p>
                      O Burnout é um estado de esgotamento físico, mental e emocional causado pela exposição prolongada ao estresse relacionado ao trabalho. Diferente do cansaço comum, o Burnout não melhora apenas com uma boa noite de sono ou alguns dias de descanso. A sensação é de estar constantemente sem energia, desmotivado e incapaz de dar conta das próprias responsabilidades.
                    </p>
                    <p>
                      Entre os principais sinais estão o cansaço extremo, irritabilidade, dificuldade de concentração, sensação de incompetência, desânimo, alterações no sono, ansiedade e até sintomas físicos, como dores de cabeça, tensão muscular e problemas gastrointestinais.
                    </p>
                    <p>
                      Muitas pessoas permanecem nesse ciclo por acreditarem que precisam ser produtivas o tempo todo ou que pedir ajuda demonstra incapacidade. Com o passar do tempo, esse excesso de exigência pode comprometer não apenas o desempenho profissional, mas também os relacionamentos, a saúde física e o equilíbrio emocional.
                    </p>
                    <p>
                      Na psicoterapia, é possível compreender os fatores que levaram ao esgotamento, desenvolver limites mais saudáveis, fortalecer o autocuidado e construir uma relação mais equilibrada com o trabalho.
                    </p>
                  </div>

                  <a 
                    href="https://wa.me/5512991766972" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 bg-[#B9855A] hover:bg-[#A3724A] text-white font-medium text-sm px-8 py-3 rounded-full shadow-xs hover:shadow-md transition-all duration-300 w-fit text-center"
                  >
                    Agendar Consulta
                  </a>
                </div>

              </div>
            </section>

            {/* Drag and drop symptom classifier */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] p-8 md:p-14 shadow-xs">
              <header className="max-w-2xl mx-auto text-center mb-10">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#768D7C]">Classificador de Sintomas</span>
                <h2 className="font-serif text-3xl text-[#3A3530] font-medium leading-tight mt-2 mb-4">O Limite do Corpo</h2>
                <p className="text-[#68635E] font-light text-sm md:text-base">
                  Muitas vezes, a linha entre o cansaço diário e o esgotamento silencioso é invisível. Organize os sintomas que você sente abaixo clicando ou arrastando-os para as caixas corretas.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-6 text-left text-xs bg-[#FAF8F6] p-4.5 rounded-xl border border-[#E8E2D8]/60">
                  <div>
                    <strong className="text-[#6E7E70] font-bold block mb-1">🟢 Cansaço Comum:</strong>
                    <span className="text-[#68635E] font-light">Sintomas passageiros decorrentes da rotina diária que melhoram visivelmente após repouso, feriado ou fim de semana.</span>
                  </div>
                  <div>
                    <strong className="text-[#C47D68] font-bold block mb-1">🔴 Esgotamento Crônico:</strong>
                    <span className="text-[#68635E] font-light">Exaustão profunda e persistente que não passa com descanso ordinário, acompanhada de sentimentos de vazio e distanciamento mental.</span>
                  </div>
                </div>
              </header>

              <div className="bg-[#FAF8F6] border border-[#E8E2D8] rounded-2xl p-6 md:p-10">
                
                {/* Available Unsorted Tags */}
                <div className="mb-8">
                  <div className="text-center text-[11px] text-[#8C8273] font-semibold uppercase tracking-widest mb-4">Sintomas para Organizar</div>
                  
                  {availableTags.length === 0 && comumZone.length + cronicoZone.length < 8 && (
                    <div className="text-center text-xs italic text-[#8C8273] py-4">Sintomas sendo ordenados nas caixas abaixo...</div>
                  )}

                  {availableTags.length === 0 && comumZone.length + cronicoZone.length === 8 && (
                    <div className="bg-white border border-[#6E7E70]/30 rounded-xl p-4 text-center text-xs text-[#6E7E70] font-medium flex items-center justify-center gap-2 max-w-md mx-auto">
                      <Check className="w-4 h-4" /> Todos os sintomas foram classificados! Clique em "Conferir meus resultados" abaixo.
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 justify-center">
                    {availableTags.map((tag) => (
                      <div 
                        key={tag.id}
                        className="bg-white border border-[#E8E2D8] px-4 py-2.5 rounded-full text-xs text-[#3A3530] font-medium shadow-2xs hover:border-[#768D7C] hover:bg-[#FAF8F6] transition-all cursor-pointer flex items-center gap-2 select-none"
                      >
                        <span className="text-neutral-300 font-light text-xs">⋮⋮</span>
                        <span>{tag.text}</span>
                        <div className="flex gap-1.5 ml-2">
                          <button 
                            onClick={() => moveTag(tag.id, 'comum')}
                            className="bg-[#6E7E70]/10 text-[#6E7E70] hover:bg-[#6E7E70] hover:text-white px-2 py-0.5 rounded text-[9px] uppercase font-bold"
                          >
                            Comum
                          </button>
                          <button 
                            onClick={() => moveTag(tag.id, 'cronico')}
                            className="bg-[#C47D68]/10 text-[#C47D68] hover:bg-[#C47D68] hover:text-white px-2 py-0.5 rounded text-[9px] uppercase font-bold"
                          >
                            Crônico
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dual Drop/Click Zones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  
                  {/* Zone 1: Cansaço Comum */}
                  <div className="border-2 border-dashed border-[#CFC8C0] rounded-2xl p-6 bg-white/40 flex flex-col min-h-[180px]">
                    <div className="font-serif font-semibold text-lg text-center text-[#3A3530] mb-4 pb-2 border-b border-[#E8E2D8]/50">
                      Cansaço Comum
                    </div>
                    
                    {comumZone.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center text-xs text-neutral-400 italic text-center py-6">
                        Nenhum sintoma adicionado aqui
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 flex-1">
                        {comumZone.map((tag) => (
                          <div 
                            key={tag.id} 
                            onClick={() => moveTag(tag.id, 'available')}
                            className="bg-white border border-[#E8E2D8] px-4 py-2 rounded-xl text-xs flex justify-between items-center text-[#5D5A56] hover:border-red-300 hover:text-red-500 transition-colors cursor-pointer"
                            title="Remover e retornar ao topo"
                          >
                            <span>{tag.text}</span>
                            <span className="text-[10px] text-neutral-300 group-hover:text-red-500 font-semibold uppercase">Retornar &times;</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Zone 2: Esgotamento Crônico */}
                  <div className="border-2 border-dashed border-[#CFC8C0] rounded-2xl p-6 bg-white/40 flex flex-col min-h-[180px]">
                    <div className="font-serif font-semibold text-lg text-center text-[#3A3530] mb-4 pb-2 border-b border-[#E8E2D8]/50">
                      Esgotamento Crônico (Burnout)
                    </div>
                    
                    {cronicoZone.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center text-xs text-neutral-400 italic text-center py-6">
                        Nenhum sintoma adicionado aqui
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 flex-1">
                        {cronicoZone.map((tag) => (
                          <div 
                            key={tag.id} 
                            onClick={() => moveTag(tag.id, 'available')}
                            className="bg-white border border-[#E8E2D8] px-4 py-2 rounded-xl text-xs flex justify-between items-center text-[#5D5A56] hover:border-red-300 hover:text-red-500 transition-colors cursor-pointer"
                            title="Remover e retornar ao topo"
                          >
                            <span>{tag.text}</span>
                            <span className="text-[10px] text-neutral-300 group-hover:text-red-500 font-semibold uppercase">Retornar &times;</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* Reset button if some tags are grouped */}
                {(comumZone.length > 0 || cronicoZone.length > 0) && (
                  <div className="flex justify-center mb-6">
                    <button 
                      onClick={() => {
                        setAvailableTags(initialTags);
                        setComumZone([]);
                        setCronicoZone([]);
                        setBurnoutResult(null);
                      }}
                      className="text-[11px] font-semibold text-[#8C8273] hover:text-[#C47D68] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Redefinir Classificador
                    </button>
                  </div>
                )}

                {/* Results block */}
                {burnoutResult && (
                  <div className="bg-white border-l-4 border-[#C47D68] p-6 rounded-r-2xl shadow-xs max-w-2xl mx-auto mb-8 animate-fadeIn">
                    <p className="font-serif text-[1.1rem] text-[#3A3530] leading-relaxed italic" dangerouslySetInnerHTML={{ __html: burnoutResult }}></p>
                  </div>
                )}

                <div className="flex justify-center">
                  <button 
                    onClick={handleCheckBurnoutResults}
                    className="bg-[#768D7C] hover:bg-[#637768] text-white text-sm font-medium px-8 py-3.5 rounded-full shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    Conferir meus resultados
                  </button>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* Render 4. TDAH */}
        {articleId === 'tdah' && (
          <div className="space-y-16">
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] shadow-xs overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                
                {/* SVG mind transition Left panel */}
                <div className="lg:w-[45%] bg-[#F8F7F4] flex items-center justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#E8E2D8]">
                  <div className="w-full max-w-[280px] aspect-square flex items-center justify-center">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-auto" role="img" aria-label="Ilustração abstrata minimalista representando o fluxo de pensamentos do TDAH e a busca por foco através da psicoterapia">
                      {/* Símbolo do infinito estilizado (linhas finas de sálvia) */}
                      <path d="M50 100 C 50 75, 85 75, 100 100 C 115 125, 150 125, 150 100 C 150 75, 115 75, 100 100 C 85 125, 50 125, 50 100 Z" 
                            stroke="#868C81" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      
                      {/* Linhas tangentes de estrutura e organização */}
                      <line x1="100" y1="45" x2="100" y2="155" stroke="#E8E2D8" strokeWidth="1" strokeDasharray="3 4"/>
                      
                      {/* Âncoras e pontos focais (Terracota) */}
                      <circle cx="100" cy="100" r="4" fill="#B9855A"/>
                      <circle cx="100" cy="55" r="2.5" fill="#B9855A" opacity="0.5"/>
                      <circle cx="100" cy="145" r="2.5" fill="#B9855A" opacity="0.5"/>
                      
                      {/* Círculo externo concêntrico sutil */}
                      <circle cx="100" cy="100" r="70" stroke="#E8E2D8" strokeWidth="1" opacity="0.7"/>
                    </svg>
                  </div>
                </div>

                {/* Article Content Right panel */}
                <div className="lg:w-[55%] p-8 md:p-14 flex flex-col justify-center text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#868C81] mb-3">Psicologia Clínica</span>
                  <h1 className="font-serif text-3xl md:text-4.5xl text-[#33312E] leading-tight mb-2 font-medium">TDAH</h1>
                  <span className="text-sm font-light text-[#868C81] mb-6 block">Transtorno de Déficit de Atenção e Hiperatividade</span>
                  
                  <div className="space-y-4 text-sm md:text-base font-light leading-relaxed text-[#5C6356]">
                    <p>O Transtorno de Déficit de Atenção e Hiperatividade (TDAH) é uma condição do neurodesenvolvimento que pode acompanhar a pessoa desde a infância até a vida adulta. Embora muitas pessoas associem o transtorno apenas à hiperatividade, ele também pode se manifestar por meio da dificuldade de concentração, desorganização, impulsividade, procrastinação e esquecimento frequente.</p>
                    
                    <p>Na vida adulta, o TDAH pode impactar o desempenho profissional, os estudos, os relacionamentos e até a autoestima. É comum que a pessoa sinta frustração por não conseguir manter o foco, concluir tarefas ou organizar a rotina da maneira que gostaria.</p>
                    
                    <p>É importante lembrar que ter alguns desses sintomas não significa, necessariamente, ter TDAH. Somente uma avaliação adequada realizada por profissionais qualificados pode identificar se existe ou não o transtorno.</p>
                    
                    <p>A psicoterapia é uma importante aliada para quem possui TDAH ou apresenta dificuldades relacionadas à atenção e organização. Durante o processo terapêutico, é possível desenvolver estratégias para lidar com os desafios do dia a dia, melhorar o planejamento, fortalecer a autoestima e reduzir o impacto que essas dificuldades causam na rotina. O objetivo é favorecer mais autonomia, equilíbrio e qualidade de vida.</p>
                  </div>

                  <a 
                    href="https://wa.me/5512991766972" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 bg-[#B9855A] hover:bg-[#A3724A] text-white font-medium text-sm px-8 py-3.5 rounded-full shadow-xs hover:shadow-md transition-all duration-300 w-fit text-center"
                  >
                    Agendar Consulta via WhatsApp
                  </a>
                </div>

              </div>
            </section>

            {/* Desmistificando o TDAH Interactive Widget */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] p-8 md:p-14 shadow-xs text-left">
              <header className="max-w-3xl mb-12">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6E7E70] border-b border-[#6E7E70]/25 pb-1 mb-3 inline-block">Neurobiologia & Mente</span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#2B302C] leading-tight mb-4 font-medium">Desmistificando o TDAH</h2>
                <p className="font-sans text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                  Muito do que se compartilha sobre o Transtorno de Déficit de Atenção com Hiperatividade provém de julgamentos superficiais. Compreender as evidências científicas é o primeiro passo para construir um olhar acolhedor e livre de estigmas.
                </p>
                <p className="text-xs italic text-[#868C81] mt-3">
                  Instruções: Toque nos cartões abaixo para revelarmos a verdade por trás de cada mito.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    id: 1,
                    title: 'Mito 01',
                    myth: '"O TDAH não é uma condição real, é falta de limites e disciplina."',
                    reality: 'O TDAH é um transtorno neurobiológico legítimo. Estudos avançados de neuroimagem comprovam diferenças estruturais e funcionais nítidas na regulação de neurotransmissores essenciais, como a dopamina, no cérebro.'
                  },
                  {
                    id: 2,
                    title: 'Mito 02',
                    myth: '"O TDAH é um problema de aprendizagem específico."',
                    reality: 'Não se trata de uma dificuldade de aprendizado intrínseca (como a dislexia), mas sim de uma disfunção nas funções executivas do cérebro. Ele afeta a capacidade de organizar, iniciar e sustentar o foco, impactando o rendimento escolar de forma indireta.'
                  },
                  {
                    id: 3,
                    title: 'Mito 03',
                    myth: '"Quem tem o diagnóstico de TDAH nunca consegue se concentrar."',
                    reality: 'O desafio não está na escassez de atenção, mas na desregulação dela. Indivíduos com TDAH são plenamente capazes de manter um foco profundo e prolongado em atividades que estimulem alto interesse e motivação intrínseca, fenômeno chamado de hiperfoco.'
                  },
                  {
                    id: 4,
                    title: 'Mito 04',
                    myth: '"O TDAH é uma fase que a criança supera na adolescência."',
                    reality: 'O transtorno acompanha o indivíduo ao longo de toda a vida. Embora a hiperatividade física tenda a diminuir com a idade, se transformando frequentemente em uma inquietação mental sutil, os desafios de organização permanecem presentes na rotina adulta.'
                  },
                  {
                    id: 5,
                    title: 'Mito 05',
                    myth: '"Pessoas com TDAH possuem um nível menor de inteligência."',
                    reality: 'Não há qualquer correlação científica entre o TDAH e o coeficiente intelectual. Indivíduos com o transtorno distribuem-se em todos os níveis de inteligência e costumam apresentar uma capacidade criativa e de resolução de problemas fora do padrão.'
                  },
                  {
                    id: 6,
                    title: 'Mito 06',
                    myth: '"O tratamento é feito apenas com medicamentos fortes."',
                    reality: 'A abordagem terapêutica eficiente é multimodal. Ela combina o manejo médico individualizado com a Terapia Cognitivo-Comportamental (TCC), reformulação prática de rotinas cotidianas e o desenvolvimento de estratégias personalizadas de autonomia.'
                  }
                ].map((m) => (
                  <div 
                    key={m.id}
                    className="w-full h-[350px] [perspective:1200px] cursor-pointer group"
                    onClick={() => setFlippedTdah(prev => ({ ...prev, [m.id]: !prev[m.id] }))}
                  >
                    <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${flippedTdah[m.id] ? '[transform:rotateY(180deg)]' : ''}`}>
                      
                      {/* FRONT FACE (Myth) */}
                      <div className="absolute inset-0 [backface-visibility:hidden] bg-white border border-[#E8E2D8] rounded-[22px] p-6 flex flex-col justify-between shadow-xs group-hover:border-[#6E7E70] group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                        <div className="flex justify-between items-center">
                          <span className="text-[0.72rem] font-semibold text-[#C67A63] bg-[#C67A63]/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                            {m.title}
                          </span>
                          <span className="text-neutral-400 opacity-60">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                          </span>
                        </div>
                        <h3 className="font-serif text-lg text-[#2B302C] leading-snug font-medium mb-auto mt-4">
                          {m.myth}
                        </h3>
                        <span className="text-[0.72rem] font-medium text-[#6E7E70] uppercase tracking-wider mt-4">
                          Ver a realidade
                        </span>
                      </div>

                      {/* BACK FACE (Reality) */}
                      <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#FAF8F5] border border-[#E8E2D8] rounded-[22px] p-6 flex flex-col justify-start overflow-y-auto">
                        <span className="text-[0.72rem] font-semibold text-[#6E7E70] bg-[#6E7E70]/10 px-2.5 py-1 rounded-md uppercase tracking-wider self-start mb-4">
                          A Realidade
                        </span>
                        <p className="font-sans text-xs md:text-sm text-[#626B64] font-light leading-relaxed">
                          {m.reality}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              <footer className="mt-12 border-l-2 border-[#C67A63] pl-5 max-w-3xl">
                <p className="font-serif text-lg text-[#4A554B] italic font-medium leading-relaxed">
                  Gostou de desmistificar esse tema? Imagine quanta clareza você terá em uma sessão individual.
                </p>
              </footer>
            </section>
          </div>
        )}

        {/* Render 5. AUTOESTIMA */}
        {articleId === 'autoestima' && (
          <div className="space-y-16">
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] shadow-xs overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                
                {/* SVG mirror Left panel */}
                <div className="lg:w-[45%] bg-[#F8F7F4] flex items-center justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#E8E2D8]">
                  <div className="w-full max-w-[280px] aspect-square flex items-center justify-center">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-auto" role="img" aria-label="Ilustração abstrata minimalista de um espelho com um coração no centro, representando o auto-olhar e a autoestima">
                      {/* Moldura oval externa do espelho */}
                      <ellipse cx="100" cy="95" rx="36" ry="52" stroke="#868C81" strokeWidth="1.2" strokeLinecap="round"/>
                      
                      {/* Linha de base / suporte minimalista */}
                      <path d="M100 147 V 162" stroke="#868C81" strokeWidth="1.2"/>
                      <path d="M76 162 H 124" stroke="#868C81" strokeWidth="1.2" strokeLinecap="round"/>
                      
                      {/* Coração centralizado (Terracota) */}
                      <path d="M100 98 C 100 98, 93 91, 93 86.5 C 93 83.5, 95.5 81, 100 85 C 104.5 81, 107 83.5, 107 86.5 C 107 91, 100 98, 100 98 Z" 
                            fill="#B9855A" opacity="0.9"/>
                            
                      {/* Elemento circular concêntrico sutil de fundo */}
                      <circle cx="100" cy="100" r="75" stroke="#E8E2D8" strokeWidth="1" strokeDasharray="2 4"/>
                    </svg>
                  </div>
                </div>

                {/* Article Content Right panel */}
                <div className="lg:w-[55%] p-8 md:p-14 flex flex-col justify-center text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#868C81] mb-3">Psicologia Clínica</span>
                  <h1 className="font-serif text-3xl md:text-4.5xl text-[#33312E] leading-tight mb-6 font-medium">Autoestima</h1>
                  
                  <div className="space-y-4 text-sm md:text-base font-light leading-relaxed text-[#5C6356]">
                    <p>A autoestima representa a maneira como você enxerga, valoriza e se relaciona consigo mesmo. Ela influencia diretamente suas escolhas, seus relacionamentos, sua confiança e a forma como enfrenta desafios. Quando está fortalecida, torna-se mais fácil reconhecer qualidades, aceitar imperfeições e lidar com dificuldades de maneira mais saudável.</p>
                    
                    <p>Por outro lado, uma autoestima fragilizada pode fazer com que a pessoa se compare constantemente aos outros, tenha medo de errar, dificuldade para dizer "não", necessidade excessiva de aprovação e uma sensação frequente de não ser boa o suficiente.</p>
                    
                    <p>A autoestima não nasce pronta. Ela é construída ao longo da vida por meio das experiências, da educação recebida, dos relacionamentos e da forma como interpretamos tudo isso. Felizmente, ela também pode ser fortalecida em qualquer fase da vida.</p>
                    
                    <p>Na psicoterapia, você encontra um espaço seguro para compreender a origem das crenças negativas sobre si mesmo, desenvolver uma relação mais acolhedora com quem você é e construir uma autoestima baseada em autoconhecimento, respeito e autenticidade. Aprender a olhar para si com mais gentileza não significa ignorar suas dificuldades, mas reconhecer que você merece cuidado, valorização e oportunidades para crescer.</p>
                  </div>

                  <a 
                    href="https://wa.me/5512991766972" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 bg-[#B9855A] hover:bg-[#A3724A] text-white font-medium text-sm px-8 py-3.5 rounded-full shadow-xs hover:shadow-md transition-all duration-300 w-fit text-center"
                  >
                    Agendar Consulta via WhatsApp
                  </a>
                </div>

              </div>
            </section>

            {/* Decodificador de Autoestima: Scratch Card Widget */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] p-8 md:p-14 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Visual scratch panel */}
                <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E8E2D8]/50 rounded-2xl p-6 flex flex-col items-center">
                  <div className="relative w-full h-[320px] bg-white border border-[#E8E2D8] rounded-xl overflow-hidden shadow-xs">
                    
                    {/* Background layer: Hidden Truth */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-white z-10 select-none">
                      <blockquote className="font-serif text-2xl italic text-[#C67A63] leading-snug font-medium">
                        "Você não é o que sua mente diz quando você falha."
                      </blockquote>
                    </div>

                    {/* Scratch Grid Blanket */}
                    <div 
                      className="absolute inset-0 grid grid-cols-8 grid-rows-6 z-30 select-none"
                      style={{ touchAction: 'none' }}
                      onTouchMove={(e) => {
                        if (e.cancelable) e.preventDefault();
                        if (e.touches.length > 0) {
                          const touch = e.touches[0];
                          const element = document.elementFromPoint(touch.clientX, touch.clientY);
                          if (element) {
                            const tileIdxStr = element.getAttribute('data-tile-index');
                            if (tileIdxStr !== null) {
                              const i = parseInt(tileIdxStr, 10);
                              if (!scratchedTiles[i]) {
                                setScratchedTiles(prev => ({ ...prev, [i]: true }));
                              }
                            }
                          }
                        }
                      }}
                    >
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div
                          key={i}
                          data-tile-index={i}
                          onMouseEnter={() => {
                            if (!scratchedTiles[i]) {
                              setScratchedTiles(prev => ({ ...prev, [i]: true }));
                            }
                          }}
                          onTouchStart={() => {
                            if (!scratchedTiles[i]) {
                              setScratchedTiles(prev => ({ ...prev, [i]: true }));
                            }
                          }}
                          className={`bg-gradient-to-br from-[#DDD8D0] to-[#B8B3AB] border-[0.2px] border-white/10 cursor-crosshair transition-opacity duration-300 ${scratchedTiles[i] ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        />
                      ))}
                    </div>

                  </div>

                  <span className="mt-4 text-[0.72rem] font-medium text-[#626B64] uppercase tracking-wider opacity-70">
                    Passe o mouse ou toque para raspar
                  </span>
                  
                  {/* Reset / Reveal buttons */}
                  <div className="flex gap-4 mt-3">
                    <button 
                      onClick={() => setScratchedTiles({})}
                      className="text-[0.68rem] font-bold text-[#6E7E70] uppercase tracking-wider border border-[#6E7E70]/30 hover:bg-[#6E7E70]/5 px-3 py-1.5 rounded-full transition-colors cursor-pointer focus:outline-none"
                    >
                      Cobrir Novamente
                    </button>
                    <button 
                      onClick={() => {
                        const all: Record<number, boolean> = {};
                        for (let idx = 0; idx < 48; idx++) { all[idx] = true; }
                        setScratchedTiles(all);
                      }}
                      className="text-[0.68rem] font-bold text-[#C67A63] uppercase tracking-wider border border-[#C67A63]/30 hover:bg-[#C67A63]/5 px-3 py-1.5 rounded-full transition-colors cursor-pointer focus:outline-none"
                    >
                      Revelar Tudo
                    </button>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-7 flex flex-col items-start text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6E7E70] border-b border-[#6E7E70]/25 pb-1 mb-4 inline-block">Autoestima & Identidade</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#2B302C] leading-tight font-medium mb-6">
                    Desarmando a voz da autocrítica
                  </h2>
                  <p className="font-sans text-sm md:text-base font-light text-[#626B64] leading-relaxed mb-4">
                    A autoestima saudável não se baseia em um state de infalibilidade, mas sim na capacidade de acolher a si mesmo diante das próprias imperfeições. Quando operamos sob uma autoimagem fragilizada, a mente tende a transformar pequenos deslizes cotidianos em vereditos definitivos e implacáveis sobre quem somos. Romper esse ciclo exige decodificar os pensamentos automáticos e resgatar a verdade.
                  </p>
                  <p className="font-sans text-sm md:text-base text-[#2B302C] border-t border-[#E8E2D8] pt-4 mt-2 font-light leading-relaxed">
                    Para transformar de forma duradoura a relação com a sua autoestima, o caminho passa obrigatoriamente pelo <strong className="font-serif text-[1.1rem] text-[#4A554B] font-semibold">Autoconhecimento</strong>. Compreender as origens profundas de suas cobranças e mapear os gatilhos invisíveis da mente permite que você desmonte narrativas distorcidas. Descubra em nossa próxima página como o autoconhecimento pavimenta uma autoimagem verdadeiramente estável, realista e gentil.
                  </p>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* Render 6. AUTOCONHECIMENTO */}
        {articleId === 'autoconhecimento' && (
          <div className="space-y-16">
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] shadow-xs overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                
                {/* SVG rings Left panel */}
                <div className="lg:w-[45%] bg-[#F8F7F4] flex items-center justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#E8E2D8]">
                  <div className="w-full max-w-[280px] aspect-square flex items-center justify-center">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-auto" role="img" aria-label="Ilustração abstrata minimalista com anéis concêntricos e um eixo vertical, simbolizando o mergulho nas camadas do autoconhecimento e a clareza do desenvolvimento pessoal">
                      {/* Camadas externas e sutis da identidade */}
                      <circle cx="100" cy="112" r="54" stroke="#E8E2D8" strokeWidth="1"/>
                      <circle cx="100" cy="102" r="38" stroke="#868C81" strokeWidth="1.2" strokeDasharray="4 4"/>
                      <circle cx="100" cy="92" r="22" stroke="#B9855A" strokeWidth="1" opacity="0.35"/>
                      
                      {/* Eixo vertical de alinhamento e crescimento consciente */}
                      <line x1="100" y1="40" x2="100" y2="160" stroke="#868C81" strokeWidth="1.2" strokeLinecap="round"/>
                      
                      {/* Nós de percepção e clareza (O ponto mais alto representa o desenvolvimento alcançado) */}
                      <circle cx="100" cy="50" r="4.5" fill="#B9855A"/>
                      <circle cx="100" cy="92" r="2.5" fill="#33312E"/>
                      <circle cx="100" cy="130" r="2" fill="#868C81"/>
                    </svg>
                  </div>
                </div>

                {/* Article Content Right panel */}
                <div className="lg:w-[55%] p-8 md:p-14 flex flex-col justify-center text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#868C81] mb-3">Psicologia Clínica</span>
                  <h1 className="font-serif text-3xl md:text-4.5xl text-[#33312E] leading-tight mb-2 font-medium">Autoconhecimento</h1>
                  <span className="text-sm font-light text-[#B9855A] mb-6 block font-medium uppercase tracking-wider">E Desenvolvimento Pessoal</span>
                  
                  <div className="space-y-4 text-sm md:text-base font-light leading-relaxed text-[#5C6356]">
                    <p>O autoconhecimento é um processo de compreender quem você é, como pensa, sente e reage diante das diferentes situações da vida. Conhecer a si mesmo significa identificar seus valores, suas potencialidades, suas dificuldades e os padrões que influenciam suas escolhas, muitas vezes de forma inconsciente.</p>
                    
                    <p>É comum perceber que alguns comportamentos se repetem ao longo da vida, como dificuldades para estabelecer limites, medo de decepcionar as pessoas, insegurança, procrastinação ou relacionamentos que seguem o mesmo padrão. Quando esses aspectos não são compreendidos, podem gerar sofrimento e a sensação de estar sempre enfrentando os mesmos problemas.</p>
                    
                    <p>O desenvolvimento pessoal não busca transformar você em outra pessoa, mas ajudá-lo a construir uma versão mais consciente, equilibrada e coerente com aquilo que realmente deseja para sua vida. Esse processo envolve aprender a lidar melhor com as emoções, fortalecer a autoestima, desenvolver habilidades de comunicação, tomar decisões com mais segurança e cultivar relacionamentos mais saudáveis.</p>
                    
                    <p>Na psicoterapia, o autoconhecimento acontece de forma acolhedora e sem julgamentos. Ao compreender sua história e os significados que ela teve para você, torna-se possível promover mudanças consistentes, desenvolver novos recursos emocionais e construir uma vida com mais equilíbrio, autonomia e bem-estar.</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Prateleiras Mentais Interactive Widget */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] p-8 md:p-14 shadow-xs text-left">
              <header className="max-w-3xl mx-auto text-center mb-12 border-b border-[#E8E2D8]/60 pb-6">
                <h2 className="font-serif text-3xl md:text-4xl text-[#3A3530] font-medium mb-2">Prateleiras Mentais</h2>
                <p className="font-serif text-lg md:text-xl text-[#768D7C] font-semibold tracking-wide mb-4">Uma Triagem Visual de Prioridades</p>
                <p className="text-sm font-light text-[#68635E] leading-relaxed max-w-2xl mx-auto">
                  A nossa mente funciona como uma estante viva. Com o passar do tempo, guardamos certos aspects da vida nas prateleiras de cima e acabamos empurrando outros para trás de forma automática.
                </p>
                <p className="text-xs italic text-[#948E85] mt-4 bg-[#F9F8F6] py-2 px-4 rounded-xl border border-[#E8E2D8]/40 inline-block">
                  Instruções: Toque em "Máxima", "Média" ou "Mínima" diretamente nos cartões para organizá-los nas prateleiras mentais abaixo. Para remover um cartão de uma prateleira, basta tocá-lo.
                </p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left column: Cards pool */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <span className="text-[0.72rem] font-bold text-[#A39E93] tracking-wider uppercase">
                    Cartões Disponíveis
                  </span>
                  <div 
                    className="bg-[#F9F8F6] border border-[#E8E2D8] rounded-2xl p-4 sm:p-6 min-h-[180px] flex flex-col gap-3 transition-all duration-300"
                  >
                    {shelfPool.map(card => (
                      <div
                        key={card.id}
                        className="w-full bg-white border border-[#E8E2D8] rounded-xl p-3.5 sm:py-2 sm:px-4 text-xs font-medium text-[#3A3530] hover:border-[#768D7C]/60 hover:shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-serif font-semibold text-[#3A3530]">{card.label}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          <button 
                            onClick={(e) => { e.stopPropagation(); moveShelfCard(card.id, 'max'); }}
                            className="bg-[#5A9E6E]/15 text-[#3A5D43] hover:bg-[#5A9E6E] hover:text-white px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider transition-all cursor-pointer"
                          >
                            Máxima
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); moveShelfCard(card.id, 'mid'); }}
                            className="bg-[#E2B05C]/15 text-[#73521E] hover:bg-[#E2B05C] hover:text-white px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider transition-all cursor-pointer"
                          >
                            Média
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); moveShelfCard(card.id, 'min'); }}
                            className="bg-[#C47D68]/15 text-[#7C3F2E] hover:bg-[#C47D68] hover:text-white px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider transition-all cursor-pointer"
                          >
                            Mínima
                          </button>
                        </div>
                      </div>
                    ))}
                    {shelfPool.length === 0 && (
                      <div className="w-full text-center py-12 text-xs text-[#A39E93] italic">
                        Todos os cartões foram colocados.
                      </div>
                    )}
                  </div>
                </div>

                {/* Right column: Shelves */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  
                  {/* Shelf 1: Prioridade Máxima */}
                  <div className="border border-[#E8E2D8] rounded-2xl p-5 bg-white shadow-xs">
                    <div className="flex items-center gap-3 mb-3.5 flex-wrap">
                      <span className="w-3 h-3 rounded-full bg-[#5A9E6E]" />
                      <span className="text-xs font-semibold text-[#3A3530]">Prioridade Máxima</span>
                      <span className="text-[0.78rem] text-[#948E85] italic lg:ml-auto">"Hoje recebe minha maior atenção."</span>
                    </div>
                    <div
                      className="min-h-[70px] p-3 border-2 border-dashed border-[#D6CFC4] rounded-xl flex flex-wrap gap-2 items-start content-start justify-start bg-[#F9F8F6]/50 transition-colors duration-300"
                    >
                      {shelfMax.map(card => (
                        <div
                          key={card.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            moveShelfCard(card.id, 'pool');
                          }}
                          className="bg-white border border-[#E8E2D8] hover:border-[#C47D68] hover:text-[#C47D68] px-3.5 py-2 rounded-full text-xs text-[#3A3530] font-medium shadow-2xs transition-all cursor-pointer flex items-center justify-between gap-2.5 select-none"
                          title="Toque para remover"
                        >
                          <span>{card.label}</span>
                          <span className="text-[11px] text-[#C47D68] font-bold opacity-60 hover:opacity-100">&times;</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shelf 2: Consigo Dar Conta */}
                  <div className="border border-[#E8E2D8] rounded-2xl p-5 bg-white shadow-xs">
                    <div className="flex items-center gap-3 mb-3.5 flex-wrap">
                      <span className="w-3 h-3 rounded-full bg-[#E2B05C]" />
                      <span className="text-xs font-semibold text-[#3A3530]">Consigo Dar Conta</span>
                      <span className="text-[0.78rem] text-[#948E85] italic lg:ml-auto">"Poderia receber mais cuidado."</span>
                    </div>
                    <div
                      className="min-h-[70px] p-3 border-2 border-dashed border-[#D6CFC4] rounded-xl flex flex-wrap gap-2 items-start content-start justify-start bg-[#F9F8F6]/50 transition-colors duration-300"
                    >
                      {shelfMid.map(card => (
                        <div
                          key={card.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            moveShelfCard(card.id, 'pool');
                          }}
                          className="bg-white border border-[#E8E2D8] hover:border-[#C47D68] hover:text-[#C47D68] px-3.5 py-2 rounded-full text-xs text-[#3A3530] font-medium shadow-2xs transition-all cursor-pointer flex items-center justify-between gap-2.5 select-none"
                          title="Toque para remover"
                        >
                          <span>{card.label}</span>
                          <span className="text-[11px] text-[#C47D68] font-bold opacity-60 hover:opacity-100">&times;</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shelf 3: Esquecido ou Abandonado */}
                  <div className="border border-[#E8E2D8] rounded-2xl p-5 bg-white shadow-xs">
                    <div className="flex items-center gap-3 mb-3.5 flex-wrap">
                      <span className="w-3 h-3 rounded-full bg-[#C47D68]" />
                      <span className="text-xs font-semibold text-[#3A3530]">Esquecido ou Abandonado</span>
                      <span className="text-[0.78rem] text-[#948E85] italic lg:ml-auto">"Tenho deixado muito de lado."</span>
                    </div>
                    <div
                      className="min-h-[70px] p-3 border-2 border-dashed border-[#D6CFC4] rounded-xl flex flex-wrap gap-2 items-start content-start justify-start bg-[#F9F8F6]/50 transition-colors duration-300"
                    >
                      {shelfMin.map(card => (
                        <div
                          key={card.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            moveShelfCard(card.id, 'pool');
                          }}
                          className="bg-white border border-[#E8E2D8] hover:border-[#C47D68] hover:text-[#C47D68] px-3.5 py-2 rounded-full text-xs text-[#3A3530] font-medium shadow-2xs transition-all cursor-pointer flex items-center justify-between gap-2.5 select-none"
                          title="Toque para remover"
                        >
                          <span>{card.label}</span>
                          <span className="text-[11px] text-[#C47D68] font-bold opacity-60 hover:opacity-100">&times;</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Button Calculate */}
              <div className="flex flex-col items-center mt-10">
                <button
                  onClick={handleCalculateShelf}
                  className="bg-[#768D7C] hover:bg-[#637768] text-white font-medium text-sm px-10 py-3.5 rounded-full shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus:outline-none"
                >
                  Concluir Organização
                </button>
              </div>

              {/* Result Panel */}
              {shelfResultCalculated && (
                <div className="mt-12 border-t border-[#E8E2D8] pt-10 animate-fade-in text-left">
                  <div className="flex flex-col md:flex-row gap-10 items-center mb-8">
                    
                    {/* Dynamic score donut */}
                    <div className="relative w-[130px] h-[130px] shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle className="stroke-[#F9F8F6] fill-none" strokeWidth="8" cx="60" cy="60" r="54" />
                        <circle 
                          className="stroke-[#768D7C] fill-none transition-all duration-[1.2s] ease-in-out" 
                          strokeWidth="8" 
                          strokeLinecap="round"
                          cx="60" 
                          cy="60" 
                          r="54" 
                          strokeDasharray={2 * Math.PI * 54}
                          strokeDashoffset={(2 * Math.PI * 54) - (shelfPercentage / 100) * (2 * Math.PI * 54)}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="font-sans text-2xl font-bold text-[#3A3530]">{shelfPercentage}%</span>
                        <span className="text-[0.65rem] text-[#A39E93] uppercase tracking-wider font-medium">Equilíbrio</span>
                      </div>
                    </div>

                    {/* Interpretation text */}
                    <div 
                      className="text-[1.02rem] text-[#3A3530] font-light leading-relaxed flex-1"
                      dangerouslySetInnerHTML={{ __html: shelfInterpretation }}
                    />

                  </div>

                  {/* Critical Insights */}
                  {shelfInsights.length > 0 && (
                    <div className="space-y-4 mb-8">
                      {shelfInsights.map((ins, i) => (
                        <div 
                          key={i}
                          className={`border-l-4 p-4 rounded-r-xl text-sm leading-relaxed ${ins.includes('💛') ? 'border-[#C47D68] bg-[#FBF1EF]' : 'border-[#E2B05C] bg-[#FCF9F3]'}`}
                          dangerouslySetInnerHTML={{ __html: ins }}
                        />
                      ))}
                    </div>
                  )}

                  <p className="text-[0.8rem] text-[#A39E93] italic pt-4 border-t border-[#F9F8F6]">
                    *Lembrete Acolhedor: Este painel foi desenhado exclusivamente como uma ferramenta de autorreflexão e apoio pedagógico. Ele não constitui um diagnóstico clínico ou avaliação psicológica formal.
                  </p>

                </div>
              )}
            </section>
          </div>
        )}

        {/* Render 7. NARCISISMO */}
        {articleId === 'narcisismo' && (
          <div className="space-y-16">
            {/* Primary Article Card */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] shadow-xs overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                
                {/* SVG Illustration Left panel */}
                <div className="lg:w-[45%] bg-[#F8F7F4] flex items-center justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#E8E2D8] group">
                  <div className="w-full max-w-[280px] aspect-square flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-auto" role="img" aria-label="Ilustração abstrata minimalista com elipses desalinhadas e uma linha estrutural firme, simbolizando a distorção relacional e o resgate do equilíbrio pessoal">
                      {/* Formas desalinhadas que representam a distorção e a projeção assimétrica */}
                      <circle cx="90" cy="100" r="48" stroke="#E8E2D8" strokeWidth="1.2"/>
                      <ellipse cx="106" cy="100" rx="34" ry="44" stroke="#868C81" strokeWidth="1" strokeDasharray="3 4"/>
                      
                      {/* Linha vertical firme de contorno, estrutura e limites terapêuticos */}
                      <line x1="118" y1="45" x2="118" y2="155" stroke="#868C81" strokeWidth="1.2" strokeLinecap="round"/>
                      
                      {/* Centro de consciência, clareza e preservação do self (Terracota) */}
                      <circle cx="118" cy="100" r="4" fill="#B9855A"/>
                      <circle cx="68" cy="100" r="2" fill="#868C81" opacity="0.5"/>
                      
                      {/* Arco sutil unificador de fundo */}
                      <path d="M50 140 C 80 165, 120 165, 150 140" stroke="#E8E2D8" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                {/* Content Column Right panel */}
                <div className="lg:w-[55%] p-8 md:p-14 flex flex-col justify-center text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#868C81] mb-3">Psicologia Clínica</span>
                  <h1 className="font-serif text-3xl md:text-4.5xl text-[#33312E] leading-tight mb-6 font-medium">Narcisismo</h1>
                  
                  <div className="space-y-4 text-sm md:text-base font-light leading-relaxed text-[#5C6356]">
                    <p>Nos últimos anos, o termo "narcisismo" passou a ser amplamente utilizado, principalmente nas redes sociais. No entanto, é importante compreender que nem todo comportamento egoísta ou difícil caracteriza o Transtorno da Personalidade Narcisista. Muitas pessoas apresentam traços narcisistas em determinados momentos, enquanto outras podem ter um funcionamento mais persistente e prejudicial.</p>
                    
                    <p>Em relacionamentos, pessoas com fortes traços narcisistas podem apresentar comportamentos como necessidade excessiva de admiração, dificuldade em reconhecer os sentimentos do outro, manipulação, desvalorização, controle e pouca capacidade de assumir responsabilidades pelos próprios atos. Essas dinâmicas podem gerar confusão, culpa, insegurança e desgaste emocional em quem convive com elas.</p>
                    
                    <p>É comum que, após vivenciar uma relação marcada por manipulação ou abuso emocional, a pessoa passe a questionar sua própria percepção da realidade, sua autoestima e até sua capacidade de confiar novamente.</p>
                    
                    <p>A psicoterapia pode ajudar tanto quem identifica em si características que gostaria de compreender e modificar quanto quem sofreu os impactos de um relacionamento abusivo. O processo terapêutico favorece o fortalecimento da autoestima, o desenvolvimento de limites saudáveis, a reconstrução da confiança e a compreensão das dinâmicas emocionais envolvidas. Independentemente da situação, buscar ajuda é um passo importante para construir relações mais respeitosas e equilibradas.</p>
                  </div>

                  <a 
                    href="https://wa.me/5512991766972" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 bg-[#B9855A] hover:bg-[#A3724A] text-white font-medium text-sm px-8 py-3.5 rounded-full shadow-xs hover:shadow-md transition-all duration-300 w-fit text-center"
                  >
                    Agendar Consulta via WhatsApp
                  </a>
                </div>

              </div>
            </section>

            {/* O Acordeão de Escolhas Difíceis (Interactive Decision Tree) */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] p-8 md:p-14 shadow-xs text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Side: SVG Visual Column */}
                <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E8E2D8]/50 rounded-2xl p-8 flex items-center justify-center group">
                  <div className="w-full max-w-[280px] aspect-[320/420] relative transition-transform duration-500 group-hover:scale-105">
                    <svg viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-auto">
                      <rect width="320" height="420" rx="12" fill="#FAF8F5" />
                      <path d="M160 50 C210 50, 240 100, 240 180 C240 260, 210 310, 160 310 C110 310, 80 260, 80 180 C80 100, 110 50, 160 50 Z" stroke="#E8E2D8" strokeWidth="1.5" />
                      <path d="M125 140 C125 125, 140 120, 150 120 C155 120, 158 125, 158 135 C154 150, 145 180, 135 180 C130 180, 125 175, 125 140 Z" fill="#6E7E70" opacity="0.6"/>
                      <path d="M195 140 C195 125, 180 120, 170 120 C165 120, 162 125, 162 135 C166 150, 175 180, 185 180 C190 180, 195 175, 195 140 Z" fill="#C67A63" opacity="0.4"/>
                      <line x1="160" y1="310" x2="160" y2="360" stroke="#6E7E70" strokeWidth="1.2" strokeDasharray="3 3" />
                      <circle cx="160" cy="360" r="4" fill="#C67A63" />
                    </svg>
                  </div>
                </div>

                {/* Right Side: Editorial Interactive Decision Tree Content */}
                <div className="lg:col-span-7 flex flex-col items-start">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6E7E70] border-b border-[#6E7E70]/25 pb-1 mb-4 inline-block">Dinâmicas de Controle</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#2B302C] leading-tight font-medium mb-6">
                    O Acordeão de Escolhas Difíceis
                  </h2>

                  <div className="w-full relative mt-2">
                    {narcissismStep === 'layer-1' && (
                      <div className="space-y-4">
                        <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                          <strong>Camada 1:</strong> No seu convívio diário, você sente que as suas necessidades e sentimentos são frequentemente minimizados para dar lugar absoluto à validação e aos desejos do outro?
                        </p>
                        <div className="flex gap-3">
                          <button onClick={() => setNarcissismStep('l2-sim')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Sim</button>
                          <button onClick={() => setNarcissismStep('l2-nao')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Não</button>
                        </div>
                      </div>
                    )}

                    {narcissismStep === 'l2-sim' && (
                      <div className="space-y-4">
                        <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                          <strong>Camada 2:</strong> Quando você tenta expressar essa insatisfação ou estabelecer um limite, a pessoa reage com hostilidade, vitimização ou inverte a culpa, fazendo você questionar a sua própria sanidade?
                        </p>
                        <div className="flex gap-3">
                          <button onClick={() => setNarcissismStep('l3-sim-sim')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Sim</button>
                          <button onClick={() => setNarcissismStep('l3-sim-nao')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Não</button>
                        </div>
                      </div>
                    )}

                    {narcissismStep === 'l2-nao' && (
                      <div className="space-y-4">
                        <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                          <strong>Camada 2:</strong> Apesar de não haver minimização direta, você percebe que o afeto recebido é condicional, oferecido em abundância apenas quando você atende perfeitamente às expectativas de sucesso do outro?
                        </p>
                        <div className="flex gap-3">
                          <button onClick={() => setNarcissismStep('l3-nao-sim')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Sim</button>
                          <button onClick={() => setNarcissismStep('l3-nao-nao')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Não</button>
                        </div>
                      </div>
                    )}

                    {narcissismStep === 'l3-sim-sim' && (
                      <div className="space-y-4">
                        <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                          <strong>Camada 3:</strong> Para preservar a paz e evitar retaliações emocionais, você percebe que começou a se afastar de amigos, familiares ou abriu mão de seus próprios objetivos individuais?
                        </p>
                        <div className="flex gap-3">
                          <button onClick={() => setNarcissismStep('outcome-sss')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Sim</button>
                          <button onClick={() => setNarcissismStep('outcome-ssn')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Não</button>
                        </div>
                      </div>
                    )}

                    {narcissismStep === 'l3-sim-nao' && (
                      <div className="space-y-4">
                        <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                          <strong>Camada 3:</strong> Mesmo conseguindo resguardar sua rede de apoio social, o ambiente compartilhado com essa pessoa gera uma sensação crônica de fadiga e de "caminhar sobre ovos"?
                        </p>
                        <div className="flex gap-3">
                          <button onClick={() => setNarcissismStep('outcome-sns')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Sim</button>
                          <button onClick={() => setNarcissismStep('outcome-snn')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Não</button>
                        </div>
                      </div>
                    )}

                    {narcissismStep === 'l3-nao-sim' && (
                      <div className="space-y-4">
                        <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                          <strong>Camada 3:</strong> Ao falhar intencionalmente ou demonstrar imperfeição em relação a essas cobranças, você é punido sutilmente com o silêncio gelado, distanciamento ou indiferença?
                        </p>
                        <div className="flex gap-3">
                          <button onClick={() => setNarcissismStep('outcome-nss')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Sim</button>
                          <button onClick={() => setNarcissismStep('outcome-nsn')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Não</button>
                        </div>
                      </div>
                    )}

                    {narcissismStep === 'l3-nao-nao' && (
                      <div className="space-y-4">
                        <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                          <strong>Camada 3:</strong> Caso as respostas anteriores não se encaixem, você nota esse padrão de busca obsessiva por controle, superioridade e falta de reciprocidade em outras áreas da vida dessa pessoa?
                        </p>
                        <div className="flex gap-3">
                          <button onClick={() => setNarcissismStep('outcome-nns')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Sim</button>
                          <button onClick={() => setNarcissismStep('outcome-nnn')} className="px-6 py-2 border border-[#E8E2D8] hover:border-[#6E7E70] hover:bg-[#FAF8F5] text-[#2B302C] hover:text-[#4A554B] rounded-full text-xs md:text-sm font-medium transition-all duration-300">Não</button>
                        </div>
                      </div>
                    )}

                    {/* OUTCOMES / RESULTS PANELS */}
                    {narcissismStep.startsWith('outcome-') && (
                      <div className="space-y-6">
                        <div className="bg-[#FAF8F5] border-l-2 border-[#6E7E70] p-6 rounded-r-xl">
                          {narcissismStep === 'outcome-sss' && (
                            <>
                              <h4 className="font-serif text-lg font-semibold text-[#2B302C] mb-2">Análise: Anulação de Identidade</h4>
                              <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                                O isolamento e a inversão sistemática de culpa são indícios claros de aprisionamento em um ecossistema abusivo. O impacto do Narcisismo estrutural distorce a percepção da realidade nos relacionamentos, exigindo um doloroso processo de resgate de limites. Compreender essa teia é o primeiro passo absoluto para reconstruir sua autonomia.
                              </p>
                            </>
                          )}
                          {narcissismStep === 'outcome-ssn' && (
                            <>
                              <h4 className="font-serif text-lg font-semibold text-[#2B302C] mb-2">Análise: Submissão Consentida</h4>
                              <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                                Mesmo que você mantenha seus contatos externos ativos, ceder constantemente aos caprichos emocionais do outro anula sua individualidade a médio prazo. O Narcisismo drena as forças vitais e cria uma dependência sutil nos relacionamentos cotidianos. Identificar essas concessões invisíveis é vital para reestabelecer o respeito próprio.
                              </p>
                            </>
                          )}
                          {narcissismStep === 'outcome-sns' && (
                            <>
                              <h4 className="font-serif text-lg font-semibold text-[#2B302C] mb-2">Análise: Tensão Crônica</h4>
                              <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                                A exaustão mental provocada pelo estado permanente de alerta sinaliza que o vínculo perdeu a segurança. O Narcisismo opera impondo uma assimetria de poder que desestabiliza a paz nos relacionamentos íntimos. Validar o seu próprio cansaço é o início da sua libertação clínica.
                              </p>
                            </>
                          )}
                          {narcissismStep === 'outcome-snn' && (
                            <>
                              <h4 className="font-serif text-lg font-semibold text-[#2B302C] mb-2">Análise: Conflito Velado</h4>
                              <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                                Mesmo sem isolamento evidente, a flutuação constante entre a calmaria e a hostilidade velada indica uma manipulação de bastidores. O Narcisismo se alimenta da incerteza, mantendo o controle emotional nos relacionamentos por meio de pequenas pressões psicológicas.
                              </p>
                            </>
                          )}
                          {narcissismStep === 'outcome-nss' && (
                            <>
                              <h4 className="font-serif text-lg font-semibold text-[#2B302C] mb-2">Análise: Rejeição Silenciosa</h4>
                              <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                                A punição pelo silêncio (tratamento de gelo) é uma das armas mais refinadas do Narcisismo para forçar a submissão sem deixar marcas físicas. Essa dinâmica gera um sofrimento profundo e mina a estabilidade afetiva nos relacionamentos saudáveis.
                              </p>
                            </>
                          )}
                          {narcissismStep === 'outcome-nsn' && (
                            <>
                              <h4 className="font-serif text-lg font-semibold text-[#2B302C] mb-2">Análise: Afeto Sob Condição</h4>
                              <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                                O amor ou validação oferecidos apenas como prêmio por conquistas indicam que você está sendo instrumentalizado. O Narcisismo impede o reconhecimento do seu valor real, transformando o afeto em barganha nos relacionamentos.
                              </p>
                            </>
                          )}
                          {narcissismStep === 'outcome-nns' && (
                            <>
                              <h4 className="font-serif text-lg font-semibold text-[#2B302C] mb-2">Análise: Narcisismo Periférico</h4>
                              <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                                Quando o padrão se manifesta de forma externa (no ambiente corporativo ou social), ele ainda assim pode projetar sombras e minar a harmonia de suas parcerias íntimas, gerando estresse secundário nos relacionamentos que você tenta proteger.
                              </p>
                            </>
                          )}
                          {narcissismStep === 'outcome-nnn' && (
                            <>
                              <h4 className="font-serif text-lg font-semibold text-[#2B302C] mb-2">Análise: Equilíbrio e Preservação</h4>
                              <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                                Suas respostas indicam que, felizmente, essa dinâmica de controle não dita as regras do seu ambiente atual. Contudo, manter-se consciente sobre os traços do Narcisismo protege preventivamente a integridade e a simetria de todos os seus relacionamentos futuros.
                              </p>
                            </>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-end">
                          <button 
                            onClick={() => setNarcissismStep('layer-1')}
                            className="text-xs uppercase tracking-wider font-semibold text-[#6E7E70] border border-[#6E7E70]/30 hover:bg-[#6E7E70]/5 px-4 py-2 rounded-full transition-colors cursor-pointer"
                          >
                            Reiniciar Análise
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* Render 8. RELACIONAMENTOS */}
        {articleId === 'relacionamentos' && (
          <div className="space-y-16">
            {/* Primary Article Card */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] shadow-xs overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                
                {/* SVG Illustration Left panel */}
                <div className="lg:w-[45%] bg-[#F8F7F4] flex items-center justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#E8E2D8] group">
                  <div className="w-full max-w-[280px] aspect-square flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-auto" role="img" aria-label="Ilustração abstrata minimalista de dois arcos que se tocam e se complementam em equilíbrio, simbolizando a reciprocidade e o respeito nas relações">
                      {/* Duas individualidades (arcos elegantes) se conectando */}
                      <path d="M55 130 C 55 80, 95 65, 115 95" stroke="#868C81" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M145 130 C 145 80, 105 65, 85 95" stroke="#E8E2D8" strokeWidth="1.5" strokeLinecap="round"/>
                      
                      {/* Linha horizontal interna de ponte, comunicação e equilíbrio */}
                      <line x1="75" y1="110" x2="125" y2="110" stroke="#868C81" strokeWidth="1" strokeDasharray="3 4" opacity="0.8"/>
                      
                      {/* Centro focal afetivo e de equilíbrio relacional (Terracota) */}
                      <circle cx="100" cy="90" r="4.5" fill="#B9855A"/>
                      
                      {/* Base de ancoragem compartilhada sutil */}
                      <path d="M40 145 H 160" stroke="#E8E2D8" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                {/* Content Column Right panel */}
                <div className="lg:w-[55%] p-8 md:p-14 flex flex-col justify-center text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#868C81] mb-3">Psicologia Clínica</span>
                  <h1 className="font-serif text-3xl md:text-4.5xl text-[#33312E] leading-tight mb-6 font-medium">Relacionamentos</h1>
                  
                  <div className="space-y-4 text-sm md:text-base font-light leading-relaxed text-[#5C6356]">
                    <p>Os relacionamentos fazem parte da vida e exercem grande influência sobre nosso bem-estar emocional. Seja no âmbito amoroso, familiar, profissional ou nas amizades, a forma como nos conectamos com as outras pessoas pode trazer segurança, crescimento e apoio, mas também conflitos, sofrimento e frustrações.</p>
                    
                    <p>Dificuldades de comunicação, ciúmes, segurança, dependência emocional, medo do abandono, dificuldades para estabelecer limites e términos de relacionamento são questões muito frequentes. Muitas vezes, essas situações não surgem apenas pelo comportamento do outro, mas também pelos padrões que desenvolvemos ao longo da vida e pela maneira como aprendemos a lidar com nossas emoções.</p>
                    
                    <p>A psicoterapia não tem como objetivo decidir se você deve permanecer ou não em um relacionamento. Seu papel é ajudá-lo a compreender suas necessidades, fortalecer sua autonomia emocional, desenvolver habilidades de comunicação e construir relações baseadas em respeito, reciprocidade e equilíbrio.</p>
                    
                    <p>Quando aprendemos a nos conhecer melhor, também nos tornamos mais capazes de construir vínculos saudáveis, respeitando tanto nossos próprios limites quanto os das pessoas ao nosso redor.</p>
                  </div>

                  <a 
                    href="https://wa.me/5512991766972" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 bg-[#B9855A] hover:bg-[#A3724A] text-white font-medium text-sm px-8 py-3.5 rounded-full shadow-xs hover:shadow-md transition-all duration-300 w-fit text-center"
                  >
                    Agendar Consulta via WhatsApp
                  </a>
                </div>

              </div>
            </section>

            {/* O Teste das Quatro Portas */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] p-8 md:p-14 shadow-xs text-left">
              <header className="max-w-3xl mx-auto text-center mb-12 border-b border-[#E8E2D8]/60 pb-6">
                <span className="text-xs font-semibold text-[#6E7E70] uppercase tracking-wider block mb-2">Dinâmicas de Relacionamento</span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#3A3530] font-medium mb-4">O Teste das Quatro Portas</h2>
                <p className="text-sm font-light text-[#68635E] leading-relaxed max-w-2xl mx-auto">
                  Análise arquetípica das reações emocionais em momentos de crise afetiva. Explore os quatro cenários gráficos abaixo e selecione aquele que melhor espelha a sua conduta instintiva ou o seu posicionamento imediato durante um conflito amoroso sério.
                </p>
              </header>

              {relationshipsDoor === 'gate-selection' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* DOOR 1 */}
                  <button 
                    onClick={() => setRelationshipsDoor('outcome-gate-1')}
                    className="group flex flex-col text-left p-6 bg-[#FAF8F5] hover:bg-white border border-[#E8E2D8] hover:border-[#6E7E70] rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-1 focus:outline-none"
                  >
                    <div className="w-full h-40 bg-white border border-[#E8E2D8]/40 group-hover:bg-[#FAF8F5] rounded-xl mb-4 flex items-center justify-center p-4 transition-all duration-300">
                      <svg viewBox="0 0 200 120" className="w-full h-full max-h-[110px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="100" y1="10" x2="100" y2="110" stroke="#6E7E70" strokeWidth="2" strokeDasharray="4 4" />
                        <rect x="25" y="40" width="40" height="40" rx="4" fill="#6E7E70" opacity="0.15" />
                        <rect x="135" y="40" width="40" height="40" rx="4" fill="#2B302C" opacity="0.7" />
                      </svg>
                    </div>
                    <span className="text-[0.7rem] font-bold text-[#C67A63] tracking-widest uppercase mb-1">Cenário 1</span>
                    <h3 className="font-serif text-lg font-medium text-[#2B302C] mb-2">A Retirada Estratégica</h3>
                    <p className="text-xs md:text-sm text-[#626B64] font-light leading-relaxed">Você prefere silenciar, afastar-se fisicamente ou erguer uma parede de contenção emocional para evitar o transbordo ou o agravamento da discussão.</p>
                  </button>

                  {/* DOOR 2 */}
                  <button 
                    onClick={() => setRelationshipsDoor('outcome-gate-2')}
                    className="group flex flex-col text-left p-6 bg-[#FAF8F5] hover:bg-white border border-[#E8E2D8] hover:border-[#6E7E70] rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-1 focus:outline-none"
                  >
                    <div className="w-full h-40 bg-white border border-[#E8E2D8]/40 group-hover:bg-[#FAF8F5] rounded-xl mb-4 flex items-center justify-center p-4 transition-all duration-300">
                      <svg viewBox="0 0 200 120" className="w-full h-full max-h-[110px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 60 C 60 10, 80 110, 110 60 C 140 10, 160 110, 170 60" stroke="#C67A63" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="170" cy="60" r="4" fill="#C67A63" />
                      </svg>
                    </div>
                    <span className="text-[0.7rem] font-bold text-[#C67A63] tracking-widest uppercase mb-1">Cenário 2</span>
                    <h3 className="font-serif text-lg font-medium text-[#2B302C] mb-2">A Busca de Resolução Imediata</h3>
                    <p className="text-xs md:text-sm text-[#626B64] font-light leading-relaxed">Você sente uma urgência visceral de debater e esclarecer o problema imediatamente, insistindo na comunicação até obter uma resposta segura.</p>
                  </button>

                  {/* DOOR 3 */}
                  <button 
                    onClick={() => setRelationshipsDoor('outcome-gate-3')}
                    className="group flex flex-col text-left p-6 bg-[#FAF8F5] hover:bg-white border border-[#E8E2D8] hover:border-[#6E7E70] rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-1 focus:outline-none"
                  >
                    <div className="w-full h-40 bg-white border border-[#E8E2D8]/40 group-hover:bg-[#FAF8F5] rounded-xl mb-4 flex items-center justify-center p-4 transition-all duration-300">
                      <svg viewBox="0 0 200 120" className="w-full h-full max-h-[110px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="40" y="25" width="120" height="70" rx="6" stroke="#6E7E70" strokeWidth="1.2" />
                        <line x1="40" y1="60" x2="160" y2="60" stroke="#E8E2D8" strokeWidth="1" />
                        <line x1="100" y1="25" x2="100" y2="95" stroke="#E8E2D8" strokeWidth="1" />
                        <circle cx="100" cy="60" r="12" stroke="#C67A63" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <span className="text-[0.7rem] font-bold text-[#C67A63] tracking-widest uppercase mb-1">Cenário 3</span>
                    <h3 className="font-serif text-lg font-medium text-[#2B302C] mb-2">A Arquitetura Lógica</h3>
                    <p className="text-xs md:text-sm text-[#626B64] font-light leading-relaxed">Você afasta as reações emocionais e foca estritamente nos fatos objetivos, dissecando cronologicamente os erros e contradições do evento.</p>
                  </button>

                  {/* DOOR 4 */}
                  <button 
                    onClick={() => setRelationshipsDoor('outcome-gate-4')}
                    className="group flex flex-col text-left p-6 bg-[#FAF8F5] hover:bg-white border border-[#E8E2D8] hover:border-[#6E7E70] rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-1 focus:outline-none"
                  >
                    <div className="w-full h-40 bg-white border border-[#E8E2D8]/40 group-hover:bg-[#FAF8F5] rounded-xl mb-4 flex items-center justify-center p-4 transition-all duration-300">
                      <svg viewBox="0 0 200 120" className="w-full h-full max-h-[110px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="60" r="35" stroke="#6E7E70" strokeWidth="1.5" />
                        <circle cx="100" cy="60" r="20" fill="#6E7E70" opacity="0.1" />
                        <path d="M85 60 L115 60" stroke="#C67A63" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="text-[0.7rem] font-bold text-[#C67A63] tracking-widest uppercase mb-1">Cenário 4</span>
                    <h3 className="font-serif text-lg font-medium text-[#2B302C] mb-2">A Pacificação Maleável</h3>
                    <p className="text-xs md:text-sm text-[#626B64] font-light leading-relaxed">Você prefere ceder prontamente, absorver a culpa ou acomodar suas próprias pretensões para resguardar a harmonia mútua e cessar a tensão.</p>
                  </button>

                </div>
              ) : (
                <div className="space-y-8">
                  
                  {/* DOOR OUTCOME SPECIFIC CONTENT */}
                  {relationshipsDoor === 'outcome-gate-1' && (
                    <div className="bg-[#FAF8F5] border-l-4 border-[#6E7E70] rounded-r-2xl p-8 space-y-4">
                      <span className="text-xs font-bold text-[#6E7E70] uppercase tracking-wider">Análise Profilática</span>
                      <h3 className="font-serif text-2xl font-medium text-[#2B302C]">Arquetipologia: O Distanciamento Defensivo (Stonewalling)</h3>
                      <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                        Sua escolha denota um movimento clássico de preservação por meio do afastamento. Quando as demandas do ambiente amoroso ultrapassam seu limite tátil de tolerância, seu sistema nervoso ativa a resposta de congelamento ou esquiva. Embora essa conduta proteja sua integridade imediata contra inundações emocionais, ela frequentemente sinaliza indiferença ao parceiro, gerando ciclos de frustração crônica por ausência de resolutividade.
                      </p>
                    </div>
                  )}

                  {relationshipsDoor === 'outcome-gate-2' && (
                    <div className="bg-[#FAF8F5] border-l-4 border-[#6E7E70] rounded-r-2xl p-8 space-y-4">
                      <span className="text-xs font-bold text-[#6E7E70] uppercase tracking-wider">Análise Profilática</span>
                      <h3 className="font-serif text-2xl font-medium text-[#2B302C]">Arquetipologia: A Hiperativação Ansiosa</h3>
                      <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                        Sua preferência revela uma necessidade imperativa de vinculação e validação contínua nos momentos de crise. A latência ou o espaço do silêncio do outro são interpretados internamente como ameaças iminentes de abandono ou rejeição. Essa urgência obstinada em restabelecer a conexão na hora do conflito tende a sobrecarregar o parceiro, gerando um efeito paradoxal de distanciamento reativo da outra parte.
                      </p>
                    </div>
                  )}

                  {relationshipsDoor === 'outcome-gate-3' && (
                    <div className="bg-[#FAF8F5] border-l-4 border-[#6E7E70] rounded-r-2xl p-8 space-y-4">
                      <span className="text-xs font-bold text-[#6E7E70] uppercase tracking-wider">Análise Profilática</span>
                      <h3 className="font-serif text-2xl font-medium text-[#2B302C]">Arquetipologia: A Intelectualização Hiper-Racional</h3>
                      <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                        Sua conduta reflete o uso da lógica pura como mecanismo de defesa contra o desconforto da vulnerabilidade emotional. Ao converter uma crise afetiva em um debate processual focado em fatos e evidências frias, você assume uma postura de aparente controle. Contudo, essa operação cognitiva afasta a validação empática dos sentimentos do parceiro, transformando a arena do relacionamento em um tribunal estéril onde não há vencedores reais.
                      </p>
                    </div>
                  )}

                  {relationshipsDoor === 'outcome-gate-4' && (
                    <div className="bg-[#FAF8F5] border-l-4 border-[#6E7E70] rounded-r-2xl p-8 space-y-4">
                      <span className="text-xs font-bold text-[#6E7E70] uppercase tracking-wider">Análise Profilática</span>
                      <h3 className="font-serif text-2xl font-medium text-[#2B302C]">Arquetipologia: A Autoanulação Pacificadora</h3>
                      <p className="text-sm md:text-base font-light text-[#626B64] leading-relaxed">
                        Sua resposta indica uma tendência sistemática à submissão em prol da preservação da paz. Para afastar a iminência de um confronto ou a dor de uma potencial rejeição, você prefere silenciar suas próprias demandas legítimas. Embora essa estratégia restaure uma calmaria superficial imediata no ecossistema do casal, o acúmulo continuado de insatisfações e a ausência de limites geram, a longo prazo, um profundo ressentimento interno e o esvaziamento da sua identidade.
                      </p>
                    </div>
                  )}

                  {/* TCC Editorial Bridge Banner */}
                  <div className="border border-dashed border-[#6E7E70] bg-[#6E7E70]/2 rounded-[18px] p-8 md:p-10 text-left">
                    <span className="text-xs font-semibold text-[#C67A63] uppercase tracking-wider block mb-2">O Próximo Passo Clínico</span>
                    <h3 className="font-serif text-xl md:text-2xl font-medium text-[#2B302C] mb-3">Como a Terapia Cognitivo-Comportamental (TCC) Transforma Essa Dinâmica?</h3>
                    <p className="text-sm font-light text-[#626B64] leading-relaxed mb-6">
                      Nossos posicionamentos automáticos nas crises são dirigidos por crenças de desvalorização, desamparo ou hiper-racionalização defensiva. No próximo capítulo, focado na TCC, mostraremos como é possível reprogramar as lentes com as quais decodificamos as ações e o afeto alheios.
                    </p>
                    <div className="flex flex-wrap items-center gap-6">
                      <button 
                        onClick={() => setRelationshipsDoor('gate-selection')}
                        className="text-xs uppercase tracking-wider font-semibold text-[#626B64] border-b border-[#626B64]/30 hover:border-[#626B64] transition-all duration-300 pb-0.5 focus:outline-none cursor-pointer"
                      >
                        Explorar Outra Porta
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </section>
          </div>
        )}

        {/* Render 9. TCC */}
        {articleId === 'tcc' && (
          <div className="space-y-16">
            {/* Primary Article Card */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] shadow-xs overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                
                {/* SVG Illustration Left panel */}
                <div className="lg:w-[45%] bg-[#F8F7F4] flex items-center justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#E8E2D8] group">
                  <div className="w-full max-w-[280px] aspect-square flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-auto" role="img" aria-label="Ilustração abstrata minimalista que mostra três pontos estruturados e linhas conectadas convergindo para um ponto central, simbolizando a interconexão da TCC">
                      {/* Linhas estruturais da abordagem (Elegância geométrica) */}
                      <polygon points="100,50 150,135 50,135" stroke="#E8E2D8" strokeWidth="1.2" strokeLinejoin="round"/>
                      
                      {/* Conexões internas que convergem ao centro de equilíbrio */}
                      <line x1="100" y1="50" x2="100" y2="108" stroke="#868C81" strokeWidth="1" strokeDasharray="3 3"/>
                      <line x1="50" y1="135" x2="100" y2="108" stroke="#868C81" strokeWidth="1" strokeDasharray="3 3"/>
                      <line x1="150" y1="135" x2="100" y2="108" stroke="#868C81" strokeWidth="1" strokeDasharray="3 3"/>
                      
                      {/* Vértices da Tríade Cognitiva */}
                      <circle cx="100" cy="50" r="3.5" fill="#868C81"/>
                      <circle cx="50" cy="135" r="3.5" fill="#868C81"/>
                      <circle cx="150" cy="135" r="3.5" fill="#868C81"/>
                      
                      {/* Centro focal de integração, reestruturação e mudança (Terracota) */}
                      <circle cx="100" cy="108" r="5" fill="#B9855A"/>
                      
                      {/* Círculo fino circundante que denota abrangência científica e integralidade */}
                      <circle cx="100" cy="105" r="65" stroke="#E8E2D8" strokeWidth="1" opacity="0.6"/>
                    </svg>
                  </div>
                </div>

                {/* Content Column Right panel */}
                <div className="lg:w-[55%] p-8 md:p-14 flex flex-col justify-center text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#868C81] mb-3">Abordagem Terapêutica</span>
                  <h1 className="font-serif text-3xl md:text-4.5xl text-[#33312E] leading-tight mb-6 font-medium">
                    Terapia Cognitivo-Comportamental <span className="font-sans text-xl md:text-2xl font-light text-[#B9855A]">(TCC)</span>
                  </h1>
                  
                  <div className="space-y-4 text-sm md:text-base font-light leading-relaxed text-[#5C6356]">
                    <p>A Terapia Cognitivo-Comportamental (TCC) é uma abordagem psicológica baseada em evidências científicas, amplamente reconhecida por sua eficácia no tratamento de diferentes questões emocionais e comportamentais, como ansiedade, depressão, transtornos de humor, estresse, dificuldades de autoestima, entre outras.</p>
                    
                    <p>Seu princípio é compreender como pensamentos, emoções e comportamentos estão conectados. Muitas vezes, interpretamos determinadas situações de maneira automática, influenciados por experiências anteriores e crenças que desenvolvemos ao longo da vida. Essas interpretações podem gerar sofrimento e manter ciclos que parecem difíceis de interromper.</p>
                    
                    <p>Durante o processo terapêutico, paciente e psicólogo trabalham em conjunto para identificar esses padrões de pensamento, compreender seu impacto e desenvolver formas mais saudáveis de lidar com as situações do dia a dia. Além da reflexão, a TCC utiliza estratégias práticas que auxiliam na mudança de comportamentos e no fortalecimento de habilidades emocionais.</p>
                    
                    <p>A terapia é sempre conduzida de forma respeitosa e personalizada, considerando a história, os objetivos e as necessidades de cada pessoa. O propósito é oferecer ferramentas para que você desenvolva mais autonomia, enfrente os desafios com maior segurança e promova mudanças que possam ser mantidas ao longo do tempo.</p>
                  </div>

                  <a 
                    href="https://wa.me/5512991766972" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 bg-[#B9855A] hover:bg-[#A3724A] text-white font-medium text-sm px-8 py-3.5 rounded-full shadow-xs hover:shadow-md transition-all duration-300 w-fit text-center"
                  >
                    Agendar Consulta via WhatsApp
                  </a>
                </div>

              </div>
            </section>

            {/* A Máquina do Tempo Mental Slider Widget */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] p-8 md:p-14 shadow-xs text-left">
              <header className="max-w-3xl mx-auto text-center mb-12 border-b border-[#E8E2D8]/60 pb-6">
                <span className="text-xs font-semibold text-[#768D7C] uppercase tracking-wider block mb-2">A TCC e a Reestruturação Cognitiva</span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#3A3530] font-medium mb-4">A Máquina do Tempo Mental</h2>
                <p className="text-sm font-light text-[#68635E] leading-relaxed max-w-2xl mx-auto">
                  Na Terapia Cognitivo-Comportamental (TCC), compreendemos que não são os fatos isolados que nos machucam, mas sim os filtros e lentes que usamos para interpretá-los.
                </p>
              </header>

              {/* Interactive Slider Workspace */}
              <div className="relative w-full h-[320px] md:h-[260px] border border-[#E8E2D8] rounded-2xl overflow-hidden bg-[#FAF8F5] shadow-xs select-none">
                
                {/* Underlay panel: The Anxious Thought */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center items-center text-center bg-[#FAF5F0] text-[#3A3530]">
                  <span className="text-[0.68rem] md:text-xs font-bold uppercase tracking-wider px-3 py-1 bg-[#C47D68]/10 text-[#C47D68] rounded-full mb-4">
                    Pensamento Automático Ansioso
                  </span>
                  <p className="font-serif text-base md:text-xl italic max-w-2xl leading-relaxed text-[#3A3530]">
                    "Se eu falhar ou demonstrar fraqueza nesta apresentação, todos vão perceber que sou incompetente, serei julgado e perderei tudo o que construí."
                  </p>
                </div>

                {/* Overlay panel: Restructured Thought with dynamic Clip Path */}
                <div 
                  className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center items-center text-center bg-[#F0F4F1] text-[#3A3530] z-20"
                  style={{ clipPath: `inset(0 0 0 ${tccSliderValue}%)` }}
                >
                  <span className="text-[0.68rem] md:text-xs font-bold uppercase tracking-wider px-3 py-1 bg-[#768D7C]/15 text-[#768D7C] rounded-full mb-4">
                    Pensamento Reestruturado pela TCC
                  </span>
                  <p className="font-serif text-base md:text-xl italic max-w-2xl leading-relaxed text-[#3A3530]">
                    "Sentir frio na barraiga é normal e esperado. Eu me preparei. Um deslize pontual não anula minha trajetória e nem define quem eu sou."
                  </p>
                </div>

                {/* Vertical divider line */}
                <div 
                  className="absolute top-0 bottom-0 z-30 w-[2px] bg-[#768D7C] pointer-events-none"
                  style={{ left: `${tccSliderValue}%` }}
                />

                {/* Floating slider handle */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-40 w-11 h-11 bg-white border-2 border-[#768D7C] rounded-full flex items-center justify-center shadow-lg text-[#768D7C] pointer-events-none text-xl font-light"
                  style={{ left: `${tccSliderValue}%` }}
                >
                  ‹ ›
                </div>

                {/* Real range input overlaid for transparent control */}
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={tccSliderValue} 
                  onChange={(e) => setTccSliderValue(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize z-50 w-full h-full"
                  aria-label="Deslize para alternar entre o pensamento ansioso e o reestruturado"
                />

              </div>

              {/* Outcome text block and CTA */}
              <div className="mt-10 border-t border-[#E8E2D8] pt-10 flex flex-col gap-6">
                <p className="text-[#3A3530] text-sm md:text-base font-light leading-relaxed">
                  <strong>Arrastou a barra?</strong> É exatamente isso que fazemos na terapia: reescrevemos a forma como você enxerga sua história, quebrando ciclos de autocrítica e abrindo espaço para respostas mais realistas e saudáveis.
                </p>
              </div>
            </section>
          </div>
        )}

        {/* Render 10. AUTISMO */}
        {articleId === 'autismo' && (
          <div className="space-y-16">
            {/* Primary Article Card */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] shadow-xs overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                
                {/* SVG Illustration Left panel */}
                <div className="lg:w-[45%] bg-[#F8F7F4] flex items-center justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#E8E2D8] group">
                  <div className="w-full max-w-[280px] aspect-square flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-auto" role="img" aria-label="Ilustração abstrata minimalista com arcos finos concêntricos e pontos de sálvia que circundam um ponto focal terracota, simbolizando a riqueza do espectro e o acolhimento seguro">
                      {/* Linhas em ondas que mostram diferentes formas de processamento de estímulos */}
                      <circle cx="100" cy="100" r="55" stroke="#E8E2D8" strokeWidth="1.2"/>
                      <circle cx="100" cy="100" r="40" stroke="#868C81" strokeWidth="1" strokeDasharray="2 3" opacity="0.7"/>
                      <circle cx="100" cy="100" r="25" stroke="#E8E2D8" strokeWidth="1.5"/>
                      
                      {/* Elementos lineares sutis e pontos, representando a singularidade e a diversidade no espectro */}
                      <line x1="100" y1="25" x2="100" y2="175" stroke="#E8E2D8" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
                      <circle cx="100" cy="45" r="3" fill="#868C81"/>
                      <circle cx="140" cy="100" r="2.5" fill="#868C81" opacity="0.6"/>
                      <circle cx="60" cy="100" r="2.5" fill="#868C81" opacity="0.6"/>
                      
                      {/* Centro focal de acolhimento, autoconhecimento e bem-estar (Terracota) */}
                      <circle cx="100" cy="100" r="5" fill="#B9855A"/>
                    </svg>
                  </div>
                </div>

                {/* Content Column Right panel */}
                <div className="lg:w-[55%] p-8 md:p-14 flex flex-col justify-center text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#868C81] mb-3">Neurodesenvolvimento</span>
                  <h1 className="font-serif text-3xl md:text-4.5xl text-[#33312E] leading-tight mb-6 font-medium">
                    Autismo <span className="font-sans text-xl md:text-2xl font-light text-[#B9855A]">(TEA)</span>
                  </h1>
                  
                  <div className="space-y-4 text-sm md:text-base font-light leading-relaxed text-[#5C6356]">
                    <p>O Transtorno do Espectro Autista (TEA) é uma condição do neurodesenvolvimento que influencia a forma como a pessoa percebe o mundo, se comunica, interage socialmente e processa diferentes estímulos. Cada indivíduo apresenta características únicas, por isso utiliza-se o termo "espectro", que reflete a diversidade de manifestações e necessidades de apoio.</p>
                    
                    <p>Nos últimos anos, muitas pessoas adultas passaram a buscar informações sobre o autismo ao perceberem características que estiveram presentes desde a infância, mas que nunca haviam sido compreendidas. Dificuldades nas interações sociais, necessidade de rotina, interesses intensos por determinados assuntos, sensibilidade a sons, luzes ou texturas e sensação de não se encaixar socialmente podem fazer parte dessa experiência.</p>
                    
                    <p>É importante destacar que apenas uma avaliação realizada por profissionais capacitados pode confirmar ou descartar um diagnóstico. Ter algumas características semelhantes não significa, necessariamente, estar dentro do espectro autista.</p>
                    
                    <p>A psicoterapia pode ser um importante recurso tanto para pessoas com diagnóstico de TEA quanto para aquelas que estão em processo de investigação. O acompanhamento psicológico auxilia na compreensão das próprias características, no fortalecimento da autoestima, no desenvolvimento de estratégias para lidar com os desafios do cotidiano e na promoção de uma vida com mais qualidade, autonomia e bem-estar. O objetivo não é mudar quem a pessoa é, mas ajudá-la a compreender suas necessidades e desenvolver recursos para viver de forma mais saudável e respeitando sua individualidade.</p>
                  </div>

                  <a 
                    href="https://wa.me/5512991766972" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 bg-[#B9855A] hover:bg-[#A3724A] text-white font-medium text-sm px-8 py-3.5 rounded-full shadow-xs hover:shadow-md transition-all duration-300 w-fit text-center"
                  >
                    Agendar Consulta via WhatsApp
                  </a>
                </div>

              </div>
            </section>

            {/* A Linha do Tempo da Sua História */}
            <section className="bg-white border border-[#E8E2D8] rounded-[22px] p-8 md:p-14 shadow-xs text-left">
              <header className="max-w-3xl mx-auto text-center mb-12 border-b border-[#E8E2D8]/60 pb-6">
                <span className="text-xs font-semibold text-[#768D7C] uppercase tracking-wider block mb-2">Compreendendo o TEA</span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#3A3530] font-medium mb-4">A Linha do Tempo da Sua História</h2>
                <p className="text-sm font-light text-[#68635E] leading-relaxed max-w-2xl mx-auto">
                  Muitas vezes, características da neurodivergência ou respostas adaptativas a ambientes não validados acompanham nossa trajetória desde cedo, moldando nossa relação com o mundo.
                </p>
              </header>

              {/* Timeline Widget Wrapper */}
              <div className="bg-[#FAF8F6] border border-[#E8E2D8] rounded-2xl p-8 flex flex-col gap-10">
                
                {/* Timeline track and interactive points */}
                <div className="relative w-full py-12">
                  {/* Background line track - passing perfectly through the center of the circles */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-[12.5%] right-[12.5%] h-1 bg-[#E2DBD0] rounded-full z-10" />
                  
                  {/* Active progress track line - passing perfectly through the center of the circles */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 left-[12.5%] h-1 bg-[#768D7C] rounded-full z-20 transition-all duration-500 ease-in-out" 
                    style={{ width: `${(autismTimelineIndex / 3) * 75}%` }}
                  />

                  {/* Interactive Node Buttons - vertically centered, with alternating labels above and below */}
                  <div className="relative flex justify-between z-30 w-full h-10 items-center">
                    {[
                      { label: 'Infância' },
                      { label: 'Adolescência' },
                      { label: 'Início da Carreira' },
                      { label: 'Dias Atuais' }
                    ].map((node, idx) => {
                      const isEven = idx % 2 === 0;
                      return (
                        <button
                          key={idx}
                          onClick={() => setAutismTimelineIndex(idx)}
                          className="group relative flex flex-col items-center w-1/4 focus:outline-none cursor-pointer h-full justify-center"
                        >
                          {/* Label on top for index 0 and 2 */}
                          {isEven && (
                            <span 
                              className={`absolute bottom-[calc(100%+8px)] text-[10px] sm:text-xs font-semibold transition-colors duration-300 leading-tight text-center w-full px-1 ${idx <= autismTimelineIndex ? 'text-[#3A3530]' : 'text-[#A39E93] group-hover:text-[#6E7E70]'}`}
                            >
                              {node.label}
                            </span>
                          )}

                          {/* Node Ring - centered vertically */}
                          <div 
                            className={`w-4.5 h-4.5 rounded-full border-3 flex items-center justify-center transition-all duration-300 ${idx <= autismTimelineIndex ? 'border-[#768D7C] bg-[#768D7C] scale-110 shadow-md ring-4 ring-[#768D7C]/15' : 'border-[#E2DBD0] bg-white group-hover:border-[#768D7C]'}`}
                          />

                          {/* Label on bottom for index 1 and 3 */}
                          {!isEven && (
                            <span 
                              className={`absolute top-[calc(100%+8px)] text-[10px] sm:text-xs font-semibold transition-colors duration-300 leading-tight text-center w-full px-1 ${idx <= autismTimelineIndex ? 'text-[#3A3530]' : 'text-[#A39E93] group-hover:text-[#6E7E70]'}`}
                            >
                              {node.label}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Range input slider completely overlaid on top for mobile fluid dragging */}
                  <input 
                    type="range" 
                    min="0" 
                    max="3" 
                    step="1" 
                    value={autismTimelineIndex}
                    onChange={(e) => setAutismTimelineIndex(Number(e.target.value))}
                    className="absolute left-[12.5%] right-[12.5%] top-1/2 -translate-y-1/2 h-[40px] opacity-0 cursor-pointer z-40"
                    aria-label="Navegar pelas fases da linha do tempo"
                  />
                </div>

                {/* Dynamic description view box */}
                <div className="bg-white border border-[#E8E2D8] rounded-xl p-6 min-h-[140px] flex items-center shadow-xs">
                  <p className="font-serif text-base md:text-lg text-[#3A3530] italic leading-relaxed w-full transition-opacity duration-300 animate-fade-in">
                    {autismTimelineIndex === 0 && "A sensação velada de que o mundo operava em um ritmo diferente. Pequenas sobrecargas sensoriais ou incompreensões sociais que eram interpretadas apenas como 'timidez', enquanto você se esforçava silenciosamente para decifrar as regras ocultas ao seu redor."}
                    {autismTimelineIndex === 1 && "O início da camuflagem social profunda (masking). A exaustão diária de imitar intencionalmente os gestos, as falas e os interesses dos pares para tentar pertencer, enquanto a sensação de isolamento e o esgotamento mental cresciam sempre que você fechava a porta do quarto."}
                    {autismTimelineIndex === 2 && "O confronto com dinâmicas de comunicação corporativa e cobranças implícitas. O uso do hiperfoco direcionado para entregar resultados brilhantes, operando como uma mola propulsora profissional, mas cobrando um preço alto sob a forma de crises crônicas de exaustão (burnout) incompreendidas pelos outros."}
                    {autismTimelineIndex === 3 && "A busca ativa por respostas para um cansaço que o repouso comum parece não curar. Compreender que muitas das suas ansiedades e travas atuais não são falhas de caráter, mas sim o resultado de uma vida inteira adaptando sua essência a um ambiente que não foi desenhado para ela."}
                  </p>
                </div>

              </div>

              {/* Trigger highlighting and Editorial action */}
              <div className="mt-10 border-t border-[#E8E2D8] pt-10 flex flex-col gap-6">
                <p className="border-l-4 border-[#C67A63] pl-5 font-serif text-lg text-[#3A3530] font-light leading-relaxed">
                  "Seu presente é o resultado de histórias que você ainda não ressignificou. Vamos olhar para essa linha do tempo com cuidado?"
                </p>
              </div>
            </section>
          </div>
        )}

        {/* Painel de Progresso e Ganchos de Conexão */}
        <section className="mt-16 bg-[#FAF9F6] border border-[#E8E2D8] rounded-2xl p-6 md:p-10 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1.5 bg-[#E8E2D8] w-full">
            <div 
              className="h-full bg-[#607762] transition-all duration-700 ease-out" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-2">
            <div>
              <span className="text-[10px] uppercase tracking-[2px] font-semibold text-[#8C8273]">
                Progresso da sua jornada de autodescoberta
              </span>
              <h4 className="font-serif text-xl md:text-2xl text-[#2C2B29] font-medium mt-1">
                Você concluiu <span className="font-sans font-semibold text-[#607762]">{progressPercent}%</span> da sua caminhada
              </h4>
            </div>
            <div className="flex items-center gap-2.5 bg-white border border-[#E8E2D8] py-2 px-4 rounded-full shadow-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${hasInteracted ? 'bg-[#607762] animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-xs font-mono font-medium text-[#5C5A55]">
                {hasInteracted ? "Dinâmica concluída nesta etapa!" : "Dinâmica desta página pendente"}
              </span>
            </div>
          </div>

          {/* Gancho Sequencial (Hook) */}
          {nextArticle && (
            <div className="border-t border-[#E8E2D8] pt-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[1.5px] text-[#8C8273]">
                <Compass className="w-4 h-4 text-[#607762]" />
                <span>O que te espera a seguir</span>
              </div>
              <p className="text-xs md:text-sm text-[#68655E] font-light leading-relaxed">
                {currentMilestone.hook}
              </p>

            </div>
          )}
        </section>

        {/* Continue sua jornada navigation banner */}
        <section className="mt-12 pt-8 text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-[#2C2B29] font-medium tracking-tight mb-6">
            Explore outros temas
          </h3>
          
          <div className="border-t border-[#E8E2D8]/80 my-6"></div>

          <div className="flex items-center justify-between gap-4 py-4">
            {prevArticle ? (
              <button
                onClick={() => onNavigateToArticle(prevArticle.id)}
                className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
              >
                <ArrowLeft className="w-5 h-5 text-[#8C8273] group-hover:text-[#607762] group-hover:-translate-x-1 transition-all duration-300" />
                <div>
                  <div className="text-[10px] tracking-[1.5px] font-semibold text-[#8C8273] uppercase font-sans">
                    Anterior
                  </div>
                  <div className="font-serif text-sm md:text-base text-[#2C2B29] font-medium group-hover:text-[#607762] transition-colors mt-0.5">
                    {prevArticle.title}
                  </div>
                </div>
              </button>
            ) : (
              <div className="w-10"></div>
            )}

            {nextArticle ? (
              <button
                onClick={() => onNavigateToArticle(nextArticle.id)}
                className="flex items-center gap-3 text-right group cursor-pointer ml-auto focus:outline-none"
              >
                <div>
                  <div className="text-[10px] tracking-[1.5px] font-semibold text-[#8C8273] uppercase font-sans">
                    Próximo
                  </div>
                  <div className="font-serif text-sm md:text-base text-[#2C2B29] font-medium group-hover:text-[#607762] transition-colors mt-0.5">
                    {nextArticle.title}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#8C8273] group-hover:text-[#607762] group-hover:translate-x-1 transition-all duration-300" />
              </button>
            ) : (
              <button
                onClick={onBack}
                className="flex items-center gap-3 text-right group cursor-pointer ml-auto focus:outline-none"
              >
                <div>
                  <div className="text-[10px] tracking-[1.5px] font-semibold text-[#8C8273] uppercase font-sans">
                    Próximo
                  </div>
                  <div className="font-serif text-sm md:text-base text-[#2C2B29] font-medium group-hover:text-[#607762] transition-colors mt-0.5">
                    Todos os conteúdos
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#8C8273] group-hover:text-[#607762] group-hover:translate-x-1 transition-all duration-300" />
              </button>
            )}
          </div>
        </section>

      </div>

      {/* Barra de Progresso Adesiva no Rodapé */}
      <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-2xl z-40 bg-[#FAF8F5]/98 backdrop-blur-md border border-[#E8E2D8] py-3.5 px-6 rounded-2xl md:rounded-full shadow-[0_12px_40px_rgba(44,43,41,0.15)] transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
          {/* Left side: Progress percentage and inline bar */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-[10px] sm:text-xs font-serif font-semibold text-[#8C8273] uppercase tracking-wider whitespace-nowrap">
              Jornada:
            </span>
            {/* Real inline progress bar */}
            <div className="relative flex-1 sm:w-32 md:w-44 h-3.5 bg-[#E8E2D8]/50 rounded-full overflow-hidden border border-[#E8E2D8]/20">
              <div 
                className="h-full bg-[#607762] rounded-full transition-all duration-700 ease-out flex items-center justify-center" 
                style={{ width: `${progressPercent}%` }}
              >
                {progressPercent >= 25 && (
                  <span className="font-sans text-[8.5px] font-bold text-white leading-none">
                    {progressPercent}%
                  </span>
                )}
              </div>
              {progressPercent < 25 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-sans text-[8.5px] font-bold text-[#607762] leading-none">
                    {progressPercent}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 border-[#E8E2D8]/50 pt-2 sm:pt-0">
            <button
              onClick={onBack}
              className="text-[11px] sm:text-xs font-semibold text-[#8C8273] hover:text-[#2C2B29] hover:bg-black/5 transition-colors py-1.5 px-3 rounded-full focus:outline-none cursor-pointer"
            >
              Voltar ao Início
            </button>
            {nextArticle && (
              <button
                onClick={() => onNavigateToArticle(nextArticle.id)}
                disabled={!hasInteracted}
                className={`text-[11px] sm:text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1 focus:outline-none ${
                  hasInteracted 
                    ? 'bg-[#607762] text-white hover:bg-[#4a5d4e] cursor-pointer shadow-xs hover:shadow-md' 
                    : 'bg-[#E8E2D8]/60 text-[#8C8273]/80 cursor-not-allowed opacity-70'
                }`}
              >
                <span>Próxima</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="h-4 w-[1px] bg-[#E8E2D8] hidden sm:block" />

            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#8C8273] hover:text-[#C47D68] hover:bg-[#C47D68]/5 transition-colors py-1.5 px-3 rounded-full focus:outline-none cursor-pointer border border-[#E8E2D8]/40 hover:border-[#C47D68]/20"
              title="Reiniciar todo o progresso"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3" />
              </svg>
              <span>Reiniciar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#FAF8F5] border border-[#E8E2D8] rounded-[24px] p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden animate-scaleIn">
            <button 
              onClick={() => setShowResetConfirm(false)}
              className="absolute top-4 right-4 text-[#8C8273] hover:text-[#2C2A27] focus:outline-none cursor-pointer"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[1.5px] text-[#C47D68] mb-4">
              <span>Atenção</span>
            </div>
            <h3 className="font-serif text-xl md:text-2xl text-[#2C2B29] font-medium leading-tight mb-3">
              Reiniciar Jornada de Autodescoberta?
            </h3>
            <p className="text-sm text-[#68655E] font-light leading-relaxed mb-6">
              Isso limpará todo o seu progresso atual nas atividades interativas e retornará a jornada ao início. Deseja continuar?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setInteractedArticles({});
                  localStorage.removeItem('natalia_interacted_articles_v3');
                  localStorage.removeItem('seen_natalia_completion_popup_v2');
                  
                  // Reset individual interactive states
                  setBatteryLevel(60);
                  setActiveHotspot(null);
                  setVisitedHotspots([]);
                  setAvailableTags(initialTags);
                  setComumZone([]);
                  setCronicoZone([]);
                  setBurnoutResult(null);
                  setFlippedTdah({});
                  setScratchedTiles({});
                  setNarcissismStep('layer-1');
                  setRelationshipsDoor('gate-selection');
                  setTccSliderValue(50);
                  setAutismTimelineIndex(0);
                  
                  setShowResetConfirm(false);
                }}
                className="flex-1 bg-[#C47D68] hover:bg-[#b06a56] text-white text-xs font-semibold px-5 py-3 rounded-full transition-all duration-300 uppercase tracking-wider text-center cursor-pointer"
              >
                Sim, Reiniciar
              </button>
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 border border-[#E8E2D8] hover:bg-white text-[#68655E] text-xs font-semibold px-5 py-3 rounded-full transition-all duration-300 uppercase tracking-wider text-center cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal Overlay */}
      {showCompletionPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#FAF8F5] border border-[#E8E2D8] rounded-[24px] p-6 md:p-10 max-w-lg w-full shadow-2xl relative overflow-hidden animate-scaleIn">
            <button 
              onClick={handleCloseCompletionPopup}
              className="absolute top-4 right-4 text-[#8C8273] hover:text-[#2C2A27] focus:outline-none cursor-pointer"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[1.5px] text-[#7A8B7C] mb-4">
              <Heart className="w-5 h-5 text-[#7A8B7C]" />
              <span>Mensagem de Apoio da Dra. Natália</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#2C2B29] font-medium leading-tight mb-4">
              Você completou sua jornada!
            </h3>
            <p className="text-sm md:text-base text-[#4E4C47] font-light leading-relaxed mb-8">
              <strong>Parabéns de verdade por completar toda essa caminhada!</strong> Estar empenhado em ler, se compreender e interagir com essas dores e potenciais demonstra uma coragem extraordinária. Toda essa bagagem teórica ganha vida real quando trabalhada individualmente. A psicoterapia é o espaço perfeito, seguro e individualizado para acolher suas descobertas e trilhar caminhos mais leves.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="https://wa.me/5512991766972?text=Ol%C3%A1%2C%20Nat%C3%A1lia!%20Completei%20a%20jornada%20de%20conte%C3%BAdo%20no%20seu%20site%20e%20gostaria%20de%20dar%20o%20pr%C3%B3ximo%20passo%20com%20uma%20consulta%20de%20avalia%C3%A7%C3%A3o."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#607762] hover:bg-[#4a5d4e] text-white text-xs font-semibold px-6 py-4 rounded-full shadow-xs hover:shadow-md transition-all duration-300 uppercase tracking-wider text-center"
              >
                Agendar Sessão no WhatsApp
              </a>
              <button 
                onClick={handleCloseCompletionPopup}
                className="border border-[#E8E2D8] hover:bg-white text-[#68655E] text-xs font-semibold px-6 py-4 rounded-full transition-all duration-300 uppercase tracking-wider text-center cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </article>
  );
}
