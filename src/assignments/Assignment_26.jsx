import { useRef, useState } from "react";
import { Box, Slider, Button, Typography } from "@mui/material";

export default function Assignment_26() {
  const canvasRef = useRef(null); // reference for the canvas
  const imgRef = useRef(new Image()); // reference for the image
  const [cloneArea, setCloneArea] = useState(null); // locked clone position
  const [cloneSize, setCloneSize] = useState(60); // clone brush size
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 }); // cursor preview

  //load image from file input
  const loadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      imgRef.current.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = imgRef.current.width; // set canvas width
        canvas.height = imgRef.current.height; // set canvas height
        context.drawImage(imgRef.current, 0, 0); // draw image on canvas
      };
      imgRef.current.src = e.target.result; // set image source
    };
    reader.readAsDataURL(file);
  };

  // track mouse position for tool preview 
  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left - cloneSize / 2, // center tool
      y: e.clientY - rect.top - cloneSize / 2,
    });
  };

  // handle canvas clicks for selecting / pasting clone
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!cloneArea) { 
      setCloneArea({ x, y }); // first click - lock clone area
    } else {
      const { x: sx, y: sy } = cloneArea;
      const imageData = ctx.getImageData(
        sx - cloneSize / 2,
        sy - cloneSize / 2,
        cloneSize,
        cloneSize
      );
      ctx.putImageData(imageData, x - cloneSize / 2, y - cloneSize / 2); // paste clone
    }
  };

  // reset clone area and redraw image
  const reset = () => {
    setCloneArea(null);
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(imgRef.current, 0, 0);
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Image Clone
      </Typography>

      <Button variant="contained" component="label">
        Upload Image
        <input hidden type="file" accept="image/*" onChange={loadImage} />
      </Button>

      <Box
        sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}
        className="options"
      >
        <Typography>Clone Size</Typography>
        <Slider
          min={40}
          max={120}
          value={cloneSize}
          onChange={(e, v) => setCloneSize(v)}
          sx={{ width: 150 }}
        />
      </Box>

      <Button onClick={reset} variant="outlined">
        Reset Origin
      </Button>

      {/* Workspace */}
      <Box
        sx={{
          position: "relative",
          border: "1px solid #ccc",
        }}
        className="workspace"
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          style={{ display: "block" , maxWidth: "100%" }}
          className="canvas"
        />

        {/* Origin preview box (only visual) */}
        {cloneArea && (
          <Box
            sx={{
              position: "absolute",
              border: "2px solid red",
              width: cloneSize,
              height: cloneSize,
              left: cloneArea.x - cloneSize / 2,
              top: cloneArea.y - cloneSize / 2,
              pointerEvents: "none",
            }}
            className="square origin"
          />
        )}

        {/* Tool preview box (follows cursor, visual only) */}
        <Box
          sx={{
            position: "absolute",
            border: "2px dashed green",
            width: cloneSize,
            height: cloneSize,
            left: cursorPos.x,
            top: cursorPos.y,
            pointerEvents: "none",
          }}
          className="square tool"
        />
      </Box>
    </Box>
  );
}
