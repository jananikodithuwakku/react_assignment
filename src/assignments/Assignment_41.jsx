import { useState, useEffect } from "react";
import "./Assignment_41.css";
import knifeImg from "./Images/knife.png";

export default function Assignment_41() {
  const [rotation, setRotation] = useState(0); // target rotation angle
  const [knives, setKnives] = useState([]); // stuck knives angles
  const [flying, setFlying] = useState(false); // knife flying status
  const [flyingY, setFlyingY] = useState(350); // flying knife position
  const [isGameOver, setIsGameOver] = useState(false); // game over state
  const [score, setScore] = useState(0); // player score

  // target rotation
  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 2) % 360); // rotate by 2°
    }, 30);
    return () => clearInterval(interval); // cleanup
  }, [isGameOver]);

  // throw knife
  const throwKnife = () => {
    if (flying || isGameOver) return;
    setFlying(true);
    setFlyingY(350);
  };

  // animate flying knife
  useEffect(() => {
    if (!flying) return;

    let y = 350;
    const fly = () => {
      y -= 15;  // move up
      setFlyingY(y);

      // knife reached target
      if (y <= 150) {
        checkCollision();
        setFlying(false);
        setFlyingY(350);
        return;
      }
      requestAnimationFrame(fly); // keep flying
    };
    requestAnimationFrame(fly);
  }, [flying]);

  // check for collision
  const checkCollision = () => {
    const hitAngle = (360 - rotation) % 360; // impact angle
    const collision = knives.some(
      (k) => Math.abs(((k - hitAngle + 180 + 360) % 360) - 180) < 15
    );

    if (collision) { // hit another knife
      setIsGameOver(true);
      return;
    }

    setKnives([...knives, hitAngle]); // add knife
    setScore((prev) => prev + 1);
  };

  // restart game
  const restart = () => {
    setKnives([]);
    setScore(0);
    setIsGameOver(false);
    setFlying(false);
    setFlyingY(350);
    setRotation(0);
  };

  // keyboard controls (Space = throw, R = restart)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") throwKnife();
      if (e.code === "KeyR") restart();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="game-wrapper">
      <div className="score">Score: {score}</div>

      <div className="container" onClick={throwKnife}>
        <div
          className="target-base"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {knives.map((angle, i) => (
            <div
              key={i}
              className="knife knife-stuck"
              style={{
                transform: `rotate(${angle}deg)`,
                backgroundImage: `url(${knifeImg})`,
              }}
            ></div>
          ))}
          <div className="target"></div>
        </div>

        {/* Flying knife */}
        {flying && (
          <div
            className="knife-flying"
            style={{
              top: `${flyingY}px`,
              backgroundImage: `url(${knifeImg})`,
            }}
          ></div>
        )}

        {/* Bottom knife */}
        {!flying && !isGameOver && (
          <div
            className="knife knife-bottom"
            style={{ backgroundImage: `url(${knifeImg})` }}
          ></div>
        )}

        {/* Game Over overlay */}
        {isGameOver && (
          <div className="overlay">
            <h2>Game Over</h2>
            <p>Final Score: {score}</p>
            <button onClick={restart}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
}
