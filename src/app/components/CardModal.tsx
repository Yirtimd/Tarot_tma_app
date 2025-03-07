'use client'
import { useEffect } from 'react'
import { TarotCard } from '../page'

interface CardModalProps {
    isOpen: boolean
    card: TarotCard | null
    onClose: () => void
}

export default function CardModal({ isOpen, card, onClose }: CardModalProps) {
    useEffect(() => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto'
      }
      
      return () => {
        if (typeof document !== 'undefined') {
          document.body.style.overflow = 'auto'
        }
      }
    }, [isOpen])
  
    if (!isOpen || !card) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
        <div className="bg-black rounded-lg p-6 w-[60vh] h-[90vh] relative overflow-y-auto border border-[#FFD700]">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl"
          >
            ✕
          </button>
          
          {/* Контейнер для карты */}
          <div className="flex justify-center mb-6">
            <div className="w-48 h-80 relative">
              <img 
                src={card.image} 
                alt={card.name} 
                className={`w-full h-full object-cover rounded-lg shadow-lg ${
                  card.isReversed ? 'animate-cardFlip' : ''
                }`}
              />
            </div>
          </div>
          
          <div className="space-y-4 text-white">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-b from-[#ffd700] to-[#b8860b] bg-clip-text text-transparent">
              {card.name}
            </h2>
            <p className="text-sm text-[#FFD700] font-medium text-center">{card.arcana}</p>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-[#FFD700]">Значение:</h3>
              <p className="text-white">{card.meaning}</p>
            </div>
            
            {/* Показываем только релевантную информацию */}
            <div className="space-y-4">
              {!card.isReversed ? (
                <div className="bg-black p-3 rounded-lg border-2 border-[#FFD700] shadow-lg">
                  <h4 className="font-medium text-sm mb-1 text-[#FFD700]">Прямое положение</h4>
                  <p className="text-sm bg-gradient-to-b from-[#ffd700] to-[#b8860b] bg-clip-text text-transparent">{card.upright}</p>
                </div>
              ) : (
                <div className="bg-black p-3 rounded-lg border-2 border-[#FFD700] shadow-lg">
                  <h4 className="font-medium text-sm mb-1 text-[#FFD700]">Перевернутое положение</h4>
                  <p className="text-sm bg-gradient-to-b from-[#ffd700] to-[#b8860b] bg-clip-text text-transparent">{card.reversed}</p>
                </div>
              )}
            </div>
            
            <div className="bg-black p-3 rounded-lg border border-white shadow-lg">
              <h3 className="font-medium text-sm mb-1 text-[#FFD700]">Описание</h3>
              <p className="text-sm text-white">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}