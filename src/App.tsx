import { useState } from 'react';
import Navbar from './components/Navbar';
import ArticleReader from './components/ArticleReader';
import Header from './components/Header';
import SobreMim from './components/SobreMim';
import Caminhos from './components/Caminhos';
import Calculator from './components/Calculator';
import Quiz from './components/Quiz';
import Jornada from './components/Jornada';
import Reviews from './components/Reviews';
import Conteudo from './components/Conteudo';
import FAQ from './components/FAQ';
import AplicativoExclusivo from './components/AplicativoExclusivo';
import AcolhimentoWidget from './components/AcolhimentoWidget';
import WhatsAppWidget from './components/WhatsAppWidget';

export default function App() {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    let targetId = sectionId;
    if (sectionId === 'abordagem-clinica') {
      targetId = 'jornada'; // Scrolls to the clinical approach in the Roadmap
    }

    const element = document.getElementById(targetId);
    if (element) {
      // Offset for fixed header
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="paper-texture min-h-screen bg-[#f3eee7] text-[#2C2A27] font-sans antialiased selection:bg-[#607762]/20 selection:text-[#607762]">
      
      {/* Decorative Top Accent line */}
      <div className="h-1.5 w-full bg-[#607762]"></div>

      {/* Sticky Premium Navbar */}
      <Navbar 
        onNavigate={handleNavigate}
        onSelectArticle={setActiveArticleId}
        activeArticleId={activeArticleId}
      />

      {/* Main Container */}
      <main className="pb-24 pt-16">
        
        {activeArticleId ? (
          /* Same-Page Premium Article Viewer */
          <ArticleReader 
            articleId={activeArticleId} 
            onBack={() => {
              setActiveArticleId(null);
              setTimeout(() => {
                handleNavigate('conteudos');
              }, 100);
            }}
            onNavigateToArticle={(id) => {
              setActiveArticleId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          /* Main Landing Page Sections */
          <>
            {/* 1. Header with Typewriter Hero */}
            <Header />

            {/* 2. Biography & Professional Profile Tabs */}
            <SobreMim />

            {/* 3. Caminhos - 3D Interactive Flip Cards */}
            <Caminhos />

            {/* 4. Calculator - Routine Comparative Slider */}
            <Calculator />

            {/* 5. Self-Assessment Interactive Quiz */}
            <Quiz />

            {/* 6. CBT Details & Clinical Roadmap Journey */}
            <Jornada />

            {/* 7. Google Verified Patient Reviews */}
            <Reviews />

            {/* 8. Educational Content List & same-page Reader */}
            <Conteudo onSelectArticle={setActiveArticleId} />

            {/* 8.5 Espaço de Acolhimento Interativo */}
            <section className="py-12 md:py-16 px-4 max-w-[820px] mx-auto relative z-10" id="acolhimento">
              <AcolhimentoWidget />
            </section>

            {/* 9. Doubts FAQ Accordion */}
            <FAQ />

            {/* 10. Aplicativo Exclusivo da Clínica */}
            <AplicativoExclusivo />
          </>
        )}

      </main>

      {/* Elegant Footer signature */}
      <footer className="border-t border-[#E8E2D8] py-16 text-center text-xs text-[#8C8273] font-medium tracking-wide space-y-4 bg-white/30 backdrop-blur-md">
        <div>Psicóloga Natália Auco • CRP 06/208635</div>
        <div>Atendimento Clínico Online • Todos os direitos reservados &copy; 2026</div>
      </footer>

      {/* WhatsApp Floating Action Widget */}
      <WhatsAppWidget />

    </div>
  );
}

