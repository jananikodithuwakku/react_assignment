import { Box, Button, Card, CardContent } from "@mui/material";
import { useRef, useState } from "react";

export default function Assignment_25() {
  const canvasRef = useRef(null); // reference to canvas element
  const imageRef = useRef(new Image()); // reference to uploaded image
  const [isDragging, setIsDragging] = useState(false); // track if user is selecting area
  const [start, setStart] = useState({}); // starting point of rectangle
  const [end, setEnd] = useState({}); // ending point of rectangle
  const [imageLoaded, setImageLoaded] = useState(false); // flag if image is loaded

  // helper to get mouse position relative to canvas
  const getMousePos = (canvas, e) => {
    const rect = canvas.getBoundingClientRect();
    return {
      // convert mouse position to canvas coordinates
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  // draw the image on canvas
  const drawImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear previous drawings
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // upload image
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = canvasRef.current;
        canvas.width = img.width; // set canvas size to image
        canvas.height = img.height;
        imageRef.current = img;
        setImageLoaded(true); // enable cropping
        drawImage();
      };
    };
    reader.readAsDataURL(file);
  };

  // start dragging
  const handleMouseDown = (e) => {
    if (!imageLoaded) return;
    const pos = getMousePos(canvasRef.current, e);
    setStart(pos);
    setIsDragging(true);
  };

  // dragging draw rectangle
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getMousePos(canvas, e);
    setEnd(pos);

    drawImage(); // redraw image 
    const width = pos.x - start.x;
    const height = pos.y - start.y;

    ctx.beginPath();
    ctx.rect(start.x, start.y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.stroke();
  };

  // stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // crop and download
  const handleDownload = () => {
    if (!start.x || !end.x) return; // ensure selection exists
    const img = imageRef.current;
    const width = end.x - start.x;
    const height = end.y - start.y;

    // create a new canvas for cropping image 
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = Math.abs(width);
    croppedCanvas.height = Math.abs(height);
    const croppedCtx = croppedCanvas.getContext("2d");

    croppedCtx.drawImage(
      img,
      Math.min(start.x, end.x),
      Math.min(start.y, end.y),
      Math.abs(width),
      Math.abs(height),
      0,
      0,
      Math.abs(width),
      Math.abs(height)
    );

    const link = document.createElement("a");
    link.download = "cropped_image.png";
    link.href = croppedCanvas.toDataURL();
    link.click();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2 style={{ color: "#1976d2", fontFamily: "Arial, sans-serif" }}>
        Image Cropping
      </h2>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Card
          sx={{
            width: 500,
            borderRadius: 3,
            background: "#1a1a1a",
            color: "white",
            textAlign: "center",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          <CardContent>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{
                  border: "2px solid #444",
                  cursor: imageLoaded ? "crosshair" : "not-allowed",
                  maxWidth: "100%",
                  borderRadius: "8px",
                }}
              />
            </Box>
            <Box
              sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "#007bff",
                  "&:hover": { backgroundColor: "#005ec2" },
                }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleUpload}
                />
              </Button>

              {imageLoaded && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleDownload}
                >
                  Crop & Download
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
