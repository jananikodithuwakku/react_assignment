import { useRef, useState } from "react";
import { Box, Button, Slider, Typography } from "@mui/material";

export default function Assignment_29() {
  const canvasRef1 = useRef(null); // canvas for original image
  const canvasRef2 = useRef(null); // canvas for filtered image
  const imageRef = useRef(new Image()); // stores the uploaded image
  const [pixelSize, setPixelSize] = useState(20); // pixel block size
  const [imageLoaded, setImageLoaded] = useState(false); // track if image is uploaded

  // handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader(); // read file as data URL
    reader.onload = (e) => {
      imageRef.current.src = e.target.result; // set image source
      imageRef.current.onload = () => {
        const canvas1 = canvasRef1.current;
        const ctx1 = canvas1.getContext("2d");

        // match canvas size to image size
        canvas1.width = imageRef.current.width;
        canvas1.height = imageRef.current.height;

        // draw uploaded image 
        ctx1.drawImage(imageRef.current, 0, 0);
        setImageLoaded(true);
      };
    };
    reader.readAsDataURL(file);
  };

  // Apply pixel filter
  const applyFilter = () => {
    const canvas1 = canvasRef1.current;
    const canvas2 = canvasRef2.current;
    const ctx1 = canvas1.getContext("2d");
    const ctx2 = canvas2.getContext("2d");

    const width = canvas1.width;
    const height = canvas1.height;

    // set second canvas to same size
    canvas2.width = width;
    canvas2.height = height;

    // loop over image in square blocks
    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {

        // get pixel data from small block
        const imageData = ctx1.getImageData(x, y, pixelSize, pixelSize);
        const data = imageData.data;

        // calculate average color
        let r = 0, g = 0, b = 0, a = 0;
        const totalPixels = data.length / 4;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          a += data[i + 3];
        }

        // compute average RGB values
        r = Math.floor(r / totalPixels);
        g = Math.floor(g / totalPixels);
        b = Math.floor(b / totalPixels);
        a = Math.floor(a / totalPixels);

        // fill that block on canvas 2 with average color
        ctx2.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx2.fillRect(x, y, pixelSize, pixelSize);
      }
    }
  };

  // Download filtered image
  const handleDownload = () => {
    const canvas = canvasRef2.current;
    const link = document.createElement("a");
    link.download = "filtered_image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h5" gutterBottom> Pixel Filter </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
        <Box>
          <Typography>Original Image</Typography>
          <canvas ref={canvasRef1} style={{ border: "1px solid #555", borderRadius: 8 }} />
        </Box>
        <Box>
          <Typography>Filtered Image</Typography>
          <canvas ref={canvasRef2} style={{ border: "1px solid #555", borderRadius: 8 }} />
        </Box>
      </Box>

  
      <Box sx={{ mt: 3 }}>
        <input
          accept="image/*"
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <label htmlFor="upload-button">
          <Button variant="contained" component="span" color="primary">
            Upload Image
          </Button>
        </label>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography>Filter Size: {pixelSize}px</Typography>
        <Slider
          value={pixelSize}
          min={5}
          max={100}
          step={5}
          onChange={(e, val) => setPixelSize(val)}
          sx={{ width: 300, mx: "auto" }}
        />
      </Box>

      {imageLoaded && (
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="success" onClick={applyFilter}>
            Apply Filter
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDownload}
            sx={{ ml: 2 }}
          >
            Download Image
          </Button>
        </Box>
      )}
    </Box>
  );
}
