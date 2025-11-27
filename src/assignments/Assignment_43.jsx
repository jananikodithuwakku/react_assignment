import { useEffect, useRef, useState } from "react";
import "./Assignment_43.css";

const steps = [
  {
    title: "Topic One",
    text: "Discover new perspectives through every moment captured.",
    img: "https://i.pinimg.com/736x/9d/ab/99/9dab99bdea16d1fe11ea6df5c10fb8e0.jpg",
  },

  {
    title: "Topic Two",
    text: "Experience the beauty of nature and the clam it brings.",
    img: "https://i.pinimg.com/736x/b0/fd/01/b0fd01b0ff8e2fe5a764bc74905ffaa4.jpg",
  },

  {
    title: "Topic Three",
    text: "Every journey tells a story waiting to be explored.",
    img: "https://i.pinimg.com/1200x/bc/71/0b/bc710b891790be9377d228d030cf0f6a.jpg",
  },

  {
    title: "Topic Four",
    text: "Find inspiration in the simple details around you.",
    img: "https://i.pinimg.com/736x/6d/20/51/6d20510149d268bdc1a6bf102121f3e0.jpg",
  },
];

export default function Assignment_43() {
  const [step, setStep] = useState(1); // state that stores current step (1–4)
  const isScrolling = useRef(false); // Ref to block continuous scrolling

  // handle mouse wheel scroll (up/down)
  const handleScroll = (e) => {
    e.preventDefault(); // prevent default browser scroll

    if (isScrolling.current) return;
    isScrolling.current = true;  // lock scrolling

    // scroll down - next section
    if (e.deltaY > 0) {
      setStep((prev) => (prev < 4 ? prev + 1 : 4));
    } 
    // scroll up - previous section
    else {
      setStep((prev) => (prev > 1 ? prev - 1 : 1));
    }

    // unlock after animation delay
    setTimeout(() => {
      isScrolling.current = false;
    }, 700); // 700ms smooth transition
  };

  // ddd wheel event listener on mount
  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    
    // remove listener when component unmounts
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <div className="outer-wrapper">
      <div className="step-container">
        {steps.map((s, index) => {
          const isActive = step === index + 1;
          const isEven = (index + 1) % 2 === 0;

          return (
            <div
              key={index}
              className={`step-item ${isActive ? "active" : ""} ${isEven ? "reverse" : "" }`}
            >
              <div className="img-box">
                <img src={s.img} className="step-image" />
              </div>

              <div className="text-box">
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="controls">
        <button onClick={() => setStep(step > 1 ? step - 1 : 1)}>▲ Prev</button>
        <button onClick={() => setStep(step < 4 ? step + 1 : 4)}>▼ Next</button>
      </div>
      <div className="dots">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`dot ${step === i ? "active-dot" : ""}`} />
        ))}
      </div>
    </div>
  );
}
