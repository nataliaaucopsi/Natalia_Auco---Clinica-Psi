import { useState } from 'react';

export default function CodeExporter() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const googleSitesCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Natália Auco - Psicóloga</title>
  <link rel="icon" type="image/png" href="https://i.ibb.co/TxksJxHm/Nat-lia-1.png">
  
  <!-- Fontes Premium do Google -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@200;300;400;500;600;700;800&family=JetBrains+Mono:wght@100;200;300;400;500;600&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            serif: ['Cormorant Garamond', 'Georgia', 'serif'],
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
          }
        }
      }
    }
  </script>
  
  <style>
    /* Reset de fundo */
    body {
      background-color: #f3eee7;
      color: #2C2A27;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }

    /* Textura fina de papel sutil */
    .paper-texture {
      position: relative;
    }
    .paper-texture::before {
      content: "";
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      opacity: 0.04;
      pointer-events: none;
      z-index: 1;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
    @media (max-width: 768px) {
      .paper-texture::before {
        display: none !important;
      }
    }

    /* Efeito de rotação 3D dos cartões (Caminhos) */
    .perspective {
      perspective: 2000px;
    }
    .preserve-3d {
      transform-style: preserve-3d;
    }
    .backface-hidden {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    .rotate-y-180 {
      transform: rotateY(180deg);
    }

    /* Ocultar barra de rolagem dos carrosséis de forma cross-browser */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    /* Transição suave de fades */
    .fade-transition {
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }

    /* Estilização fina para range sliders */
    input[type=range]::-webkit-slider-thumb {
      background-color: #607762;
      border: 2px solid #FFFFFF;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    input[type=range]::-moz-range-thumb {
      background-color: #607762;
      border: 2px solid #FFFFFF;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    /* ==========================================================================
       WIDGET FLUTUANTE DO WHATSAPP
       ========================================================================== */
    :root {
      --wa-brand: #25D366;         /* Verde clássico do logo/botão do WA */
      --wa-brand-hover: #1EBE57;   
      --wa-header: #008069;        /* Verde escuro do cabeçalho do WA */
      --wa-bg: #EFEAE2;            /* Bege claro do fundo da conversa */
      --text-dark: #111B21;
      --text-light: #FFFFFF;
      --shadow-widget: 0 10px 35px rgba(0,0,0,0.15);
    }

    .wa-widget-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      font-family: 'Inter', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      pointer-events: none;
    }

    .wa-fab {
      width: 60px;
      height: 60px;
      background-color: var(--wa-brand);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
      border: none;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      pointer-events: auto;
    }

    .wa-fab:hover {
      transform: scale(1.08);
      background-color: var(--wa-brand-hover);
    }

    .wa-fab svg {
      width: 32px;
      height: 32px;
      fill: var(--text-light);
    }

    .wa-notification-dot {
      position: absolute;
      top: 0;
      right: 2px;
      width: 14px;
      height: 14px;
      background-color: #FF0000;
      border-radius: 50%;
      border: 2px solid #FFFFFF;
    }

    .wa-chat-window {
      width: 340px;
      background-color: var(--wa-bg);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: var(--shadow-widget);
      margin-bottom: 20px;
      
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px) scale(0.95);
      transform-origin: bottom right;
      transition: all 0.3s ease;
      pointer-events: auto;
    }

    .wa-chat-window.is-open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    .wa-header {
      background-color: var(--wa-header);
      padding: 16px;
      display: flex;
      align-items: center;
      position: relative;
    }

    .wa-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 12px;
      background-color: #ddd;
    }

    .wa-avatar-wrapper {
      position: relative;
    }

    .wa-online-dot {
      position: absolute;
      bottom: 2px;
      right: 14px;
      width: 12px;
      height: 12px;
      background-color: #25D366;
      border-radius: 50%;
      border: 2px solid var(--wa-header);
    }

    .wa-info {
      display: flex;
      flex-direction: column;
      color: var(--text-light);
    }

    .wa-name {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 2px;
    }

    .wa-status {
      font-size: 0.8rem;
      font-weight: 400;
      opacity: 0.9;
    }

    .wa-close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      color: var(--text-light);
      font-size: 1.2rem;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    .wa-close-btn:hover {
      opacity: 1;
    }

    .wa-body {
      padding: 20px;
      background-image: radial-gradient(#d5cdc4 1px, transparent 0);
      background-size: 15px 15px;
    }

    .wa-message {
      background-color: var(--text-light);
      color: var(--text-dark);
      padding: 14px 16px;
      border-radius: 0px 12px 12px 12px;
      font-size: 0.95rem;
      line-height: 1.5;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      position: relative;
    }

    .wa-message::before {
      content: '';
      position: absolute;
      top: 0;
      left: -10px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 10px 10px 0;
      border-color: transparent var(--text-light) transparent transparent;
    }

    .wa-footer {
      padding: 0 20px 20px 20px;
      background-color: transparent;
    }

    .wa-cta-button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--wa-brand);
      color: var(--text-light);
      text-decoration: none;
      padding: 12px;
      border-radius: 24px;
      font-weight: 600;
      font-size: 0.95rem;
      transition: background-color 0.2s;
      gap: 8px;
    }

    .wa-cta-button:hover {
      background-color: var(--wa-brand-hover);
    }

    .wa-cta-button svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    @media (max-width: 480px) {
      .wa-widget-container {
        bottom: 16px;
        right: 16px;
      }
      .wa-chat-window {
        width: calc(100vw - 32px);
      }
    }
  </style>
</head>
<body class="paper-texture min-h-screen pt-16">

  <!-- ==================== BARRA DE NAVEGAÇÃO STICKY ==================== -->
  <nav class="fixed top-0 left-0 right-0 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] py-3.5 shadow-sm z-40 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <a href="#inicio" onclick="scrollToSection('inicio')" class="flex items-center gap-2.5 cursor-pointer">
        <div class="w-9 h-9 border border-[#607762]/20 rounded-lg flex items-center justify-center bg-white shadow-xs shrink-0 p-0.5">
          <img 
            src="https://i.ibb.co/TxksJxHm/Nat-lia-1.png" 
            alt="Logo Natália Auco" 
            class="w-full h-full object-contain select-none"
            referrerpolicy="no-referrer"
          />
        </div>
        <div>
          <div class="font-serif text-base md:text-lg font-medium text-[#2C2A27] tracking-tight">Natália Auco</div>
          <div class="text-[9px] text-[#8C8273] tracking-[1px] uppercase mt-0.5 font-sans">Psicóloga Clínica</div>
        </div>
      </a>

      <!-- Desktop Nav -->
      <div class="hidden lg:flex items-center gap-4">
        <a href="#inicio" onclick="scrollToSection('inicio')" class="text-[11px] font-semibold text-[#5D5A56] hover:text-[#607762] border border-transparent hover:border-[#607762] px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300">Sobre mim</a>
        <a href="#jornada" onclick="scrollToSection('jornada')" class="text-[11px] font-semibold text-[#5D5A56] hover:text-[#607762] border border-transparent hover:border-[#607762] px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300">Como funciona a terapia</a>
        <a href="#jornada" onclick="scrollToSection('jornada')" class="text-[11px] font-semibold text-[#5D5A56] hover:text-[#607762] border border-transparent hover:border-[#607762] px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300">Abordagem clínica</a>
        <a href="#conteudos" onclick="scrollToSection('conteudos')" class="text-[11px] font-semibold text-[#5D5A56] hover:text-[#607762] border border-transparent hover:border-[#607762] px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300">Conteúdo</a>
        <a href="#duvidas-frequentes" onclick="scrollToSection('duvidas-frequentes')" class="text-[11px] font-semibold text-[#5D5A56] hover:text-[#607762] border border-transparent hover:border-[#607762] px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300">Dúvidas</a>
        <a href="#aplicativo-exclusivo" onclick="scrollToSection('aplicativo-exclusivo')" class="text-[11px] font-semibold text-[#5D5A56] hover:text-[#607762] border border-transparent hover:border-[#607762] px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300">Aplicativo exclusivo</a>
        
        <a href="https://wa.me/5512991766972" target="_blank" rel="noopener noreferrer" class="bg-[#607762] hover:bg-[#4a5d4e] text-white text-[10px] font-bold px-4 py-2.5 rounded-full transition-all duration-300 uppercase tracking-wider text-center flex items-center justify-center min-w-[140px]">Agendar Consulta</a>
      </div>

      <!-- Mobile toggle -->
      <button onclick="toggleMobileMenu()" class="lg:hidden p-1.5 text-[#2C2A27] hover:text-[#607762] transition-colors focus:outline-none">
        <svg class="w-5.5 h-5.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>

    </div>

    <!-- Mobile Drawer -->
    <div id="mobile-menu" class="hidden lg:hidden bg-[#FAF8F5] border-t border-[#E8E2D8] px-5 py-4 transition-all duration-300">
      <div class="flex flex-col gap-3">
        <a href="#inicio" onclick="scrollToSection('inicio'); toggleMobileMenu()" class="text-left text-xs font-bold uppercase tracking-wider text-[#2C2A27] py-1">Início</a>
        <a href="#sobre-mim" onclick="scrollToSection('sobre-mim'); toggleMobileMenu()" class="text-left text-xs font-bold uppercase tracking-wider text-[#2C2A27] py-1">Sobre mim</a>
        <a href="#jornada" onclick="scrollToSection('jornada'); toggleMobileMenu()" class="text-left text-xs font-bold uppercase tracking-wider text-[#2C2A27] py-1">Como funciona a terapia</a>
        <a href="#conteudos" onclick="scrollToSection('conteudos'); toggleMobileMenu()" class="text-left text-xs font-bold uppercase tracking-wider text-[#2C2A27] py-1">Conteúdo</a>
        <a href="#duvidas-frequentes" onclick="scrollToSection('duvidas-frequentes'); toggleMobileMenu()" class="text-left text-xs font-bold uppercase tracking-wider text-[#2C2A27] py-1">Dúvidas</a>
        <a href="#aplicativo-exclusivo" onclick="scrollToSection('aplicativo-exclusivo'); toggleMobileMenu()" class="text-left text-xs font-bold uppercase tracking-wider text-[#2C2A27] py-1">Aplicativo exclusivo</a>
        <a href="https://wa.me/5512991766972" target="_blank" rel="noopener noreferrer" class="bg-[#607762] text-white text-center py-2.5 rounded-full font-bold uppercase tracking-wider text-[11px] mt-1 flex items-center justify-center">Agendar Consulta</a>
      </div>
    </div>
  </nav>

  <!-- ==================== HEADER / HERO ==================== -->
  <header class="pt-6 pb-20 md:pb-32 text-center w-full" id="inicio">
    <!-- Elegant Widescreen Decorative Banner with soft bottom blending -->
    <div class="w-full overflow-hidden mb-10 md:mb-12 bg-[#FAF8F5]">
      <div class="relative w-full max-w-7xl mx-auto px-4 md:px-8">
        <img 
          src="https://i.ibb.co/Ld2BkQdf/Banner-clinica-definitivo.jpg" 
          alt="Banner decorativo" 
          class="w-full h-auto max-h-[460px] object-contain select-none pointer-events-none block mx-auto rounded-2xl border border-[#E8E2D8]/40 shadow-xs"
          referrerPolicy="no-referrer"
        />
        <!-- Soft bottom-only feathered gradient blending with the page background -->
        <div class="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#f3eee7] via-[#f3eee7]/40 to-transparent pointer-events-none"></div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
      <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2C2A27] leading-tight tracking-tight min-h-[140px] sm:min-h-[120px] md:min-h-[144px] lg:min-h-[180px] flex flex-col justify-center items-center">
        <span>Encontre um espaço seguro para cuidar de</span>
        <span id="typewriter-container" class="text-[#607762] italic font-medium relative inline-block md:mt-2 min-h-[1.2em]">
          <span id="typewriter-text"></span><span id="typewriter-cursor" class="inline-block w-[2px] h-[1.1em] bg-[#607762] ml-1 absolute -right-[4px] top-[10%] transition-opacity duration-100"></span>
        </span>
      </h1>
    </div>
  </header>

  <!-- ==================== SOBRE MIM & PERFIL COM ABAS ==================== -->
  <section class="max-w-6xl mx-auto px-4 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start" id="sobre-mim">
    
    <!-- Biografia -->
    <div class="lg:col-span-7 bg-white/60 backdrop-blur-md border border-[#E8E2D8] rounded-[28px] p-6 md:p-12 shadow-sm relative overflow-hidden">
      <div class="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
        <div class="w-full max-w-[240px] md:max-w-[220px] aspect-[4/5] rounded-2xl overflow-hidden bg-[#E8E2D8] shadow-sm flex-shrink-0">
          <img 
            src="https://i.ibb.co/95hvXbz/Nat-Site.jpg" 
            alt="Natália Auco - Psicóloga" 
            class="w-full h-full object-cover grayscale-[10%] brightness-[1.05]"
          />
        </div>
        
        <div class="flex-1 text-center md:text-left">
          <h2 class="font-serif text-3xl md:text-4xl font-medium text-[#2C2A27] mb-6 tracking-tight">
            Sobre mim
          </h2>
          <div class="space-y-4 text-[#5D5A56] font-light leading-relaxed text-[1.02rem]">
            <p>
              Sou <strong class="text-[#607762] font-semibold">Natália Auco</strong>, psicóloga e pós-graduanda em Terapia Cognitivo-Comportamental (TCC). Acredito em um processo que vai além da escuta: é sobre organizar e transformar o que hoje te trava.
            </p>
            <p>
              No meu trabalho, ajudo você a identificar padrões invisíveis — pensamentos automáticos e autocríticas — para construirmos juntos novas formas de pensar, sentir e agir, mais alinhadas com quem você deseja ser.
            </p>
            <p>
              A terapia aqui é um espaço de atenção aos detalhes, com estratégia, clareza e, acima de tudo, acolhimento.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Abas Profissionais -->
    <div class="lg:col-span-5 bg-white/70 backdrop-blur-md border border-[#E8E2D8]/80 rounded-[28px] p-6 md:p-8 shadow-sm flex flex-col justify-center min-h-[400px]">
      <div class="text-center mb-6">
        <span class="inline-block bg-[#607762] text-white text-[0.7rem] font-semibold tracking-[0.8px] px-3.5 py-1 rounded-full uppercase">
          CRP 06/208635
        </span>
      </div>

      <!-- Abas Triggers -->
      <div class="flex bg-[#E8E2D8]/40 rounded-xl p-1 mb-6 gap-1">
        <button 
          onclick="switchTab('abordagem')" 
          id="tab-abordagem" 
          class="flex-1 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 bg-white text-[#607762] shadow-sm"
        >
          Abordagem
        </button>
        <button 
          onclick="switchTab('areas')" 
          id="tab-areas" 
          class="flex-1 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 text-[#5D5A56] hover:text-[#2C2A27]"
        >
          Especialidades
        </button>
        <button 
          onclick="switchTab('idiomas')" 
          id="tab-idiomas" 
          class="flex-1 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 text-[#5D5A56] hover:text-[#2C2A27]"
        >
          Idiomas
        </button>
      </div>

      <!-- Abas Painéis -->
      <div class="min-h-[180px]">
        
        <div id="panel-abordagem" class="bg-white p-5 rounded-2xl border border-[#E8E2D8] fade-transition">
          <h3 class="text-[#607762] font-semibold text-lg mb-3">
            Terapia Cognitivo-Comportamental
          </h3>
          <p class="text-[#5D5A56] text-sm md:text-base leading-relaxed font-light">
            Uma abordagem estruturada, focada no presente e colaborativa. Trabalhamos na reestruturação de padrões de pensamentos e comportamentos para desenvolver ferramentas práticas de bem-estar.
          </p>
        </div>

        <div id="panel-areas" class="hidden flex flex-wrap gap-2 justify-center py-2 fade-transition">
          <span class="bg-white border border-[#E8E2D8] px-4 py-2 rounded-full text-xs md:text-sm text-[#4A4743] font-medium shadow-2xs hover:border-[#607762] transition-colors">Ansiedade</span>
          <span class="bg-white border border-[#E8E2D8] px-4 py-2 rounded-full text-xs md:text-sm text-[#4A4743] font-medium shadow-2xs hover:border-[#607762] transition-colors">Depressão</span>
          <span class="bg-white border border-[#E8E2D8] px-4 py-2 rounded-full text-xs md:text-sm text-[#4A4743] font-medium shadow-2xs hover:border-[#607762] transition-colors">Relacionamentos</span>
          <span class="bg-white border border-[#E8E2D8] px-4 py-2 rounded-full text-xs md:text-sm text-[#4A4743] font-medium shadow-2xs hover:border-[#607762] transition-colors">Dependência emocional</span>
          <span class="bg-white border border-[#E8E2D8] px-4 py-2 rounded-full text-xs md:text-sm text-[#4A4743] font-medium shadow-2xs hover:border-[#607762] transition-colors">LGBTQIA+</span>
          <span class="bg-white border border-[#E8E2D8] px-4 py-2 rounded-full text-xs md:text-sm text-[#4A4743] font-medium shadow-2xs hover:border-[#607762] transition-colors">Burnout</span>
          <span class="bg-white border border-[#E8E2D8] px-4 py-2 rounded-full text-xs md:text-sm text-[#4A4743] font-medium shadow-2xs hover:border-[#607762] transition-colors">Autismo Nível 1</span>
          <span class="bg-white border border-[#E8E2D8] px-4 py-2 rounded-full text-xs md:text-sm text-[#4A4743] font-medium shadow-2xs hover:border-[#607762] transition-colors">TDAH</span>
        </div>

        <div id="panel-idiomas" class="hidden flex flex-col gap-3 fade-transition">
          <div class="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-[#E8E2D8] text-sm text-[#2C2A27]">
            <span class="font-medium">Português</span>
          </div>
          <div class="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-[#E8E2D8] text-sm text-[#2C2A27]">
            <span class="font-medium">Espanhol</span>
          </div>
        </div>

      </div>
    </div>

  </section>

  <!-- ==================== CAMINHOS (CARTÕES DE FLIP 3D) ==================== -->
  <section class="py-16 md:py-24 px-4 max-w-7xl mx-auto" id="caminhos">
    <header class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="font-serif font-light text-4xl md:text-5xl text-[#2C3E35] tracking-tight mb-6">
        Talvez você se reconheça em alguns desses caminhos.
      </h2>
      <p class="font-serif font-medium text-lg md:text-xl text-[#7A8B7B] leading-relaxed italic">
        A ansiedade e o esgotamento sutil costumam se disfarçar de rotina normal. Identificar esses padrões com acolhimento é o verdadeiro início do seu alívio.
      </p>
    </header>

    <div class="relative px-2 md:px-16">
      <!-- Botões de rolagem -->
      <button onclick="scrollCaminhos('left')" class="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#E8E2D8] text-[#2C3E35] hidden md:flex items-center justify-center cursor-pointer z-10 shadow-md hover:border-[#7A8B7C] hover:text-[#7A8B7C] transition-all duration-300">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onclick="scrollCaminhos('right')" class="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#E8E2D8] text-[#2C3E35] hidden md:flex items-center justify-center cursor-pointer z-10 shadow-md hover:border-[#7A8B7C] hover:text-[#7A8B7C] transition-all duration-300">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Trilho de cartões -->
      <div id="caminhos-track" class="flex gap-8 overflow-x-auto snap-x snap-mandatory py-6 px-3 no-scrollbar">
        
        <!-- Cartão 1 -->
        <div onclick="toggleFlip('card-perfeccionismo')" class="flex-shrink-0 w-[300px] md:w-[320px] h-[440px] snap-center cursor-pointer perspective">
          <div id="card-perfeccionismo" class="relative w-full h-full preserve-3d transition-transform duration-700 ease-out">
            <div class="absolute inset-0 bg-white border border-[#E8E2D8] rounded-[22px] p-8 flex flex-col justify-between shadow-sm backface-hidden">
              <div>
                <div class="text-[#C27A68] mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                </div>
                <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] mb-4 leading-tight">Perfeccionismo Paralisante</h3>
                <p class="text-sm font-light text-[#4A534D] leading-relaxed">O medo constante de errar ou de entregar algo imperfeito faz com que você adie o início de projetos importantes, gerando culpa e estagnação.</p>
              </div>
              <div class="text-xs font-semibold text-[#7A8B7B] tracking-wider uppercase flex items-center gap-1.5">Ver o alívio &rarr;</div>
            </div>
            <div class="absolute inset-0 bg-[#FAFAFA] border border-[#E8E2D8] rounded-[22px] p-8 flex flex-col justify-center items-start shadow-sm rotate-y-180 backface-hidden">
              <span class="text-[0.72rem] font-semibold text-[#C27A68] tracking-widest uppercase mb-4">Na Terapia</span>
              <p class="font-serif text-lg font-light text-[#2C3E35] leading-relaxed">Desarmamos a autocobrança extrema. Você aprende a estabelecer critérios realistas e flexíveis, trocando a paralisia pelo prazer de progredir com leveza.</p>
            </div>
          </div>
        </div>

        <!-- Cartão 2 -->
        <div onclick="toggleFlip('card-dizer-nao')" class="flex-shrink-0 w-[300px] md:w-[320px] h-[440px] snap-center cursor-pointer perspective">
          <div id="card-dizer-nao" class="relative w-full h-full preserve-3d transition-transform duration-700 ease-out">
            <div class="absolute inset-0 bg-white border border-[#E8E2D8] rounded-[22px] p-8 flex flex-col justify-between shadow-sm backface-hidden">
              <div>
                <div class="text-[#C27A68] mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] mb-4 leading-tight">Dificuldade em Dizer "Não"</h3>
                <p class="text-sm font-light text-[#4A534D] leading-relaxed">Dizer "sim" para todas as demandas do outro para evitar conflitos ou rejeição, mesmo sabendo que o custo disso é o seu próprio esgotamento mental.</p>
              </div>
              <div class="text-xs font-semibold text-[#7A8B7B] tracking-wider uppercase flex items-center gap-1.5">Ver o alívio &rarr;</div>
            </div>
            <div class="absolute inset-0 bg-[#FAFAFA] border border-[#E8E2D8] rounded-[22px] p-8 flex flex-col justify-center items-start shadow-sm rotate-y-180 backface-hidden">
              <span class="text-[0.72rem] font-semibold text-[#C27A68] tracking-widest uppercase mb-4">Na Terapia</span>
              <p class="font-serif text-lg font-light text-[#2C3E35] leading-relaxed">Desenvolvemos sua assertividade comunicativa. Você passará a construir limites saudáveis com segurança, validando suas necessidades em primeiro lugar.</p>
            </div>
          </div>
        </div>

        <!-- Cartão 3 -->
        <div onclick="toggleFlip('card-impostor')" class="flex-shrink-0 w-[300px] md:w-[320px] h-[440px] snap-center cursor-pointer perspective">
          <div id="card-impostor" class="relative w-full h-full preserve-3d transition-transform duration-700 ease-out">
            <div class="absolute inset-0 bg-white border border-[#E8E2D8] rounded-[22px] p-8 flex flex-col justify-between shadow-sm backface-hidden">
              <div>
                <div class="text-[#C27A68] mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                </div>
                <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] mb-4 leading-tight">Síndrome do Impostor</h3>
                <p class="text-sm font-light text-[#4A534D] leading-relaxed">A sensação persistentemente dolorosa de que suas conquistas foram por pura sorte e que, a qualquer momento, as pessoas vão descobrir uma suposta fraude.</p>
              </div>
              <div class="text-xs font-semibold text-[#7A8B7B] tracking-wider uppercase flex items-center gap-1.5">Ver o alívio &rarr;</div>
            </div>
            <div class="absolute inset-0 bg-[#FAFAFA] border border-[#E8E2D8] rounded-[22px] p-8 flex flex-col justify-center items-start shadow-sm rotate-y-180 backface-hidden">
              <span class="text-[0.72rem] font-semibold text-[#C27A68] tracking-widest uppercase mb-4">Na Terapia</span>
              <p class="font-serif text-lg font-light text-[#2C3E35] leading-relaxed">Reestruturamos a percepção da sua capacidade. Investigamos os fatos reais da sua jornada profissional para que você ocupe seus espaços com propriedade.</p>
            </div>
          </div>
        </div>

        <!-- Cartão 4 -->
        <div onclick="toggleFlip('card-julgamento')" class="flex-shrink-0 w-[300px] md:w-[320px] h-[440px] snap-center cursor-pointer perspective">
          <div id="card-julgamento" class="relative w-full h-full preserve-3d transition-transform duration-700 ease-out">
            <div class="absolute inset-0 bg-white border border-[#E8E2D8] rounded-[22px] p-8 flex flex-col justify-between shadow-sm backface-hidden">
              <div>
                <div class="text-[#C27A68] mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                </div>
                <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] mb-4 leading-tight">Medo do Julgamento</h3>
                <p class="text-sm font-light text-[#4A534D] leading-relaxed">Pensar excessivamente antes de falar, travar em reuniões ou monitorar seus próprios passos por medo de parecer inadequado perante o olhar do outro.</p>
              </div>
              <div class="text-xs font-semibold text-[#7A8B7B] tracking-wider uppercase flex items-center gap-1.5">Ver o alívio &rarr;</div>
            </div>
            <div class="absolute inset-0 bg-[#FAFAFA] border border-[#E8E2D8] rounded-[22px] p-8 flex flex-col justify-center items-start shadow-sm rotate-y-180 backface-hidden">
              <span class="text-[0.72rem] font-semibold text-[#C27A68] tracking-widest uppercase mb-4">Na Terapia</span>
              <p class="font-serif text-lg font-light text-[#2C3E35] leading-relaxed">Fortalecemos o seu núcleo de validação interna. O julgamento alheio deixa de ser uma âncora paralisante, devolvendo sua espontaneidade e paz.</p>
            </div>
          </div>
        </div>

        <!-- Cartão 5 -->
        <div onclick="toggleFlip('card-sobrecarga')" class="flex-shrink-0 w-[300px] md:w-[320px] h-[440px] snap-center cursor-pointer perspective">
          <div id="card-sobrecarga" class="relative w-full h-full preserve-3d transition-transform duration-700 ease-out">
            <div class="absolute inset-0 bg-white border border-[#E8E2D8] rounded-[22px] p-8 flex flex-col justify-between shadow-sm backface-hidden">
              <div>
                <div class="text-[#C27A68] mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                </div>
                <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] mb-4 leading-tight">Mente Sobrecarregada</h3>
                <p class="text-sm font-light text-[#4A534D] leading-relaxed">Um fluxo incessante de pensamentos acelerados que antecipam cenários catastróficos, impedindo o descanso físico e uma noite de sono reparadora.</p>
              </div>
              <div class="text-xs font-semibold text-[#7A8B7B] tracking-wider uppercase flex items-center gap-1.5">Ver o alívio &rarr;</div>
            </div>
            <div class="absolute inset-0 bg-[#FAFAFA] border border-[#E8E2D8] rounded-[22px] p-8 flex flex-col justify-center items-start shadow-sm rotate-y-180 backface-hidden">
              <span class="text-[0.72rem] font-semibold text-[#C27A68] tracking-widest uppercase mb-4">Na Terapia</span>
              <p class="font-serif text-lg font-light text-[#2C3E35] leading-relaxed">Aplicamos técnicas práticas cognitivo-comportamentais para desacelerar as ramificações de pensamentos, trazendo você de volta ao controle do presente.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ==================== CALCULADORA DE TEMPO ==================== -->
  <section class="py-16 md:py-24 px-4 max-w-4xl mx-auto" id="calculadora">
    <div class="bg-white border border-[#E8E2D8] rounded-[28px] p-8 md:p-14 shadow-sm relative overflow-hidden">
      <div class="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        
        <div class="md:col-span-6">
          <span class="inline-block bg-[#C97D67]/10 text-[#C97D67] text-[0.72rem] font-semibold tracking-wider px-3.5 py-1.5 rounded-full uppercase mb-4">
            Equilíbrio e Rotina
          </span>
          <h3 class="font-serif text-3xl font-semibold text-[#2C2B29] leading-tight mb-4">
            Quanto da sua semana você dedica a si?
          </h3>
          <p class="text-sm text-[#68655E] font-light leading-relaxed mb-8">
            Ajuste o controle abaixo para estimar quantas horas você passa olhando telas ou redes sociais por dia. Veja o contraste com o tempo necessário para cuidar da sua mente.
          </p>

          <div class="space-y-4">
            <div class="flex justify-between items-center text-sm font-medium text-[#2C2B29]">
              <span>Tempo diário de telas:</span>
              <span id="screen-time-display" class="text-[#607762] font-semibold text-lg">4 horas</span>
            </div>
            
            <input 
              type="range" 
              min="1" 
              max="12" 
              step="1"
              value="4"
              id="screen-time-slider"
              oninput="calculateTime()"
              class="w-full h-1.5 bg-[#85A48E]/20 rounded-lg appearance-none cursor-pointer accent-[#607762]"
            />
            <div class="flex justify-between text-[11px] text-[#A19D94] font-medium uppercase tracking-wide">
              <span>Pouco (1h)</span>
              <span>Moderado (6h)</span>
              <span>Intenso (12h)</span>
            </div>
          </div>
        </div>

        <div class="md:col-span-6 bg-[#FAF8F5] border border-[#F1ECE5] rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full">
          <div class="space-y-6">
            <div>
              <div class="text-xs text-[#A19D94] uppercase tracking-wider font-semibold">Telas na sua semana</div>
              <div class="flex items-baseline gap-2 mt-1">
                <span id="weekly-screen-hours" class="font-serif text-3.5xl font-semibold text-[#C97D67]">28h</span>
                <span id="weekly-screen-pct" class="text-sm font-light text-[#68655E]">(16.7% do tempo total)</span>
              </div>
            </div>

            <div>
              <div class="text-xs text-[#A19D94] uppercase tracking-wider font-semibold">Uma sessão de terapia (50 min)</div>
              <div class="flex items-baseline gap-2 mt-1">
                <span class="font-serif text-3.5xl font-semibold text-[#607762]">0,83h</span>
                <span class="text-sm font-light text-[#68655E]">(0.50% do tempo total)</span>
              </div>
            </div>

            <div class="pt-2">
              <div class="w-full h-3 bg-neutral-200/60 rounded-full overflow-hidden flex">
                <div id="bar-screen" class="h-full bg-[#C97D67] transition-all duration-500 ease-out" style="width: 16.7%"></div>
                <div class="h-full bg-[#607762] transition-all duration-500 ease-out" style="width: 0.5%"></div>
              </div>
              <div class="flex justify-between text-[10px] text-[#A19D94] font-semibold uppercase tracking-wider mt-2">
                <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 bg-[#C97D67] rounded-full inline-block"></span> Telas</span>
                <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 bg-[#607762] rounded-full inline-block"></span> Terapia</span>
              </div>
            </div>
          </div>

          <div class="border-t border-[#EAE4DB] mt-8 pt-6">
            <p id="calculator-slogan" class="text-xs italic text-[#5D5A56] leading-relaxed">
              Você dedica um tempo considerável às telas. Reservar um espaço para si mesma(o) fará toda a diferença.
            </p>
            <button onclick="scrollToSection('autoavaliacao')" class="mt-6 w-full text-center bg-[#607762] hover:bg-[#2C2B29] text-white text-xs md:text-sm font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-2xs">
              Avalie seus níveis de estresse
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ==================== QUIZ / AUTOAVALIAÇÃO ==================== -->
  <section class="py-12 md:py-16 px-4 max-w-xl mx-auto" id="autoavaliacao">
    <div class="bg-white/70 backdrop-blur-md border border-[#E8E2D8]/80 rounded-[28px] p-6 md:p-10 shadow-sm flex flex-col justify-center min-h-[420px] relative overflow-hidden">
      
      <!-- Linha de progresso -->
      <div id="quiz-progress-bar" class="w-full h-1 bg-[#85A48E]/10 rounded-full mb-8 overflow-hidden">
        <div id="quiz-progress-fill" class="h-full bg-[#607762] transition-all duration-500 ease-out" style="width: 25%"></div>
      </div>

      <!-- Passo 1 -->
      <div id="quiz-step-1" class="fade-transition">
        <h3 class="text-[#2C2A27] text-xl font-serif font-medium leading-relaxed text-center mb-8">
          Como tem estado a sua qualidade de sono nos últimos dias?
        </h3>
        <div class="flex flex-col gap-3">
          <button onclick="quizNext(1, 0)" class="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:text-[#607762] hover:bg-[#607762]/5 transition-all duration-300">
            Durmo bem e acordo descansada(o).
          </button>
          <button onclick="quizNext(1, 1)" class="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:text-[#607762] hover:bg-[#607762]/5 transition-all duration-300">
            Demoro para dormir ou acordo no meio da noite.
          </button>
          <button onclick="quizNext(1, 2)" class="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:text-[#607762] hover:bg-[#607762]/5 transition-all duration-300">
            Sinto cansaço extremo, mesmo após horas de sono.
          </button>
        </div>
      </div>

      <!-- Passo 2 -->
      <div id="quiz-step-2" class="hidden fade-transition">
        <h3 class="text-[#2C2A27] text-xl font-serif font-medium leading-relaxed text-center mb-8">
          Com que frequência você sente dificuldade de concentração?
        </h3>
        <div class="flex flex-col gap-3">
          <button onclick="quizNext(2, 0)" class="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:text-[#607762] hover:bg-[#607762]/5 transition-all duration-300">
            Raramente, consigo focar bem nas metas.
          </button>
          <button onclick="quizNext(2, 1)" class="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:text-[#607762] hover:bg-[#607762]/5 transition-all duration-300">
            Às vezes me pego adiando tarefas por cansaço.
          </button>
          <button onclick="quizNext(2, 2)" class="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:text-[#607762] hover:bg-[#607762]/5 transition-all duration-300">
            Constantemente sinto sobrecarga mental.
          </button>
        </div>
      </div>

      <!-- Passo 3 -->
      <div id="quiz-step-3" class="hidden fade-transition">
        <h3 class="text-[#2C2A27] text-xl font-serif font-medium leading-relaxed text-center mb-8">
          Como você gerencia momentos de estresse?
        </h3>
        <div class="flex flex-col gap-3">
          <button onclick="quizNext(3, 0)" class="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:text-[#607762] hover:bg-[#607762]/5 transition-all duration-300">
            Consigo manter o controle emocional.
          </button>
          <button onclick="quizNext(3, 1)" class="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:text-[#607762] hover:bg-[#607762]/5 transition-all duration-300">
            Sinto desconforto físico temporário.
          </button>
          <button onclick="quizNext(3, 2)" class="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:text-[#607762] hover:bg-[#607762]/5 transition-all duration-300">
            Fico absorvida(o) pelos pensamentos.
          </button>
        </div>
      </div>

      <!-- Passo 4 -->
      <div id="quiz-step-4" class="hidden fade-transition">
        <h3 class="text-[#2C2A27] text-xl font-serif font-medium leading-relaxed text-center mb-8">
          Como estão suas interações atualmente?
        </h3>
        <div class="flex flex-col gap-3">
          <button onclick="quizFinish(0)" class="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:text-[#607762] hover:bg-[#607762]/5 transition-all duration-300">
            Equilibradas e estáveis.
          </button>
          <button onclick="quizFinish(1)" class="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:text-[#607762] hover:bg-[#607762]/5 transition-all duration-300">
            Evitando interações por cansaço.
          </button>
          <button onclick="quizFinish(2)" class="w-full bg-white text-left p-4 md:p-5 border border-[#E8E2D8] rounded-2xl text-sm md:text-base text-[#4A4743] hover:border-[#607762] hover:text-[#607762] hover:bg-[#607762]/5 transition-all duration-300">
            Com conflitos frequentes.
          </button>
        </div>
      </div>

      <!-- Passo Resultado -->
      <div id="quiz-step-result" class="hidden text-center fade-transition">
        <div class="text-3xl font-serif font-semibold text-[#2C2A27] mb-4">
          Obrigada por compartilhar.
        </div>
        <p id="quiz-result-text" class="text-[#5D5A56] text-sm md:text-base leading-relaxed font-light mb-8 px-2 md:px-6">
          Seus níveis de estresse parecem moderados. Manter o equilíbrio é fundamental. Que tal um espaço focado no seu autoconhecimento?
        </p>
        
        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a 
            href="https://wa.me/5512991766972?text=Ol%C3%A1%2C%20Nat%C3%A1lia!%20Fiz%20o%20seu%20teste%20de%20autoavalia%C3%A7%C3%A3o%20e%20gostaria%20de%20agendar%20uma%20consulta."
            target="_top" 
            class="w-full sm:w-auto bg-[#607762] hover:bg-[#4a5d4e] text-white text-center py-4 px-8 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Agendar sessão online
          </a>
          <button onclick="quizReset()" class="text-xs uppercase tracking-widest text-[#8C8273] hover:text-[#2C2A27] transition-colors font-semibold">
            Refazer o teste
          </button>
        </div>
      </div>

    </div>
  </section>

  <!-- ==================== JORNADA TERAPÊUTICA (ROADMAP) ==================== -->
  <section class="py-16 md:py-24 px-4 bg-gradient-to-b from-[#F5F2EB]/50 to-[#f3eee7]/50" id="jornada">
    <div class="max-w-6xl mx-auto">
      
      <header class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="font-serif font-semibold text-4xl md:text-5xl text-[#2C2B29] tracking-tight mb-4">
          Como funciona a jornada terapêutica?
        </h2>
        <p class="font-serif italic text-lg md:text-xl text-[#68655E]">
          Um processo estruturado, seguro e acolhedor para transformar a sobrecarga em clareza emocional.
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        
        <!-- Coluna 1 -->
        <div class="lg:col-span-4 flex flex-col gap-6">
          <h3 class="font-serif text-2xl font-semibold text-[#7A8B7C] flex items-center gap-3 px-2 mb-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            A Estrutura Prática
          </h3>

          <details class="group bg-white border border-[#E8E2D8] rounded-[22px] p-6 shadow-xs hover:translate-y-[-2px] transition-all duration-300" open>
            <summary class="list-none flex items-center justify-between cursor-pointer select-none">
              <div class="flex items-center gap-4">
                <span class="font-serif italic font-semibold text-[#C97D67]">01</span>
                <span class="font-serif font-semibold text-lg text-[#2C2B29] group-open:text-[#7A8B7C] transition-colors">O Agendamento</span>
              </div>
              <svg class="w-5 h-5 text-[#D2CDC3] group-open:rotate-180 group-open:text-[#7A8B7C] transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="mt-4 ml-8 text-sm font-light text-[#68655E] leading-relaxed">
              Escolha seu horário ideal de forma simples e imediata através da nossa agenda online integrada, pensada para não interferir na sua rotina.
            </p>
          </details>

          <details class="group bg-white border border-[#E8E2D8] rounded-[22px] p-6 shadow-xs hover:translate-y-[-2px] transition-all duration-300">
            <summary class="list-none flex items-center justify-between cursor-pointer select-none">
              <div class="flex items-center gap-4">
                <span class="font-serif italic font-semibold text-[#C97D67]">02</span>
                <span class="font-serif font-semibold text-lg text-[#2C2B29] group-open:text-[#7A8B7C] transition-colors">O Ambiente Seguro</span>
              </div>
              <svg class="w-5 h-5 text-[#D2CDC3] group-open:rotate-180 group-open:text-[#7A8B7C] transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="mt-4 ml-8 text-sm font-light text-[#68655E] leading-relaxed">
              Antes da sessão, você recebe um link exclusivo, criptografado e totalmente seguro para a nossa consulta por vídeo.
            </p>
          </details>

          <details class="group bg-white border border-[#E8E2D8] rounded-[22px] p-6 shadow-xs hover:translate-y-[-2px] transition-all duration-300">
            <summary class="list-none flex items-center justify-between cursor-pointer select-none">
              <div class="flex items-center gap-4">
                <span class="font-serif italic font-semibold text-[#C97D67]">03</span>
                <span class="font-serif font-semibold text-lg text-[#2C2B29] group-open:text-[#7A8B7C] transition-colors">A Consulta</span>
              </div>
              <svg class="w-5 h-5 text-[#D2CDC3] group-open:rotate-180 group-open:text-[#7A8B7C] transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="mt-4 ml-8 text-sm font-light text-[#68655E] leading-relaxed">
              Conversamos profundamente sobre suas demandas e vivências em um ambiente de absoluto sigilo ético e livre de julgamentos.
            </p>
          </details>
        </div>

        <!-- Coluna 2 (SVG) -->
        <div class="lg:col-span-4 flex justify-center py-6">
          <div class="w-full max-w-[300px]">
            <svg viewBox="0 0 400 400" fill="none" class="w-full h-auto">
              <circle cx="200" cy="200" r="140" fill="#FFFFFF" stroke="#E8E2D8" strokeWidth="1" />
              <path d="M100 280 C100 210, 140 210, 150 210 C160 210, 165 220, 160 235 C155 255, 140 300, 115 300 C105 300, 100 295, 100 280 Z" fill="#E8E2D8" />
              <circle cx="130" cy="190" r="12" fill="#C97D67" />
              <circle cx="140" cy="130" r="30" fill="#FFFFFF" stroke="#7A8B7C" strokeWidth="1.5"/>
              <path d="M150 150 L145 145" fill="none" stroke="#7A8B7C" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M120 130 C120 115, 135 110, 145 120 C155 130, 130 145, 125 130" stroke="#C97D67" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
              <path d="M310 280 C310 210, 270 210, 260 210 C250 210, 245 220, 250 235 C255 255, 270 300, 295 300 C305 300, 310 295, 310 280 Z" fill="#7A8B7C" opacity="0.9" />
              <circle cx="280" cy="180" r="10" fill="#F5F2EB" />
              <path d="M150 140 C175 160, 200 195, 240 205" stroke="#7A8B7C" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" opacity="0.6"/>
            </svg>
          </div>
        </div>

        <!-- Coluna 3 -->
        <div class="lg:col-span-4 flex flex-col gap-6">
          <h3 class="font-serif text-2xl font-semibold text-[#7A8B7C] flex items-center gap-3 px-2 mb-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            A Evolução Clínica
          </h3>

          <details class="group bg-white border border-[#E8E2D8] rounded-[22px] p-6 shadow-xs hover:translate-y-[-2px] transition-all duration-300" open>
            <summary class="list-none flex items-center justify-between cursor-pointer select-none">
              <div class="flex items-center gap-4">
                <span class="font-serif italic font-semibold text-[#C97D67]">01</span>
                <span class="font-serif font-semibold text-lg text-[#2C2B29] group-open:text-[#7A8B7C] transition-colors">Mapeamento</span>
              </div>
              <svg class="w-5 h-5 text-[#D2CDC3] group-open:rotate-180 group-open:text-[#7A8B7C] transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="mt-4 ml-8 text-sm font-light text-[#68655E] leading-relaxed">
              Identificamos juntos os seus nós emocionais, gatilhos de ansiedade e padrões invisíveis, criando um espaço para desabafar sem reservas.
            </p>
          </details>

          <details class="group bg-white border border-[#E8E2D8] rounded-[22px] p-6 shadow-xs hover:translate-y-[-2px] transition-all duration-300">
            <summary class="list-none flex items-center justify-between cursor-pointer select-none">
              <div class="flex items-center gap-4">
                <span class="font-serif italic font-semibold text-[#C97D67]">02</span>
                <span class="font-serif font-semibold text-lg text-[#2C2B29] group-open:text-[#7A8B7C] transition-colors">Alívio Prático</span>
              </div>
              <svg class="w-5 h-5 text-[#D2CDC3] group-open:rotate-180 group-open:text-[#7A8B7C] transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="mt-4 ml-8 text-sm font-light text-[#68655E] leading-relaxed">
              Com a TCC, traduzimos o entendimento clínico em alívio imediato, reestruturando os pensamentos e comportamentos que aprisionam você.
            </p>
          </details>

          <details class="group bg-white border border-[#E8E2D8] rounded-[22px] p-6 shadow-xs hover:translate-y-[-2px] transition-all duration-300">
            <summary class="list-none flex items-center justify-between cursor-pointer select-none">
              <div class="flex items-center gap-4">
                <span class="font-serif italic font-semibold text-[#C97D67]">03</span>
                <span class="font-serif font-semibold text-lg text-[#2C2B29] group-open:text-[#7A8B7C] transition-colors">Autonomia</span>
              </div>
              <svg class="w-5 h-5 text-[#D2CDC3] group-open:rotate-180 group-open:text-[#7A8B7C] transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="mt-4 ml-8 text-sm font-light text-[#68655E] leading-relaxed">
              Consolidamos suas vitórias para que você termine o processo com independência, sabendo solucionar desafios futuros com clareza.
            </p>
          </details>
        </div>

      </div>

      <!-- TCC Box -->
      <div class="max-w-3xl mx-auto bg-white border border-[#E8E2D8] rounded-[24px] p-8 md:p-14 shadow-sm relative overflow-hidden">
        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 font-sans text-xs font-semibold text-[#7A8B7C] tracking-widest uppercase border-b border-[#7A8B7C]/30 pb-1 mb-8">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Abordagem Clínica
          </div>

          <h3 class="font-serif text-3xl md:text-4xl font-medium text-[#2C2B29] leading-tight mb-8">
            Ciência e acolhimento direcionados ao seu bem-estar
          </h3>
          
          <div class="space-y-6 text-[#68655E] font-light leading-relaxed text-[1.02rem]">
            <p>
              Meus atendimentos são inteiramente guiados pela <strong class="text-[#2C2B29] font-medium">Terapia Cognitivo-Comportamental (TCC)</strong>. Trata-se de uma abordagem de psicoterapia amplamente reconhecida por sua clareza, especificidade e objetividade, estruturada com um foco central na sua realidade presente e na resolução ativa de problemas.
            </p>
            <p>
              O alicerce da TCC baseia-se na compreensão de que a forma como pensamos e interpretamos o mundo molda diretamente como nos sentimos e agimos. Compreendemos que os padrões cognitivos — seus pensamentos automáticos e crenças mais profundas — podem ser monitorados, ressignificados e modificados.
            </p>
            <p>
              Como resultado prático desse processo, conseguimos alcançar os comportamentos e a estabilidade que você deseja. Para que isso aconteça de forma consistente, a TCC dispõe de um valioso conjunto de <strong class="text-[#2C2B29] font-medium">técnicas científicas</strong> que são aplicadas nas sessões e ensinadas a você, promovendo sua total autonomia fora do consultório.
            </p>
          </div>

          <div class="mt-12 pt-8 border-t border-[#F4F1EC] flex flex-col md:flex-row items-center justify-between gap-6">
            <span class="font-serif text-xl font-semibold italic text-[#2C2B29] max-w-sm text-center md:text-left leading-snug">
              Quer entender como transformar a sua mente na prática?
            </span>
            <button onclick="scrollToSection('conteudos')" class="inline-flex items-center gap-2 bg-[#7A8B7C] hover:bg-[#2C2B29] text-white text-sm font-medium py-3 px-6 rounded-full transition-all duration-300">
              Explore meus conteúdos
              <svg class="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- ==================== DEPOIMENTOS / AVALIAÇÕES ==================== -->
  <section class="py-16 md:py-24 px-4 max-w-7xl mx-auto" id="depoimentos">
    <header class="text-center mb-12">
      <h2 class="font-serif font-semibold text-3xl md:text-4.5xl text-[#2A2F2B] leading-tight tracking-tight mb-8">
        Veja o que os pacientes estão dizendo do atendimento
      </h2>
      
      <div class="inline-flex flex-col sm:flex-row items-center justify-between bg-white border border-[#E8E2D8] rounded-[24px] sm:rounded-full py-5 px-6 md:px-8 shadow-xs gap-4 sm:gap-12 max-w-2xl mx-auto">
        <div class="flex items-center gap-4">
          <span class="font-serif font-semibold text-3xl text-[#2C2A27]">5,0</span>
          <div class="flex text-[#F59E0B] text-lg tracking-xs">★★★★★</div>
          <span class="text-[#6B7270] text-sm font-medium">11 avaliações no Google</span>
        </div>
        <a 
          href="https://www.google.com/search?hl=pt-BR&gl=br&q=Psic%C3%B3loga+Nat%C3%A1lia+Auco" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="bg-[#7A9B82] hover:bg-[#65856D] text-white text-xs md:text-sm font-medium py-3 px-6 rounded-full transition-all duration-300 whitespace-nowrap shadow-xs"
        >
          Avalie-nos no Google
        </a>
      </div>
    </header>

    <div class="relative">
      <div id="reviews-track" class="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 no-scrollbar items-start">
        
        <!-- Review 1 -->
        <article id="review-1" class="flex-shrink-0 w-[310px] md:w-[340px] bg-white border border-[#E8E2D8] rounded-[22px] p-6 md:p-8 snap-start shadow-xs flex flex-col transition-all duration-300" style="height: 310px; min-height: 310px;">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-11 h-11 rounded-full flex items-center justify-center text-white font-serif font-semibold text-lg flex-shrink-0 bg-[#8B5CF6]">K</div>
            <div>
              <h3 class="font-serif font-semibold text-lg text-[#2A2F2B] flex items-center gap-1.5">
                Karine Silva
                <span class="inline-block w-3.5 h-3.5 bg-[#10B981] rounded-full relative">
                  <span class="absolute left-[4.5px] top-[2.5px] w-[4px] h-[7px] border-white border-r-2 border-b-2 rotate-45 transform"></span>
                </span>
              </h3>
              <div class="text-xs text-[#6B7270] mt-0.5">há 21 dias</div>
            </div>
          </div>
          <div class="text-[#F59E0B] text-sm tracking-xs mb-4">★★★★★</div>
          <p class="text-sm md:text-[0.95rem] font-light text-[#6B7270] leading-relaxed flex-1">
            Uma excelente profissional, super dedicada e atenciosa com tudo que faz 🤍
          </p>
        </article>

        <!-- Review 2 -->
        <article id="review-2" class="flex-shrink-0 w-[310px] md:w-[340px] bg-white border border-[#E8E2D8] rounded-[22px] p-6 md:p-8 snap-start shadow-xs flex flex-col transition-all duration-300" style="height: 310px; min-height: 310px;">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-11 h-11 rounded-full flex items-center justify-center text-white font-serif font-semibold text-lg flex-shrink-0 bg-[#7A8B7C]">F</div>
            <div>
              <h3 class="font-serif font-semibold text-lg text-[#2A2F2B] flex items-center gap-1.5">
                Fernanda Oliveira
                <span class="inline-block w-3.5 h-3.5 bg-[#10B981] rounded-full relative">
                  <span class="absolute left-[4.5px] top-[2.5px] w-[4px] h-[7px] border-white border-r-2 border-b-2 rotate-45 transform"></span>
                </span>
              </h3>
              <div class="text-xs text-[#6B7270] mt-0.5">há 27 dias</div>
            </div>
          </div>
          <div class="text-[#F59E0B] text-sm tracking-xs mb-4">★★★★★</div>
          <div class="flex-1 flex flex-col justify-between">
            <p id="review-text-2" class="text-sm md:text-[0.95rem] font-light text-[#6B7270] leading-relaxed line-clamp-3">
              Natália é uma excelente profissional! Possui uma escuta atenta, bem humorada e sem julgamentos! Me senti respeitada e acolhida. Indico muito!!
            </p>
            <button onclick="toggleReviewExpand(2)" id="review-btn-2" class="text-left text-xs font-semibold text-[#7A9B82] hover:text-[#65856D] hover:underline mt-4 pt-2 border-t border-neutral-100/50">Leia mais</button>
          </div>
        </article>

        <!-- Review 3 -->
        <article id="review-3" class="flex-shrink-0 w-[310px] md:w-[340px] bg-white border border-[#E8E2D8] rounded-[22px] p-6 md:p-8 snap-start shadow-xs flex flex-col transition-all duration-300" style="height: 310px; min-height: 310px;">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-11 h-11 rounded-full flex items-center justify-center text-white font-serif font-semibold text-lg flex-shrink-0 bg-[#2DD4BF]">R</div>
            <div>
              <h3 class="font-serif font-semibold text-lg text-[#2A2F2B] flex items-center gap-1.5">
                Rayan Santos
                <span class="inline-block w-3.5 h-3.5 bg-[#10B981] rounded-full relative">
                  <span class="absolute left-[4.5px] top-[2.5px] w-[4px] h-[7px] border-white border-r-2 border-b-2 rotate-45 transform"></span>
                </span>
              </h3>
              <div class="text-xs text-[#6B7270] mt-0.5">há 27 dias</div>
            </div>
          </div>
          <div class="text-[#F59E0B] text-sm tracking-xs mb-4">★★★★★</div>
          <div class="flex-1 flex flex-col justify-between">
            <p id="review-text-3" class="text-sm md:text-[0.95rem] font-light text-[#6B7270] leading-relaxed line-clamp-3">
              Natália tem uma abordagem técnica muito boa, sempre atenta aos detalhes e constantemente me faz refletir sobre cenários alternativos que eu não conseguia enxergar sozinho. É uma excelente profissional. Recomendo!
            </p>
            <button onclick="toggleReviewExpand(3)" id="review-btn-3" class="text-left text-xs font-semibold text-[#7A9B82] hover:text-[#65856D] hover:underline mt-4 pt-2 border-t border-neutral-100/50">Leia mais</button>
          </div>
        </article>

        <!-- Review 4 -->
        <article id="review-4" class="flex-shrink-0 w-[310px] md:w-[340px] bg-white border border-[#E8E2D8] rounded-[22px] p-6 md:p-8 snap-start shadow-xs flex flex-col transition-all duration-300" style="height: 310px; min-height: 310px;">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-11 h-11 rounded-full flex items-center justify-center text-white font-serif font-semibold text-lg flex-shrink-0 bg-[#C97D67]">M</div>
            <div>
              <h3 class="font-serif font-semibold text-lg text-[#2A2F2B] flex items-center gap-1.5">
                Mecia Silveira
                <span class="inline-block w-3.5 h-3.5 bg-[#10B981] rounded-full relative">
                  <span class="absolute left-[4.5px] top-[2.5px] w-[4px] h-[7px] border-white border-r-2 border-b-2 rotate-45 transform"></span>
                </span>
              </h3>
              <div class="text-xs text-[#6B7270] mt-0.5">há 29 dias</div>
            </div>
          </div>
          <div class="text-[#F59E0B] text-sm tracking-xs mb-4">★★★★★</div>
          <div class="flex-1 flex flex-col justify-between">
            <p id="review-text-4" class="text-sm md:text-[0.95rem] font-light text-[#6B7270] leading-relaxed line-clamp-3">
              Excelente profissional, me ajudou bastante com meu autoconhecimento. O primeiro atendimento foi marcante devido o nível de profissionalismo, acolhimento, empatia e sem julgamentos.
            </p>
            <button onclick="toggleReviewExpand(4)" id="review-btn-4" class="text-left text-xs font-semibold text-[#7A9B82] hover:text-[#65856D] hover:underline mt-4 pt-2 border-t border-neutral-100/50">Leia mais</button>
          </div>
        </article>

        <!-- Review 5 -->
        <article id="review-5" class="flex-shrink-0 w-[310px] md:w-[340px] bg-white border border-[#E8E2D8] rounded-[22px] p-6 md:p-8 snap-start shadow-xs flex flex-col transition-all duration-300" style="height: 310px; min-height: 310px;">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-11 h-11 rounded-full flex items-center justify-center text-white font-serif font-semibold text-lg flex-shrink-0 bg-[#3B82F6]">L</div>
            <div>
              <h3 class="font-serif font-semibold text-lg text-[#2A2F2B] flex items-center gap-1.5">
                Lorena Silveira
                <span class="inline-block w-3.5 h-3.5 bg-[#10B981] rounded-full relative">
                  <span class="absolute left-[4.5px] top-[2.5px] w-[4px] h-[7px] border-white border-r-2 border-b-2 rotate-45 transform"></span>
                </span>
              </h3>
              <div class="text-xs text-[#6B7270] mt-0.5">Há 5 semanas</div>
            </div>
          </div>
          <div class="text-[#F59E0B] text-sm tracking-xs mb-4">★★★★★</div>
          <div class="flex-1 flex flex-col justify-between">
            <p id="review-text-5" class="text-sm md:text-[0.95rem] font-light text-[#6B7270] leading-relaxed line-clamp-3">
              Sou extremamente grata pelo seu trabalho, profissional que me acolheu e me ouviu como ninguém, obrigada por tudo! Super recomendo o seu trabalho!🥰
            </p>
            <button onclick="toggleReviewExpand(5)" id="review-btn-5" class="text-left text-xs font-semibold text-[#7A9B82] hover:text-[#65856D] hover:underline mt-4 pt-2 border-t border-neutral-100/50">Leia mais</button>
          </div>
        </article>

      </div>

      <!-- Controles de Navegação -->
      <div class="flex justify-end gap-3 mt-6 px-2">
        <button onclick="scrollReviews('left')" class="w-11 h-11 rounded-full bg-white border border-[#E8E2D8] text-[#2A2F2B] flex items-center justify-center cursor-pointer shadow-xs hover:bg-[#f3eee7] hover:border-[#6B7270] transition-all duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button onclick="scrollReviews('right')" class="w-11 h-11 rounded-full bg-white border border-[#E8E2D8] text-[#2A2F2B] flex items-center justify-center cursor-pointer shadow-xs hover:bg-[#f3eee7] hover:border-[#6B7270] transition-all duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  </section>

  <!-- ==================== ESPAÇO DE CONHECIMENTO (ARTIGOS) ==================== -->
  <section class="py-16 md:py-24 px-4 max-w-6xl mx-auto" id="conteudos">
    <div class="flex justify-center gap-1.5 text-[#C97D67] text-sm tracking-wide mb-3">✦ ✦ ✦</div>
    
    <header class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="font-serif font-light text-4xl md:text-5xl text-[#2C3E35] tracking-tight mb-4">
        Espaço de Conhecimento
      </h2>
      <p class="font-sans font-light text-[#6B7270] text-sm md:text-base leading-relaxed max-w-xl mx-auto">
        Textos informativos e práticos fundamentados na ciência cognitiva para ajudar você a decifrar seus padrões emocionais diários.
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
      
      <!-- Card 1 -->
      <article onclick="openArticle('ansiedade')" class="group bg-white border border-[#E8E2D8] rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-xs hover:border-[#607762] hover:shadow-md transition-all duration-400 cursor-pointer">
        <div>
          <div class="flex justify-between items-center mb-6">
            <span class="bg-[#607762]/10 text-[#607762] text-[0.7rem] font-semibold tracking-wider px-3 py-1.5 rounded-full uppercase">Ansiedade</span>
            <div class="p-2.5 bg-neutral-50 rounded-xl group-hover:bg-[#607762]/10 group-hover:text-[#607762] transition-colors">
              <svg class="w-5 h-5 text-[#607762]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
          </div>
          <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] group-hover:text-[#607762] transition-colors leading-tight mb-4">Ansiedade: Compreendendo o Mecanismo e Encontrando Alívio</h3>
          <p class="text-sm font-light text-[#6B7270] leading-relaxed mb-6">Entenda os sintomas físicos e mentais da ansiedade, como o cérebro reage ao medo e estratégias da TCC para acalmar a mente no dia a dia.</p>
        </div>
        <div class="text-xs font-semibold text-[#7A8B7C] tracking-wider uppercase flex items-center gap-1.5 pt-4 border-t border-neutral-100 group-hover:text-[#607762] transition-colors">Ler artigo completo <span>&rarr;</span></div>
      </article>

      <!-- Card 2 -->
      <article onclick="openArticle('depressao')" class="group bg-white border border-[#E8E2D8] rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-xs hover:border-[#607762] hover:shadow-md transition-all duration-400 cursor-pointer">
        <div>
          <div class="flex justify-between items-center mb-6">
            <span class="bg-[#607762]/10 text-[#607762] text-[0.7rem] font-semibold tracking-wider px-3 py-1.5 rounded-full uppercase">Depressão</span>
            <div class="p-2.5 bg-neutral-50 rounded-xl group-hover:bg-[#607762]/10 group-hover:text-[#607762] transition-colors">
              <svg class="w-5 h-5 text-[#607762]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
          </div>
          <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] group-hover:text-[#607762] transition-colors leading-tight mb-4">Depressão: Desarmando os Ciclos de Desânimo e Autocrítica</h3>
          <p class="text-sm font-light text-[#6B7270] leading-relaxed mb-6">Identifique os sinais sutis da depressão, entenda as distorções cognitivas que mantêm o ciclo da apatia e descubra a ativação comportamental.</p>
        </div>
        <div class="text-xs font-semibold text-[#7A8B7C] tracking-wider uppercase flex items-center gap-1.5 pt-4 border-t border-neutral-100 group-hover:text-[#607762] transition-colors">Ler artigo completo <span>&rarr;</span></div>
      </article>

      <!-- Card 3 -->
      <article onclick="openArticle('burnout')" class="group bg-white border border-[#E8E2D8] rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-xs hover:border-[#607762] hover:shadow-md transition-all duration-400 cursor-pointer">
        <div>
          <div class="flex justify-between items-center mb-6">
            <span class="bg-[#607762]/10 text-[#607762] text-[0.7rem] font-semibold tracking-wider px-3 py-1.5 rounded-full uppercase">Burnout</span>
            <div class="p-2.5 bg-neutral-50 rounded-xl group-hover:bg-[#607762]/10 group-hover:text-[#607762] transition-colors">
              <svg class="w-5 h-5 text-[#607762]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
          </div>
          <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] group-hover:text-[#607762] transition-colors leading-tight mb-4">Burnout: Reconhecendo os Limites e Restaurando sua Vitalidade</h3>
          <p class="text-sm font-light text-[#6B7270] leading-relaxed mb-6">Saiba diferenciar o cansaço comum da Síndrome de Burnout, os sinais de esgotamento e como estabelecer limites saudáveis no ambiente corporativo.</p>
        </div>
        <div class="text-xs font-semibold text-[#7A8B7C] tracking-wider uppercase flex items-center gap-1.5 pt-4 border-t border-neutral-100 group-hover:text-[#607762] transition-colors">Ler artigo completo <span>&rarr;</span></div>
      </article>

      <!-- Card 4 -->
      <article onclick="openArticle('tdah')" class="group bg-white border border-[#E8E2D8] rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-xs hover:border-[#607762] hover:shadow-md transition-all duration-400 cursor-pointer">
        <div>
          <div class="flex justify-between items-center mb-6">
            <span class="bg-[#607762]/10 text-[#607762] text-[0.7rem] font-semibold tracking-wider px-3 py-1.5 rounded-full uppercase">TDAH</span>
            <div class="p-2.5 bg-neutral-50 rounded-xl group-hover:bg-[#607762]/10 group-hover:text-[#607762] transition-colors">
              <svg class="w-5 h-5 text-[#607762]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
          </div>
          <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] group-hover:text-[#607762] transition-colors leading-tight mb-4">TDAH em Adultos: O Desafio da Atenção e Disfunção Executiva</h3>
          <p class="text-sm font-light text-[#6B7270] leading-relaxed mb-6">Entenda o TDAH em adultos, os desafios de foco e atenção, a disfunção executiva e como gerenciar as tarefas diárias com a ajuda da TCC.</p>
        </div>
        <div class="text-xs font-semibold text-[#7A8B7C] tracking-wider uppercase flex items-center gap-1.5 pt-4 border-t border-neutral-100 group-hover:text-[#607762] transition-colors">Ler artigo completo <span>&rarr;</span></div>
      </article>

      <!-- Card 5 -->
      <article onclick="openArticle('autoestima')" class="group bg-white border border-[#E8E2D8] rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-xs hover:border-[#607762] hover:shadow-md transition-all duration-400 cursor-pointer">
        <div>
          <div class="flex justify-between items-center mb-6">
            <span class="bg-[#607762]/10 text-[#607762] text-[0.7rem] font-semibold tracking-wider px-3 py-1.5 rounded-full uppercase">Autoestima</span>
            <div class="p-2.5 bg-neutral-50 rounded-xl group-hover:bg-[#607762]/10 group-hover:text-[#607762] transition-colors">
              <svg class="w-5 h-5 text-[#607762]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.242.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.52 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.178 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.52-4.674a1 1 0 00-.364-1.118L2.98 10.1c-.772-.568-.372-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" /></svg>
            </div>
          </div>
          <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] group-hover:text-[#607762] transition-colors leading-tight mb-4">Autoestima: Desconstruindo a Autocrítica</h3>
          <p class="text-sm font-light text-[#6B7270] leading-relaxed mb-6">Aprenda a desarmar a autocrítica impiedosa, desconstruir crenças profundas de desvalor e fortalecer o respeito próprio com ferramentas práticas.</p>
        </div>
        <div class="text-xs font-semibold text-[#7A8B7C] tracking-wider uppercase flex items-center gap-1.5 pt-4 border-t border-neutral-100 group-hover:text-[#607762] transition-colors">Ler artigo completo <span>&rarr;</span></div>
      </article>

      <!-- Card 6 -->
      <article onclick="openArticle('autoconhecimento')" class="group bg-white border border-[#E8E2D8] rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-xs hover:border-[#607762] hover:shadow-md transition-all duration-400 cursor-pointer">
        <div>
          <div class="flex justify-between items-center mb-6">
            <span class="bg-[#607762]/10 text-[#607762] text-[0.7rem] font-semibold tracking-wider px-3 py-1.5 rounded-full uppercase">Autoconhecimento</span>
            <div class="p-2.5 bg-neutral-50 rounded-xl group-hover:bg-[#607762]/10 group-hover:text-[#607762] transition-colors">
              <svg class="w-5 h-5 text-[#607762]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11a13.918 13.918 0 00-6.125-11.538M12 11c0-3.517 1.009-6.799 2.753-9.571m3.44 2.04l-.054.09A13.916 13.916 0 0015 11a13.918 13.918 0 006.125 11.538M12 11V3m0 8v10" /></svg>
            </div>
          </div>
          <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] group-hover:text-[#607762] transition-colors leading-tight mb-4">Autoconhecimento: Escolhas Alinhadas com sua Essência</h3>
          <p class="text-sm font-light text-[#6B7270] leading-relaxed mb-6">Explore a importância de se conhecer para sair de vez do piloto automático, alinhar as suas escolhas aos seus valores reais e assumir o controle.</p>
        </div>
        <div class="text-xs font-semibold text-[#7A8B7C] tracking-wider uppercase flex items-center gap-1.5 pt-4 border-t border-neutral-100 group-hover:text-[#607762] transition-colors">Ler artigo completo <span>&rarr;</span></div>
      </article>

      <!-- Card 7 -->
      <article onclick="openArticle('narcisismo')" class="group bg-white border border-[#E8E2D8] rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-xs hover:border-[#607762] hover:shadow-md transition-all duration-400 cursor-pointer">
        <div>
          <div class="flex justify-between items-center mb-6">
            <span class="bg-[#607762]/10 text-[#607762] text-[0.7rem] font-semibold tracking-wider px-3 py-1.5 rounded-full uppercase">Narcisismo</span>
            <div class="p-2.5 bg-neutral-50 rounded-xl group-hover:bg-[#607762]/10 group-hover:text-[#607762] transition-colors">
              <svg class="w-5 h-5 text-[#607762]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
          </div>
          <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] group-hover:text-[#607762] transition-colors leading-tight mb-4">Narcisismo nas Relações: Identificando Padrões</h3>
          <p class="text-sm font-light text-[#6B7270] leading-relaxed mb-6">Mapeie os padrões invisíveis de relações tóxicas ou abusivas, compreenda técnicas de gaslighting e aprenda a reconstruir sua identidade.</p>
        </div>
        <div class="text-xs font-semibold text-[#7A8B7C] tracking-wider uppercase flex items-center gap-1.5 pt-4 border-t border-neutral-100 group-hover:text-[#607762] transition-colors">Ler artigo completo <span>&rarr;</span></div>
      </article>

      <!-- Card 8 -->
      <article onclick="openArticle('relacionamentos')" class="group bg-white border border-[#E8E2D8] rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-xs hover:border-[#607762] hover:shadow-md transition-all duration-400 cursor-pointer">
        <div>
          <div class="flex justify-between items-center mb-6">
            <span class="bg-[#607762]/10 text-[#607762] text-[0.7rem] font-semibold tracking-wider px-3 py-1.5 rounded-full uppercase">Relacionamentos</span>
            <div class="p-2.5 bg-neutral-50 rounded-xl group-hover:bg-[#607762]/10 group-hover:text-[#607762] transition-colors">
              <svg class="w-5 h-5 text-[#607762]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
          </div>
          <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] group-hover:text-[#607762] transition-colors leading-tight mb-4">Relacionamentos Saudáveis: Limites e Conexão Real</h3>
          <p class="text-sm font-light text-[#6B7270] leading-relaxed mb-6">Identifique as bases de parcerias afetivas maduras através de limites saudáveis, vulnerabilidade segura e comunicação assertiva de necessidades.</p>
        </div>
        <div class="text-xs font-semibold text-[#7A8B7C] tracking-wider uppercase flex items-center gap-1.5 pt-4 border-t border-neutral-100 group-hover:text-[#607762] transition-colors">Ler artigo completo <span>&rarr;</span></div>
      </article>

      <!-- Card 9 -->
      <article onclick="openArticle('tcc')" class="group bg-white border border-[#E8E2D8] rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-xs hover:border-[#607762] hover:shadow-md transition-all duration-400 cursor-pointer">
        <div>
          <div class="flex justify-between items-center mb-6">
            <span class="bg-[#607762]/10 text-[#607762] text-[0.7rem] font-semibold tracking-wider px-3 py-1.5 rounded-full uppercase">TCC</span>
            <div class="p-2.5 bg-neutral-50 rounded-xl group-hover:bg-[#607762]/10 group-hover:text-[#607762] transition-colors">
              <svg class="w-5 h-5 text-[#607762]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
          </div>
          <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] group-hover:text-[#607762] transition-colors leading-tight mb-4">TCC: O Padrão Ouro da Psicoterapia Moderna</h3>
          <p class="text-sm font-light text-[#6B7270] leading-relaxed mb-6">Conheça os pilares da Terapia Cognitivo-Comportamental, a abordagem clínica mais recomendada do mundo, estruturada e focada em resultados práticos.</p>
        </div>
        <div class="text-xs font-semibold text-[#7A8B7C] tracking-wider uppercase flex items-center gap-1.5 pt-4 border-t border-neutral-100 group-hover:text-[#607762] transition-colors">Ler artigo completo <span>&rarr;</span></div>
      </article>

      <!-- Card 10 -->
      <article onclick="openArticle('autismo')" class="group bg-white border border-[#E8E2D8] rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-xs hover:border-[#607762] hover:shadow-md transition-all duration-400 cursor-pointer">
        <div>
          <div class="flex justify-between items-center mb-6">
            <span class="bg-[#607762]/10 text-[#607762] text-[0.7rem] font-semibold tracking-wider px-3 py-1.5 rounded-full uppercase">Autismo</span>
            <div class="p-2.5 bg-neutral-50 rounded-xl group-hover:bg-[#607762]/10 group-hover:text-[#607762] transition-colors">
              <svg class="w-5 h-5 text-[#607762]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a2 2 0 002 2h3a1 1 0 011 1v3a2 2 0 110 4v3a1 1 0 01-1 1h-3a2 2 0 00-2 2v1a2 2 0 11-4 0v-1a2 2 0 00-2-2H5a1 1 0 01-1-1v-3a2 2 0 110-4V8a1 1 0 011-1h3a2 2 0 002-2V4z" /></svg>
            </div>
          </div>
          <h3 class="font-serif text-2xl font-semibold text-[#2C3E35] group-hover:text-[#607762] transition-colors leading-tight mb-4">Autismo (TEA) em Adultos: O Alívio de Compreender</h3>
          <p class="text-sm font-light text-[#6B7270] leading-relaxed mb-6">Entenda o diagnóstico tardio do TEA Nível 1 em adultos, camuflagem social (masking), hipersensibilidade sensorial e autoaceitação respeitosa.</p>
        </div>
        <div class="text-xs font-semibold text-[#7A8B7C] tracking-wider uppercase flex items-center gap-1.5 pt-4 border-t border-neutral-100 group-hover:text-[#607762] transition-colors">Ler artigo completo <span>&rarr;</span></div>
      </article>

    </div>
  </section>

  <!-- ==================== MODAL DE LEITURA (CRITICAL SAME-PAGE FIX) ==================== -->
  <div id="article-reader" class="hidden fixed inset-0 bg-[#2C2A27]/40 backdrop-blur-sm z-50 flex justify-end items-stretch fade-transition">
    <div onclick="closeArticle()" class="absolute inset-0 cursor-pointer"></div>
    
    <div class="relative w-full max-w-2xl bg-[#f3eee7] shadow-2xl h-full overflow-y-auto flex flex-col z-10">
      <!-- Cabeçalho do Leitor -->
      <div class="sticky top-0 bg-[#f3eee7]/90 backdrop-blur-md border-b border-[#E8E2D8] p-6 flex justify-between items-center z-20">
        <button onclick="closeArticle()" class="flex items-center gap-2 text-xs font-semibold text-[#7A8B7C] hover:text-[#2C2A27] tracking-wider uppercase transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar à lista
        </button>
        <span id="article-reader-category" class="text-[11px] font-mono text-[#7A8B7C] uppercase tracking-widest bg-white/50 border border-[#E8E2D8] py-1 px-3 rounded-full"></span>
      </div>

      <!-- Conteúdo do Artigo -->
      <div class="p-8 md:p-12 flex-1 max-w-xl mx-auto">
        <div class="text-[#C97D67] text-xs font-semibold tracking-widest uppercase mb-4">Artigo de Psicologia Clínica</div>
        <h1 id="article-reader-title" class="font-serif text-3xl md:text-4.5xl font-semibold text-[#2C2A27] leading-tight mb-8"></h1>
        <div id="article-reader-body" class="prose prose-neutral max-w-none text-[#5D5A56] font-light leading-relaxed space-y-6"></div>
        
        <div class="mt-16 pt-8 border-t border-[#E8E2D8] flex flex-col sm:flex-row justify-between items-center gap-4">
          <button onclick="closeArticle()" class="w-full sm:w-auto bg-[#7A8B7C] hover:bg-[#2C2A27] text-white text-sm font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-sm text-center">
            Concluir leitura e voltar
          </button>
          <a href="https://wa.me/5512991766972?text=Ol%C3%A1%2C%20Nat%C3%A1lia!%20Li%20o%20seu%20artigo%20sobre%20o%20tema%20e%20gostaria%20de%20conversar." target="_top" class="text-xs font-semibold text-[#7A8B7C] hover:text-[#C97D67] uppercase tracking-wider hover:underline">
            Falar no WhatsApp &rarr;
          </a>
        </div>
      </div>

      <div class="border-t border-[#E8E2D8]/40 p-6 text-center text-[11px] text-[#A19D94] font-medium tracking-wide">
        CRP 06/208635 • Natália Auco • Atendimento Online Seguro
      </div>
    </div>
  </div>

  <!-- ==================== PERGUNTAS FREQUENTES (FAQ ACCORDION) ==================== -->
  <section class="py-16 md:py-24 px-4 max-w-3xl mx-auto" id="duvidas-frequentes">
    <header class="text-center mb-16">
      <span class="inline-block bg-[#7A8B7C]/10 text-[#7A8B7C] text-[0.7rem] font-semibold tracking-wider px-3 py-1.5 rounded-full uppercase mb-4">Dúvidas Frequentes</span>
      <h2 class="font-serif font-light text-4xl md:text-5xl text-[#2C3E35] tracking-tight">Perguntas comuns sobre o atendimento</h2>
    </header>

    <div class="space-y-4">
      
      <!-- FAQ 1 -->
      <div class="bg-white border border-[#E8E2D8] rounded-[22px] overflow-hidden transition-all duration-300">
        <button onclick="toggleFAQ(1)" class="w-full text-left py-6 px-8 flex justify-between items-center focus:outline-none">
          <span class="font-serif text-lg font-semibold text-[#2C3E35]">Como funciona a primeira sessão?</span>
          <div class="relative w-6 h-6 flex-shrink-0">
            <span id="faq-plus-h-1" class="absolute inset-0 m-auto w-4 h-0.5 bg-[#7A8B7C] transition-transform duration-300"></span>
            <span id="faq-plus-v-1" class="absolute inset-0 m-auto h-4 w-0.5 bg-[#7A8B7C] transition-transform duration-300"></span>
          </div>
        </button>
        <div id="faq-answer-1" class="max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out">
          <div class="px-8 pb-6 text-sm md:text-base font-light text-[#5D5A56] leading-relaxed border-t border-neutral-50/50 pt-3">
            A primeira sessão é um momento de acolhimento e mapeamento inicial. Vamos conversar de forma leve sobre o que te levou a buscar terapia e quais são suas principais queixas e expectativas. É o início de um espaço seguro, livre de julgamentos, onde estruturamos o seu percurso terapêutico.
          </div>
        </div>
      </div>

      <!-- FAQ 2 -->
      <div class="bg-white border border-[#E8E2D8] rounded-[22px] overflow-hidden transition-all duration-300">
        <button onclick="toggleFAQ(2)" class="w-full text-left py-6 px-8 flex justify-between items-center focus:outline-none">
          <span class="font-serif text-lg font-semibold text-[#2C3E35]">Como é feito o agendamento?</span>
          <div class="relative w-6 h-6 flex-shrink-0">
            <span id="faq-plus-h-2" class="absolute inset-0 m-auto w-4 h-0.5 bg-[#7A8B7C] transition-transform duration-300"></span>
            <span id="faq-plus-v-2" class="absolute inset-0 m-auto h-4 w-0.5 bg-[#7A8B7C] transition-transform duration-300"></span>
          </div>
        </button>
        <div id="faq-answer-2" class="max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out">
          <div class="px-8 pb-6 text-sm md:text-base font-light text-[#5D5A56] leading-relaxed border-t border-neutral-50/50 pt-3">
            O agendamento é extremamente prático. Ao clicar no botão de agendamento, você falará diretamente com o meu WhatsApp corporativo. Lá, definimos juntos qual é o melhor dia e horário na sua rotina semanal para realizarmos as sessões por videoconferência.
          </div>
        </div>
      </div>

      <!-- FAQ 3 -->
      <div class="bg-white border border-[#E8E2D8] rounded-[22px] overflow-hidden transition-all duration-300">
        <button onclick="toggleFAQ(3)" class="w-full text-left py-6 px-8 flex justify-between items-center focus:outline-none">
          <span class="font-serif text-lg font-semibold text-[#2C3E35]">As sessões online são seguras?</span>
          <div class="relative w-6 h-6 flex-shrink-0">
            <span id="faq-plus-h-3" class="absolute inset-0 m-auto w-4 h-0.5 bg-[#7A8B7C] transition-transform duration-300"></span>
            <span id="faq-plus-v-3" class="absolute inset-0 m-auto h-4 w-0.5 bg-[#7A8B7C] transition-transform duration-300"></span>
          </div>
        </button>
        <div id="faq-answer-3" class="max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out">
          <div class="px-8 pb-6 text-sm md:text-base font-light text-[#5D5A56] leading-relaxed border-t border-neutral-50/50 pt-3">
            Totalmente seguras. Utilizo plataformas profissionais criptografadas de ponta a ponta que atendem rigorosamente às normas éticas do Conselho Federal de Psicologia (CFP). Você receberá um link individual de acesso rápido antes de cada consulta.
          </div>
        </div>
      </div>

      <!-- FAQ 4 -->
      <div class="bg-white border border-[#E8E2D8] rounded-[22px] overflow-hidden transition-all duration-300">
        <button onclick="toggleFAQ(4)" class="w-full text-left py-6 px-8 flex justify-between items-center focus:outline-none">
          <span class="font-serif text-lg font-semibold text-[#2C3E35]">Qual o valor da consulta e formas de pagamento?</span>
          <div class="relative w-6 h-6 flex-shrink-0">
            <span id="faq-plus-h-4" class="absolute inset-0 m-auto w-4 h-0.5 bg-[#7A8B7C] transition-transform duration-300"></span>
            <span id="faq-plus-v-4" class="absolute inset-0 m-auto h-4 w-0.5 bg-[#7A8B7C] transition-transform duration-300"></span>
          </div>
        </button>
        <div id="faq-answer-4" class="max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out">
          <div class="px-8 pb-6 text-sm md:text-base font-light text-[#5D5A56] leading-relaxed border-t border-neutral-50/50 pt-3">
            Os detalhes de valores das sessões e pacotes mensais são informados diretamente durante o primeiro contato pelo WhatsApp. Os pagamentos são efetuados via Pix ou transferência bancária antes ou logo após a consulta, com envio mensal de recibos para fins de reembolso.
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- ==================== APLICATIVO EXCLUSIVO DA CLÍNICA ==================== -->
  <section class="py-20 md:py-28 bg-[#F5F0E9] border-t border-[#E8E2D8] scroll-mt-12 overflow-hidden" id="aplicativo-exclusivo">
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      
      <!-- Header decoration -->
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span class="text-[11px] font-bold uppercase tracking-[2px] text-[#868C81] bg-[#607762]/10 px-3 py-1.5 rounded-full inline-block mb-4">
          Diferencial Clínico
        </span>
        <h2 class="font-serif text-4xl md:text-5xl text-[#2C2B29] leading-tight font-medium tracking-tight">
          Aplicativo Exclusivo da Clínica
        </h2>
        <div class="w-16 h-[2px] bg-[#607762]/40 mx-auto mt-5"></div>
      </div>

      <!-- 1. Introduction Text (Now at the top) -->
      <div class="text-center max-w-4xl mx-auto mb-16 space-y-4 px-4">
        <h3 class="font-serif text-2.5xl md:text-3.5xl text-[#2C2B29] leading-snug">
          Sua jornada de autodescoberta sempre organizada.
        </h3>
        <p class="text-[#5D5A56] text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
          Com o aplicativo exclusivo da nossa clínica, você tem autonomia e tranquilidade para acompanhar o seu tratamento em tempo real. Esqueça planilhas complexas, anotações perdidas ou a preocupação de esquecer as suas consultas.
        </p>
      </div>

    <!-- 2. Full-Width Carousel Area -->
    <div class="w-full bg-[#EAE3D8]/40 py-10 md:py-14 mb-16 border-y border-[#E8E2D8]/50 relative">
      <div class="max-w-7xl mx-auto px-4 md:px-8 relative flex flex-col items-center">
        
        <!-- Main Carousel Wrapper -->
        <div class="relative w-full max-w-3xl flex items-center justify-center">
          
          <!-- Left Control Arrow -->
          <button 
            onclick="prevAppSlide()"
            class="absolute left-2 md:-left-16 z-10 p-3 rounded-full bg-white/95 border border-[#E8E2D8] text-[#607762] hover:bg-[#607762] hover:text-white transition-all duration-300 shadow-md focus:outline-none cursor-pointer"
            aria-label="Anterior"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          <!-- Carousel Slides Container -->
          <div class="relative w-full max-w-md md:max-w-xl group cursor-pointer rounded-[32px] overflow-hidden shadow-[0_25px_55px_rgba(96,119,98,0.18)] border border-[#E8E2D8] transition-all duration-500 hover:-translate-y-1 bg-white p-3.5">
            
            <!-- Slide 0 -->
            <div id="app-slide-0" class="block" onclick="openLightbox('https://i.ibb.co/dwwQ3q1N/Chat-GPT-Image-10-de-jul-de-2026-17-12-32.png')">
              <div class="relative overflow-hidden rounded-[24px] aspect-[16/9] md:aspect-[1.5/1] bg-[#FAF8F5] flex items-center justify-center">
                <img 
                  src="https://i.ibb.co/dwwQ3q1N/Chat-GPT-Image-10-de-jul-de-2026-17-12-32.png" 
                  alt="Aplicativo da Clínica - Tela Principal" 
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div class="p-3.5 bg-white/95 rounded-full text-[#607762] shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path></svg>
                    <span class="text-xs font-bold font-sans pr-1">Dar Zoom</span>
                  </div>
                </div>
              </div>
              <div class="text-center mt-3.5 pb-1">
                <span id="app-caption-0" class="text-[11px] text-[#8C8273] font-sans font-extrabold tracking-wider uppercase bg-[#F5F0E9] px-3.5 py-1.5 rounded-full inline-block border border-[#E8E2D8]/40">
                  Sua Saúde Mental
                </span>
              </div>
            </div>

            <!-- Slide 1 -->
            <div id="app-slide-1" class="hidden" onclick="openLightbox('https://i.ibb.co/fY8W7jvn/Chat-GPT-Image-10-de-jul-de-2026-18-21-55.png')">
              <div class="relative overflow-hidden rounded-[24px] aspect-[16/9] md:aspect-[1.5/1] bg-[#FAF8F5] flex items-center justify-center">
                <img 
                  src="https://i.ibb.co/fY8W7jvn/Chat-GPT-Image-10-de-jul-de-2026-18-21-55.png" 
                  alt="Aplicativo da Clínica - Personalização de Cores" 
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div class="p-3.5 bg-white/95 rounded-full text-[#607762] shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path></svg>
                    <span class="text-xs font-bold font-sans pr-1">Dar Zoom</span>
                  </div>
                </div>
              </div>
              <div class="text-center mt-3.5 pb-1">
                <span id="app-caption-1" class="text-[11px] text-[#8C8273] font-sans font-extrabold tracking-wider uppercase bg-[#F5F0E9] px-3.5 py-1.5 rounded-full inline-block border border-[#E8E2D8]/40">
                  Tema Personalizável
                </span>
              </div>
            </div>

          </div>

          <!-- Right Control Arrow -->
          <button 
            onclick="nextAppSlide()"
            class="absolute right-2 md:-right-16 z-10 p-3 rounded-full bg-white/95 border border-[#E8E2D8] text-[#607762] hover:bg-[#607762] hover:text-white transition-all duration-300 shadow-md focus:outline-none cursor-pointer"
            aria-label="Próximo"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        <!-- Carousel Dots Indicator -->
        <div class="flex gap-2.5 mt-8">
          <button id="app-dot-0" onclick="showAppSlide(0)" class="h-2.5 rounded-full transition-all duration-300 cursor-pointer w-8 bg-[#607762]" aria-label="Ir para slide 1"></button>
          <button id="app-dot-1" onclick="showAppSlide(1)" class="h-2.5 rounded-full transition-all duration-300 cursor-pointer w-2.5 bg-[#607762]/25 hover:bg-[#607762]/50" aria-label="Ir para slide 2"></button>
        </div>

      </div>
    </div>

    <!-- 3. Feature Cards Grid & Remaining details (Now at the bottom) -->
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <div class="max-w-5xl mx-auto space-y-12">
        
        <!-- Feature Cards Grid (Expanded to 5 items) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div class="p-6 bg-white border border-[#E8E2D8] rounded-2xl space-y-3 shadow-xs hover:shadow-sm transition-all duration-300">
            <div class="flex items-center gap-2.5">
              <div class="p-2 bg-[#607762]/10 text-[#607762] rounded-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <h4 class="font-sans font-bold text-sm text-[#2C2B29]">Agenda Integrada</h4>
            </div>
            <p class="text-xs text-[#8C8273] font-light leading-relaxed">
              Consulte os horários das suas próximas consultas e mantenha sua rotina organizada com facilidade.
            </p>
          </div>

          <div class="p-6 bg-white border border-[#E8E2D8] rounded-2xl space-y-3 shadow-xs hover:shadow-sm transition-all duration-300">
            <div class="flex items-center gap-2.5">
              <div class="p-2 bg-[#607762]/10 text-[#607762] rounded-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h4 class="font-sans font-bold text-sm text-[#2C2B29]">Presença Simples</h4>
            </div>
            <p class="text-xs text-[#8C8273] font-light leading-relaxed">
              Confirme ou desmarque sessões agendadas com apenas alguns toques, sem burocracias.
            </p>
          </div>

          <div class="p-6 bg-white border border-[#E8E2D8] rounded-2xl space-y-3 shadow-xs hover:shadow-sm transition-all duration-300">
            <div class="flex items-center gap-2.5">
              <div class="p-2 bg-[#607762]/10 text-[#607762] rounded-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h4 class="font-sans font-bold text-sm text-[#2C2B29]">Painel Financeiro</h4>
            </div>
            <p class="text-xs text-[#8C8273] font-light leading-relaxed">
              Visualize seu histórico, consulte faturas e acesse recibos para reembolso de forma transparente.
            </p>
          </div>

          <div class="p-6 bg-white border border-[#E8E2D8] rounded-2xl space-y-3 shadow-xs hover:shadow-sm transition-all duration-300">
            <div class="flex items-center gap-2.5">
              <div class="p-2 bg-[#607762]/10 text-[#607762] rounded-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
              </div>
              <h4 class="font-sans font-bold text-sm text-[#2C2B29]">Temas de Cores</h4>
            </div>
            <p class="text-xs text-[#8C8273] font-light leading-relaxed">
              Personalize o aplicativo com seu tema favorito! Escolha entre 4 cores sofisticadas: <strong class="text-[#3a7cb5]">Azul</strong>, <strong class="text-[#c77a93]">Rosa</strong>, <strong class="text-[#607762]">Verde</strong> ou o acolhedor <strong class="text-[#3A3530]">Escuro</strong>.
            </p>
          </div>

          <div class="p-6 bg-white border border-[#E8E2D8] rounded-2xl space-y-3 shadow-xs hover:shadow-sm transition-all duration-300 sm:col-span-2">
            <div class="flex items-center gap-2.5">
              <div class="p-2 bg-[#607762]/10 text-[#607762] rounded-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h4 class="font-sans font-bold text-sm text-[#2C2B29]">Segurança & Sigilo Absoluto</h4>
            </div>
            <p class="text-xs text-[#8C8273] font-light leading-relaxed">
              Seus dados e registros protegidos por criptografia de ponta e em conformidade estrita com a LGPD, garantindo total privacidade para a sua jornada clínica.
            </p>
          </div>

        </div>

        <!-- Acesso Imediato Card (Placed before final quote) -->
        <div class="bg-white border border-[#E8E2D8] p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-5 shadow-xs">
          <div class="p-3.5 bg-[#607762] text-white rounded-xl shrink-0 flex items-center justify-center">
            <svg class="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          </div>
          <div class="text-center sm:text-left space-y-1.5">
            <h4 class="font-sans text-xs font-extrabold text-[#2C2B29] uppercase tracking-wider">Acesso Imediato Incluso</h4>
            <p class="text-xs text-[#5D5A56] font-light leading-relaxed">
              Sem taxas adicionais: o aplicativo é um benefício exclusivo e gratuito para todos os pacientes ativos da clínica. Suas chaves de acesso seguro são fornecidas na primeira consulta.
            </p>
          </div>
        </div>

        <!-- Bottom Quote -->
        <div class="bg-[#607762]/5 border-l-2 border-[#607762] p-4 rounded-r-xl">
          <p class="text-xs md:text-sm text-[#5D5A56] font-light italic leading-relaxed">
            "Um diferencial exclusivo pensado cuidadosamente para oferecer mais praticidade, previsibilidade e acolhimento em cada etapa da sua evolução terapêutica."
          </p>
        </div>

      </div>
    </div>

    <!-- Lightbox Modal (Zoomed View) -->
    <div id="lightbox-modal" class="fixed inset-0 bg-black/75 backdrop-blur-md z-50 hidden items-center justify-center p-4 transition-all duration-300" onclick="closeLightbox()">
      <div class="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center justify-center">
        <button onclick="event.stopPropagation(); closeLightbox()" class="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors focus:outline-none" aria-label="Fechar">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <img id="lightbox-img" src="" alt="Visualização ampliada do aplicativo" class="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl border border-white/10" onclick="event.stopPropagation()" referrerpolicy="no-referrer">
      </div>
    </div>
  </section>

  <!-- ==================== FOOTER ==================== -->
  <footer class="border-t border-[#E8E2D8] py-16 text-center text-xs text-[#8C8273] font-medium tracking-wide space-y-4">
    <div>Psicóloga Natália Auco • CRP 06/208635</div>
    <div>Atendimento Clínico Online • Todos os direitos reservados &copy; 2026</div>
    <div class="pt-4 text-[10px] text-neutral-400">Desenvolvido com excelência técnica e design sob medida</div>
  </footer>

  <!-- ==================== JAVASCRIPT GERAL ==================== -->
  <script>
    // ---------- 1. TYPEWRITER (HERO) ----------
    const words = ["sua ansiedade.", "seus relacionamentos.", "sua saúde mental.", "você."];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeEffect() {
      const txtEl = document.getElementById("typewriter-text");
      if (!txtEl) {
        setTimeout(typeEffect, 100);
        return;
      }
      const currentWord = words[wordIdx];
      
      if (isDeleting) {
        charIdx--;
      } else {
        charIdx++;
      }
      
      txtEl.textContent = currentWord.substring(0, charIdx);
      
      let typeSpeed = isDeleting ? 45 : 90;
      
      if (!isDeleting && charIdx === currentWord.length) {
        typeSpeed = 2200; // Tempo parado na palavra completa
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typeSpeed = 500; // Pausa antes de começar a nova palavra
      }
      
      setTimeout(typeEffect, typeSpeed);
    }
    
    // Piscar do cursor
    setInterval(() => {
      const cursorEl = document.getElementById("typewriter-cursor");
      if (cursorEl) {
        cursorEl.style.opacity = cursorEl.style.opacity === "0" ? "1" : "0";
      }
    }, 500);

    // Iniciar typewriter ao carregar de forma ultra-segura
    function init() {
      typeEffect();
      calculateTime(); // Iniciar calculadora com valor default
    }

    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }

    // ---------- 2. ABAS (SOBRE MIM) ----------
    function switchTab(tabName) {
      const tabs = ['abordagem', 'areas', 'idiomas'];
      tabs.forEach(t => {
        const btn = document.getElementById('tab-' + t);
        const panel = document.getElementById('panel-' + t);
        if (t === tabName) {
          btn.className = "flex-1 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 bg-white text-[#607762] shadow-sm";
          panel.classList.remove('hidden');
        } else {
          btn.className = "flex-1 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 text-[#5D5A56] hover:text-[#2C2A27]";
          panel.classList.add('hidden');
        }
      });
    }

    // ---------- 3. CAMINHOS (ROLAGEM E FLIP) ----------
    function scrollCaminhos(direction) {
      const track = document.getElementById('caminhos-track');
      const amt = direction === 'left' ? -352 : 352;
      track.scrollBy({ left: amt, behavior: 'smooth' });
    }

    function toggleFlip(cardId) {
      const card = document.getElementById(cardId);
      card.classList.toggle('rotate-y-180');
    }

    // ---------- 4. CALCULADORA DE TEMPO ----------
    function calculateTime() {
      const slider = document.getElementById('screen-time-slider');
      const val = parseInt(slider.value);
      
      document.getElementById('screen-time-display').textContent = val + (val === 1 ? ' hora' : ' horas');
      
      const weeklyHours = val * 7;
      const screenPct = ((weeklyHours / 168) * 100).toFixed(1);
      
      document.getElementById('weekly-screen-hours').textContent = weeklyHours + 'h';
      document.getElementById('weekly-screen-pct').textContent = '(' + screenPct + '% do tempo total)';
      document.getElementById('bar-screen').style.width = screenPct + '%';
      
      let slogan = "Mesmo com hábitos equilibrados, o autocuidado direcionado traz clareza e inteligência emocional.";
      if (val >= 6) {
        slogan = "Sua mente está consumida por estímulos constantes. Uma hora de terapia pode mudar seu ritmo.";
      } else if (val >= 4) {
        slogan = "Você dedica um tempo considerável às telas. Reservar um espaço para si mesma(o) fará toda a diferença.";
      }
      document.getElementById('calculator-slogan').textContent = slogan;
    }

    // ---------- 5. QUIZ / AUTOAVALIAÇÃO ----------
    let quizScore = 0;
    function quizNext(currentStep, points) {
      quizScore += points;
      
      const curEl = document.getElementById('quiz-step-' + currentStep);
      const nextEl = document.getElementById('quiz-step-' + (currentStep + 1));
      
      curEl.classList.add('opacity-0');
      setTimeout(() => {
        curEl.classList.add('hidden');
        nextEl.classList.remove('hidden');
        nextEl.classList.remove('opacity-0');
        
        // Atualiza progresso
        const pct = ((currentStep + 1) / 4) * 100;
        document.getElementById('quiz-progress-fill').style.width = pct + '%';
      }, 300);
    }

    function quizFinish(points) {
      quizScore += points;
      const curEl = document.getElementById('quiz-step-4');
      const resultEl = document.getElementById('quiz-step-result');
      
      curEl.classList.add('opacity-0');
      setTimeout(() => {
        curEl.classList.add('hidden');
        resultEl.classList.remove('hidden');
        resultEl.classList.remove('opacity-0');
        
        document.getElementById('quiz-progress-bar').classList.add('hidden');
        
        // Customiza resultado
        const descEl = document.getElementById('quiz-result-text');
        if (quizScore <= 3) {
          descEl.textContent = "Seus níveis de estresse parecem moderados. Manter o equilíbrio é fundamental. Que tal um espaço focado no seu autoconhecimento?";
        } else {
          descEl.textContent = "Seus níveis de sobrecarga parecem elevados. É importante dar atenção a esses sinais. Vamos construir ferramentas de alívio juntos?";
        }
      }, 300);
    }

    function quizReset() {
      quizScore = 0;
      document.getElementById('quiz-step-result').classList.add('hidden');
      document.getElementById('quiz-step-1').classList.remove('hidden');
      document.getElementById('quiz-step-1').classList.remove('opacity-0');
      
      document.getElementById('quiz-progress-bar').classList.remove('hidden');
      document.getElementById('quiz-progress-fill').style.width = '25%';
      
      for (let i = 2; i <= 4; i++) {
        document.getElementById('quiz-step-' + i).classList.add('hidden');
      }
    }

    // ---------- 6. SCROLL SUAVE ----------
    function scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // ---------- 7. DEPOIMENTOS (CARROSSEL E EXPAND) ----------
    function scrollReviews(direction) {
      const track = document.getElementById('reviews-track');
      const card = track.querySelector('article');
      const amt = card.offsetWidth + 24;
      track.scrollBy({ left: direction === 'left' ? -amt : amt, behavior: 'smooth' });
    }

    function toggleReviewExpand(id) {
      const card = document.getElementById('review-' + id);
      const text = document.getElementById('review-text-' + id);
      const btn = document.getElementById('review-btn-' + id);
      
      if (card.style.height === 'auto') {
        card.style.height = '310px';
        text.className = "text-sm md:text-[0.95rem] font-light text-[#6B7270] leading-relaxed line-clamp-3";
        btn.textContent = "Leia mais";
      } else {
        card.style.height = 'auto';
        text.className = "text-sm md:text-[0.95rem] font-light text-[#6B7270] leading-relaxed";
        btn.textContent = "Ler menos";
      }
    }

    // ---------- 8. ESPAÇO DE CONHECIMENTO (ARTIGOS INLINE MODAL FIX) ----------
    const articlesData = {
      ansiedade: {
        title: "Ansiedade: Compreendendo o Mecanismo e Encontrando Alívio",
        category: "Ansiedade",
        content: \`
          <p class="text-lg font-light italic text-[#7A8B7C] border-l-4 border-[#7A8B7C] pl-4">"A ansiedade não é um defeito de caráter, mas sim um sistema de alerta hiperativo que pode ser recalibrado."</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">O que é a Ansiedade sob a ótica da TCC?</h4>
          <p>Na Terapia Cognitivo-Comportamental (TCC), compreendemos que a ansiedade não é gerada diretamente pelas situações que vivemos, mas sim pela forma como interpretamos essas situações. Diante de um desafio, nossa mente pode interpretar o cenário como uma <strong>ameaça iminente</strong> e catastrófica.</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">O Círculo Vicioso da Ansiedade</h4>
          <p>Quando percebemos uma ameaça, nosso corpo ativa a resposta de "luta ou fuga". Isso gera sintomas físicos reais: batimentos acelerados, respiração curta, tensão muscular e sudorese. Esses sintomas, por sua vez, assustam ainda mais a mente, criando um ciclo contínuo de nervosismo e desconforto físico.</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">3 Ferramentas Práticas de Alívio Imediato</h4>
          <ol class="list-decimal pl-6 space-y-4">
            <li><strong>Respiração Quadrada (4-4-4-4):</strong> Inspire pelo nariz contando até 4. Segure o ar por 4s. Expire por 4s. Espere sem ar por 4s. Repita 5 vezes.</li>
            <li><strong>Técnica de Aterramento (5-4-3-2-1):</strong> Olhe ao seu redor e nomeie: 5 coisas que vê, 4 que toca, 3 sons que ouve, 2 cheiros e 1 sabor.</li>
            <li><strong>Desafio de Pensamentos:</strong> Pergunte a si mesma(o): <em>"O que estou pensando é um fato comprovado ou apenas uma suposição?"</em>.</li>
          </ol>
          <div class="bg-neutral-100/50 p-6 rounded-2xl border border-[#E8E2D8] mt-8 text-sm">
            <h5 class="font-serif font-bold text-[#2C3E35] mb-2">Nota Terapêutica</h5>
            <p class="font-light">Lembre-se: sentir ansiedade é natural. Na terapia, aprendemos a não nos deixar paralisar por ela, resgatando nossa liberdade de ação.</p>
          </div>
        \`
      },
      depressao: {
        title: "Depressão: Desarmando os Ciclos de Desânimo e Autocrítica",
        category: "Depressão",
        content: \`
          <p class="text-lg font-light italic text-[#7A8B7C] border-l-4 border-[#7A8B7C] pl-4">"A depressão distorce a lente com que enxergamos a nós mesmos, ao mundo e ao futuro. Mas essa lente pode ser limpa."</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">Sinais e Sintomas Sutis</h4>
          <p>A depressão aparece muitas vezes como uma <strong>apatia constante</strong> (perda de interesse por coisas que antes davam prazer), cansaço extremo, sentimentos de inutilidade, autocrítica severa e uma sensação persistente de desesperança.</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">A Armadilha da Inatividade</h4>
          <p>A depressão drena nossa energia e nos sussurra para ficarmos isolados. Quando cedemos, perdemos o contato com fontes de satisfação, o que piora o desânimo. Isso é o chamado ciclo depressivo.</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">A Abordagem da Ativação Comportamental</h4>
          <p>Um dos caminhos mais eficazes da TCC contra a depressão é a <strong>ativação comportamental</strong>. Nós agimos <em>primeiro</em> de forma estruturada para reativar os centros de bem-estar do cérebro:</p>
          <ul class="list-disc pl-6 space-y-3">
            <li><strong>Micro-passos:</strong> Divida tarefas em partes minúsculas (arrume apenas uma gaveta).</li>
            <li><strong>Agendamento de prazer e domínio:</strong> Planeje pequenas tarefas diárias que deem satisfação ou senso de dever cumprido.</li>
            <li><strong>Combater os pensamentos automáticos:</strong> Anote as autocríticas e responda de forma autocompassiva.</li>
          </ul>
        \`
      },
      burnout: {
        title: "Burnout: Reconhecendo os Limites e Restaurando sua Vitalidade",
        category: "Burnout",
        content: \`
          <p class="text-lg font-light italic text-[#7A8B7C] border-l-4 border-[#7A8B7C] pl-4">"Burnout não é cansaço físico comum que se resolve dormindo no fim de semana. É o esgotamento por estresse ocupacional crônico."</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">Cansaço Comum vs. Síndrome de Burnout</h4>
          <p>O Burnout é caracterizado por três pilares fundamentais:</p>
          <ol class="list-decimal pl-6 space-y-2">
            <li><strong>Exaustão Emocional:</strong> Esgotamento físico e mental absoluto.</li>
            <li><strong>Despersonalização ou Cinismo:</strong> Atitude de distanciamento, frieza ou irritabilidade em relação ao trabalho.</li>
            <li><strong>Baixa Realização Profissional:</strong> Sensação de ineficácia e incompetência profissional.</li>
          </ol>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">Caminhos para Recuperação e Prevenção</h4>
          <ul class="list-disc pl-6 space-y-3">
            <li><strong>Definição de Limites:</strong> Aprenda a dizer "não". Estabeleça horários estritos para desconexão digital fora do expediente.</li>
            <li><strong>Rituais de Descompressão:</strong> Crie transições conscientes entre o trabalho e o tempo pessoal (um banho morno, uma caminhada rápida).</li>
            <li><strong>Reestruturação da Identidade:</strong> Lembre-se de que o seu trabalho é o que você faz, não quem você é. Cultive hobbies e conexões significativas.</li>
          </ul>
        \`
      },
      tdah: {
        title: "TDAH em Adultos: O Desafio da Atenção e a Disfunção Executiva",
        category: "TDAH",
        content: \`
          <p class="text-lg font-light italic text-[#7A8B7C] border-l-4 border-[#7A8B7C] pl-4">"O TDAH no adulto não é falta de interesse, mas sim uma flutuação crônica da dopamina na regulação do foco."</p>
          <p>O Transtorno do Déficit de Atenção com Hiperatividade (TDAH) é frequentemente associado à infância, mas estima-se que persista na vida adulta em até 60% dos casos. No adulto, a hiperatividade física costuma diminuir, transformando-se em uma inquietação mental contínua, ansiedade de desempenho e cansaço crônico.</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">A Disfunção Executiva no Adulto</h4>
          <p>As funções executivas são o "gerente" do nosso cérebro, responsáveis por planejar, iniciar tarefas, organizar horários, gerenciar o tempo, focar e inibir impulsos. Quando esse gerente funciona de forma inconsistente, a pessoa enfrenta sérios desafios na vida acadêmica, corporativa e pessoal.</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">Sintomas comuns no dia a dia:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Procrastinação crônica:</strong> Sentir paralisia diante de tarefas complexas ou chatas, adiando até o limite do prazo.</li>
            <li><strong>Dificuldade de iniciar e concluir tarefas:</strong> Começar projetos com entusiasmo e abandoná-los pela metade quando perdem a novidade.</li>
            <li><strong>Dificuldade com gestão do tempo:</strong> Perder a noção do tempo (cegueira temporal), atrasar-se com frequência e subestimar prazos.</li>
            <li><strong>Esquecimentos e desorganização:</strong> Perder objetos pessoais, esquecer compromissos importantes e ter dificuldade em manter ambientes organizados.</li>
          </ul>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">Como a TCC e a Psicoterapia ajudam?</h4>
          <p>Na Terapia Cognitivo-Comportamental, trabalhamos no desenvolvimento de <strong>estratégias compensatórias e treino de habilidades executivas</strong>:</p>
          <ol class="list-decimal pl-6 space-y-3">
            <li><strong>Quebra de paralisia:</strong> Dividir tarefas gigantescas em micro-ações ridicularmente fáceis para reduzir a sobrecarga neurológica.</li>
            <li><strong>Organização externa:</strong> Implementar sistemas visuais de organização, agendas e timers adaptados à mente neurodivergente.</li>
            <li><strong>Controle de estímulos:</strong> Reduzir distrações no ambiente de trabalho e estruturar rituais de início e fim de metas.</li>
            <li><strong>Trabalho de crenças:</strong> Desconstruir sentimentos profundos de incompetência acumulados após anos de cobranças externas.</li>
          </ol>
        \`
      },
      autoestima: {
        title: "Autoestima: Desconstruindo a Autocrítica e Construindo Respeito Próprio",
        category: "Autoestima",
        content: \`
          <p class="text-lg font-light italic text-[#7A8B7C] border-l-4 border-[#7A8B7C] pl-4">"Autoestima não é sobre se achar perfeito, mas sobre se aceitar e apoiar incondicionalmente, mesmo diante de falhas."</p>
          <p>A autoestima é a base sobre a qual construímos nossas decisões, relacionamentos e metas. Diferente de um sentimento passageiro de autoconfiança, a autoestima profunda é o valor intrínseco que atribuímos a nós mesmos. Ela determina se nos achamos merecedores de afeto, sucesso, respeito e cuidado.</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">Sinais de uma autoestima fragilizada:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Necessidade contínua de aprovação:</strong> Moldar opiniões e comportamentos para agradar os outros e evitar rejeição.</li>
            <li><strong>Perfeccionismo paralisante:</strong> Cobrar-se excelência máxima em tudo, temendo o erro como uma prova definitiva de fracasso.</li>
            <li><strong>Dificuldade de aceitar elogios:</strong> Descartar ou duvidar de elogios sinceros de terceiros, achando que estão apenas sendo simpáticos.</li>
            <li><strong>Autossabotagem:</strong> Evitar oportunidades de crescimento profissional ou afetivo por achar que não vai dar conta.</li>
          </ul>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">O Caminho Terapêutico de Reconstrução</h4>
          <p>Na terapia cognitivo-comportamental, não trabalhamos com "pensamento positivo" ingênuo. Em vez disso, focamos na <strong>reestruturação cognitiva realista</strong> e na autocompaixão ativa:</p>
          <ul class="list-disc pl-6 space-y-3">
            <li><strong>Identificar os Pensamentos Automáticos:</strong> Capturar os momentos em que a autocrítica ataca e registrar essas falas mentalmente.</li>
            <li><strong>Desafiar a Voz Crítica:</strong> Analisar se as acusações que você faz contra si são de fato verdadeiras ou apenas interpretações distorcidas de cenários.</li>
            <li><strong>Treino de Autocompaixão:</strong> Aprender a falar consigo mesmo no mesmo tom de carinho e respeito que usaria para aconselhar um melhor amigo que estivesse em sofrimento.</li>
          </ul>
        \`
      },
      autoconhecimento: {
        title: "Autoconhecimento: O Caminho para Escolhas Alinhadas com sua Essência",
        category: "Autoconhecimento",
        content: \`
          <p class="text-lg font-light italic text-[#7A8B7C] border-l-4 border-[#7A8B7C] pl-4">"Quem se conhece deixa de viver no piloto automático e assume as rédeas da própria narrativa."</p>
          <p>O autoconhecimento é muito mais que uma palavra bonita; ele é uma <strong>ferramenta prática de sobrevivência e liberdade</strong>. Quando não nos conhecemos profundamente, tendemos a reproduzir respostas automáticas, assumindo desejos, pressões e expectativas alheias como se fossem nossos. Isso gera frustração, vazio existencial e estresse.</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">Os Benefícios do Autoconhecimento Ativo:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Tomadas de decisão assertivas:</strong> Escolher caminhos profissionais e afetivos com base em valores reais, não por pressão externa.</li>
            <li><strong>Gestão emocional inteligente:</strong> Identificar o início de uma crise de ansiedade ou desânimo e agir preventivamente para se restabelecer.</li>
            <li><strong>Relações autênticas:</strong> Comunicar seus limites e necessidades com transparência e afeto, evitando jogos emocionais.</li>
          </ul>
        \`
      },
      narcisismo: {
        title: "Narcisismo nas Relações: Identificando Padrões Abusivos e Resgatando sua Identidade",
        category: "Narcisismo",
        content: \`
          <p class="text-lg font-light italic text-[#7A8B7C] border-l-4 border-[#7A8B7C] pl-4">"Em uma relação com um narcisista, a primeira vítima é a sua própria percepção da realidade."</p>
          <p>Relacionar-se com alguém que apresenta fortes traços de Transtorno de Personalidade Narcisista (TPN) pode ser uma das experiências mais desgastantes e desestruturantes para a saúde mental. Pessoas com esse perfil tendem a apresentar uma necessidade extrema de admiração, falta de empatia real pelos outros e um padrão constante de manipulação.</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">O Ciclo do Abuso Emocional</h4>
          <ol class="list-decimal pl-6 space-y-3">
            <li><strong>Bombardeio de Amor (Love Bombing):</strong> No início, a pessoa enche você de elogios, presentes e atenção excessiva. Tudo parece perfeito e intenso, fazendo você se sentir único e especial.</li>
            <li><strong>Desvalorização Sutil:</strong> Gradualmente, começam críticas disfarçadas de conselhos, piadas depreciativas e invalidação das suas conquistas. Você passa a se policiar continuamente para evitar conflitos.</li>
            <li><strong>Descarte e Desprezo:</strong> Quando você demonstra cansaço ou tenta colocar limites, a pessoa se afasta com frieza extrema, culpando você por todo o desgaste e conflitos da relação.</li>
          </ol>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">A Manipulação Invisível: Gaslighting</h4>
          <p>Uma das ferramentas mais perigosas do abuso psicológico é o <strong>Gaslighting</strong>, no qual o abusador distorce os fatos para fazer você duvidar da sua própria memória, inteligência e sanidade mental. Frases como <em>"Você está louca"</em>, <em>"Eu nunca disse isso"</em> ou <em>"Você é sensível demais"</em> são recorrentes para desarmar suas defesas.</p>
        \`
      },
      relacionamentos: {
        title: "Relacionamentos Saudáveis: Comunicação, Limites e Conexão Real",
        category: "Relacionamentos",
        content: \`
          <p class="text-lg font-light italic text-[#7A8B7C] border-l-4 border-[#7A8B7C] pl-4">"Um relacionamento maduro não é a fusão de duas pessoas, mas o encontro de duas autonomias que escolhem caminhar juntas."</p>
          <p>Viver relacionamentos saudáveis é um dos maiores pilares de felicidade e estabilidade emocional. No entanto, muitas pessoas confundem amor com dependência emocional, ciúme com cuidado e submissão com harmonia.</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">Os Três Pilares da Relação Madura</h4>
          <ul class="list-disc pl-6 space-y-3">
            <li><strong>Comunicação Assertiva:</strong> Falar sobre incômodos no momento certo e sem agressividade, assumindo a responsabilidade pelos próprios sentimentos (ex: usar frases com "Eu sinto" em vez de "Você sempre faz").</li>
            <li><strong>Limites Individuais Claros:</strong> Preservar amizades, hobbies e espaços pessoais fora da dinâmica de casal. Saber dizer "não" com segurança e acolher o "não" do parceiro.</li>
            <li><strong>Vulnerabilidade Compartilhada:</strong> Expor medos, fraquezas e necessidades reais sem medo de ser punido ou ridicularizado.</li>
          </ul>
        \`
      },
      tcc: {
        title: "Terapia Cognitivo-Comportamental: O Padrão Ouro da Psicoterapia Moderna",
        category: "TCC",
        content: \`
          <p class="text-lg font-light italic text-[#7A8B7C] border-l-4 border-[#7A8B7C] pl-4">"Não são as situações reais que nos perturbam, mas sim os julgamentos e interpretações que fazemos dessas situações."</p>
          <p>A Terapia Cognitivo-Comportamental (TCC) é uma abordagem psicoterapêutica estruturada, focada no presente e cientificamente validada por milhares de pesquisas em todo o mundo. Ela é apontada pela comunidade de saúde como o padrão-ouro de tratamento para diversos transtornos psicológicos.</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">O Modelo Cognitivo</h4>
          <p>A premissa básica da TCC é simples e transformadora: <strong>nossos pensamentos influenciam diretamente nossas emoções e nossos comportamentos</strong>. Quando interpretamos os acontecimentos de forma distorcida ou hiperativa, nossas reações corporais e ações também saem desreguladas.</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">As Distorções Cognitivas Mais Comuns:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Catastrofização:</strong> Esperar sempre o pior desfecho possível para qualquer situação.</li>
            <li><strong>Leitura de Mente:</strong> Achar que sabe exatamente o que os outros estão pensando de você (geralmente algo negativo).</li>
            <li><strong>Pensamento de "Tudo ou Nada":</strong> Enxergar a realidade apenas em extremos, sem nuances cinzentas (se eu errar um detalhe, sou um fracasso completo).</li>
          </ul>
        \`
      },
      autismo: {
        title: "Autismo (TEA) em Adultos: O Alívio de Compreender a Neurodivergência",
        category: "Autismo",
        content: \`
          <p class="text-lg font-light italic text-[#7A8B7C] border-l-4 border-[#7A8B7C] pl-4">"O diagnóstico tardio de autismo no adulto funciona como um espelho retrovisor que reorganiza e acolhe toda a sua biografia."</p>
          <p>O Transtorno do Espectro Autista (TEA) de Nível 1 (frequentemente chamado de autismo leve ou de alta funcionalidade) costuma passar despercebido na infância. Muitos adultos crescem sem diagnóstico, sentindo-se persistentemente inadequados, cansados, diferentes ou com a sensação de estarem "operando sem o manual de instruções social".</p>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">Sinais frequentes de Autismo em Adultos:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Camuflagem Social (Masking):</strong> Desenvolver personagens ou regras rígidas de conversação para imitar comportamentos típicos, gerando extrema exaustão física e mental após reuniões e festas.</li>
            <li><strong>Hipersensibilidade Sensorial:</strong> Desconforto extremo com barulhos repetitivos, tecidos específicos, luzes fluorescentes ou texturas de alimentos.</li>
            <li><strong>Hiperfoco:</strong> Interesses intensos e extremamente focados em temas específicos, onde a pessoa acumula grande volume de conhecimento técnico.</li>
            <li><strong>Dificuldade com a literalidade:</strong> Dificuldade em captar sarcasmo, duplos sentidos ou ler dicas sociais não verbais de forma fluida.</li>
          </ul>
          <h4 class="text-xl font-serif font-semibold text-[#2C3E35] mt-6">Como a Psicoterapia ajuda no TEA Adulto?</h4>
          <p>O objetivo da terapia não é "curar" ou mudar a neurodivergência — afinal, o autismo faz parte de quem a pessoa é. A psicoterapia funciona como um suporte estratégico:</p>
          <ul class="list-disc pl-6 space-y-3">
            <li><strong>Prevenção de Burnout Autista:</strong> Identificar os sinais de sobrecarga sensorial e social e criar estratégias de proteção de energia.</li>
            <li><strong>Treino Assertivo de Relações:</strong> Desenvolver ferramentas de comunicação clara e confortável para lidar com as interações profissionais e familiares.</li>
            <li><strong>Desconstrução da Culpa:</strong> Desarmar crenças profundas de inadequação social acumuladas ao longo de toda a vida.</li>
          </ul>
        \`
      }
    };

    function openArticle(articleId) {
      const art = articlesData[articleId];
      if (!art) return;
      
      document.getElementById('article-reader-category').textContent = art.category;
      document.getElementById('article-reader-title').textContent = art.title;
      document.getElementById('article-reader-body').innerHTML = art.content;
      
      const modal = document.getElementById('article-reader');
      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.remove('opacity-0');
      }, 50);
    }

    function closeArticle() {
      const modal = document.getElementById('article-reader');
      modal.classList.add('opacity-0');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
    }

    // ---------- 9. PERGUNTAS FREQUENTES (FAQ) ----------
    function toggleFAQ(id) {
      const answer = document.getElementById('faq-answer-' + id);
      const hBar = document.getElementById('faq-plus-h-' + id);
      const vBar = document.getElementById('faq-plus-v-' + id);
      
      // Fecha outros FAQ abertos
      for (let i = 1; i <= 4; i++) {
        if (i !== id) {
          const ans = document.getElementById('faq-answer-' + i);
          const hb = document.getElementById('faq-plus-h-' + i);
          const vb = document.getElementById('faq-plus-v-' + i);
          ans.style.maxHeight = '0px';
          ans.classList.add('opacity-0');
          hb.classList.remove('rotate-45');
          vb.classList.remove('rotate-45');
          vb.classList.remove('opacity-0');
        }
      }

      if (answer.style.maxHeight === '240px') {
        answer.style.maxHeight = '0px';
        answer.classList.add('opacity-0');
        hBar.classList.remove('rotate-45');
        vBar.classList.remove('rotate-45');
        vBar.classList.remove('opacity-0');
      } else {
        answer.style.maxHeight = '240px';
        answer.classList.remove('opacity-0');
        hBar.classList.add('rotate-45');
        vBar.classList.add('rotate-45');
        vBar.classList.add('opacity-0');
      }
    }

    // ---------- 10. WHATSAPP FLOATING WIDGET ----------
    function toggleWhatsApp() {
      const chatWindow = document.getElementById('waChatWindow');
      const notificationDot = document.getElementById('waDot');
      
      chatWindow.classList.toggle('is-open');
      
      if (chatWindow.classList.contains('is-open')) {
        notificationDot.style.display = 'none';
      }
    }

    // ---------- 11. LIGHTBOX LIGHT MODAL ----------
    function openLightbox(imgSrc) {
      const modal = document.getElementById('lightbox-modal');
      const img = document.getElementById('lightbox-img');
      if (modal && img) {
        img.src = imgSrc;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    }

    function closeLightbox() {
      const modal = document.getElementById('lightbox-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }

    // ---------- 12. APP SCREENSHOT CAROUSEL ----------
    let currentAppSlide = 0;
    const totalAppSlides = 2;

    function showAppSlide(index) {
      currentAppSlide = index;
      for (let i = 0; i < totalAppSlides; i++) {
        const slide = document.getElementById('app-slide-' + i);
        const dot = document.getElementById('app-dot-' + i);
        if (slide && dot) {
          if (i === index) {
            slide.classList.remove('hidden');
            slide.classList.add('block');
            dot.classList.remove('w-2.5', 'bg-[#607762]/25');
            dot.classList.add('w-8', 'bg-[#607762]');
          } else {
            slide.classList.remove('block');
            slide.classList.add('hidden');
            dot.classList.remove('w-8', 'bg-[#607762]');
            dot.classList.add('w-2.5', 'bg-[#607762]/25');
          }
        }
      }
    }

    function prevAppSlide() {
      let newIndex = currentAppSlide - 1;
      if (newIndex < 0) {
        newIndex = totalAppSlides - 1;
      }
      showAppSlide(newIndex);
    }

    function nextAppSlide() {
      let newIndex = currentAppSlide + 1;
      if (newIndex >= totalAppSlides) {
        newIndex = 0;
      }
      showAppSlide(newIndex);
    }
  </script>

  <!-- WhatsApp Widget HTML -->
  <div class="wa-widget-container">
      
      <div class="wa-chat-window" id="waChatWindow">
          <div class="wa-header">
              <div class="wa-avatar-wrapper">
                  <img src="https://i.ibb.co/95hvXbz/Nat-Site.jpg" alt="Natália Auco" class="wa-avatar">
                  <div class="wa-online-dot"></div>
              </div>
              <div class="wa-info">
                  <span class="wa-name">Natália Auco</span>
                  <span class="wa-status">Online</span>
              </div>
              <button class="wa-close-btn" onclick="toggleWhatsApp()" aria-label="Fechar janela">✖</button>
          </div>
          
          <div class="wa-body">
              <div class="wa-message">
                  Olá! 😊<br><br>
                  Sou psicóloga e estou aqui para te ajudar. Você gostaria de agendar um horário, tem dúvidas sobre as sessões ou quer esclarecer outro assunto? Me conte aqui!
              </div>
          </div>
          
          <div class="wa-footer">
              <a href="https://wa.me/5512991766972" target="_blank" rel="noopener noreferrer" class="wa-cta-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157.1zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                  Converse pelo WhatsApp
              </a>
          </div>
      </div>

      <button class="wa-fab" id="waFabBtn" onclick="toggleWhatsApp()" aria-label="Abrir WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157.1zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
          <div class="wa-notification-dot" id="waDot"></div>
      </button>
      
  </div>
</body>
</html>`;

  const downloadHtmlFile = () => {
    try {
      const blob = new Blob([googleSitesCode], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "site-natalia-auco.html";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download HTML file:", err);
      alert("Ocorreu um erro ao tentar baixar o arquivo. Por favor, tente copiar o código.");
    }
  };

  const copyToClipboard = () => {
    const fallbackCopy = () => {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = googleSitesCode;
        
        // Hide the textarea safely
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.width = "2em";
        textArea.style.height = "2em";
        textArea.style.padding = "0";
        textArea.style.border = "none";
        textArea.style.outline = "none";
        textArea.style.boxShadow = "none";
        textArea.style.background = "transparent";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          alert("Não foi possível copiar automaticamente. Por favor, selecione todo o código e copie manualmente (Ctrl+A e Ctrl+C).");
        }
      } catch (err) {
        console.error("Fallback copy failed:", err);
        alert("Não foi possível copiar automaticamente. Por favor, selecione todo o código e copie manualmente (Ctrl+A e Ctrl+C).");
      }
    };

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(googleSitesCode)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch((err) => {
            console.warn("Clipboard API failed, trying fallback...", err);
            fallbackCopy();
          });
      } else {
        fallbackCopy();
      }
    } catch (err) {
      console.warn("Clipboard access failed, trying fallback...", err);
      fallbackCopy();
    }
  };

  return (
    <>
      {/* FLOATING ACTION PANEL */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#2C2A27] hover:bg-[#607762] text-white text-xs md:text-sm font-semibold py-4 px-6 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 border border-white/20 hover:scale-105 cursor-pointer"
        >
          <svg className="w-4 h-4 text-emerald-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
          Obter Código Unificado (GitHub / Google Sites)
        </button>
      </div>

      {/* CODE EXPORTER MODAL OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#2C2A27]/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative w-full max-w-3xl bg-[#f3eee7] border border-[#E8E2D8] rounded-[28px] p-6 md:p-10 shadow-2xl flex flex-col max-h-[90vh] z-10 animate-scale-up">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#2C2A27]">
                  Código Unificado (GitHub / Google Sites)
                </h3>
                <p className="text-xs text-[#7A8B7C] font-semibold uppercase tracking-wider mt-1">
                  100% Responsivo • Links Corrigidos • Atendimento Personalizado
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-200/50 transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Explanatory notes */}
            <div className="bg-[#FAF8F5] border border-[#F1ECE5] rounded-xl p-4 text-xs text-[#5D5A56] leading-relaxed mb-6 space-y-2">
              <p>
                <strong>✓ Publicação no GitHub Pages (Recomendado):</strong> Use o botão <strong>"Baixar (.html)"</strong> abaixo para obter o arquivo completo do site. Salve-o com o nome <code>index.html</code> no seu repositório do GitHub e ative o GitHub Pages nas configurações do repositório para ter o seu site publicado gratuitamente e de forma extremamente veloz!
              </p>
              <p>
                <strong>✓ Uso no Google Sites (Alternativo):</strong> Se preferir usar o Google Sites, clique em <strong>Incorporar</strong> &rarr; escolha a aba <strong>Incorporar código</strong> &rarr; cole este código e expanda o container. Todo o conteúdo carrega de forma 100% responsiva.
              </p>
              <p className="text-amber-800 bg-amber-50 border border-amber-200/60 rounded-lg p-2 mt-2">
                <strong>💡 Dica de Cópia:</strong> Se o botão de cópia automática falhar devido às restrições de segurança do seu navegador, use o botão <strong>"Baixar (.html)"</strong> abaixo. Abra o arquivo baixado no Bloco de Notas ou editor de código, selecione todo o texto (<code>Ctrl+A</code>) e copie!
              </p>
            </div>

            {/* Code Area */}
            <div className="flex-1 overflow-y-auto mb-6 bg-[#2C2A27] rounded-xl relative p-4 border border-[#3E3C38]">
              <div className="absolute top-3 right-3 z-20 flex gap-2">
                <button 
                  onClick={downloadHtmlFile}
                  className="bg-neutral-800/90 hover:bg-neutral-700 text-white text-[11px] font-semibold py-2 px-3.5 rounded-lg border border-neutral-700 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  title="Baixar como arquivo .html completo"
                >
                  <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Baixar (.html)
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="bg-neutral-800/90 hover:bg-neutral-700 text-white text-[11px] font-semibold py-2 px-3.5 rounded-lg border border-neutral-700 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Copiado!
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0A2.25 2.25 0 0113.5 5.25h-3a2.25 2.25 0 01-2.166-1.73m0 0A2.25 2.25 0 017.5 3.75M3 15.75A2.25 2.25 0 005.25 18h13.5A2.25 2.25 0 0021 15.75V10.518c0-.621-.307-1.206-.822-1.564l-3.142-2.185a1.5 1.5 0 00-1.736 0l-3.14 2.185a1.5 1.5 0 01-1.737 0L8.283 8.77c-.515-.358-.822-.943-.822-1.564V3.75m0 12v3a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-3M9 10.5h.008v.008H9V10.5zm.008 3h-.008v-.008h.008v.008zm0 3h-.008v-.008h.008v.008z" />
                      </svg>
                      Copiar Código
                    </>
                  )}
                </button>
              </div>

              <pre className="text-emerald-400 font-mono text-xs leading-normal select-all overflow-x-auto whitespace-pre">
                {googleSitesCode}
              </pre>
            </div>

            {/* Footer buttons */}
            <div className="flex gap-3 justify-end items-center">
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-neutral-200 hover:bg-neutral-300 text-[#2C2A27] text-xs md:text-sm font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer"
              >
                Voltar ao site
              </button>
              <button 
                onClick={downloadHtmlFile}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-semibold py-3 px-6 rounded-full transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Baixar (.html)
              </button>
              <button 
                onClick={copyToClipboard}
                className="bg-[#607762] hover:bg-[#4a5d4e] text-white text-xs md:text-sm font-semibold py-3 px-8 rounded-full transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                {copied ? 'Código Copiado!' : 'Copiar Código'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
