import { useState } from "react";
import "./Assignment_47.css";

const radius = 20;
const points = [
  { id: 1, x: 90, y: 90 },
  { id: 2, x: 180, y: 90 },
  { id: 3, x: 270, y: 90 },

  { id: 4, x: 90, y: 180 },
  { id: 5, x: 180, y: 180 },
  { id: 6, x: 270, y: 180 },

  { id: 7, x: 90, y: 270 },
  { id: 8, x: 180, y: 270 },
  { id: 9, x: 270, y: 270 },
];

export default function Assignment_47() {
  const [selected, setSelected] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [current, setCurrent] = useState(null);

  const handleStart = (p) => {
    setDragging(true);
    setSelected([p]);
    setCurrent({ x: p.x, y: p.y });
  };

  const handleMove = (e) => {
    if (!dragging) return;

    const rect = e.currentTarget.getBoundingClientRect(); // SVG position on the screen
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrent({ x, y });

    points.forEach((p) => {
      const dx = x - p.x;
      const dy = y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= radius) {
        if (!selected.find((s) => s.id === p.id)) {
          setSelected((prev) => [...prev, p]);
        }
      }
    });
  };

  const handleEnd = () => {
    console.log(
      "Pattern:",
      selected.map((p) => p.id)
    );
    setDragging(false);
    setCurrent(null);
    setSelected([]);
  };

  return (
    <div className="phone">
      <div className="pattern-box">
        <p className="text">Draw Unlock Pattern</p>

        <svg
          width="350"
          height="450"
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
        >
          {selected.map((p, i) => {
            if (i === 0) return null;
            const prev = selected[i - 1];

            return (
              <line
                key={i}
                x1={prev.x}
                y1={prev.y}
                x2={p.x}
                y2={p.y}
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="5"
                strokeLinecap="round"
              />
            );
          })}

          {dragging && current && selected.length > 0 && (
            <line
              x1={selected[selected.length - 1].x}
              y1={selected[selected.length - 1].y}
              x2={current.x}
              y2={current.y}
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="5"
              strokeLinecap="round"
            />
          )}

          {points.map((p) => {
            const active = selected.find((s) => s.id === p.id);

            return (
              <g key={p.id}>
                {active && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="20"
                    fill="rgba(255,255,255,0.18)"
                  />
                )}

                <circle
                  cx={p.x}
                  cy={p.y}
                  r="5"
                  fill="black"
                  onMouseDown={() => handleStart(p)}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
