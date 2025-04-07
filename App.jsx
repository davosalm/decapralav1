import React, { useState, useEffect } from 'react'
import { Trophy, ArrowRight, BookOpen, Brain, Lightning, 
         Play, House, Sun, Moon, Question } from '@phosphor-icons/react'
import WikiGame from './WikiGame'
import MenuScreen from './MenuScreen'
import { getArticleInfo, getRandomArticles, checkArticleMatch } from './wikiService'
import './styles.css'

function App() {
  const [showMenu, setShowMenu] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [difficulty, setDifficulty] = useState('medio')
  const [gameState, setGameState] = useState({
    startArticle: "",
    startDisplay: "",
    endArticle: "",
    endDisplay: "",
    clicksLeft: 5,
    path: [],
    isComplete: false,
    showCelebration: false
  })
  
  // Carregar preferência de tema
  useEffect(() => {
    const savedTheme = localStorage.getItem('5cliques-theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.body.classList.add('dark-theme')
    }
    
    // Verificar preferência do sistema se não houver tema salvo
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(prefersDark)
      if (prefersDark) document.body.classList.add('dark-theme')
    }
  }, [])

  // Toggle tema escuro/claro
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode
      if (newMode) {
        document.body.classList.add('dark-theme')
        localStorage.setItem('5cliques-theme', 'dark')
      } else {
        document.body.classList.remove('dark-theme')
        localStorage.setItem('5cliques-theme', 'light')
      }
      return newMode
    })
  }

  // Iniciar um novo jogo
  const startGame = async (selectedDifficulty) => {
    setLoading(true)
    setDifficulty(selectedDifficulty || difficulty);
    
    try {
      // Obter um par de artigos aleatórios da Wikipedia baseado na dificuldade
      const { startArticle, endArticle } = await getRandomArticles(selectedDifficulty || difficulty)
      
      // Obter informações detalhadas dos artigos
      const startInfo = await getArticleInfo(startArticle.title)
      const endInfo = await getArticleInfo(endArticle.title)
      
      if (startInfo && endInfo) {
        setGameState({
          startArticle: startArticle.title,
          startDisplay: startInfo.displayTitle,
          endArticle: endArticle.title,
          endDisplay: endInfo.displayTitle,
          clicksLeft: 5,
          path: [{
            title: startArticle.title,
            displayTitle: startInfo.displayTitle
          }],
          isComplete: false,
          showCelebration: false,
          difficulty: selectedDifficulty || difficulty
        })
        setShowMenu(false)
      } else {
        throw new Error("Não foi possível obter informações dos artigos")
      }
    } catch (error) {
      console.error("Erro ao iniciar jogo:", error)
      alert("Erro ao gerar par de artigos. Tentando novamente...")
      // Tentar novamente automaticamente
      startGame(selectedDifficulty || difficulty)
    } finally {
      setLoading(false)
    }
  }

  // Função para resetar o jogo e voltar ao menu
  const resetGame = () => {
    setShowMenu(true)
    setGameState({
      startArticle: "",
      startDisplay: "",
      endArticle: "",
      endDisplay: "",
      clicksLeft: 5,
      path: [],
      isComplete: false,
      showCelebration: false
    })
  }

  // Componente para o botão de alternância de tema
  const ThemeToggle = () => (
    <button 
      className="theme-toggle"
      onClick={toggleDarkMode}
      aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}>
      {darkMode ? <Sun weight="fill" /> : <Moon weight="fill" />}
    </button>
  )

  return (
    <div className="app-container">
      <ThemeToggle />
      
      {showMenu ? (
        <MenuScreen 
          startGame={startGame}
          showTutorial={showTutorial}
          setShowTutorial={setShowTutorial}
          loading={loading}
        />
      ) : (
        <WikiGame
          gameState={gameState}
          setGameState={setGameState}
          resetGame={resetGame}
          startGame={startGame}
          difficulty={difficulty}
        />
      )}
    </div>
  )
}

export default App