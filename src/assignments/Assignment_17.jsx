import { Box, Typography, TextField, Paper, Grid } from "@mui/material";
import { useState } from "react";

const hexToRgb = (hex) => {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b];
};

const clamp = (val) => (val > 255 ? 255 : val);

const rgbToHex = ([r, g, b]) => {
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export default function Assignment_17() {
  const [color1, setColor1] = useState("#FF0000");
  const [color2, setColor2] = useState("#0000FF");

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const mixedRgb = [
    clamp(rgb1[0] + rgb2[0]),
    clamp(rgb1[1] + rgb2[1]),
    clamp(rgb1[2] + rgb2[2]),
  ];

  const mixedHex = rgbToHex(mixedRgb);

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Color Mixer
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid >
          <TextField
            type="color"
            label="Color 1"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            sx={{ width: 120 }}
          />
          <Typography sx={{ mt: 1 }}>
            {color1.toUpperCase()} = {rgb1.join(",")}
          </Typography>
        </Grid>

        <Grid >
          <TextField
            type="color"
            label="Color 2"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            sx={{ width: 120 }}
          />
          <Typography sx={{ mt: 1 }}>
            {color2.toUpperCase()} = {rgb2.join(",")}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Mixed Color
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: 180,
          height: 100,
          mx: "auto",
          mt: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: mixedHex,
          color: "black",
          fontWeight: "bold",
        }}
      >
        {mixedHex.toUpperCase()} <br /> ({mixedRgb.join(",")})
      </Paper>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Gradient
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: 300,
          height: 80,
          mx: "auto",
          mt: 1,
          background: `linear-gradient(90deg, ${color1}, ${mixedHex}, ${color2})`,
        }}
      />
    </Box>
  );
}
