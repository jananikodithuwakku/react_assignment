import { useState } from "react";

import "./Assignment_44.css";

const CAPACITY = 4;

const INITIAL = [
  ["#0da965", "#cc363d", "#3383d6"],
  ["#3383d6", "#8036d6", "#80373e"],
  ["#cc833e", "#80373e", "#0da965"],
  ["#80373e", "#8036d6", "#3383d6"],
  ["#cc363d", "#cc833e", "#80373e"],
  ["#8036d6", "#0da965", "#cc363d"],
  ["#8036d6", "#cc833e", "#3383d6"],
  ["#0da965", "#cc363d", "#cc833e"],
];

export default function Assignment_44() {
  const [bottles, setBottles] = useState(INITIAL); 
  const [history, setHistory] = useState([]); 
  const [selected, setSelected] = useState(null);
  const [pouring, setPouring] = useState(null);

  const saveHistory = () =>
    setHistory((h) => [...h, bottles.map((b) => [...b])]);

  const undo = () => {
    if (!history.length) return;
    setBottles(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
  };

  const restart = () => {
    setBottles(INITIAL.map((b) => [...b]));
    setHistory([]);
    setSelected(null);
    setPouring(null);
  };

  const handleClick = (i) => {
    if (selected === null) {
      if (bottles[i].length) setSelected(i);
      return;
    }

    if (selected === i) {
      setSelected(null);
      return;
    }

    const from = bottles[selected];
    const to = bottles[i];

    if (!from.length || to.length === CAPACITY) {
      setSelected(null);
      return;
    }

    const color = from[from.length - 1];
    if (to.length && to[to.length - 1] !== color) {
      setSelected(null);
      return;
    }

    let count = 0;
    for (let k = from.length - 1; k >= 0; k--) {
      if (from[k] === color) count++;
      else break;
    }

    const move = Math.min(count, CAPACITY - to.length);

    saveHistory();
    setPouring(selected);

    setTimeout(() => {
      const next = bottles.map((b) => [...b]);
      for (let m = 0; m < move; m++) {
        next[selected].pop();
        next[i].push(color);
      }
      setBottles(next);
      setPouring(null);
    }, 300);

    setSelected(null);
  };

  const isSolved = () =>
    bottles.every(
      (b) =>
        b.length === 0 || (b.length === CAPACITY && b.every((c) => c === b[0]))
    );

  return (
    <div className="page">
      <div className="panel-wrapper">
        <div className="overlay-ui right">
          <button onClick={undo} disabled={!history.length}>
             Undo
          </button>
          <button onClick={restart}> Restart</button>
        </div>

        <div className="panel">
          {bottles.map((bottle, i) => (
            <div
              key={i}
              className={`tube ${selected === i ? "active" : ""} ${
                pouring === i ? "pouring" : ""
              }`}
              onClick={() => handleClick(i)}
            >
              {bottle.length === CAPACITY &&
                bottle.every((c) => c === bottle[0]) && (
                  <div className="done-text">DONE</div>
                )}

              {[...Array(CAPACITY)].map((_, level) => (
                <div
                  key={level}
                  className="water"
                  style={{ background: bottle[level] || "transparent" }}
                />
              ))}
            </div>
          ))}
        </div>

        {isSolved() && (
          <div className="win-overlay">
            <div className="win">Puzzle Completed!</div>
            <button onClick={restart}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
