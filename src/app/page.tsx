'use client'
import { useState, useEffect } from 'react'
import Deck from './components/Deck'
import CardModal from './components/CardModal'
import tarotDeck from './data/data_card.json'

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void
        expand: () => void
        // другие методы, если понадобятся
      }
    }
  }
}

export interface TarotCard {
  id: number
  name: string
  arcana: string
  description: string
  meaning: string
  upright: string
  reversed: string
  image?: string
  isReversed?: boolean
}

export default function Home() {
  const [isDeckShuffled, setIsDeckShuffled] = useState(false)
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(false)

  // Инициализация Telegram Web App
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      setIsTelegramWebApp(true)
      tg.ready()
      tg.expand()
    }
  }, [])

  // Функция перемешивания колоды
  const shuffleDeck = () => {
    const shuffled: TarotCard[] = []
    const deckCopy = [...tarotDeck]
    
    while (shuffled.length < 4 && deckCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * deckCopy.length)
      const selectedCard = deckCopy.splice(randomIndex, 1)[0]
      shuffled.push({
        ...selectedCard,
        isReversed: Math.random() > 0.5 // Добавляем случайную ориентацию
      })
    }
    
    setSelectedCards(shuffled)
    setIsDeckShuffled(true)
  }

  // Обработчик клика по карте
  const handleCardClick = (index: number) => {
    setSelectedCard(selectedCards[index])
    setIsModalOpen(true)
  }

  return (
    <main className={`min-h-screen p-4 
      ${!isTelegramWebApp ? 'max-w-md mx-auto' : ''}`}>
      
      {!isTelegramWebApp && (
        <div className="bg-yellow-100 text-yellow-800 p-2 rounded mb-4 text-sm text-center">
          Режим тестирования в браузере
        </div>
      )}

      {/* Компонент колоды */}
      <Deck 
        isShuffled={isDeckShuffled}
        cards={selectedCards}
        onShuffle={shuffleDeck}
        onCardClick={handleCardClick}
      />

      {/* Модальное окно с информацией о карте */}
      <CardModal
        isOpen={isModalOpen}
        card={selectedCard}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  )
}