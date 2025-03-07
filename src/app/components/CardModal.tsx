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
        <div className="bg-black rounded-lg p-6 w-[60vh] h-[90vh] relative overflow-y-auto border border-purple-500">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-purple-400 hover:text-purple-300 text-xl"
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
            <h2 className="text-2xl font-bold text-center text-purple-300">{card.name}</h2>
            <p className="text-sm text-purple-400 font-medium text-center">{card.arcana}</p>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-purple-300">Значение:</h3>
              <p className="text-gray-300">{card.meaning}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-900 bg-opacity-50 p-3 rounded-lg border border-purple-700">
                <h4 className="font-medium text-sm mb-1 text-purple-300">Прямое положение</h4>
                <p className="text-sm text-gray-300">{card.upright}</p>
              </div>
              
              <div className="bg-rose-900 bg-opacity-50 p-3 rounded-lg border border-rose-700">
                <h4 className="font-medium text-sm mb-1 text-rose-300">Перевернутое</h4>
                <p className="text-sm text-gray-300">{card.reversed}</p>
              </div>
            </div>
            
            <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-gray-700">
              <h3 className="font-medium text-sm mb-1 text-gray-300">Описание</h3>
              <p className="text-sm text-gray-300">{card.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
}