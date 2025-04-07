import * as React from "react";
import { createRoot } from "react-dom/client";
import { Trophy, ArrowRight, BookOpen, Brain, Lightning, Timer, CaretRight, Question, Play, House, Sun, Moon } from "@phosphor-icons/react";

// Lista de tópicos gerais para serem usados como sementes para gerar artigos
const SEED_TOPICS = [
  // História e Sociedade
  "Brasil", "História", "Guerra", "Política", "Cultura", "Sociedade", "Arte", "Literatura", 
  // Ciência e Tecnologia
  "Ciência", "Tecnologia", "Física", "Química", "Biologia", "Matemática", "Computação", 
  // Geografia e Natureza
  "Geografia", "Natureza", "Clima", "Oceano", "Continente", "Planeta", "Montanha",
  // Pessoas e Biografias
  "Cientista", "Artista", "Escritor", "Músico", "Político", "Inventor", "Filósofo",
  // Entretenimento
  "Cinema", "Música", "Teatro", "Dança", "Esporte", "Jogo", "Festival",
  // Outros
  "Alimento", "Religião", "Mitologia", "Economia", "Medicina", "Arquitetura", "Transporte"
];

// Lista de tópicos contrastantes para gerar pares mais interessantes
const CONTRASTING_TOPICS = [
  { source: ["Arte", "Música", "Literatura", "Teatro", "Dança", "Pintura"], 
    target: ["Ciência", "Tecnologia", "Matemática", "Física", "Química"] },
  { source: ["Esporte", "Futebol", "Olimpíadas", "Atletismo"],
    target: ["História", "Política", "Guerra", "Revolução"] },
  { source: ["Gastronomia", "Culinária", "Alimentos", "Bebidas"],
    target: ["Cultura", "Sociedade", "Filosofia", "Religião"] },
  { source: ["Natureza", "Biologia", "Ecologia", "Meio_ambiente"],
    target: ["Indústria", "Tecnologia", "Urbanização", "Economia"] },
  { source: ["Cinema", "Televisão", "Entretenimento", "Jogos"],
    target: ["Ciência", "Educação", "Medicina", "Pesquisa"] }
];

// Função para obter o display title e informações do artigo
const getArticleInfo = async (title) => {
  try {
    const encodedTitle = encodeURIComponent(title);
    const response = await fetch(
      `https://pt.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${encodedTitle}&prop=info|langlinks|pageprops&redirects&inprop=displaytitle`
    );
    const data = await response.json();
    
    if (data.error) return null;
    
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];
    
    // Verificar se é uma página válida
    if (pageId === '-1' || !page) return null;
    
    // Verificar se é um redirecionamento
    if (page.redirect) return null;
    
    // Verificar se tem versão em pt-pt (evitar conteúdo de Portugal)
    if (page.langlinks && page.langlinks.some(l => l.lang === 'pt')) return null;
    
    // Obter o título de exibição formatado
    let displayTitle = page.displaytitle || title;
    displayTitle = displayTitle.replace(/_/g, ' ')
                              .replace(/\u200B/g, '') // Remover zero-width spaces
                              .replace(/<[^>]*>/g, ''); // Remover tags HTML
    
    return {
      title: title,
      displayTitle: displayTitle,
      isValid: true
    };
  } catch (error) {
    console.error(`Erro ao obter informações do artigo "${title}":`, error);
    return null;
  }
};

// Função para obter links de um artigo da Wikipedia
const getWikipediaLinks = async (title) => {
  try {
    const encodedTitle = encodeURIComponent(title);
    const response = await fetch(
      `https://pt.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${encodedTitle}&prop=links|info|redirects&pllimit=500&plnamespace=0&redirects&converttitles`
    );
    const data = await response.json();
    
    if (data.error) return [];
    
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];
    
    if (!page || !page.links || pageId === '-1') return [];
    
    // Verificar se é um redirecionamento
    if (page.redirect) return [];
    
    // Filtrar links
    const validLinks = page.links
      .filter(link => {
        // Remover links especiais e namespaces
        if (link.title.includes(':') || link.title.includes('/')) return false;
        
        // Remover links para anos e datas (são muito genéricos)
        const yearPattern = /^[0-9]{1,4}$/;
        if (yearPattern.test(link.title)) return false;
        
        return true;
      });
    
    return validLinks;
  } catch (error) {
    console.error(`Erro ao obter links do artigo "${title}":`, error);
    return [];
  }
};

// Função para verificar se é possível chegar de um artigo a outro em N cliques
const checkPathPossibility = async (startArticle, endArticle, maxClicks = 5, minClicks = 2) => {
  const visited = new Set([startArticle]);
  const queue = [[startArticle, 0, [startArticle]]];
  
  while (queue.length > 0) {
    const [currentArticle, clicks, path] = queue.shift();
    
    if (clicks >= maxClicks) {
      continue;
    }
    
    const links = await getWikipediaLinks(currentArticle);
    for (const link of links) {
      if (link.title === endArticle) {
        const finalClicks = clicks + 1;
        if (finalClicks >= minClicks && finalClicks <= maxClicks) {
          return {
            possible: true,
            clicks: finalClicks,
            path: [...path, link.title]
          };
        }
      }
      
      if (!visited.has(link.title) && clicks < maxClicks - 1) {
        visited.add(link.title);
        queue.push([link.title, clicks + 1, [...path, link.title]]);
      }
    }
    
    // Limitar a quantidade de artigos visitados para não sobrecarregar
    if (visited.size > 1000) {
      break;
    }
  }
  
  return {
    possible: false,
    clicks: -1,
    path: []
  };
};

// Função para gerar um par válido de artigos mais criativo
const generateValidPair = async () => {
  const maxAttempts = 15; // Aumentado para ter mais chances de encontrar pares interessantes
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      // Escolher um par de tópicos contrastantes
      const contrastingPair = CONTRASTING_TOPICS[Math.floor(Math.random() * CONTRASTING_TOPICS.length)];
      
      // Escolher um artigo fonte e destino aleatório dos tópicos contrastantes
      const sourceTopic = contrastingPair.source[Math.floor(Math.random() * contrastingPair.source.length)];
      const targetTopic = contrastingPair.target[Math.floor(Math.random() * contrastingPair.target.length)];
      
      // Obter links para os tópicos
      const sourceLinks = await getWikipediaLinks(sourceTopic);
      const targetLinks = await getWikipediaLinks(targetTopic);
      
      if (sourceLinks.length === 0 || targetLinks.length === 0) {
        attempts++;
        continue;
      }
      
      // Escolher artigos aleatórios dos links
      const startArticle = sourceLinks[Math.floor(Math.random() * sourceLinks.length)];
      const endArticle = targetLinks[Math.floor(Math.random() * targetLinks.length)];
      
      if (!startArticle || !endArticle) {
        attempts++;
        continue;
      }
      
      // Verificar se o caminho é possível e está dentro dos limites
      const pathResult = await checkPathPossibility(startArticle.title, endArticle.title);
      
      if (pathResult.possible) {
        return {
          start: startArticle.title,
          startDisplay: startArticle.displayTitle,
          end: endArticle.title,
          endDisplay: endArticle.displayTitle,
          difficulty: pathResult.clicks <= 3 ? "easy" : pathResult.clicks === 4 ? "medium" : "hard",
          expectedClicks: pathResult.clicks
        };
      }
    } catch (error) {
      console.error("Erro ao gerar par:", error);
    }
    
    attempts++;
  }
  
  // Se falhar em gerar um par válido, usar um par de backup com links garantidos
  return {
    start: "Brasil",
    startDisplay: "Brasil",
    end: "Ciência",
    endDisplay: "Ciência",
    difficulty: "medium",
    expectedClicks: 3
  };
};

// Função para normalizar strings de títulos de artigos
const normalizeString = (str) => {
  try {
    // Decodificar URL se necessário
    let decodedStr = str;
    try {
      decodedStr = decodeURIComponent(str);
    } catch (e) {
      // Se não conseguir decodificar, usa a string original
    }
    
    // Substituir underscores por espaços
    decodedStr = decodedStr.replace(/_/g, ' ');
    
    return decodedStr;
  } catch (e) {
    return str;
  }
};

// Componentes básicos para substituir os do Spark
const Button = ({ children, variant = "default", icon, onClick, className = "", ...props }) => {
  const variants = {
    default: "btn btn-secondary",
    primary: "btn btn-primary",
    plain: "btn btn-plain"
  };

  return (
    <button 
      className={`${variants[variant] || variants.default} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
};

const Card = ({ children, className = "", ...props }) => (
  <div className={`card ${className}`} {...props}>
    {children}
  </div>
);

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button 
            onClick={() => onOpenChange(false)} 
            className="btn btn-secondary"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

const DialogContent = ({ children }) => <div>{children}</div>;
const DialogHeader = ({ children }) => <div className="modal-header">{children}</div>;
const DialogTitle = ({ children }) => <h2 className="modal-title">{children}</h2>;
const DialogDescription = ({ children }) => <div>{children}</div>;
const PageContainer = ({ children, maxWidth = "large" }) => {
  const maxWidths = {
    small: "container max-w-md",
    medium: "container max-w-2xl",
    large: "container max-w-5xl"
  };
  
  return (
    <div className={maxWidths[maxWidth]}>
      {children}
    </div>
  );
};

// Componente de animação para celebração
const Celebration = () => {
  const [confetti, setConfetti] = React.useState([]);
  const confettiColors = ['#4361ee', '#4895ef', '#7209b7', '#f72585', '#4cc9f0', '#f9c74f'];
  
  React.useEffect(() => {
    // Criar 50 confetes com posições e cores aleatórias
    const newConfetti = [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 100,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      size: 5 + Math.random() * 10,
      animationDuration: 2 + Math.random() * 2
    }));
    
    setConfetti(newConfetti);
    
    return () => {
      // Limpar áudio se necessário
    };
  }, []);

  return (
    <div className="celebration-container">
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti"
          style={{
            left: c.x + 'px',
            top: c.y + 'px',
            width: c.size + 'px',
            height: c.size + 'px',
            backgroundColor: c.color,
            animationDuration: c.animationDuration + 's'
          }}
        />
      ))}
      
      {/* Sparkles em torno do troféu */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            top: `${50 + Math.sin(i / 5 * Math.PI * 2) * 30}%`,
            left: `${50 + Math.cos(i / 5 * Math.PI * 2) * 30}%`,
            animationDelay: `${i * 0.3}s`
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [showMenu, setShowMenu] = React.useState(true);
  const [showTutorial, setShowTutorial] = React.useState(false);
  const [currentArticle, setCurrentArticle] = React.useState("");
  const [darkMode, setDarkMode] = React.useState(false);
  const [gameState, setGameState] = React.useState({
    startArticle: "",
    endArticle: "",
    clicksLeft: 5,
    path: [],
    isComplete: false,
    showCelebration: false
  });
  const [loading, setLoading] = React.useState(false);
  const [animationVisible, setAnimationVisible] = React.useState(false);
  const [showDebug, setShowDebug] = React.useState(false);
  const [debugMessage, setDebugMessage] = React.useState("");

  // Aplica o tema escuro ao documento
  React.useEffect(() => {
    // Verificar se há preferência salva no localStorage
    const savedTheme = localStorage.getItem('decaprala-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-theme');
    }
    
    // Verificar preferência do sistema se não houver tema salvo
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      if (prefersDark) document.body.classList.add('dark-theme');
    }

    // Ativar as animações após um breve delay para permitir que a página carregue
    setTimeout(() => {
      setAnimationVisible(true);
    }, 300);

    // Verificar a validez de todos os pares quando está em modo de desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      const queryParams = new URLSearchParams(window.location.search);
      if (queryParams.get('validatePairs') === 'true') {
        validateAllPairs();
      }
    }
  }, []);

  // Função para validar a existência de um artigo na Wikipedia
  const validateWikipediaArticle = async (title) => {
    try {
      const encodedTitle = encodeURIComponent(title);
      const response = await fetch(
        `https://pt-br.wikipedia.org/w/api.php?action=query&titles=${encodedTitle}&format=json&origin=*`
      );
      const data = await response.json();
      
      // Se a API retornar "missing" para a página, o artigo não existe
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      
      return !('missing' in pages[pageId]);
    } catch (error) {
      console.error(`Erro ao validar artigo "${title}":`, error);
      return false;
    }
  };

  // Função para validar um par específico
  const validatePair = async (pair) => {
    const startExists = await validateWikipediaArticle(pair.start);
    const endExists = await validateWikipediaArticle(pair.end);
    
    return {
      pair,
      startExists,
      endExists,
      isValid: startExists && endExists
    };
  };
  
  // Função para validar todos os pares (útil para desenvolvimento)
  const validateAllPairs = async () => {
    setDebugMessage("Iniciando validação de pares...");
    setShowDebug(true);
    
    const results = {
      valid: [],
      invalid: []
    };
    
    // Limitar a validação para não sobrecarregar a API
    const pairsToValidate = GAME_PAIRS.slice(0, 50); // valida apenas 50 de cada vez
    
    for (const pair of pairsToValidate) {
      const result = await validatePair(pair);
      if (result.isValid) {
        results.valid.push(pair);
      } else {
        results.invalid.push({
          pair: pair,
          startExists: result.startExists,
          endExists: result.endExists
        });
      }
      
      setDebugMessage(prev => `${prev}\nValidando: ${pair.start} -> ${pair.end} (${result.isValid ? 'Válido' : 'Inválido'})`);
    }
    
    console.log('Resultado da validação:', results);
    setDebugMessage(prev => `${prev}\n\nValidação concluída!\nPares válidos: ${results.valid.length}\nPares inválidos: ${results.invalid.length}\nVeja detalhes no console.`);
    
    return results;
  };

  // Toggle tema escuro/claro
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('decaprala-theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('decaprala-theme', 'light');
      }
      return newMode;
    });
  };

  // Função para resetar o jogo e voltar ao menu
  const resetGame = () => {
    setShowMenu(true);
    setGameState({
      startArticle: "",
      endArticle: "",
      clicksLeft: 5,
      path: [],
      isComplete: false,
      showCelebration: false
    });
    setCurrentArticle("");
  };

  // Initialize game with random pair
  const startGame = async () => {
    setLoading(true);
    try {
      const pair = await generateValidPair();
      setGameState({
        startArticle: pair.start,
        endArticle: pair.end,
        clicksLeft: 5,
        path: [{
          title: pair.start,
          displayTitle: pair.startDisplay
        }],
        isComplete: false,
        showCelebration: false
      });
      loadArticle(pair.start);
      setShowMenu(false);
    } catch (error) {
      console.error("Erro ao iniciar jogo:", error);
      // Usar um par de backup em caso de erro
      const backupPair = {
        start: "Brasil",
        end: "Ciência",
        difficulty: "medium"
      };
      setGameState({
        startArticle: backupPair.start,
        endArticle: backupPair.end,
        clicksLeft: 5,
        path: [{
          title: backupPair.start,
          displayTitle: backupPair.start
        }],
        isComplete: false,
        showCelebration: false
      });
      loadArticle(backupPair.start);
      setShowMenu(false);
    } finally {
      setLoading(false);
    }
  };

  // Function to load Wikipedia article content
  const loadArticle = async (title) => {
    setLoading(true);
    try {
      const encodedTitle = encodeURIComponent(title);
      const response = await fetch(
        `https://pt.wikipedia.org/w/api.php?action=parse&page=${encodedTitle}&format=json&origin=*&prop=text|categories|sections&redirects`
      );
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`Erro da API Wikipedia: ${data.error.info}`);
      }
      
      // Verificar se o artigo existe e não é um redirecionamento
      if (data.parse && data.parse.text) {
        // Verificar se o conteúdo indica que é uma página de redirecionamento
        const content = data.parse.text["*"];
        if (content.includes('class="redirectText"')) {
          throw new Error("Este é um redirecionamento");
        }
        setCurrentArticle(processWikiContent(content));
      } else {
        setCurrentArticle(`<div class="wiki-error">
          <h2>Artigo não encontrado</h2>
          <p>O artigo "${title}" não foi encontrado na Wikipedia em português do Brasil.</p>
          <p>Isso pode ser um erro no par de artigos. Tente iniciar um novo jogo.</p>
        </div>`);
      }
    } catch (error) {
      console.error("Error loading article:", error);
      setCurrentArticle(`<div class="wiki-error">
        <h2>Erro ao carregar artigo</h2>
        <p>Ocorreu um erro ao carregar "${title}".</p>
        <p>Se este for um redirecionamento, por favor clique em outro link.</p>
        <p>Detalhes: ${error.message}</p>
      </div>`);
    }
    setLoading(false);
  };

  // Process Wikipedia content to make links clickable and improve layout
  const processWikiContent = (content) => {
    const div = document.createElement("div");
    div.innerHTML = content;
    
    // Remove unwanted elements
    const unwanted = div.querySelectorAll('.mw-editsection, .reference, .noprint, .mw-empty-elt');
    unwanted.forEach(el => el.remove());
    
    // Convert relative links to absolute and add click handlers
    div.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/wiki/')) {
        const title = href.replace('/wiki/', '');
        // Skip files and special pages
        if (!title.includes('File:') && !title.includes('Special:')) {
          link.setAttribute('data-wiki-link', title);
          link.href = '#';
        } else {
          // Remove links to files and special pages
          link.replaceWith(...link.childNodes);
        }
      } else {
        // Remove external links
        link.replaceWith(...link.childNodes);
      }
    });
    
    return div.innerHTML;
  };

  // Handle link clicks in the article
  const handleLinkClick = async (event) => {
    const link = event.target.closest('a[data-wiki-link]');
    if (!link) return;
    
    event.preventDefault();
    const title = link.getAttribute('data-wiki-link');
    
    if (gameState.clicksLeft > 0 && !gameState.isComplete) {
      // Obter informações do artigo incluindo o displayTitle
      const articleInfo = await getArticleInfo(title);
      if (!articleInfo) return;
      
      const newPath = [...gameState.path, {
        title: articleInfo.title,
        displayTitle: articleInfo.displayTitle
      }];
      
      // Verifica se encontrou o artigo de destino
      const isComplete = checkArticleMatch(title, gameState.endArticle);
      
      setGameState(prev => ({
        ...prev,
        clicksLeft: prev.clicksLeft - 1,
        path: newPath,
        isComplete,
        showCelebration: isComplete
      }));
      
      loadArticle(title);
    }
  };

  // Função para comparar títulos de artigos de forma flexível
  const checkArticleMatch = (currentArticle, targetArticle) => {
    // Verificação exata
    if (currentArticle === targetArticle) return true;
    
    // Decodificar URLs codificadas
    let currentDecoded = currentArticle;
    let targetDecoded = targetArticle;
    
    try {
      currentDecoded = decodeURIComponent(currentArticle);
      targetDecoded = decodeURIComponent(targetArticle);
    } catch (e) {
      // Ignora erros de decodificação
    }
    
    // Se após decodificar são iguais
    if (currentDecoded === targetDecoded) return true;
    
    // Normalizar ambos os títulos (remover acentos, underscores e transformar em minúsculas)
    const normalize = (str) => {
      try {
        // Primeiro tenta decodificar se for uma string codificada em URL
        let decodedStr = str;
        try {
          decodedStr = decodeURIComponent(str);
        } catch (e) {
          // Se não conseguir decodificar, ignora e usa a string original
        }
        
        return decodedStr
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')  // remove acentos
          .replace(/_/g, ' ')               // substitui underscores por espaços
          .toLowerCase()                    // converte para minúsculas
          .trim();                          // remove espaços extras
      } catch (e) {
        // Em caso de erro, retorna uma versão simplificada
        return str
          .replace(/_/g, ' ')
          .toLowerCase()
          .trim();
      }
    };
    
    const normalizedCurrent = normalize(currentArticle);
    const normalizedTarget = normalize(targetArticle);
    
    // Verificação normalizada (sem acentos, sem underscores, minúsculas)
    if (normalizedCurrent === normalizedTarget) return true;
    
    // Verificação apenas sem o underscore (mantendo acentos)
    const simpleNormalize = (str) => {
      try {
        let decodedStr = str;
        try {
          decodedStr = decodeURIComponent(str);
        } catch (e) {
          // Ignora erros
        }
        return decodedStr.replace(/_/g, ' ').toLowerCase().trim();
      } catch (e) {
        return str.replace(/_/g, ' ').toLowerCase().trim();
      }
    };
    
    const simpleCurrentNormalized = simpleNormalize(currentArticle);
    const simpleTargetNormalized = simpleNormalize(targetArticle);
    
    // Verificação apenas com espaços e minúsculas (mantendo acentos)
    if (simpleCurrentNormalized === simpleTargetNormalized) return true;
    
    // Lista de variações conhecidas para artigos específicos
    const articleVariations = {
      'harald_bluetooth': ['haroldo_i_bluetooth', 'haroldo_bluetooth', 'haroldo_i_da_dinamarca', 'harald_i_bluetooth'],
      'albert_einstein': ['einstein', 'albert_eintein'],
      'segunda_guerra_mundial': ['2ª_guerra_mundial', 'ii_guerra_mundial', 'segunda_guerra', '2a_guerra_mundial'],
      'primeira_guerra_mundial': ['1ª_guerra_mundial', 'i_guerra_mundial', 'primeira_guerra', '1a_guerra_mundial'],
      'revolução_industrial': ['industria', 'industrializacao', 'industrialização', 'revolucao_industrial'],
      'reino_unido': ['inglaterra', 'gra_bretanha', 'grã_bretanha', 'great_britain'],
      'mudanças_climáticas': ['aquecimento_global', 'mudanca_climatica', 'crise_climatica'],
      'escocia': ['escócia', 'scotland', 'reino_da_escócia'],
      'leonardo_da_vinci': ['da_vinci', 'leonardo'],
      'inteligência_artificial': ['ia', 'ai', 'inteligencia_artificial'],
      'estados_unidos': ['eua', 'america', 'américa', 'usa', 'united_states'],
      'jogos_olímpicos': ['jogos_olimpicos', 'olimpíadas', 'olimpiadas'],
      'filosofia_grega': ['filosofia_da_grecia_antiga', 'filosofos_gregos'],
      'egito_antigo': ['antigo_egito', 'civilização_egípcia', 'civilizacao_egipcia'],
      'grécia_antiga': ['grecia_antiga', 'antiga_grécia', 'antiga_grecia'],
      'revolução_francesa': ['revolucao_francesa', 'revolucao_francesa'],
      'máquina_de_lavar': ['maquina_de_lavar', 'maquina_de_lavar_roupa', 'máquina_de_lavar_roupa', 'lavadora'],
      'imóveis': ['imoveis'],
      'música': ['musica'],
      'política': ['politica'],
      'história': ['historia'],
      'méxico': ['mexico'],
      'matemática': ['matematica'],
      'física': ['fisica'],
      'química': ['quimica'],
      'biologia': ['biologia'],
      'japão': ['japao'],
      'alemanha': ['alemanha'],
      'frança': ['franca'],
      'espanha': ['espanha'],
      'itália': ['italia'],
      'ciência': ['ciencia']
    };
    
    // Verificar se há correspondência em variações conhecidas
    for (const [base, variations] of Object.entries(articleVariations)) {
      if (normalize(base) === normalizedTarget && variations.some(v => normalize(v) === normalizedCurrent)) {
        return true;
      }
      if (normalize(base) === normalizedCurrent && variations.some(v => normalize(v) === normalizedTarget)) {
        return true;
      }
    }
    
    // Verificar correspondência com caracteres codificados em URL
    const checkURLEncoded = (str1, str2) => {
      try {
        if (decodeURIComponent(str1).replace(/_/g, ' ').toLowerCase() === 
            decodeURIComponent(str2).replace(/_/g, ' ').toLowerCase()) {
          return true;
        }
      } catch (e) {
        // Ignora erros de decodificação
      }
      return false;
    };
    
    if (checkURLEncoded(currentArticle, targetArticle)) return true;
    
    // Verificar se um é parte significativa do outro (para casos como "Platão" vs "Filosofia_de_Platão")
    if ((normalizedCurrent.includes(normalizedTarget) && normalizedTarget.length > 5) || 
        (normalizedTarget.includes(normalizedCurrent) && normalizedCurrent.length > 5)) {
      return true;
    }
    
    return false;
  };

  // Componente para o botão de alternância de tema
  const ThemeToggle = () => (
    <div className="theme-switch">
      <button 
        className="theme-switch-button animate-wiggle" 
        onClick={toggleDarkMode} 
        aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
      >
        {darkMode ? <Sun size={24} weight="bold" /> : <Moon size={24} weight="bold" />}
      </button>
    </div>
  );

  if (showMenu) {
    return (
      <div className="app-container">
        <ThemeToggle />
        <PageContainer maxWidth="small">
          <div className="py-12">
            <Card className={`menu-card p-8 ${animationVisible ? 'animate-entrance' : ''}`}>
              <div className="flex flex-col items-center gap-8 text-center">
                <h1 className={`fancy-title ${animationVisible ? 'animate-title' : ''}`}>5CLIQUES</h1>
                <p className={`text-lg text-gray-700 ${animationVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
                  Conecte dois artigos aleatórios da Wikipedia em 5 cliques ou menos!
                </p>
                
                <div className="flex flex-col gap-4 w-full max-w-sm">
                  <Button
                    variant="primary"
                    icon={<Play />}
                    onClick={startGame}
                    className={`btn-large btn-block ${animationVisible ? 'animate-slide-up animate-wiggle' : 'opacity-0'}`}
                    style={{animationDelay: '0.7s'}}
                  >
                    Jogar
                  </Button>
                  <Button
                    icon={<Question />}
                    onClick={() => setShowTutorial(true)}
                    className={`btn-block ${animationVisible ? 'animate-slide-up' : 'opacity-0'}`}
                    style={{animationDelay: '0.9s'}}
                  >
                    Como Jogar
                  </Button>
                </div>
                
                <div className={`creator-info ${animationVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '1.3s'}}>
                  <p>Desenvolvido por David Silva</p>
                  <a href="mailto:davosalm@gmail.com" className="creator-email">
                    davosalm@gmail.com
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </PageContainer>

        <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Como Jogar</DialogTitle>
              <DialogDescription>
                <div className="space-y-4">
                  <p className="flex items-center gap-2 mb-3 animate-slide-in" style={{animationDelay: '0.1s'}}>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-bold">1</span>
                    Você receberá dois artigos aleatórios da Wikipedia: um inicial e um final
                  </p>
                  <p className="flex items-center gap-2 mb-3 animate-slide-in" style={{animationDelay: '0.2s'}}>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-bold">2</span>
                    Navegue pelos links dentro dos artigos para chegar ao artigo final
                  </p>
                  <p className="flex items-center gap-2 mb-3 animate-slide-in" style={{animationDelay: '0.3s'}}>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-bold">3</span>
                    Você tem apenas 5 cliques para completar o desafio
                  </p>
                  <p className="flex items-center gap-2 mb-3 animate-slide-in" style={{animationDelay: '0.4s'}}>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-bold">4</span>
                    Escolha seus cliques com sabedoria para criar um caminho entre os artigos!
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="app-container">
      <ThemeToggle />
      {gameState.showCelebration && <Celebration />}
      {showDebug && (
        <div className="debug-panel">
          <h3>Painel de Debug</h3>
          <pre>{debugMessage}</pre>
          <button onClick={() => setShowDebug(false)} className="btn btn-sm">Fechar</button>
        </div>
      )}
      <PageContainer maxWidth="large">
        <div className="py-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="plain"
                  icon={<House size={24} />}
                  onClick={resetGame}
                  aria-label="Voltar ao menu"
                />
                <h1 className="text-2xl font-bold">5CLIQUES</h1>
              </div>
              <div className="game-stats">
                <Timer size={20} weight="bold" className="text-primary" />
                <span className="font-medium">
                  Cliques restantes: <strong>{gameState.clicksLeft}</strong>
                </span>
              </div>
            </div>
            
            {/* Path visualization - com tratamento para URLs codificadas */}
            <div className="path-container">
              <div className="flex items-center gap-2 flex-nowrap min-w-max">
                {gameState.path.map((article, index) => (
                  <React.Fragment key={index}>
                    <span className="path-item" style={{animationDelay: `${index * 0.1}s`}}>
                      {typeof article === 'string' ? normalizeString(article) : article.displayTitle}
                    </span>
                    {index < gameState.path.length - 1 && (
                      <CaretRight size={20} className="path-arrow" style={{animationDelay: `${index * 0.1 + 0.05}s`}} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="game-info">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 badge">
                  <BookOpen size={20} weight="bold" className="text-primary" />
                  <span>De: <strong>{normalizeString(gameState.startArticle)}</strong></span>
                </div>
                <ArrowRight size={20} className="text-gray-700" />
                <div className="flex items-center gap-2 badge">
                  <Brain size={20} weight="bold" className="text-secondary" />
                  <span>Para: <strong>{normalizeString(gameState.endArticle)}</strong></span>
                </div>
              </div>
              
              <Button 
                variant="primary"
                icon={<Lightning size={20} weight="bold" />}
                onClick={startGame}
              >
                Novo Jogo
              </Button>
            </div>

            {gameState.isComplete && (
              <div className="game-alert game-alert-success">
                <div className="trophy-celebration">
                  <Trophy size={32} weight="fill" className="text-yellow-500" />
                </div>
                <span className="victory-text">
                  Parabéns! Você conseguiu chegar ao destino em <strong>{5 - gameState.clicksLeft}</strong> cliques!
                </span>
              </div>
            )}

            {gameState.clicksLeft === 0 && !gameState.isComplete && (
              <div className="game-alert game-alert-warning">
                <span className="text-warning font-medium">
                  Acabaram seus cliques! Tente novamente com um novo par de artigos.
                </span>
              </div>
            )}

            <Card className="wiki-content" onClick={handleLinkClick}>
              {loading ? (
                <div className="loader">
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: currentArticle }} />
              )}
            </Card>
          </Card>
        </div>
      </PageContainer>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
