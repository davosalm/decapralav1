import React, { useState, useEffect, useRef } from 'react'
import { Trophy, ArrowRight, BookOpen, Brain, Lightning, House, Gauge } from '@phosphor-icons/react'
import { loadArticle, getArticleInfo, checkArticleMatch } from './wikiService'
import Celebration from './Celebration'
import ClickCounter from './ClickCounter'
import logo from './logo.png' // Importando a logo

function WikiGame({ gameState, setGameState, resetGame, startGame, difficulty }) {
  const [currentArticle, setCurrentArticle] = useState("")
  const [loading, setLoading] = useState(true)
  const [lastRedirect, setLastRedirect] = useState(null)
  const [loadingLink, setLoadingLink] = useState(false)
  const contentRef = useRef(null)

  // Carregar o artigo inicial quando o jogo começar
  useEffect(() => {
    if (gameState.startArticle) {
      loadArticleContent(gameState.startArticle)
    }
  }, [gameState.startArticle])

  // Rolar para o topo quando um novo artigo for carregado
  useEffect(() => {
    if (contentRef.current && !loading) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentArticle, loading])

  // Função para carregar o conteúdo do artigo da Wikipedia
  const loadArticleContent = async (title) => {
    setLoading(true)
    try {
      const content = await loadArticle(title)
      setCurrentArticle(content)
    } catch (error) {
      console.error("Erro ao carregar artigo:", error)
      setCurrentArticle(`
        <div class="error-message">
          <h3>Erro ao carregar artigo</h3>
          <p>Ocorreu um erro ao carregar "${title}".</p>
          <p>Detalhes: ${error.message}</p>
          <p>Por favor, tente outro link ou inicie um novo jogo.</p>
        </div>
      `)
    } finally {
      setLoading(false)
    }
  }

  // Manipular cliques nos links do artigo
  const handleLinkClick = async (event) => {
    const link = event.target.closest('a[data-wiki-link]')
    if (!link) return
    
    event.preventDefault()
    
    // Se já estiver carregando um link, não fazer nada
    if (loadingLink || loading) return
    
    const title = link.getAttribute('data-wiki-link')
    const linkElement = link
    
    if (gameState.clicksLeft > 0 && !gameState.isComplete) {
      // Visual feedback que o link está carregando
      setLoadingLink(true)
      linkElement.classList.add('link-loading')
      
      // Obter informações do artigo
      try {
        const articleInfo = await getArticleInfo(title)
        if (!articleInfo) {
          setLoadingLink(false)
          linkElement.classList.remove('link-loading')
          return
        }
        
        // Verificar se é um redirecionamento
        const isRedirect = await loadArticleContent(title)
        if (isRedirect || title === lastRedirect) {
          console.log("Redirecionamento detectado, não contabilizando clique")
          setLastRedirect(title)
          setLoadingLink(false)
          linkElement.classList.remove('link-loading')
          return // Não contabiliza o clique para redirecionamentos
        }
        
        // Atualizar caminho
        const newPath = [...gameState.path, {
          title: articleInfo.title,
          displayTitle: articleInfo.displayTitle
        }]
        
        // Verificar se encontrou o artigo de destino
        const isComplete = checkArticleMatch(articleInfo.displayTitle, gameState.endDisplay)
        
        // Adicionar animação ao link clicado
        linkElement.classList.add('click-animation')
        setTimeout(() => {
          linkElement.classList.remove('click-animation')
        }, 500)
        
        setGameState(prev => ({
          ...prev,
          clicksLeft: prev.clicksLeft - 1,
          path: newPath,
          isComplete,
          showCelebration: isComplete
        }))
        
        setLastRedirect(null)
      } finally {
        setLoadingLink(false)
        if (linkElement) {
          linkElement.classList.remove('link-loading')
        }
      }
    }
  }

  // Traduzir o nível de dificuldade
  const difficultyLabel = {
    'facil': 'Fácil',
    'medio': 'Médio',
    'dificil': 'Difícil'
  }

  return (
    <div className="game-container">
      {gameState.showCelebration && <Celebration />}
      
      <div className="game-header">
        <div className="game-nav">
          <button
            className="btn btn-icon"
            onClick={resetGame}
            aria-label="Voltar ao menu"
          >
            <House weight="fill" />
          </button>
          <img src={logo} alt="5 Cliques Logo" className="header-logo" />
        </div>
        
        <ClickCounter count={gameState.clicksLeft} />
      </div>
      
      <div className="game-info">
        <div className="game-info-top">
          <div className="route-info">
            <div className="article-badge from-article">
              <BookOpen weight="fill" size={16} />
              <span>De: <strong>{gameState.startDisplay || gameState.startArticle}</strong></span>
            </div>
            
            <ArrowRight size={16} className="arrow-icon" />
            
            <div className="article-badge to-article">
              <Brain weight="fill" size={16} />
              <span>Para: <strong>{gameState.endDisplay || gameState.endArticle}</strong></span>
            </div>
          </div>
          
          <div className="difficulty-indicator">
            <Gauge weight="fill" size={16} />
            <span>{difficultyLabel[difficulty] || 'Médio'}</span>
          </div>
        </div>
        
        <button
          className="btn btn-primary btn-new-game"
          onClick={() => startGame(difficulty)}
        >
          <Lightning weight="fill" size={18} />
          <span>Novo Jogo</span>
        </button>
      </div>
      
      {/* Alertas de vitória/derrota */}
      {gameState.isComplete && (
        <div className="alert alert-success">
          <Trophy weight="fill" size={24} className="victory-icon" />
          <span>
            Parabéns! Você conseguiu chegar ao destino em <strong>{5 - gameState.clicksLeft}</strong> cliques!
          </span>
        </div>
      )}
      
      {gameState.clicksLeft === 0 && !gameState.isComplete && (
        <div className="alert alert-warning">
          <span>
            Acabaram seus cliques! Tente novamente com um novo par de artigos.
          </span>
        </div>
      )}
      
      {/* Indicador de caminho percorrido */}
      {gameState.path.length > 1 && (
        <div className="path-tracker">
          <div className="path-label">Caminho:</div>
          <div className="path-items">
            {gameState.path.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="path-arrow">→</span>}
                <span className="path-item">{item.displayTitle}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      
      {/* Conteúdo do artigo */}
      <div 
        className={`wiki-content ${gameState.clicksLeft === 1 ? 'last-click-alert' : ''}`}
        onClick={handleLinkClick}
        ref={contentRef}
      >
        {(loading || loadingLink) ? (
          <div className="loader-container">
            <div className="loader">
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
            </div>
            {loadingLink && !loading && (
              <div className="loader-text">Carregando artigo...</div>
            )}
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: currentArticle }} />
        )}
      </div>
    </div>
  )
}

export default WikiGame