import { useEffect, useState } from "react";
import levels from "./hidato_level.json";

import "./Assignment_45.css";

export default function Assignment_45() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [placed, setPlaced] = useState({});
  const [pathIndex, setPathIndex] = useState(0);
  const [wrongCell, setWrongCell] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const level = levels[levelIndex];

  useEffect(() => {
    const init = {};
    level.fixed.forEach((c) => {
      init[`${c.x}-${c.y}`] = c.value;
    });

    setPlaced(init);
    setWrongCell(null);
    setCompleted(false);

    let start = 0;
    while (
      level.fixed.some(
        (f) =>
          f.x === level.solution[start]?.x && f.y === level.solution[start]?.y
      )
    ) {
      start++;
    }
    setPathIndex(start);
  }, [levelIndex, level.fixed, level.solution]);

  const isFixed = (x, y) => level.fixed.some((f) => f.x === x && f.y === y);

  const handleClick = (x, y) => {
    if (completed || gameFinished) return;
    if (isFixed(x, y)) return;

    const expected = level.solution[pathIndex];
    if (!expected) return;

    if (expected.x === x && expected.y === y) {
      const value = pathIndex + 1;

      setPlaced((p) => ({
        ...p,
        [`${x}-${y}`]: value,
      }));

      let next = pathIndex + 1;

      while (
        level.fixed.some(
          (f) =>
            f.x === level.solution[next]?.x && f.y === level.solution[next]?.y
        )
      ) {
        next++;
      }

      setPathIndex(next);

      if (next >= level.solution.length) {
        if (levelIndex === levels.length - 1) {
          setGameFinished(true); 
        } else {
          setCompleted(true);
        }
      }
    } else {
      setWrongCell(`${x}-${y}`);
      setTimeout(() => setWrongCell(null), 250);
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
            gridTemplateRows: `repeat(${level.height}, 70px)`,
          }}
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
                  onClick={() => handleClick(x, y)}
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
          <button
            onClick={() => {
              setLevelIndex((i) => i + 1);
              setCompleted(false);
            }}
          >
            Next Level
          </button>
        </div>
      )}

      {gameFinished && (
        <div className="completed final">
          <strong>Congratulations!</strong>
          <p>
            You completed all <strong>{levels.length}</strong> levels
          </p>
          <p className="score">
            Score:{" "}
            <strong>
              {levels.length} / {levels.length}
            </strong>
          </p>
          <button
            onClick={() => {
              setLevelIndex(0);
              setGameFinished(false);
              setCompleted(false);
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
