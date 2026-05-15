const phases = [
    {
        title: "O que é o KDD?",
        desc: "KDD (Knowledge Discovery in Databases) é o processo de extrair conhecimento útil e compreensível a partir de grandes volumes de dados. Nesta demonstração, veremos como transformar milhares de avaliações brutas da Amazon em uma decisão de compra clara.",
        theme: "light"
    },
    {
        title: "1. Seleção",
        desc: "A Amazon tem milhões de produtos. Para tomar uma decisão inteligente, o cliente não precisa da loja inteira. Nossa primeira missão no KDD é a Seleção: isolamos de uma base gigante apenas as 10.000 avaliações exclusivas sobre o produto 'Fone Bluetooth X'.",
        theme: "light"
    },
    {
        title: "2. Pré-processamento",
        desc: "Ninguém gosta de ler lixo – os algoritmos muito menos! No Pré-processamento, os robôs varrem spams agressivos, emojis inúteis ('🔥🚀💯') e corrigem erros de grafia. O ruído inútil é desintegrado, deixando texto puro e confiável.",
        theme: "light"
    },
    {
        title: "3. Transformação",
        desc: "Os computadores não leem emoções; eles entendem matemática. Na Transformação, a máquina engole as avaliações e as converte em matrizes (vetores). Agora, opiniões subjetivas ganharam estrutura. O palco está armado para a inteligência.",
        theme: "light"
    },
    {
        title: "4. Mineração de Dados",
        desc: "O cérebro em ação! Na Mineração de Dados, o algoritmo devora as matrizes procurando padrões invisíveis a olho nu. Ele agrupa elogios frequentes e isola queixas comuns, descartando vozes solitárias. O caos de milhares de opiniões começa a colapsar...",
        theme: "dark"
    },
    {
        title: "5. Avaliação e Interpretação",
        desc: "O Ouro! O conhecimento extraído é entregue. O cliente evita a fadiga de decisão, entende o cenário geral em uma linha e faz a compra confiante. O dado bruto virou conhecimento interpretável. Este é o final do Processo KDD.",
        theme: "dark"
    }
];

// Estado
let currentPhase = 0;
const totalPhases = phases.length;

// Elementos DOM
const body = document.body;
const phaseBadge = document.getElementById('phase-badge');
const phaseTitle = document.getElementById('phase-title');
const phaseDescription = document.getElementById('phase-description');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const particleContainer = document.getElementById('particle-container');
const aiCore = document.getElementById('ai-core');
const goldenSummary = document.getElementById('golden-summary');

// Simulação de "Reviews"
const sampleReviews = [
    "A bateria dura dias! ⭐⭐⭐⭐⭐",
    "Muito pesado para correr. 😡",
    "Som excelente, mas machuca a orelha.",
    "Comprei na promo, valeu a pena.",
    "Best headphone I ever had! (spam?)",
    "🔥🔥🔥 TOPPP!!!",
    "O cancelamento de ruído é surreal.",
    "Aperta muito a cabeça, desconfortável.",
    "Bateria incrível, não carrego nunca.",
    "Pelo preço, o peso é aceitável."
];

let particles = [];

// Inicialização
function init() {
    createParticles(50);
    updateUI();
    
    nextBtn.addEventListener('click', () => {
        if (currentPhase < totalPhases - 1) {
            currentPhase++;
            updateUI();
        } else if (currentPhase === totalPhases - 1) {
            currentPhase = 0; // Reset
            updateUI();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentPhase > 0) {
            currentPhase--;
            updateUI();
        }
    });

    // Support keyboard arrows
    document.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowRight') nextBtn.click();
        if(e.key === 'ArrowLeft') prevBtn.click();
    });
}

function createParticles(count) {
    particleContainer.innerHTML = '';
    particles = [];
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = sampleReviews[Math.floor(Math.random() * sampleReviews.length)];
        
        // Random initial position around the left side (Selection phase)
        const x = 5 + Math.random() * 15; // 5% to 20% width
        const y = 15 + Math.random() * 45; // 15% to 60% height
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.transform = `scale(1) rotate(${Math.random() * 20 - 10}deg)`;
        
        particleContainer.appendChild(particle);
        particles.push(particle);
    }
}

function updateUI() {
    const phaseData = phases[currentPhase];
    
    // Atualizar Textos
    if (currentPhase === 0) {
        phaseBadge.textContent = "Introdução";
    } else {
        phaseBadge.textContent = `Fase ${currentPhase}/5`;
    }
    phaseTitle.textContent = phaseData.title;
    phaseDescription.textContent = phaseData.desc;
    
    // Atualizar Botões
    prevBtn.disabled = currentPhase === 0;
    
    if (currentPhase === 0) {
        nextBtn.textContent = "Começar ➔";
    } else if (currentPhase === totalPhases - 1) {
        nextBtn.textContent = "Reiniciar ↺";
    } else {
        nextBtn.textContent = "Avançar Fluxo ➔";
    }
    nextBtn.disabled = false;
    
    // Atualizar Temas (Dark Mode na Fase 4 e 5)
    if (phaseData.theme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    
    // Animações das Partículas Baseadas na Fase
    animateParticles();
}

function animateParticles() {
    // Esconder AI Core and Golden Summary default
    aiCore.classList.remove('active');
    goldenSummary.classList.remove('visible');
    
    if (currentPhase === 0) {
        body.classList.add('intro-mode');
    } else {
        body.classList.remove('intro-mode');
    }
    
    particles.forEach((p, index) => {
        // Restaurar visibilidade
        p.style.opacity = '1';
        
        if (currentPhase === 0) {
            p.style.opacity = '0';
        } else if (currentPhase === 1) {
            // Fase 1: Bagunça do lado esquerdo (Seleção)
            const x = 5 + Math.random() * 15;
            const y = 15 + Math.random() * 45;
            p.style.left = `${x}%`;
            p.style.top = `${y}%`;
            p.style.transform = `scale(1) rotate(${Math.random() * 20 - 10}deg)`;
            p.textContent = sampleReviews[index % sampleReviews.length]; // Texto legível
            
        } else if (currentPhase === 2) {
            // Fase 2: Mover para o meio-esquerda, remover spam
            const x = 25 + Math.random() * 15;
            const y = 15 + Math.random() * 45;
            p.style.left = `${x}%`;
            p.style.top = `${y}%`;
            p.style.transform = `scale(0.9) rotate(0deg)`;
            
            // Simular limpeza: se for spam/emoji, esconder
            if (p.textContent.includes('🔥') || p.textContent.includes('spam') || p.textContent.includes('⭐')) {
                p.style.opacity = '0';
            } else {
                 p.textContent = p.textContent.replace(/[😡]/g, '');
            }
            
        } else if (currentPhase === 3) {
            // Fase 3: Mover para a direita, transformar em matrizes
            const x = 45 + Math.random() * 15;
            const y = 15 + Math.random() * 45;
            p.style.left = `${x}%`;
            p.style.top = `${y}%`;
            
            if (p.style.opacity !== '0') {
                // Se não foi limpado, vira vetor
                p.textContent = `[${(Math.random()).toFixed(2)}, ${(Math.random()).toFixed(2)}]`;
                p.style.transform = `scale(0.8)`;
            }
            
        } else if (currentPhase === 4) {
            // Fase 4: O Clímax da Mineração
            aiCore.classList.add('active');
            
            if (p.style.opacity !== '0') {
                // Atrair todas as partículas para a posição da Fase 4 (70% da tela)
                p.style.left = `70%`;
                p.style.top = `35%`;
                p.style.transform = `translate(-50%, -50%) scale(0.1) rotate(${Math.random() * 360}deg)`;
                
                // Desaparecer ao chegar no núcleo
                setTimeout(() => {
                    if(currentPhase === 4) p.style.opacity = '0';
                }, 1000);
            }
            
        } else if (currentPhase === 5) {
            // Fase 5: Conhecimento
            p.style.opacity = '0'; // Partículas somem
            
            setTimeout(() => {
                if(currentPhase === 5) goldenSummary.classList.add('visible');
            }, 300);
        }
    });
}

// Iniciar a aplicação
window.addEventListener('DOMContentLoaded', init);
