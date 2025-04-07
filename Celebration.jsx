import React, { useState, useEffect } from 'react'

function Celebration() {
  const [confetti, setConfetti] = useState([])
  const confettiColors = ['#4361ee', '#4895ef', '#7209b7', '#f72585', '#4cc9f0', '#f9c74f']
  
  useEffect(() => {
    // Criar 50 confetes com posições e cores aleatórias
    const newConfetti = [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 100,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      size: 5 + Math.random() * 10,
      animationDuration: 2 + Math.random() * 2
    }))
    
    setConfetti(newConfetti)
    
    // Efeito sonoro de vitória (opcional)
    try {
      const audio = new Audio('/victory-sound.mp3')
      audio.volume = 0.3
      audio.play()
    } catch (e) {
      // Ignorar erros de áudio se houver problemas de permissão
    }
    
    return () => {
      // Cleanup
    }
  }, [])
  
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
      
      {/* Sparkles em torno do centro */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            top: `${50 + Math.sin(i / 6 * Math.PI * 2) * 30}%`,
            left: `${50 + Math.cos(i / 6 * Math.PI * 2) * 30}%`,
            animationDelay: `${i * 0.3}s`
          }}
        />
      ))}
      
      <div className="victory-trophy animate-bounce">
        <div className="trophy-glow"></div>
      </div>
    </div>
  )
}

export default Celebration