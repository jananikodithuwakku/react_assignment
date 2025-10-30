import { useState, useRef } from "react";
import "./Assignment_37.css";
const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

export default function Assignment_37() {
  const [index, setIndex] = useState(0); // current active item index
  
  // refs for drag/swipe logic
  const startX = useRef(0); // starting X position
  const isDragging = useRef(false); // track if dragging
  const deltaX = useRef(0); // distance moved

  // mouse press
  const handleMouseDown = (e) => {
    isDragging.current = true; // start drag
    startX.current = e.clientX; // record start point
  };

  // mouse move
  const handleMouseMove = (e) => {
    if (!isDragging.current) return; // only if dragging
    deltaX.current = e.clientX - startX.current; // track movement
  };

    // mouse release
  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false; // stop dragging
    // detect swipe direction
    if (deltaX.current > 60) prevSlide(); // swipe right
    else if (deltaX.current < -60) nextSlide(); // swipe left
    deltaX.current = 0; // reset
  };

  // touch (mobile)
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;  // first touch point
  };

  // touch move
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };

   // touch end
  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (deltaX.current > 60) prevSlide();
    else if (deltaX.current < -60) nextSlide();
    deltaX.current = 0;
  };


  const nextSlide = () => setIndex((prev) => (prev + 1) % items.length);   // move to next item
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + items.length) % items.length); // move to previous item

  // Calculate each item's position and style
  const getStyle = (i) => {
    const diff = (i - index + items.length) % items.length; // distance from active
    const middle = Math.floor(items.length / 2);// center position
    let position = diff - middle; // shift based on center
    const scale = 1 - Math.abs(position) * 0.15; // smaller when far
    const opacity = Math.max(0, 1 - Math.abs(position) * 0.6);  // fade out sides
    const left = 250 + position * 220; // horizontal spacing

    // return dynamic style
    return {
      left: `${left}px`,
      transform: `scale(${scale})`,
      opacity,
      zIndex: 100 - Math.abs(position),
    };
  };

  return (
    <div className="slider-container">
      <button className="nav-btn left" onClick={prevSlide}>
        ◀
      </button>

      <div
        className="items"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, i) => (
          <div key={i} className="item" style={getStyle(i)}>
            {item}
          </div>
        ))}
      </div>

      <button className="nav-btn right" onClick={nextSlide}>
        ▶
      </button>
    </div>
  );
}
