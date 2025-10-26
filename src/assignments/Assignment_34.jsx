import { useState, useRef } from "react";
import "./Assignment_34.css";
import { Plus, Trash2, Play, Square } from "lucide-react";

export default function Assignment_34() {
  const [slides, setSlides] = useState([
    { id: 1, text: "WELCOME TO SLIDE 1", bg: "#0b307eff", animation: "" },
  ]); // stores array of slide objects
  
  const [current, setCurrent] = useState(0); // current slide index
  const [isPlaying, setIsPlaying] = useState(false); // play mode
  const containerRef = useRef(null); // ref for fullscreen container

  const colors = [
    "#05163aff",
    "#4d0505ff",
    "#04421bff",
    "#522607ff",
    "#24053fff",
  ]; // slide background colors

  const animations = ["fade", "up", "down", "blur", "rotate"]; // slide animation options

  // start slideshow in fullscreen
  const handlePlay = () => {
    const elem = containerRef.current;
    if (elem.requestFullscreen) elem.requestFullscreen();
    setIsPlaying(true);
  };

  // exit fullscreen slideshow
  const handleExit = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    setIsPlaying(false);
  };

  // show next slide
  const handleNextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // show previous slide
  const handlePrevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // add a new slide
  const addSlide = () => {
    setSlides([
      ...slides,
      {
        id: Date.now(),
        text: `NEW SLIDE ${slides.length + 1}`,
        bg: "#475569",
        animation: "",
      },
    ]);
  };

  // delete a slide
  const deleteSlide = (index) => {
    if (slides.length > 1) {
      const updated = slides.filter((_, i) => i !== index);
      setSlides(updated);
      setCurrent(Math.max(0, index - 1));
    }
  };

  // update current slide text or color
  const updateSlide = (key, value) => {
    const updated = [...slides];
    updated[current][key] = value;
    setSlides(updated);
  };

  // apply animation to current slide
  const applyAnimation = (anim) => {
    const updated = [...slides];
    updated[current].animation = anim;
    setSlides(updated);
  };

  return (
    <div
      ref={containerRef}
      className={`${
        isPlaying
          ? "w-screen h-screen bg-black flex items-center justify-center"
          : "container"
      }`}
    >
      {!isPlaying ? (
        <div className="editor">
          {/* Sidebar */}
          <div className="listing">
            {slides.map((s, i) => (
              <div
                key={s.id}
                className={`listing-item ${i === current ? "active" : ""}`}
                style={{ background: s.bg }}
                onClick={() => setCurrent(i)}
              >
                {s.text.slice(0, 1)}
                <div
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSlide(i);
                  }}
                >
                  <Trash2 size={14} />
                </div>
              </div>
            ))}
            <div className="listing-item add" onClick={addSlide}>
              <Plus size={16} />
            </div>
          </div>

          {/* Main Slide */}
          <div className="slide" style={{ background: slides[current].bg }}>
            <input
              spellCheck="false"
              value={slides[current].text}
              onChange={(e) => updateSlide("text", e.target.value)}
            />
            <div className="bottom-bar">
              <div className="colors">
                {colors.map((c, i) => (
                  <div
                    key={i}
                    className="color"
                    style={{ background: c }}
                    onClick={() => updateSlide("bg", c)}
                  />
                ))}
              </div>
              <div className="actions">
                <button onClick={handlePlay} className="play">
                  <Play size={18} /> Play
                </button>
              </div>
            </div>

            <div className="animations">
              {animations.map((a) => (
                <button
                  key={a}
                  className="animation-btn"
                  onClick={() => applyAnimation(a)}
                >
                  {a.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`slideshow ${slides[current].animation}`}
          style={{ background: slides[current].bg }}
        >
          <h1>{slides[current].text}</h1>
          <button className="exit" onClick={handleExit}>
            <Square size={18} /> Exit
          </button>
          <button className="prev" onClick={handlePrevSlide}>
            Prev
          </button>
          <button className="next" onClick={handleNextSlide}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
