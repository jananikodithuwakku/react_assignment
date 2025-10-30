import { useState, useEffect, useRef } from "react";
import "./Assignment_36.css";
const rows = 10; // grid height
const cols = 15; // grid width
const speed = 200; // movement speed (ms)

export default function Assignment_36() {
  const [direction, setDirection] = useState({ x: 1, y: 0 }); // moving right initially
  const intervalRef = useRef(null); // to store setInterval reference
  const [snake, setSnake] = useState([
    { x: 2, y: 2 },
    { x: 2, y: 3 },
    { x: 2, y: 4 },
    { x: 2, y: 5 },
    { x: 2, y: 6 },
    { x: 2, y: 7 },
  ]); // Snake body coordinates (6 blocks)

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -1 }); // move up
          break;
        case "ArrowDown":
          setDirection({ x: 0, y: 1 }); // move down
          break;
        case "ArrowLeft":
          setDirection({ x: -1, y: 0 }); // move left
          break;
        case "ArrowRight":
          setDirection({ x: 1, y: 0 }); // move right
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown); // listen to key presses
    return () => window.removeEventListener("keydown", handleKeyDown); // cleanup
  }, []);

  // Move snake continuously
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        // calculate new head position
        const newHead = {
          x: (prevSnake[0].x + direction.x + cols) % cols, // move and wrap X
          y: (prevSnake[0].y + direction.y + rows) % rows, // move and wrap Y
        };

        const newSnake = [newHead, ...prevSnake.slice(0, -1)]; // move forward (no grow)
        return newSnake; // update new snake
      });
    }, speed);

    return () => clearInterval(intervalRef.current); // clear timer on unmount
  }, [direction]); // rerun when direction changes

  return (
    <div className="snake-container">
      <h2>Snake Movement </h2>
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {[...Array(rows * cols)].map((_, index) => {
          const x = index % cols;
          const y = Math.floor(index / cols);

          const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;

          return (
            <div
              key={index}
              className={`cell ${isSnake ? "snake" : ""} ${
                isHead ? "head" : ""
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
