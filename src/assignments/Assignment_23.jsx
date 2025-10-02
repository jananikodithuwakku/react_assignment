import { useState, useEffect } from "react";

export default function Assignment_23() {
  const [isOpen, setIsOpen] = useState(false); // show/hide context menu
  const [position, setPosition] = useState({ top: 0, left: 0 }); // menu position
  const [bgColor, setBgColor] = useState("white"); // background color state

  // apply selected background color
  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  // Handle right click
  const handleContextMenu = (event) => {
    event.preventDefault(); // disable default browser menu
    setPosition({ top: event.clientY, left: event.clientX });
    setIsOpen(true);
  };

  // Handle button click for color
  const handleClick = (color) => {
    setBgColor(color);
    setIsOpen(false);
  };

  // Button styles
  const buttonStyle = {
    display: "block",
    width: "140px",
    margin: "8px 0",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <h2 style={{ color: "black", padding: "10px" }}>
        Right Click Anywhere to Change Page Color
      </h2>

      {/* Right Click Context Menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            background: "white",
            padding: "12px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <button
            style={{
              ...buttonStyle,
              backgroundColor: "#f5f5f5",
              color: "black",
            }}
            onClick={() => handleClick("white")}
          >
            Default Page
          </button>

          <button
            style={{ ...buttonStyle, backgroundColor: "#3b0a12ff" }}
            onClick={() => handleClick("#3b0a12ff")}
          >
            Dark Pink
          </button>
          <button
            style={{ ...buttonStyle, backgroundColor: "#0e3147ff" }}
            onClick={() => handleClick("#0e3147ff")}
          >
            Dark Blue
          </button>
          <button
            style={{ ...buttonStyle, backgroundColor: "#122512ff" }}
            onClick={() => handleClick("#122512ff")}
          >
            Dark Green
          </button>
          <button
            style={{ ...buttonStyle, backgroundColor: "#37410bff" }}
            onClick={() => handleClick("#37410bff")}
          >
            Olive
          </button>
        </div>
      )}
    </div>
  );
}
