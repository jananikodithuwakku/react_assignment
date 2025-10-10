import { useRef, useState } from "react";
import { Box, Slider, Button, Typography } from "@mui/material";

export default function Assignment_26() {
  const canvasRef = useRef(null); // reference for the canvas
  const imgRef = useRef(new Image()); // reference for the image
  const [ctx, setCtx] = useState(null); // canvas drawing context 
  const [cloneArea, setCloneArea] = useState(null);// stores selected area to clone
  const [cloneSize, setCloneSize] = useState(60); // size of the clone brush

  //load image from file input
  const loadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      imgRef.current.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = imgRef.current.width;
        canvas.height = imgRef.current.height;
        context.drawImage(imgRef.current, 0, 0); // draw image on canvas
        setCtx(context); // save context
      };
      imgRef.current.src = e.target.result; // set image source
    };
    reader.readAsDataURL(file);
  };

  // handle click for selecting or cloning area 
  const handleClick = (e) => {
    if (!ctx) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position on canvas
    const y = e.clientY - rect.top; // y position on canvas

    if (!cloneArea) {
        // first click - select clone area 
      setCloneArea({ x, y });
      drawAll(x, y);
    } else {
        // second click - paste cloned area 
      const { x: sx, y: sy } = cloneArea;
      const data = ctx.getImageData(
        sx - cloneSize / 2,
        sy - cloneSize / 2,
        cloneSize,
        cloneSize
      );
      ctx.putImageData(data, x - cloneSize / 2, y - cloneSize / 2);
    }
  };

  // draw image and highlight selected area 
  const drawAll = (x, y) => {
    ctx.drawImage(imgRef.current, 0, 0);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(x - cloneSize / 2, y - cloneSize / 2, cloneSize, cloneSize);
  };

  // reset clone area and redraw image
  const reset = () => {
    setCloneArea(null);
    if (ctx) ctx.drawImage(imgRef.current, 0, 0);
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Image Clone
      </Typography>

      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        Upload Image
        <input hidden type="file" accept="image/*" onChange={loadImage} />
      </Button>

      <Box sx={{ width: 250, mx: "auto", mb: 2 }}>
        <Typography>Clone Size</Typography>
        <Slider
          value={cloneSize}
          onChange={(e, v) => {
            setCloneSize(v);
            if (cloneArea && ctx) drawAll(cloneArea.x, cloneArea.y);
          }}
          min={20}
          max={150}
          step={5}
          valueLabelDisplay="auto"
        />

        <Button onClick={reset} variant="outlined" sx={{ mb: 2 }}>
          Reset
        </Button>

      </Box>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{
          border: "2px solid #ccc",
          borderRadius: 6,
          cursor: "crosshair",
          maxWidth: "100%",
          background: "white",
        }}
      />
    </Box>
  );
}
