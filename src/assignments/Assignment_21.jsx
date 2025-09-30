import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

export default function Assignment_21() {
  const [imageURL, setImageURL] = useState(null); // store uploaded image
  const [color, setColor] = useState(null); // store picked color
  const canvasRef = useRef(null); // ref for convas

  //handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      //create object URL(Blob)
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };

  // draw image on canvas
  const handleImageLoad = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = e.target;

    // resize canvas to image dimensions
    canvas.width = img.width;
    canvas.height = img.height;

    // draw image onto convas
    ctx.drawImage(img, 0, 0);
  };

  //handle click on canvas to get pixel color
  const handelCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left; // X coordinate
    const y = e.clientY - rect.top; // Y coordinate

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b] = pixel;

    //convert to hex
    const hex = `#${[r, g, b]
      .map((val) => val.toString(16).padStart(2, "0"))
      .join("")}`;

    setColor({ r, g, b, hex });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">Color Picker</Typography>

          {/* upload button */}
          <Box mb={2}>
            <input
              accept="image/*"
              type="file"
              id="upload-button"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="upload-button">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
          </Box>

          {/* canvas */}
          {imageURL && (
            <Box>
              <img
                src={imageURL}
                alt="Uploaded Preview"
                onLoad={handleImageLoad}
                style={{ display: "none" }}
              />

              <canvas
                ref={canvasRef}
                onClick={handelCanvasClick}
                style={{ border: "1px solid #ccc", cursor: "crosshair" }}
              ></canvas>
            </Box>
          )}

          {/* color result */}
          {color && (
            <Box mt={2}>
              <Typography variant="h6">Picked Color:</Typography>

              <Box
                sx={{
                  width: 80,
                  height: 40,
                  backgroundColor: color.hex,
                  border: "1px solid #000",
                  mb: 1,
                }}
              />

              <Typography>
                RGB: rgb({color.r},{color.g},{color.b}){" "}
              </Typography>
              <Typography>Hex: {color.hex}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
