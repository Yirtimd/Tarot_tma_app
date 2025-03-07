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
    <div className="flex flex-col items-center gap-6 mt-20">
      {!isShuffled ? (
        // Состояние нераскладанной колоды
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-48 h-80">
            {/* Нижние карты для глубины */}
            <div className="absolute top-6 left-6 w-50 h-80 bg-amber-100 rounded-lg shadow-lg transform -rotate-6 transition-all duration-300 overflow-hidden">
              <img 
                src="/cards/rub_2.png" 
                alt="Card Back"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            <div className="absolute top-4 left-4 w-50 h-80 bg-amber-100 rounded-lg shadow-lg transform -rotate-4 transition-all duration-300 overflow-hidden">
              <img 
                src="/cards/rub_2.png" 
                alt="Card Back"
                className="w-full h-full object-cover opacity-70"
              />
            </div>
            <div className="absolute top-2 left-2 w-50 h-80 bg-amber-100 rounded-lg shadow-lg transform -rotate-2 transition-all duration-300 overflow-hidden">
              <img 
                src="/cards/rub_2.png" 
                alt="Card Back"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            
            {/* Верхние карты */}
            <div className="absolute inset-0 w-50 h-80 bg-amber-50 rounded-lg shadow-lg transform rotate-1 transition-all duration-300 overflow-hidden hover:rotate-3 hover:-translate-y-1">
              <img 
                src="/cards/rub_2.png" 
                alt="Card Back"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Самая верхняя карта с эффектом при наведении */}
            <div className="absolute -top-1 -left-1 w-50 h-80 bg-amber-50 rounded-lg shadow-lg transform rotate-2 transition-all duration-300 overflow-hidden hover:rotate-6 hover:-translate-y-2">
              <img 
                src="/cards/rub_2.png" 
                alt="Card Back"
                className="w-full h-full object-cover"
              />
              {/* Эффект блеска при наведении */}
              <div className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300 bg-gradient-to-br from-transparent via-white to-transparent" />
            </div>
          </div>

          {/* Обновленная кнопка с большим отступом сверху */}
          <button 
            onClick={onShuffle}
            className="relative bg-black px-12 py-4 rounded-lg shadow-lg 
            hover:scale-105 transition-transform duration-300 font-medium text-lg mt-12
            border-2 border-[#ffd700]"
          >
            <span className="bg-gradient-to-b from-[#ffd700] to-[#b8860b] bg-clip-text text-transparent">
              Разложить карты
            </span>
          </button>
        </div>
      ) : (
        // Расклад карт
        <div className="w-[85%] h-[70vh] md:h-auto flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-4 animate-fadeIn">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`
                relative cursor-pointer bg-black rounded-lg
                w-[45%] aspect-[3/5] md:w-[22%] md:aspect-[3/5]
                ${index < 2 ? 'self-start' : 'self-end'}
                md:self-auto
              `}
              onClick={() => onCardClick(index)}
            >
              {/* Основная карта */}
              <div className="absolute inset-0 rounded-lg shadow-lg overflow-hidden preserve-3d">
                {/* Добавляем подложку */}
                <div className="absolute inset-0 bg-[rgb(28,14,1)]"></div>
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
                <div className="absolute top-[5%] right-[5%] bg-[#b8860b] w-6 h-6 rounded-full flex items-center justify-center shadow-sm z-10">
                  <img 
                    src="/icons/res_b.svg" 
                    alt="reversed" 
                    className="w-4 h-4"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}