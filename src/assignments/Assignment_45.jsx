import { useEffect, useState } from "react";
import levels from "./hidato_level.json";
import "./Assignment_45.css";

export default function Assignment_45() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [placed, setPlaced] = useState({});
  const [path, setPath] = useState([]); 
  const [currentValue, setCurrentValue] = useState(1);
  const [currentCell, setCurrentCell] = useState(null);
  const [wrongCell, setWrongCell] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [dragging, setDragging] = useState(false);

  const level = levels[levelIndex];

  useEffect(() => {
    const init = {};
    let start = null;

    level.fixed.forEach(f => {
      init[`${f.x}-${f.y}`] = f.value;
      if (f.value === 1) start = { x: f.x, y: f.y };
    });

    setPlaced(init);
    setPath([]);
    setCurrentCell(start);
    setCurrentValue(2);
    setWrongCell(null);
    setCompleted(false);
    setDragging(false);
  }, [levelIndex]);

  const isFixed = (x, y) =>
    level.fixed.some(f => f.x === x && f.y === y);

  const isAdjacent = (a, b) =>
    Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;

  const isReverseMove = key =>
    path.length >= 2 && path[path.length - 2] === key;

  const resetPath = () => {
    const fixedOnly = {};
    let start = null;

    level.fixed.forEach(f => {
      fixedOnly[`${f.x}-${f.y}`] = f.value;
      if (f.value === 1) start = { x: f.x, y: f.y };
    });

    setPlaced(fixedOnly);
    setPath([]);
    setCurrentCell(start);
    setCurrentValue(2);
  };

  const triggerWrong = key => {
    setWrongCell(key);
    setTimeout(() => {
      setWrongCell(null);
      resetPath();
    }, 300);
  };

  const handleEnter = (x, y) => {
    if (!dragging || completed || gameFinished) return;
    if (!currentCell) return;

    const key = `${x}-${y}`;

    if (isReverseMove(key)) {
      const lastKey = path[path.length - 1];

      setPlaced(p => {
        const copy = { ...p };
        delete copy[lastKey];
        return copy;
      });

      setPath(p => p.slice(0, -1));
      setCurrentCell({ x, y });
      setCurrentValue(v => v - 1);
      return;
    }

    if (!isAdjacent(currentCell, { x, y })) {
      triggerWrong(key);
      return;
    }

    const fixedCell = level.fixed.find(f => f.x === x && f.y === y);

    if (fixedCell) {
      if (fixedCell.value !== currentValue) {
        triggerWrong(key);
        return;
      }

      setCurrentCell({ x, y });
      setCurrentValue(v => v + 1);
      return;
    }

    if (placed[key]) return;

    setPlaced(p => ({ ...p, [key]: currentValue }));
    setPath(p => [...p, key]);
    setCurrentCell({ x, y });
    setCurrentValue(v => v + 1);

    if (currentValue === level.max) {
      levelIndex === levels.length - 1
        ? setGameFinished(true)
        : setCompleted(true);
    }
  };

  return (
    <div className="hidato-wrapper">
      <h1>Hidato Game</h1>
      {!gameFinished && <h3>Level {levelIndex + 1}</h3>}

      {!gameFinished && (
        <div
          className="hidato-grid"
          style={{
            gridTemplateColumns: `repeat(${level.width}, 70px)`,
            gridTemplateRows: `repeat(${level.height}, 70px)`
          }}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
        >
          {[...Array(level.height)].map((_, y) =>
            [...Array(level.width)].map((_, x) => {
              const key = `${x}-${y}`;
              const value = placed[key];
              const fixed = isFixed(x, y);

              return (
                <div
                  key={key}
                  className={`hidato-cell
                    ${fixed ? "fixed" : ""}
                    ${wrongCell === key ? "wrong" : ""}
                    ${value && !fixed ? "filled" : ""}
                  `}
                  onMouseEnter={() => handleEnter(x, y)}
                >
                  {value && <span>{value}</span>}
                </div>
              );
            })
          )}
        </div>
      )}

      {completed && (
        <div className="completed">
          Level Completed!
          <button onClick={() => setLevelIndex(i => i + 1)}>
            Next Level
          </button>
        </div>
      )}

      {gameFinished && (
        <div className="completed final">
          <strong>Congratulations!</strong>
          <p>You completed all {levels.length} levels</p>
          <button
            onClick={() => {
              setLevelIndex(0);
              setGameFinished(false);
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
