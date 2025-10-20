import { useState, useRef } from "react";
import "./Assignment_32.css";

export default function Assignment_32() {
  const [activeItem, setActiveItem] = useState(null); // state to track which item is zoomed
  const [zoomStyle, setZoomStyle] = useState({}); // inline style for zoom overlay
  const [closing, setClosing] = useState(false); // state to track zoom-out animation
  const containerRef = useRef(null); // references to container and each item
  const itemRefs = useRef([]); // numbers and colors for grid items

  const items = Array.from({ length: 8 }, (_, i) => i + 1);
  const colors = [
    "#ff6b6b", "#feca57", "#1dd1a1", "#54a0ff",
    "#5f27cd", "#48dbfb", "#ff9ff3", "#10ac84"
  ];
  
  // When a number box is clicked
  const handleClick = (index) => {
    // get clicked item and container positions
    const rect = itemRefs.current[index].getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // calculate relative position inside container
    const x = rect.left - containerRect.left;
    const y = rect.top - containerRect.top;

    // apply zoom animation starting from clicked box
    setZoomStyle({
      top: y + "px",
      left: x + "px",
      width: rect.width + "px",
      height: rect.height + "px",
      background: colors[index],
    });
    // set the clicked item as active
    setActiveItem(index);
  };

  
  // when the zoomed item is clicked (to close)
  const closeZoom = () => {
    if (activeItem === null) return;

    // get original item position
    const rect = itemRefs.current[activeItem].getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = rect.left - containerRect.left;
    const y = rect.top - containerRect.top;

    // trigger reverse animation
    setClosing(true);
    setZoomStyle({
      top: "50%",
      left: "50%",
      width: "300px",
      height: "300px",
      transform: "translate(-50%, -50%) scale(1)",
      background: colors[activeItem],
    });

    // after small delay animate back to grid position
    setTimeout(() => {
      setZoomStyle({
        top: y + "px",
        left: x + "px",
        width: rect.width + "px",
        height: rect.height + "px",
        background: colors[activeItem],
        transform: "scale(1)",
      });
    }, 50);

    // after animation ends, reset active state
    setTimeout(() => {
      setActiveItem(null);
      setClosing(false);
    }, 500);
  };

  return (
    <div className="body-container">
    <div className="zoom-grid-container" ref={containerRef}>
      {items.map((num, i) => (
        <div
          key={i}
          ref={(el) => (itemRefs.current[i] = el)}
          className="zoom-item"
          style={{ background: colors[i] }}
          onClick={() => handleClick(i)}
        >
          {num}
        </div>
      ))}

      {activeItem !== null && (
        <div
          className={`zoom-overlay ${closing ? "zoom-out" : ""}`}
          style={zoomStyle}
          onClick={closeZoom}
        >
          <div className="zoom-number">{items[activeItem]}</div>
        </div>
      )}
    </div>
    </div>
  );
}
