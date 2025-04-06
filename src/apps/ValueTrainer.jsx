// ValueTrainer.jsx
import React, { useState, useEffect } from "react";
import ColorCard from './../components/ColorCard.jsx';
import './ValueTrainer.css';
// Threshold for considering two grayscale values a match
const MATCH_THRESHOLD = 5;

function ValueTrainer() {
  // mode: 1 = matching, 2 = sorting
  const [mode, setMode] = useState(1);
  const [cards, setCards] = useState([]);
  // For matching mode:
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  // Common feedback message:
  const [feedback, setFeedback] = useState("");

  // For sorting mode drag-and-drop
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Generate cards when mode changes
  useEffect(() => {
    setFeedback("");
    setSelectedIndices([]);
    setMatchedIndices([]);
    if (mode === 1) {
      // Matching mode: generate 5 pairs of colors with similar grayscale values
      let pairs = [];
      for (let i = 0; i < 5; i++) {
        const primary = randomColor();
        const gray = computeGray(primary);
        const partner = generateMatchingColor(gray);
        pairs.push(primary, partner);
      }
      pairs = shuffle(pairs);
      setCards(pairs);
    } else {
      // Sorting mode: generate 10 random colors
      const randomCards = [];
      for (let i = 0; i < 10; i++) {
        randomCards.push(randomColor());
      }
      setCards(randomCards);
    }
  }, [mode]);

  // Matching mode card click handler
  const handleCardClick = (index) => {
    // Do nothing if already matched or if sorting mode is active
    if (mode !== 1 || matchedIndices.includes(index)) return;

    // Avoid clicking the same card twice
    if (selectedIndices.includes(index)) return;

    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      const gray1 = computeGray(cards[first]);
      const gray2 = computeGray(cards[second]);
      if (Math.abs(gray1 - gray2) <= MATCH_THRESHOLD) {
        // It's a match: mark cards as matched and show success feedback.
        setFeedback("Correct match!");
        setMatchedIndices((prev) => [...prev, first, second]);
        // Check win condition after a short delay
        setTimeout(() => {
          if (matchedIndices.length + 2 === cards.length) {
            setFeedback("You win! All pairs matched.");
          }
          setSelectedIndices([]);
        }, 1000);
      } else {
        // Not a match: show error feedback then clear selection.
        setFeedback("Not a match. Try again!");
        setTimeout(() => {
          setSelectedIndices([]);
          setFeedback("");
        }, 1000);
      }
    }
  };

  // Sorting mode: HTML5 drag and drop event handlers remain similar.
  const handleDragStart = (index) => () => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => () => {
    const newCards = [...cards];
    [newCards[index], newCards[draggedIndex]] = [newCards[draggedIndex], newCards[index]];
    setCards(newCards);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Check if sorting order is correct (ascending luminance)
  const checkSortingOrder = () => {
    const grays = cards.map(computeGray);
    let sorted = true;
    for (let i = 1; i < grays.length; i++) {
      if (grays[i - 1] > grays[i]) {
        sorted = false;
        break;
      }
    }
    if (sorted) {
      setFeedback("Correct order! You win!");
    } else {
      setFeedback("Incorrect order. Keep trying!");
    }
  };

  return (
    <div className="value-trainer">
      <div className="mode-toggle">
        <button
          className={mode === 1 ? "active" : ""}
          onClick={() => setMode(1)}
        >
          Matching Mode
        </button>
        <button
          className={mode === 2 ? "active" : ""}
          onClick={() => setMode(2)}
        >
          Sorting Mode
        </button>
      </div>
      {mode === 2 && (
        <button onClick={checkSortingOrder}>Check Order</button>
      )}
      {feedback && (
        <div style={{ margin: "15px", fontWeight: "bold" }}>{feedback}</div>
      )}
      <div className="cards-container">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => mode === 1 && handleCardClick(index)}
          >
            <ColorCard
              color={card}
              draggable={mode === 2}
              onDragStart={handleDragStart(index)}
              onDrop={handleDrop(index)}
              onDragOver={handleDragOver}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper: Generates a random color as an object {r, g, b}
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
}

// Helper: Computes the grayscale value using the formula (0.299*r + 0.587*g + 0.114*b)
function computeGray({ r, g, b }) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

// Helper: Generate a matching color given a target gray value.
// This uses a loop to randomly choose R and G then calculates B until it is in range.
function generateMatchingColor(gray) {
  let B = -1;
  let R, G;
  while (!(B >= 0 && B <= 255)) {
    R = Math.floor(Math.random() * 256);
    G = Math.floor(Math.random() * 256);
    B = Math.floor((gray - (R * 0.3 + G * 0.59)) / 0.11);
  }
  return { r: R, g: G, b: B };
}

// Helper: Shuffle an array using the Fisher–Yates algorithm
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export default ValueTrainer;
