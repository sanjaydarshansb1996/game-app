import React, { useEffect, useState } from "react";

// Define types and interfaces
interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function GameApp() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    // Generate initial cards
    const initialCards: Card[] = [
      { id: 1, value: "A", isFlipped: false, isMatched: false },
      { id: 2, value: "A", isFlipped: false, isMatched: false },
      { id: 3, value: "B", isFlipped: false, isMatched: false },
      { id: 4, value: "B", isFlipped: false, isMatched: false },
    ];

    // Shuffle the cards
    const shuffledCards = shuffleCards(initialCards);
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (card: Card) => {
    if (card.isFlipped || card.isMatched) {
      return;
    }

    if (selectedCard) {
      // Check if the selected card matches the current card
      if (selectedCard.value === card.value) {
        setCards((prevCards) =>
          prevCards.map((prevCard) =>
            prevCard.id === selectedCard.id || prevCard.id === card.id
              ? { ...prevCard, isMatched: true }
              : prevCard
          )
        );
      } else {
        // Flip both cards back after a short delay
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((prevCard) =>
              prevCard.id === selectedCard.id || prevCard.id === card.id
                ? { ...prevCard, isFlipped: false }
                : prevCard
            )
          );
        }, 1000);
      }

      setSelectedCard(null);
    } else {
      setSelectedCard(card);
    }

    setCards((prevCards) =>
      prevCards.map((prevCard) =>
        prevCard.id === card.id ? { ...prevCard, isFlipped: true } : prevCard
      )
    );
  };

  const shuffleCards = (cards: Card[]) => {
    const shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }
    return shuffledCards;
  };

  return (
    <div>
      <h1>Memory Game</h1>
      <div className="cards">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? "flipped" : ""} ${
              card.isMatched ? "matched" : ""
            }`}
            onClick={() => handleCardClick(card)}
          >
            {card.isFlipped && !card.isMatched ? card.value : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameApp;
