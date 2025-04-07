// Lista de tópicos para gerar pares de artigos mais interessantes
const INITIAL_TOPICS = {
  facil: [
    // Tópicos extremamente populares com muitas conexões
    "Brasil", "Futebol", "Música", "Internet", "Cinema", "História", "Geografia",
    "Rio_de_Janeiro", "São_Paulo", "Televisão", "Cultura_popular", "Esporte",
    "Copa_do_Mundo", "Ciência", "Tecnologia", "YouTube", "Facebook", "Jogos_eletrônicos",
    "Instagram", "Política", "Carnaval", "Pizza", "Cerveja", "Chocolate", 
    "Neymar", "Pelé", "Roberto_Carlos", "Michael_Jackson", "iPhone", "Google",
    "Amazon", "Netflix", "McDonald's", "Coca-Cola", "Santos_Dumont", "Olimpíadas",
    "Samba", "Novela", "Carro", "Avião", "Praia", "Escola"
  ],
  medio: [
    // Cultura Brasileira
    "Carnaval", "Samba", "Bossa_Nova", "Capoeira", "Feijoada", "Festa_Junina",
    "Novela_brasileira", "MPB", "Literatura_do_Brasil", "Cinema_do_Brasil",
    
    // Personalidades Brasileiras e Internacionais conhecidas
    "Santos_Dumont", "Machado_de_Assis", "Carmen_Miranda",
    "Ayrton_Senna", "Oscar_Niemeyer", "Pelé", "Silvio_Santos", "Xuxa",
    "Gisele_Bündchen", "Paulo_Coelho", "Lula", "Tom_Jobim", "Elon_Musk", 
    "Steve_Jobs", "Bill_Gates", "Barack_Obama", "Elvis_Presley", "Madonna",
    
    // Lugares e Geografia populares
    "Rio_de_Janeiro", "São_Paulo", "Salvador", "Amazônia", "Pantanal",
    "Cristo_Redentor", "Pão_de_Açúcar", "Cataratas_do_Iguaçu", "Fernando_de_Noronha",
    "Estados_Unidos", "França", "Inglaterra", "Itália", "Argentina",
    
    // Ciência e Tecnologia acessível
    "Albert_Einstein", "Internet", "Computador", "Inteligência_artificial",
    "Celular", "Redes_sociais", "WhatsApp", "YouTube", "Netflix", "Streaming",
    
    // Cultura Pop Moderna
    "Star_Wars", "Harry_Potter", "O_Senhor_dos_Anéis", "Game_of_Thrones",
    "Marvel_Comics", "Disney", "Beatles", "Michael_Jackson", "Super-Herói", 
    "Anime", "PlayStation", "Xbox", "FIFA_(jogo_eletrônico)", "Minecraft"
  ],
  dificil: [
    // Tópicos específicos com menos conexões
    "Física_quântica", "Filosofia_medieval", "Arte_bizantina", "Numismática",
    "Ornitologia", "Astronomia_antiga", "Literatura_russa", "Cerâmica_japonesa",
    "Geologia_vulcânica", "Mitologia_nórdica", "História_da_Matemática", 
    "Antropologia_cultural", "Linguística_histórica", "Paleografia",
    "Arquitetura_gótica", "Caligrafia_árabe", "Botânica_tropical",
    "Música_renascentista", "Dança_folclórica", "Neurociência_cognitiva"
  ]
};

// Cache para artigos recentemente carregados
const articleCache = new Map();

// Função para obter o display title e informações do artigo
export const getArticleInfo = async (title) => {
  // Verificar cache primeiro
  const cacheKey = `info_${title}`;
  if (articleCache.has(cacheKey)) {
    return articleCache.get(cacheKey);
  }
  
  try {
    const encodedTitle = encodeURIComponent(title);
    // Garantindo que usamos a Wikipedia em português do Brasil
    const response = await fetch(
      `https://pt.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${encodedTitle}&prop=text|displaytitle&redirects&uselang=pt-br`
    );
    const data = await response.json();
    
    if (data.error) return null;
    
    if (!data.parse) return null;
    
    // Extrair o título real do artigo do HTML preservando acentuação
    const div = document.createElement('div');
    div.innerHTML = data.parse.displaytitle;
    const displayTitle = div.textContent || div.innerText || title;
    
    // Verificar se é um redirecionamento
    const isRedirect = data.parse.text && data.parse.text["*"] && 
                      (data.parse.text["*"].includes('class="redirectText"') || 
                       data.parse.text["*"].includes('class="redirectMsg"') ||
                       data.parse.text["*"].includes('Redireciona para:'));
    
    const result = {
      title: title,
      displayTitle: displayTitle,
      isRedirect: isRedirect,
      isValid: true
    };
    
    // Armazenar em cache
    articleCache.set(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error(`Erro ao obter informações do artigo "${title}":`, error);
    return null;
  }
};

// Função para normalizar strings para comparação
export const normalizeStringForComparison = (str) => {
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
    
    // Converter para minúsculas (preservando acentos)
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
export const checkArticleMatch = (currentArticleTitle, targetArticleTitle) => {
  try {
    // Se algum dos títulos é nulo ou indefinido, retornar falso
    if (!currentArticleTitle || !targetArticleTitle) {
      return false;
    }
    
    // Normalizar os títulos para comparação (preservando acentos)
    const current = normalizeStringForComparison(currentArticleTitle);
    const target = normalizeStringForComparison(targetArticleTitle);
    
    console.log("Comparando artigos:");
    console.log("- Atual:", current);
    console.log("- Alvo:", target);
    
    // Verificar correspondência
    if (current === target) {
      console.log("✓ Correspondência encontrada");
      return true;
    }
    
    console.log("✗ Nenhuma correspondência encontrada");
    return false;
  } catch (e) {
    console.error("Erro na comparação de artigos:", e);
    return false;
  }
};

// Função para obter links de um artigo da Wikipedia
export const getWikipediaLinks = async (title) => {
  // Verificar cache primeiro
  const cacheKey = `links_${title}`;
  if (articleCache.has(cacheKey)) {
    return articleCache.get(cacheKey);
  }
  
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
    
    // Armazenar em cache
    articleCache.set(cacheKey, filteredLinks);
    
    return filteredLinks;
  } catch (error) {
    console.error(`Erro ao obter links do artigo "${title}":`, error);
    return [];
  }
};

// Função para obter um artigo aleatório da Wikipedia PT-BR
export const getRandomArticle = async (difficulty = 'medio') => {
  try {
    // Se a dificuldade for fácil ou difícil, tentar usar o tópico
    if (difficulty !== 'medio' && Math.random() > 0.3) {
      const topics = INITIAL_TOPICS[difficulty];
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      const info = await getArticleInfo(randomTopic);
      
      if (info && await hasEnoughLinks(info.title, difficulty)) {
        return { title: info.title };
      }
    }
    
    // Caso contrário, usar artigo aleatório da API
    const response = await fetch(
      'https://pt.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=1&origin=*&uselang=pt-br'
    );
    const data = await response.json();
    if (!data.query || !data.query.random || !data.query.random[0]) {
      throw new Error('Falha ao obter artigo aleatório');
    }
    return data.query.random[0];
  } catch (error) {
    console.error('Erro ao obter artigo aleatório:', error);
    return null;
  }
};

// Função para verificar se um artigo tem links suficientes
export const hasEnoughLinks = async (title, difficulty = 'medio') => {
  try {
    const encodedTitle = encodeURIComponent(title);
    const response = await fetch(
      `https://pt.wikipedia.org/w/api.php?action=query&format=json&titles=${encodedTitle}&prop=links&pllimit=50&origin=*&uselang=pt-br`
    );
    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    
    if (!pages[pageId].links) return false;
    
    // Ajustar o número mínimo de links com base na dificuldade
    const minLinks = {
      'facil': 35,  // Aumentado (artigos mais populares)
      'medio': 20,
      'dificil': 10
    };
    
    return pages[pageId].links.length >= minLinks[difficulty];
  } catch {
    return false;
  }
};

// Função para obter um par de artigos aleatórios para o jogo
export const getRandomArticles = async (difficulty = 'medio') => {
  // Tentativas máximas para encontrar um bom par de artigos
  const maxAttempts = 10;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      // Obter artigo inicial que tenha links suficientes
      let startArticle;
      
      // Probabilidade maior de usar tópicos pré-definidos conforme dificuldade
      const usePredefinedProbability = {
        'facil': 0.85,  // Aumentado para 85% no nível fácil
        'medio': 0.6,   // Aumentado para 60% no nível médio
        'dificil': 0.3  // Mantido em 30% no nível difícil
      };
      
      if (Math.random() < usePredefinedProbability[difficulty] && INITIAL_TOPICS[difficulty].length > 0) {
        const topics = INITIAL_TOPICS[difficulty];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        const info = await getArticleInfo(randomTopic);
        if (info && await hasEnoughLinks(info.title, difficulty)) {
          startArticle = { title: info.title };
        }
      }
      
      // Se não conseguir com um tópico pré-definido, tenta aleatório
      if (!startArticle) {
        startArticle = await getRandomArticle(difficulty);
        if (!startArticle || !await hasEnoughLinks(startArticle.title, difficulty)) {
          attempts++;
          continue;
        }
      }
      
      // Obter artigo final baseado na dificuldade
      let endArticle;
      
      if (difficulty === 'facil') {
        // No modo fácil, usar artigo popular ou relacionado
        
        // 70% de chance de escolher artigo relacionado no nível fácil
        if (Math.random() < 0.7) {
          const links = await getWikipediaLinks(startArticle.title);
          if (links.length > 15) {
            // Escolher um artigo que esteja a uma distância razoável (não muito perto)
            const randomIndex = Math.floor(Math.random() * (links.length / 2)) + Math.floor(links.length / 4);
            endArticle = { title: links[Math.min(randomIndex, links.length - 1)].title };
            
            // Verificar se o artigo final tem links suficientes
            if (!await hasEnoughLinks(endArticle.title, difficulty)) {
              endArticle = null;
            }
          }
        }
        
        // Se não conseguiu um relacionado, usar um tópico popular pré-definido
        if (!endArticle) {
          const topics = INITIAL_TOPICS['facil'];
          const randomTopic = topics[Math.floor(Math.random() * topics.length)];
          const info = await getArticleInfo(randomTopic);
          if (info && await hasEnoughLinks(info.title, difficulty)) {
            endArticle = { title: info.title };
          }
        }
      } else if (difficulty === 'medio') {
        // No modo médio, 30% de chance de escolher algo relacionado mas não direto
        if (Math.random() < 0.3) {
          const links = await getWikipediaLinks(startArticle.title);
          if (links.length > 20) {
            // Escolher um link de forma mais aleatória
            const randomIndex = Math.floor(Math.random() * links.length);
            const midArticle = links[randomIndex].title;
            
            // Obter links do artigo intermediário
            const midLinks = await getWikipediaLinks(midArticle);
            if (midLinks.length > 10) {
              // Escolher artigo final do artigo intermediário
              const finalIndex = Math.floor(Math.random() * midLinks.length);
              endArticle = { title: midLinks[finalIndex].title };
            }
          }
        }
      }
      
      // Se não conseguiu um artigo final por outros meios, usar aleatório
      if (!endArticle) {
        if (difficulty === 'facil' || difficulty === 'medio') {
          // Para fácil e médio, tentar um tema popular primeiro
          const topics = INITIAL_TOPICS[difficulty];
          const randomTopic = topics[Math.floor(Math.random() * topics.length)];
          const info = await getArticleInfo(randomTopic);
          if (info && info.title !== startArticle.title) {
            endArticle = { title: info.title };
          }
        }
        
        // Se ainda não tiver um artigo final, usar um aleatório
        if (!endArticle) {
          endArticle = await getRandomArticle(difficulty);
        }
      }
      
      if (!endArticle || endArticle.title === startArticle.title) {
        attempts++;
        continue;
      }
      
      return { startArticle, endArticle };
      
    } catch (error) {
      console.error('Erro ao gerar par de artigos:', error);
      attempts++;
    }
  }
  
  throw new Error('Não foi possível gerar um par de artigos válido após várias tentativas');
};

// Cache de conteúdo para artigos já processados
const contentCache = new Map();

// Função para processar o conteúdo HTML da Wikipedia 
const processWikiContent = (content, isDarkMode) => {
  const div = document.createElement("div");
  div.innerHTML = content;
  
  // Remover elementos desnecessários
  const elementsToRemove = div.querySelectorAll(
    '.mw-editsection, .noprint, .mw-empty-elt, .mw-jump-link, ' +
    '.mw-indicators, .sistersitebox, .mwe-math-mathml-inline, ' +
    '.portal, #References, #External_links, #Further_reading'
  );
  
  elementsToRemove.forEach(el => el.remove());
  
  // Remover elementos pesados em dispositivos móveis
  if (window.innerWidth < 768) {
    const heavyElements = div.querySelectorAll(
      'table, .infobox, .navbox, .thumbinner, .mw-stack, .reference, .gallery'
    );
    heavyElements.forEach(el => el.remove());
    
    // Limitar imagens
    const images = div.querySelectorAll('img');
    images.forEach((img, index) => {
      if (index > 2) img.remove();
      else {
        img.loading = 'lazy';
        img.decoding = 'async';
        img.style.maxHeight = '200px';
      }
    });
  }
  
  // Corrigir URLs das imagens para garantir que sejam absolutas
  div.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      // Se a URL da imagem não começar com http ou https, adicionar o domínio da Wikipedia
      if (!src.startsWith('http')) {
        img.src = src.startsWith('//') ? `https:${src}` : `https://pt.wikipedia.org${src.startsWith('/') ? '' : '/'}${src}`;
      }
      
      // Garantir que não esteja usando srcset que pode não funcionar corretamente
      img.removeAttribute('srcset');
      img.removeAttribute('data-src');
      
      // Adicionar tratamento para erro de carregamento
      img.onerror = function() {
        this.style.display = 'none';
      };
    }
  });
  
  // Processar links
  div.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href?.startsWith('/wiki/')) {
      const title = href.replace('/wiki/', '');
      if (!title.includes(':') && !title.includes('Especial:') && !title.match(/^\d+$/)) {
        link.setAttribute('data-wiki-link', title);
        link.href = '#';
        link.classList.add('wiki-link');
      } else {
        link.replaceWith(...link.childNodes);
      }
    } else {
      link.replaceWith(...link.childNodes);
    }
  });
  
  // Corrigir elementos para tema escuro
  if (isDarkMode || document.body.classList.contains('dark-theme')) {
    div.querySelectorAll('img').forEach(img => {
      // Adicionar fundo para imagens transparentes
      img.style.background = 'rgba(255, 255, 255, 0.1)';
    });
    
    div.querySelectorAll('table, th, td').forEach(el => {
      // Garantir que tabelas usem as cores de tema
      el.style.backgroundColor = 'var(--background-alt)';
      el.style.color = 'var(--text)';
      el.style.borderColor = 'var(--border)';
    });
  }
  
  return div.innerHTML;
};

// Função para carregar um artigo da Wikipedia
export const loadArticle = async (title) => {
  try {
    // Verificar cache primeiro
    const isDarkMode = document.body.classList.contains('dark-theme');
    const cacheKey = `content_${title}_${isDarkMode ? 'dark' : 'light'}`;
    
    if (contentCache.has(cacheKey)) {
      return contentCache.get(cacheKey);
    }
    
    const encodedTitle = encodeURIComponent(title);
    const response = await fetch(
      `https://pt.wikipedia.org/w/api.php?action=parse&page=${encodedTitle}&format=json&origin=*&prop=text|displaytitle|categories&redirects&uselang=pt-br`
    );
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Erro da API Wikipedia: ${data.error.info}`);
    }
    
    let processedContent;
    
    if (data.parse) {
      // Verificar se o conteúdo indica que é uma página de redirecionamento
      const content = data.parse.text["*"];
      const isRedirect = content.includes('class="redirectText"') || 
                        content.includes('class="redirectMsg"') || 
                        content.includes('Redireciona para:');
      
      if (isRedirect) {
        processedContent = `<div class="wiki-redirect-notice">
          <h2>Esta é uma página de redirecionamento</h2>
          <p>Este clique não será contabilizado. Por favor, continue navegando.</p>
          ${processWikiContent(content, isDarkMode)}
        </div>`;
      } else {
        processedContent = processWikiContent(content, isDarkMode);
      }
      
      // Armazenar em cache
      contentCache.set(cacheKey, processedContent);
      
      return processedContent;
    } else {
      throw new Error("Artigo não encontrado");
    }
  } catch (error) {
    console.error("Erro ao carregar artigo:", error);
    throw error;
  }
};