import React, { useState, useEffect } from 'react'
import { Play, Question, Lightning, Clock, Trophy } from '@phosphor-icons/react'
import logo from './logo.png' // Importando a logo

function MenuScreen({ startGame, showTutorial, setShowTutorial, loading }) {
  const [animationVisible, setAnimationVisible] = useState(false)
  const [difficulty, setDifficulty] = useState('medio')
  
  // Iniciar animações após o carregamento da página
  useEffect(() => {
    setTimeout(() => {
      setAnimationVisible(true)
    }, 300)
  }, [])
  
  const handlePlayClick = () => {
    startGame(difficulty);
  };

  // Configurações de dificuldade
  const difficultyOptions = [
    { id: 'facil', label: 'Fácil', icon: <Lightning weight="fill" size={18} />, description: 'Artigos populares com muitas conexões' },
    { id: 'medio', label: 'Médio', icon: <Clock weight="fill" size={18} />, description: 'Mix de artigos variados' },
    { id: 'dificil', label: 'Difícil', icon: <Trophy weight="fill" size={18} />, description: 'Artigos específicos com menos conexões' }
  ];
  
  return (
    <div className="menu-container">
      <div className="menu-content">
        <div className="logo-container">
          <img src={logo} alt="5 Cliques Logo" className="app-logo" />
        </div>
        
        <p className={`subtitle ${animationVisible ? 'animate-subtitle' : ''}`}>
          Conecte dois artigos aleatórios da Wikipedia<br/>em 5 cliques ou menos!
        </p>
        
        <div className={`difficulty-selector ${animationVisible ? 'animate-difficulty' : ''}`}>
          <h3>Dificuldade</h3>
          <div className="difficulty-options">
            {difficultyOptions.map(option => (
              <button
                key={option.id}
                className={`difficulty-btn ${difficulty === option.id ? 'active' : ''}`}
                onClick={() => setDifficulty(option.id)}
                aria-label={`Dificuldade ${option.label}`}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
          <p className="difficulty-description">
            {difficultyOptions.find(o => o.id === difficulty).description}
          </p>
        </div>
        
        <div className={`menu-buttons ${animationVisible ? 'animate-buttons' : ''}`}>
          <button 
            className="btn btn-primary btn-play"
            onClick={handlePlayClick}
            disabled={loading}
          >
            {loading ? (
              <div className="loader-small"></div>
            ) : (
              <>
                <Play weight="fill" size={24} />
                <span>Jogar</span>
              </>
            )}
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => setShowTutorial(true)}
          >
            <Question weight="fill" size={20} />
            <span>Como Jogar</span>
          </button>
        </div>
        
        {showTutorial && (
          <div className="tutorial-modal" onClick={() => setShowTutorial(false)}>
            <div className="tutorial-content" onClick={(e) => e.stopPropagation()}>
              <h2>Como Jogar</h2>
              
              <div className="tutorial-steps">
                <div className="tutorial-step">
                  <div className="step-number">1</div>
                  <p>Você receberá dois artigos aleatórios da Wikipedia: um <strong>inicial</strong> e um <strong>final</strong>.</p>
                </div>
                
                <div className="tutorial-step">
                  <div className="step-number">2</div>
                  <p>Navegue pelos links dentro dos artigos para chegar ao artigo final.</p>
                </div>
                
                <div className="tutorial-step">
                  <div className="step-number">3</div>
                  <p>Você tem apenas <strong>5 cliques</strong> para completar o desafio.</p>
                </div>
                
                <div className="tutorial-step">
                  <div className="step-number">4</div>
                  <p>Escolha seus cliques com sabedoria para criar um caminho entre os artigos!</p>
                </div>
                
                <div className="tutorial-step">
                  <div className="step-number">5</div>
                  <p>Páginas de redirecionamento não contam como um clique!</p>
                </div>
              </div>
              
              <button 
                className="btn btn-primary btn-close"
                onClick={() => setShowTutorial(false)}
              >
                Entendi!
              </button>
            </div>
          </div>
        )}
        
        <div className={`creator-info ${animationVisible ? 'animate-creator' : ''}`}>
          <p>Desenvolvido por David Silva</p>
          <a href="mailto:davosalm@gmail.com" className="creator-email">
            davosalm@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}

export default MenuScreen