import { useState, useEffect } from "react";
import levels from "./Assignment_46.json"; 
import "./Assignment_46.css";

export default function Assignment_46() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [grid, setGrid] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [path, setPath] = useState([]);
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
  }, [level]);

  const handleMouseDown = (x, y) => {
    if (grid[y][x] !== "") return; 
    setDragging(true);
    setPath([{ x, y }]);
  };

  const handleMouseEnter = (x, y) => {
    if (!dragging) return;
    if (grid[y][x] !== "") return;

    const index = path.findIndex(p => p.x === x && p.y === y);

    if (index !== -1) {
      setPath(path.slice(0, index + 1));
    } else {
      setPath([...path, { x, y }]);
    }
  };

  const stopDragging = () => {
    setDragging(false); 
    setPath([]);
  };

  const getNumber = (x, y) => {
    if (grid[y][x] !== "") return grid[y][x]; 

    const index = path.findIndex(p => p.x === x && p.y === y);
    return index !== -1 ? index + 1 : "";
  };

  return (
    <div className="container_46">
      <div
        className="grid_46"
        style={{
          gridTemplateColumns: `repeat(${level.width}, 1fr)`
        }}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {grid.map((row, y) =>
          row.map((_, x) => (
            <div
              key={`${x}-${y}`}
              className={`cell_46 ${
                grid[y][x] !== "" ? "fixed_46" : ""
              }`}
              onMouseDown={() => handleMouseDown(x, y)}
              onMouseEnter={() => handleMouseEnter(x, y)}
            >
              {getNumber(x, y) && <span>{getNumber(x, y)}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
