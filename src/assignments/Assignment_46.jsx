import { useState } from "react";

import "./Assignment_46.css";

const SIZE = 4;

export default function Assignment_46() {
  const [dragging, setDragging] = useState(false);
  const [path, setPath] = useState([]);

  const handleMouseDown = (x, y) => {
    setDragging(true);
    setPath([{ x, y }]);
  };

  const handleMouseEnter = (x, y) => {
    if (!dragging) return;

    const index = path.findIndex(p => p.x === x && p.y === y);

    if (index !== -1) {
      setPath(path.slice(0, index + 1));
    } else {
      setPath([...path, { x, y }]);
    }
  };

  const stopDragging = () => setDragging(false);

  const getNumber = (x, y) => {
    const index = path.findIndex(p => p.x === x && p.y === y);
    return index !== -1 ? index + 1 : "";
  };

  return (
    <div className="container_46">
      <div
        className="grid_46"
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {Array.from({ length: SIZE }).map((_, x) =>
          Array.from({ length: SIZE }).map((_, y) => (
            <div
              className="cell_46"
              key={`${x}-${y}`}
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
