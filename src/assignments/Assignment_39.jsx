import { useEffect, useState } from "react";
import "./Assignment_39.css";

const keyboardRows = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
    ["Ctrl", "Alt", "Space", "Alt", "Ctrl"],
  ];

export default function Assignment_39() {
  const [pressedKeys, setPressedKeys] = useState([]); // store active keys

  useEffect(() => {
    // normalize key names to match layout
    const normalizeKey = (key) => {
      if (key === " ") return "Space";
      if (key === "ShiftLeft" || key === "ShiftRight") return "Shift";
      if (key === "Control") return "Ctrl";
      if (key === "AltGraph" || key === "Alt") return "Alt";
      return key.length === 1 ? key.toUpperCase() : key;
    };

     // when a key is pressed
    const handleKeyDown = (e) => {
      const key = normalizeKey(e.key);
      if (!pressedKeys.includes(key)) setPressedKeys((prev) => [...prev, key]);
    };

     // when a key is released
    const handleKeyUp = (e) => {
      const key = normalizeKey(e.key);
      setPressedKeys((prev) => prev.filter((k) => k !== key));
    };

    // add keyboard listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

     // cleanup listeners on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKeys]);

   // set custom widths for special keys
  const getKeyWidth = (key) => {
    const widths = {
      Backspace: "100px",
      Tab: "70px",
      CapsLock: "90px",
      Enter: "90px",
      Shift: "100px",
      Ctrl: "70px",
      Alt: "70px",
      Space: "400px",
    };
    return widths[key] || "50px";
  };

  return (
    <div className="keyboard-container">
      <h2 className="title">On-Screen Keyboard</h2>
      <textarea
        className="keyboard-textarea"
        placeholder="Type here..."
        rows="3"
      ></textarea>

      <div className="keyboard">
        {keyboardRows.map((row, i) => (
          <div key={i} className="keyboard-row">
            {row.map((key, idx) => (
              <div
                key={`${key}-${idx}`} // make key unique
                className={`key ${pressedKeys.includes(key) ? "active" : ""}`}
                style={{ width: getKeyWidth(key) }}
              >
                {key === "Space" ? "" : key}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
