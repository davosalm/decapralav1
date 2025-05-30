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

// Lista de tópicos iniciais mais específicos para garantir artigos interessantes
const INITIAL_TOPICS = [
  // Cultura Brasileira
  "Carnaval", "Samba", "Bossa_Nova", "Capoeira", "Feijoada", "Festa_Junina",
  "Novela_brasileira", "MPB", "Literatura_do_Brasil", "Cinema_do_Brasil",
  
  // Personalidades Brasileiras
  "Santos_Dumont", "Machado_de_Assis", "Villa-Lobos", "Carmen_Miranda",
  "Ayrton_Senna", "Oscar_Niemeyer", "Portinari", "Paulo_Freire", "Pelé",
  
  // Lugares e Geografia
  "Rio_de_Janeiro", "São_Paulo", "Salvador", "Amazônia", "Pantanal",
  "Cristo_Redentor", "Pão_de_Açúcar", "Cataratas_do_Iguaçu", "Fernando_de_Noronha",
  
  // História do Brasil
  "Independência_do_Brasil", "Proclamação_da_República_do_Brasil",
  "Ditadura_militar_no_Brasil", "Império_do_Brasil", "Getúlio_Vargas",
  
  // Cultura Pop Internacional
  "Star_Wars", "Harry_Potter", "O_Senhor_dos_Anéis", "Game_of_Thrones",
  "Marvel_Comics", "Disney", "Beatles", "Michael_Jackson",
  
  // Ciência e Tecnologia
  "Albert_Einstein", "Stephen_Hawking", "Charles_Darwin", "Marie_Curie",
  "Nikola_Tesla", "Internet", "Computador", "Inteligência_artificial",
  
  // Arte e História Mundial
  "Leonardo_da_Vinci", "Pablo_Picasso", "Vincent_van_Gogh", "Frida_Kahlo",
  "Segunda_Guerra_Mundial", "Primeira_Guerra_Mundial", "Revolução_Industrial",
  
  // Esportes
  "Copa_do_Mundo_FIFA", "Jogos_Olímpicos", "Seleção_Brasileira_de_Futebol",
  "Vasco_da_Gama", "Flamengo", "Corinthians", "São_Paulo_FC", "Santos_FC"
];

// Função para obter o display title e informações do artigo com tratamento especial para acentuação
const getArticleInfo = async (title) => {
  try {
    const encodedTitle = encodeURIComponent(title);
    const response = await fetch(
      `https://pt.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${encodedTitle}&prop=text|displaytitle&redirects&uselang=pt-br`
    );
    const data = await response.json();
    
    if (data.error) return null;
    
    if (!data.parse) return null;
    
    // Extrair o título real do artigo do HTML e preservar acentuação
    const div = document.createElement('div');
    div.innerHTML = data.parse.displaytitle;
    const displayTitle = div.textContent || div.innerText || title;
    
    // Verificar se é um redirecionamento
    const isRedirect = data.parse.text && data.parse.text["*"] && 
                      data.parse.text["*"].includes('class="redirectText"');
    
    return {
      title: title,
      displayTitle: displayTitle,
      isRedirect: isRedirect,
      isValid: true
    };
  } catch (error) {
    console.error(`Erro ao obter informações do artigo "${title}":`, error);
    return null;
  }
};

// Função para normalizar strings para comparação (removendo acentos e caracteres especiais)
const normalizeStringForComparison = (str) => {
  if (!str) return '';
  
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
    
    // Remover parênteses e seu conteúdo
    decodedStr = decodedStr.replace(/\s*\([^)]*\)/g, '');
    
    // Converter para minúsculas
    decodedStr = decodedStr.toLowerCase();
    
    // Remover espaços extras
    decodedStr = decodedStr.trim();
    
    return decodedStr;
  } catch (e) {
    console.error('Erro ao normalizar string:', e);
    return str.toLowerCase().trim();
  }
};

// Função para comparar títulos de artigos preservando acentuação
const checkArticleMatch = (currentArticleTitle, targetArticleTitle) => {
  try {
    // Se algum dos títulos é nulo ou indefinido, retornar falso
    if (!currentArticleTitle || !targetArticleTitle) {
      return false;
    }
    
    // Remover espaços extras e converter para minúsculas (preservando acentos)
    const current = currentArticleTitle.toLowerCase().trim();
    const target = targetArticleTitle.toLowerCase().trim();
    
    console.log("Comparando artigos:");
    console.log("- Atual:", current);
    console.log("- Alvo:", target);
    
    // Verificar correspondência exata (preservando acentuação)
    if (current === target) {
      console.log("✓ Correspondência exata");
      return true;
    }
    
    // Verificar após remover underscores ou substituir por espaços
    const currentNoUnderscore = current.replace(/_/g, ' ');
    const targetNoUnderscore = target.replace(/_/g, ' ');
    
    if (currentNoUnderscore === targetNoUnderscore) {
      console.log("✓ Correspondência após normalizar underscores");
      return true;
    }
    
    // Verificar após remover parênteses e conteúdo entre parênteses
    const currentNoParentheses = currentNoUnderscore.replace(/\s*\([^)]*\)/g, '').trim();
    const targetNoParentheses = targetNoUnderscore.replace(/\s*\([^)]*\)/g, '').trim();
    
    if (currentNoParentheses === targetNoParentheses) {
      console.log("✓ Correspondência após remover parênteses");
      return true;
    }
    
    console.log("✗ Nenhuma correspondência encontrada");
    return false;
  } catch (e) {
    console.error("Erro na comparação de artigos:", e);
    return false;
  }
};

// Função para obter links de um artigo da Wikipedia com tratamento melhorado
const getWikipediaLinks = async (title) => {
  try {
    const encodedTitle = encodeURIComponent(title);
    const response = await fetch(
      `https://pt.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${encodedTitle}&prop=links|info&pllimit=500&plnamespace=0&redirects&uselang=pt-br`
    );
    const data = await response.json();
    
    if (data.error) return [];
    
    const pages = data.query.pages;
    if (!pages) return [];
    
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];
    
    if (!page || !page.links || pageId === '-1') return [];
    
    // Filtrar links úteis
    const filteredLinks = page.links
      .filter(link => {
        // Remover links especiais e namespaces
        if (!link.title || link.title.includes(':') || link.title.includes('/')) return false;
        
        // Remover links para anos e datas (são muito genéricos)
        const yearPattern = /^[0-9]{1,4}$/;
        if (yearPattern.test(link.title)) return false;
        
        return true;
      })
      .map(link => ({ title: link.title }));
    
    // Obter displayTitle para os primeiros 50 links (para não sobrecarregar)
    const linksWithDisplayTitle = await Promise.all(
      filteredLinks.slice(0, 50).map(async link => {
        try {
          const info = await getArticleInfo(link.title);
          return info;
        } catch (e) {
          return null;
        }
      })
    );
    
    return linksWithDisplayTitle.filter(link => link !== null);
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

// Função melhorada para gerar pares válidos, com foco em tópicos do Brasil
const generateValidPair = async () => {
  const maxAttempts = 10;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      // Escolher um tema brasileiro ou popular para o artigo inicial
      const startTopic = INITIAL_TOPICS[Math.floor(Math.random() * INITIAL_TOPICS.length)];
      
      // Obter informações do artigo inicial
      const startInfo = await getArticleInfo(startTopic);
      if (!startInfo) {
        attempts++;
        continue;
      }
      
      console.log(`Tentativa ${attempts+1}: Artigo inicial: ${startInfo.displayTitle}`);
      
      // Obter links do artigo inicial
      const initialLinks = await getWikipediaLinks(startTopic);
      if (initialLinks.length < 5) {
        attempts++;
        continue;
      }
      
      // Escolher um artigo aleatório dos links do artigo inicial
      const randomLinkIndex = Math.floor(Math.random() * initialLinks.length);
      const randomLink = initialLinks[randomLinkIndex];
      
      if (!randomLink) {
        attempts++;
        continue;
      }
      
      console.log(`Artigo intermediário: ${randomLink.displayTitle}`);
      
      // Obter links do artigo intermediário
      const secondLevelLinks = await getWikipediaLinks(randomLink.title);
      if (secondLevelLinks.length < 5) {
        attempts++;
        continue;
      }
      
      // Escolher um artigo final aleatório
      const endArticleIndex = Math.floor(Math.random() * secondLevelLinks.length);
      const endArticle = secondLevelLinks[endArticleIndex];
      
      if (!endArticle) {
        attempts++;
        continue;
      }
      
      console.log(`Verificando caminho de "${startInfo.displayTitle}" para "${endArticle.displayTitle}"`);
      
      // Verificar se o caminho é possível
      const pathResult = await checkPathPossibility(startInfo.title, endArticle.title);
      
      if (pathResult.possible && pathResult.clicks >= 2 && pathResult.clicks <= 5) {
        console.log(`Caminho encontrado! Cliques: ${pathResult.clicks}`);
        return {
          start: startInfo.title,
          startDisplay: startInfo.displayTitle,
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
  
  // Se falhar em gerar um par válido, usar pares de backup
  const backupPairs = [
    {
      start: "Santos_Dumont",
      startDisplay: "Santos Dumont",
      end: "Aviação",
      endDisplay: "Aviação",
      difficulty: "easy",
      expectedClicks: 2
    },
    {
      start: "Pelé",
      startDisplay: "Pelé",
      end: "Futebol",
      endDisplay: "Futebol",
      difficulty: "easy",
      expectedClicks: 1
    },
    {
      start: "Rio_de_Janeiro",
      startDisplay: "Rio de Janeiro",
      end: "Carnaval",
      endDisplay: "Carnaval",
      difficulty: "easy",
      expectedClicks: 1
    }
  ];
  
  const randomBackupPair = backupPairs[Math.floor(Math.random() * backupPairs.length)];
  console.log("Usando par de backup:", randomBackupPair);
  return randomBackupPair;
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

// Function to load Wikipedia article content
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
    startDisplay: "",
    endArticle: "",
    endDisplay: "",
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
      startDisplay: "",
      endArticle: "",
      endDisplay: "",
      clicksLeft: 5,
      path: [],
      isComplete: false,
      showCelebration: false
    });
    setCurrentArticle("");
  };

  // Function to load Wikipedia article content
  const loadArticle = async (title) => {
    setLoading(true);
    try {
      const encodedTitle = encodeURIComponent(title);
      const response = await fetch(
        `https://pt.wikipedia.org/w/api.php?action=parse&page=${encodedTitle}&format=json&origin=*&prop=text|displaytitle|categories|langlinks&redirects&uselang=pt-br`
      );
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`Erro da API Wikipedia: ${data.error.info}`);
      }
      
      if (data.parse) {
        // Verificar se tem versão em pt-pt
        const hasPortugalVersion = data.parse.langlinks?.some(link => link.lang === 'pt');
        if (hasPortugalVersion) {
          throw new Error("Este artigo tem uma versão específica para português de Portugal");
        }
        
        // Verificar se o conteúdo indica que é uma página de redirecionamento
        const content = data.parse.text["*"];
        if (content.includes('class="redirectText"')) {
          setCurrentArticle(`<div class="wiki-redirect-notice">
            <h2>Esta é uma página de redirecionamento</h2>
            <p>Este clique não será contabilizado. Por favor, clique em outro link para continuar.</p>
          </div>
          ${processWikiContent(content)}`);
          
          // Importante: Não atualizamos o gameState aqui, pois não queremos contar este clique
          return true; // Retornamos true para indicar que é um redirecionamento
        }
        
        setCurrentArticle(processWikiContent(content));
        return false; // Não é um redirecionamento
      } else {
        throw new Error("Artigo não encontrado");
      }
    } catch (error) {
      console.error("Error loading article:", error);
      setCurrentArticle(`<div class="wiki-error">
        <h2>Erro ao carregar artigo</h2>
        <p>Ocorreu um erro ao carregar "${title}".</p>
        <p>Detalhes: ${error.message}</p>
        <p>Por favor, tente outro link ou inicie um novo jogo.</p>
      </div>`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Modificações no componente para atualizar o caminho do usuário sem penalizar redirecionamentos
  const handleLinkClick = async (event) => {
    const link = event.target.closest('a[data-wiki-link]');
    if (!link) return;
    
    event.preventDefault();
    const title = link.getAttribute('data-wiki-link');
    
    if (gameState.clicksLeft > 0 && !gameState.isComplete) {
      // Obter informações do artigo incluindo o displayTitle
      const articleInfo = await getArticleInfo(title);
      if (!articleInfo) return;
      
      // Se for um redirecionamento, não contabilizar o clique
      if (articleInfo.isRedirect) {
        // Apenas carregar o artigo sem decrementar o contador
        loadArticle(title);
        return;
      }
      
      // Atualizar caminho apenas internamente
      const newPath = [...gameState.path, {
        title: articleInfo.title,
        displayTitle: articleInfo.displayTitle
      }];
      
      // Verifica se encontrou o artigo de destino usando a função melhorada
      const isComplete = checkArticleMatch(articleInfo.displayTitle, gameState.endDisplay);
      
      setGameState(prev => ({
        ...prev,
        clicksLeft: prev.clicksLeft - 1,
        path: newPath,
        isComplete,
        showCelebration: isComplete
      }));
      
      const isRedirect = await loadArticle(title);
      
      // Se for redirecionamento, restaurar o contador (já que loadArticle já exibe o artigo)
      if (isRedirect) {
        setGameState(prev => ({
          ...prev,
          clicksLeft: prev.clicksLeft + 1 // Restaurar o clique
        }));
      }
    }
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

  // Iniciar um novo jogo
  const startGame = async () => {
    setLoading(true);
    try {
      const pair = await generateValidPair();
      
      setGameState({
        startArticle: pair.start,
        startDisplay: pair.startDisplay,
        endArticle: pair.end,
        endDisplay: pair.endDisplay,
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
        startDisplay: "Brasil",
        end: "Ciência",
        endDisplay: "Ciência",
        difficulty: "medium"
      };
      
      setGameState({
        startArticle: backupPair.start,
        startDisplay: backupPair.startDisplay,
        endArticle: backupPair.end,
        endDisplay: backupPair.endDisplay,
        clicksLeft: 5,
        path: [{
          title: backupPair.start,
          displayTitle: backupPair.startDisplay
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
              
              {/* Contador de cliques destacado */}
              <div className="clicks-counter">
                <div className="clicks-counter-inner">
                  <div className="clicks-number">{gameState.clicksLeft}</div>
                  <div className="clicks-label">Cliques<br/>restantes</div>
                </div>
              </div>
            </div>
            
            {/* Removido o componente de visualização do caminho */}

            <div className="game-info">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 badge">
                  <BookOpen size={20} weight="bold" className="text-primary" />
                  <span>De: <strong>{gameState.startDisplay || gameState.startArticle}</strong></span>
                </div>
                <ArrowRight size={20} className="text-gray-700" />
                <div className="flex items-center gap-2 badge">
                  <Brain size={20} weight="bold" className="text-secondary" />
                  <span>Para: <strong>{gameState.endDisplay || gameState.endArticle}</strong></span>
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
