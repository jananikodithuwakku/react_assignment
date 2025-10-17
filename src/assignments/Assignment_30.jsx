import { useEffect, useState } from "react";
import "./Assignment_30.css";

export default function Assignment_30() {
  // Puzzle categories
  const puzzles = {
    Vehicle: ["🚗", "🚌", "🏎️", "🚓", "🚑", "🚒", "🚜", "✈️"],
    Animal: ["🐶", "🐱", "🐭", "🐰", "🐻", "🐼", "🦊", "🐸"],
    Food: ["🥕", "🍔", "🥞", "🍪", "🧁", "🍫", "🍊", "🥦"],
    Sports: ["⚽", "🏀", "🏈", "🎾", "🏐", "🏓", "🥊", "🏸"],
  };

  const [category, setCategory] = useState(null); // selected category
  const [collection, setCollection] = useState([]); // generated shuffled cards 
  const [flipped, setFlipped] = useState([]); // currently fipped cards
  const [matched, setMatched] = useState([]); // cards that are matched
  const [disableClick, setDisableClick] = useState(false); // prevent multiple clicks

  // Generate collection when category changes
  useEffect(() => {
    if (!category) return;
    const selected = puzzles[category];
    const doubled = [...selected, ...selected]; // duplicate items
    const shuffled = doubled.sort(() => Math.random() - 0.5); // random order
    setCollection(shuffled);  // update the card list
    setFlipped([]);
    setMatched([]);
  }, [category]);

  // handle card fipping logic
  const handleFlip = (index) => {
    if (disableClick) return; // prevent clicks when temporarily disabled
    if (flipped.includes(index) || matched.includes(index)) return; // flipping same or already matched cards

    // flip the clicked card
    setFlipped((prev) => [...prev, index]);

    if (flipped.length === 1) {
      const first = flipped[0];
      const second = index;

      if (collection[first] === collection[second]) {
        // Match found - add to matched
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
      } else {
        // Not matched - flip back
        setDisableClick(true);
        setTimeout(() => {
          setFlipped([]);
          setDisableClick(false);
        }, 800);
      }
    }
  };

  return (
    <div className="game-container">
      <h2> Flip and Match Game</h2>

      {/* Category selection */}
      {!category && (
        <div className="categories">
          {Object.keys(puzzles).map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Game grid */}
      {category && (
        <>
          <h3>Category: {category}</h3>
          <div className="grid">
            {collection.map((symbol, index) => {
              const isFlipped = flipped.includes(index) || matched.includes(index);
              const isMatched = matched.includes(index);
              return (
                <div
                  key={index}
                  className={`card ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""}`}
                  onClick={() => handleFlip(index)}
                >
                  <div className="inner">
                    <div className="front">❓</div>
                    <div className="back">{symbol}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset button */}
          <button className="reset-btn" onClick={() => setCategory(null)}>
             Choose Another Category
          </button>

          {/* Win message */}
          {matched.length === collection.length && (
            <div className="win-message"> You Matched All!</div>
          )}
        </>
      )}
    </div>
  );
}
