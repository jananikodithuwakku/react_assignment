import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Assignment_18() {
  const [colors, setColors] = useState([]); //array of color
  const [score, setScore] = useState(0); // score counter
  const [gameOver, setGameOver] = useState(false); // game over state

  // append a random color every 1 second
  useEffect(() => {
    if (gameOver) return; //stop appending if game is over

    const id = setInterval(() => {
      setColors((prevColors) => {
        const newColor = Math.random() < 0.5 ? "blue" : "red"; //random color
        const updated = [newColor, ...prevColors]; //add to front

        if (updated.length > 6) {
          setGameOver(true); // game over is too many colors
          clearInterval(id);
          return prevColors;
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(id); // cleanup interval on unmount
  }, [gameOver]);

  // handle button clicks
  const handleClick = (color) => {
    if (colors.length === 0) return;

    const lastColor = colors[colors.length - 1];
    if (lastColor === color) {
      setColors((prev) => prev.slice(0, prev.length - 1)); // remove last item
      setScore((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setColors([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h5"> Score: {score}</Typography>

      {gameOver && (
        <Typography variant="h4" sx={{ color: "red", mt: 2 }}>
          Game Over
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        {colors.map((color, index) => (
          <Box
            key={index}
            sx={{
              width: 75,
              height: 75,
              bgcolor: color,
              borderRadius: 100,
              //border: "2px solod black",
              m: 0.5,
            }}
          />
        ))}
      </Box>

      {!gameOver && (
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 1 }}
            onClick={() => handleClick("red")}
          >
            Red
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            onClick={() => handleClick("blue")}
          >
            Blue
          </Button>
        </Box>
      )}
      {gameOver && (
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={restartGame}
        >
          Restart Game
        </Button>
      )}
    </Box>
  );
}
