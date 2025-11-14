import { useEffect, useState } from "react";
import "./Assignment_42.css";

export default function Assignment_42() {
  const [time, setTime] = useState(new Date());  // store current time

  useEffect(() => {
    // update time every second
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

    // format time (24-hour)
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="drum-clock">
         {/* split time into characters and display */}
      {[...hours, ":", ...minutes, ":", ...seconds].map((char, index) => (
        <div key={index} className="digit-wrapper">
          {char === ":" ? (
            <div className="separator">{char}</div>
          ) : (
            <DrumDigit value={char} />
          )}
        </div>
      ))}
    </div>
  );
}

function DrumDigit({ value }) {
  const [prev, setPrev] = useState(value); // previous digit before animation
  const [flipping, setFlipping] = useState(false); // control flip animation

  useEffect(() => {
    // trigger animation when digit changes
    if (value !== prev) {
      setFlipping(true);
      const t = setTimeout(() => {
        setPrev(value); // update to new digit
        setFlipping(false); // stop animation
      }, 600);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <div className={`drum-digit ${flipping ? "flip" : ""}`}>
      <div className="digit old">{prev}</div>
      <div className="digit new">{value}</div>
    </div>
  );
}
