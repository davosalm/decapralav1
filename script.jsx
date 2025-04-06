import * as React from "react";
import { createRoot } from "react-dom/client";
import { Trophy, ArrowRight, BookOpen, Brain, Lightning, Timer, CaretRight, Question, Play, House, Sun, Moon } from "@phosphor-icons/react";

const GAME_PAIRS = [
  { start: "Neymar", end: "Albert_Einstein" },
  { start: "Açaí", end: "Revolução_Industrial" },
  { start: "Futebol", end: "Filosofia" },
  { start: "Carnaval", end: "Física_Quântica" },
  { start: "Samba", end: "Inteligência_Artificial" },
  { start: "Pelé", end: "Segunda_Guerra_Mundial" },
  { start: "Amazonas", end: "Teoria_da_Relatividade" },
  { start: "Bossa_Nova", end: "Napoleão_Bonaparte" },
  { start: "Feijoada", end: "Revolução_Francesa" },
  { start: "Copacabana", end: "Leonardo_da_Vinci" },
  { start: "Capoeira", end: "Revolução_Russa" },
  { start: "Ipanema", end: "Charles_Darwin" },
  { start: "Saci_Pererê", end: "William_Shakespeare" },
  { start: "Guaraná", end: "Pablo_Picasso" },
  { start: "Cristo_Redentor", end: "Stephen_Hawking" },
  { start: "São_Paulo", end: "Platão" },
  { start: "Rio_de_Janeiro", end: "Isaac_Newton" },
  { start: "Santos_Dumont", end: "Teoria_da_Evolução" },
  { start: "Pantanal", end: "Vincent_van_Gogh" },
  { start: "Maracanaã", end: "Marie_Curie" },
  { start: "Carmen_Miranda", end: "Sigmund_Freud" },
  { start: "Tom_Jobim", end: "Galileu_Galilei" },
  { start: "Anitta", end: "Aristóteles" },
  { start: "Machado_de_Assis", end: "Revolução_Chinesa" },
  { start: "Cachaça", end: "Guerra_Fria" },
  { start: "Brigadeiro", end: "Revolução_Industrial" },
  { start: "Índios", end: "Primeira_Guerra_Mundial" },
  { start: "Xuxa", end: "Nikola_Tesla" },
  { start: "Roberto_Carlos", end: "Ludwig_van_Beethoven" },
  { start: "Chico_Buarque", end: "Karl_Marx" },
  { start: "Zico", end: "Thomas_Edison" },
  { start: "Ayrton_Senna", end: "René_Descartes" },
  { start: "Oscar_Niemeyer", end: "Michelangelo" },
  { start: "Tarsila_do_Amaral", end: "Salvador_Dalí" },
  { start: "Garrincha", end: "Johannes_Gutenberg" },
  { start: "Embraer", end: "Revolução_Digital" },
  { start: "Petrobras", end: "Bill_Gates" },
  { start: "Vale", end: "Steve_Jobs" },
  { start: "Banco_do_Brasil", end: "Mark_Zuckerberg" },
  { start: "Itaú", end: "Jeff_Bezos" },
  { start: "Bradesco", end: "Elon_Musk" },
  { start: "Casas_Bahia", end: "Tim_Berners-Lee" },
  { start: "Magazine_Luiza", end: "Ada_Lovelace" },
  { start: "Natura", end: "Charles_Babbage" },
  { start: "O_Boticário", end: "Alan_Turing" },
  { start: "Havaianas", end: "Revolução_Industrial" },
  { start: "Globo", end: "Guerra_do_Vietnã" },
  { start: "Record", end: "Guerra_da_Coreia" },
  { start: "SBT", end: "Guerra_Fria" },
  { start: "Silvio_Santos", end: "Winston_Churchill" },
  { start: "Faustão", end: "Franklin_D._Roosevelt" },
  { start: "Gugu", end: "John_F._Kennedy" },
  { start: "Ana_Maria_Braga", end: "Margaret_Thatcher" },
  { start: "Hebe_Camargo", end: "Rainha_Elizabeth_II" },
  { start: "Chacrinha", end: "Mahatma_Gandhi" },
  { start: "Jô_Soares", end: "Nelson_Mandela" },
  { start: "Paulo_Coelho", end: "Jorge_Luis_Borges" },
  { start: "Clarice_Lispector", end: "Virginia_Woolf" },
  { start: "Jorge_Amado", end: "Gabriel_García_Márquez" },
  { start: "Graciliano_Ramos", end: "Ernest_Hemingway" },
  { start: "Carlos_Drummond_de_Andrade", end: "Pablo_Neruda" },
  { start: "Vinícius_de_Moraes", end: "Federico_García_Lorca" },
  { start: "Cecília_Meireles", end: "Emily_Dickinson" },
  { start: "Manuel_Bandeira", end: "Fernando_Pessoa" },
  { start: "João_Cabral_de_Melo_Neto", end: "T._S._Eliot" },
  { start: "Mário_de_Andrade", end: "James_Joyce" },
  { start: "Oswald_de_Andrade", end: "Marcel_Proust" },
  { start: "Lima_Barreto", end: "Charles_Dickens" },
  { start: "Euclides_da_Cunha", end: "Victor_Hugo" },
  { start: "Guimarães_Rosa", end: "Fiódor_Dostoiévski" },
  { start: "José_de_Alencar", end: "Miguel_de_Cervantes" },
  { start: "Joaquim_Nabuco", end: "Jean-Jacques_Rousseau" },
  { start: "Rui_Barbosa", end: "Voltaire" },
  { start: "Dom_Pedro_II", end: "Napoleão_Bonaparte" }
];

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
    isComplete: false
  });
  const [loading, setLoading] = React.useState(false);

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
  }, []);

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

  // Initialize game with random pair
  const startGame = () => {
    const randomPair = GAME_PAIRS[Math.floor(Math.random() * GAME_PAIRS.length)];
    setGameState({
      startArticle: randomPair.start,
      endArticle: randomPair.end,
      clicksLeft: 5,
      path: [randomPair.start],
      isComplete: false
    });
    loadArticle(randomPair.start);
    setShowMenu(false);
  };

  // Function to load Wikipedia article content
  const loadArticle = async (title) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pt.wikipedia.org/w/api.php?action=parse&page=${title}&format=json&origin=*&prop=text|categories|sections`
      );
      const data = await response.json();
      if (data.parse && data.parse.text) {
        const content = data.parse.text["*"];
        setCurrentArticle(processWikiContent(content));
      }
    } catch (error) {
      console.error("Error loading article:", error);
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
  const handleLinkClick = (event) => {
    const link = event.target.closest('a[data-wiki-link]');
    if (!link) return;
    
    event.preventDefault();
    const title = link.getAttribute('data-wiki-link');
    
    if (gameState.clicksLeft > 0 && !gameState.isComplete) {
      const newPath = [...gameState.path, title];
      const isComplete = title === gameState.endArticle;
      
      setGameState(prev => ({
        ...prev,
        clicksLeft: prev.clicksLeft - 1,
        path: newPath,
        isComplete
      }));
      
      loadArticle(title);
    }
  };

  // Reset game with a new random pair
  const resetGame = () => {
    setShowMenu(true);
  };

  // Componente para o botão de alternância de tema
  const ThemeToggle = () => (
    <div className="theme-switch">
      <button 
        className="theme-switch-button" 
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
            <Card className="menu-card p-8">
              <div className="flex flex-col items-center gap-8 text-center">
                <h1 className="fancy-title">5CLIQUES</h1>
                <p className="text-lg text-gray-700">
                  Conecte dois artigos da Wikipedia em 5 cliques ou menos!
                </p>
                <div className="flex flex-col gap-4 w-full max-w-sm">
                  <Button
                    variant="primary"
                    icon={<Play />}
                    onClick={startGame}
                    className="btn-large btn-block"
                  >
                    Jogar
                  </Button>
                  <Button
                    icon={<Question />}
                    onClick={() => setShowTutorial(true)}
                    className="btn-block"
                  >
                    Como Jogar
                  </Button>
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
                  <p className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-bold">1</span>
                    Você receberá dois artigos da Wikipedia: um inicial e um final
                  </p>
                  <p className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-bold">2</span>
                    Navegue pelos links dentro dos artigos para chegar ao artigo final
                  </p>
                  <p className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-bold">3</span>
                    Você tem apenas 5 cliques para completar o desafio
                  </p>
                  <p className="flex items-center gap-2 mb-3">
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
                <h1 className="text-2xl font-bold">De cá pra lá</h1>
              </div>
              <div className="game-stats">
                <Timer size={20} weight="bold" className="text-primary" />
                <span className="font-medium">
                  Cliques restantes: <strong>{gameState.clicksLeft}</strong>
                </span>
              </div>
            </div>
            
            {/* Path visualization */}
            <div className="path-container">
              <div className="flex items-center gap-2 flex-nowrap min-w-max">
                {gameState.path.map((article, index) => (
                  <React.Fragment key={index}>
                    <span className="path-item" style={{animationDelay: `${index * 0.1}s`}}>
                      {article.replace(/_/g, ' ')}
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
                  <span>De: <strong>{gameState.startArticle.replace(/_/g, ' ')}</strong></span>
                </div>
                <ArrowRight size={20} className="text-gray-700" />
                <div className="flex items-center gap-2 badge">
                  <Brain size={20} weight="bold" className="text-secondary" />
                  <span>Para: <strong>{gameState.endArticle.replace(/_/g, ' ')}</strong></span>
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
                <Trophy size={24} weight="fill" className="text-yellow-500" />
                <span className="text-green-700 font-medium">
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
