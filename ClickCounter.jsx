import React, { useEffect, useState } from 'react'
import { Timer } from '@phosphor-icons/react'

function ClickCounter({ count }) {
  const [prevCount, setPrevCount] = useState(count);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Animar quando o contador de cliques mudar
  useEffect(() => {
    if (count !== prevCount) {
      setShowAnimation(true);
      
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 1000);
      
      setPrevCount(count);
      return () => clearTimeout(timer);
    }
  }, [count, prevCount]);
  
  // Determinar cores baseadas nos cliques restantes
  const getStatusColor = () => {
    if (count >= 4) return 'status-good';
    if (count >= 2) return 'status-warning';
    return 'status-danger';
  };

  // Adicionar classe para pulsar a tela quando restar apenas 1 clique
  useEffect(() => {
    const wikiContentEl = document.querySelector('.wiki-content');
    if (count === 1) {
      wikiContentEl?.classList.add('last-click-alert');
    } else {
      wikiContentEl?.classList.remove('last-click-alert');
    }
  }, [count]);
  
  return (
    <>
      <div className={`click-counter ${isMobile ? 'click-counter-fixed' : ''}`}>
        <div className={`click-counter-inner ${getStatusColor()} ${showAnimation ? 'click-pulse' : ''}`}>
          <Timer weight="fill" size={24} className="counter-icon" />
          <div className="click-info">
            <span className="click-number">{count}</span>
            <span className="click-label">cliques<br/>restantes</span>
          </div>
        </div>
        
        <div className="click-dots">
          {Array.from({ length: 5 }).map((_, index) => (
            <div 
              key={index} 
              className={`click-dot ${index < count ? 'active' : 'used'} ${
                showAnimation && index === count ? 'animate-out' : 
                showAnimation && index === count - 1 ? 'animate-in' : ''
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Versão flutuante para mobile */}
      {isMobile && (
        <div className="click-counter-mobile">
          <div className={`click-mobile-inner ${getStatusColor()} ${showAnimation ? 'click-pulse' : ''}`}>
            <span className="click-number">{count}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default ClickCounter