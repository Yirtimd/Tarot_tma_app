'use client'
import { TarotCard } from '../page'      

interface DeckProps {
  isShuffled: boolean
  cards: TarotCard[]
  onShuffle: () => void
  onCardClick: (index: number) => void
}

export default function Deck({ isShuffled, cards, onShuffle, onCardClick }: DeckProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      {!isShuffled ? (
        // Состояние нераскладанной колоды
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-48 h-80">
            {/* Нижние карты для глубины */}
            <div className="absolute top-6 left-6 w-48 h-80 bg-amber-100 rounded-lg shadow-lg transform -rotate-6 transition-all duration-300 overflow-hidden">
              <img 
                src="/cards/rub_card.svg" 
                alt="Card Back"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            <div className="absolute top-4 left-4 w-48 h-80 bg-amber-100 rounded-lg shadow-lg transform -rotate-4 transition-all duration-300 overflow-hidden">
              <img 
                src="/cards/rub_card.svg" 
                alt="Card Back"
                className="w-full h-full object-cover opacity-70"
              />
            </div>
            <div className="absolute top-2 left-2 w-48 h-80 bg-amber-100 rounded-lg shadow-lg transform -rotate-2 transition-all duration-300 overflow-hidden">
              <img 
                src="/cards/rub_card.svg" 
                alt="Card Back"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            
            {/* Верхние карты */}
            <div className="absolute inset-0 w-48 h-80 bg-amber-50 rounded-lg shadow-lg transform rotate-1 transition-all duration-300 overflow-hidden hover:rotate-3 hover:-translate-y-1">
              <img 
                src="/cards/rub_card.svg" 
                alt="Card Back"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Самая верхняя карта с эффектом при наведении */}
            <div className="absolute -top-1 -left-1 w-48 h-80 bg-amber-50 rounded-lg shadow-lg transform rotate-2 transition-all duration-300 overflow-hidden hover:rotate-6 hover:-translate-y-2">
              <img 
                src="/cards/rub_card.svg" 
                alt="Card Back"
                className="w-full h-full object-cover"
              />
              {/* Эффект блеска при наведении */}
              <div className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300 bg-gradient-to-br from-transparent via-white to-transparent" />
            </div>
          </div>

          {/* Кнопка под колодой */}
          <button 
            onClick={onShuffle}
            className="bg-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors font-medium text-lg animate-pulse mt-4"
          >
            Разложить карты
          </button>
        </div>
      ) : (
        // Расклад карт
        <div className="w-full flex flex-wrap justify-center gap-4 animate-fadeIn">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="relative w-48 h-80 transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-gradient-to-b from-purple-800 to-pink-800 rounded-lg"
              onClick={() => onCardClick(index)}
            >
              {/* Основная карта */}
              <div className="absolute inset-0 rounded-lg shadow-lg overflow-hidden preserve-3d">
                <div className={`w-full h-full relative transition-transform duration-500 
                  ${card.isReversed ? 'animate-cardFlip' : ''}`}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Индикатор перевёрнутой карты */}
              {card.isReversed && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-sm px-3 py-1 rounded-full shadow-sm z-10">
                  rev
                </div>
              )}

              {/* Анимированный блеск при наведении */}
              <div className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300 bg-gradient-to-br from-transparent via-white to-transparent" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}