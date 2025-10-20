import { useState, useRef } from "react";

export default function Assignment_33() {
  const boxRef = useRef(null); // reference to draggable box
  const [dragging, setDragging] = useState(false); // drag state 
  const [origin, setOrigin] = useState({ ox: 0, oy: 0 }); // cursor start position
  const [elementOrigin, setElementOrigin] = useState({ ex: 0, ey: 0 }); // element start
  const [position, setPosition] = useState({ left: 100, top: 100 }); // element position

  // Handle drag start
  const handleMouseDown = (e) => {
    const box = boxRef.current;
    if (!box) return;

    setDragging(true);
    setOrigin({ ox: e.clientX, oy: e.clientY }); // store cursor start
    setElementOrigin({
      ex: box.offsetLeft, // store box’s initial X
      ey: box.offsetTop, // store box’s initial Y
    });
  };

  // Handle dragging
  const handleMouseMove = (e) => {
    if (!dragging) return;

    const { ox, oy } = origin; // starting cursor coords
    const { ex, ey } = elementOrigin;  // starting box coords
    const cx = e.clientX; // current cursor X
    const cy = e.clientY; // current cursor Y

    // Calculate distance moved
    const dx = cx - ox;
    const dy = cy - oy;

    // Update position
    setPosition({ left: ex + dx, top: ey + dy });
  };

  // Handle drag stop
  const stopDragging = () => setDragging(false);

  return (
    <div
      style={{
        width: "85vw",
        height: "85vh",
        background: "#949191ff",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      <div
        ref={boxRef}
        onMouseDown={handleMouseDown}
        style={{
          width: 100,
          height: 100,
          background: dragging ? "#05183bff" : "#044255ff",
          position: "absolute",
          cursor: "grab",
          left: position.left,
          top: position.top,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          userSelect: "none",
          transition: dragging ? "none" : "0.2s ease",
        }}
      >
        Drag Me
      </div>
    </div>
  );
}
