import { useState, useEffect } from "react";
import levels from "./Assignment_46.json";
import "./Assignment_46.css";

export default function Assignment_46() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [grid, setGrid] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [path, setPath] = useState([]);
  const [startValue, setStartValue] = useState(0);
  const [status, setStatus] = useState("playing"); 
  const [gameFinished, setGameFinished] = useState(false);
  const level = levels[levelIndex];

  useEffect(() => {
    const emptyGrid = Array.from(
      { length: level.height },
      () => Array(level.width).fill("")
    );

    level.fixed.forEach(({ x, y, value }) => {
      emptyGrid[y][x] = value;
    });

    setGrid(emptyGrid);
    setPath([]);
    setDragging(false);
    setStartValue(0);
    setStatus("playing");
    setGameFinished(false);
  }, [level]);

  const fixedMap = {};
  level.fixed.forEach(f => {
    fixedMap[`${f.x}-${f.y}`] = f.value;
  });

  const maxValue = level.width * level.height;

  const handleMouseDown = (x, y) => {
    setDragging(true);
    setPath([{ x, y }]);
  };

  const handleMouseEnter = (x, y) => {
    if (!dragging || status !== "playing") return;

    const index = path.findIndex(p => p.x === x && p.y === y);

    if (index !== -1) {
      setPath(path.slice(0, index + 1));
    } else {
      setPath([...path, { x, y }]);
    }
  };

  const validatePath = () => {
    let value = startValue;

    for (let i = 0; i < path.length; i++) {
      value++;

      const { x, y } = path[i];
      const fixedHere = fixedMap[`${x}-${y}`];

      if (fixedHere && fixedHere !== value) {
        return false;
      }
    }

    return value === maxValue;
  };

  const stopDragging = () => {
    if (!dragging) return;
    setDragging(false);

    const correct = validatePath();

    if (correct) {
      if (levelIndex === levels.length - 1) {
        setGameFinished(true);
      } else {
        setStatus("success");
      }
    } else {
      setStatus("wrong");
      setTimeout(() => {
        setPath([]);
        setStatus("playing");
      }, 600);
    }
  };

  const getNumber = (x, y) => {
    if (grid[y][x] !== "") return grid[y][x];

    const index = path.findIndex(p => p.x === x && p.y === y);
    if (index === -1) return "";

    return startValue + index + 1;
  };

  const nextLevel = () => {
    setLevelIndex(prev => prev + 1);
  };

  return (
    <div className="container_46">
      {!gameFinished && (
        <>
          <div
            className={`grid_46 ${status === "wrong" ? "shake" : ""}`}
            style={{
              gridTemplateColumns: `repeat(${level.width}, 1fr)`
            }}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
          >
            {grid.map((row, y) =>
              row.map((_, x) => {
                const inPath = path.some(p => p.x === x && p.y === y);

                return (
                  <div
                    key={`${x}-${y}`}
                    className={`cell_46
                      ${grid[y][x] !== "" ? "fixed_46" : ""}
                      ${inPath && status === "success" ? "correct" : ""}
                      ${inPath && status === "wrong" ? "wrong" : ""}
                    `}
                    onMouseDown={() => handleMouseDown(x, y)}
                    onMouseEnter={() => handleMouseEnter(x, y)}
                  >
                    {getNumber(x, y) && <span>{getNumber(x, y)}</span>}
                  </div>
                );
              })
            )}
          </div>

          {status === "success" && levelIndex < levels.length - 1 && (
            <button className="next_btn" onClick={nextLevel}>
              Next Level 
            </button>
          )}
        </>
      )}

      {gameFinished && (
        <div className="final_message">
          Congratulations! <br />
          You completed all 5 levels!
        </div>
      )}
    </div>
  );
}
