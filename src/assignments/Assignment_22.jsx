import { useRef, useState } from "react";
import { Box, Button, Typography, Grid, Slider } from "@mui/material";

export default function Assignment_22() {
  const [imageUrl, setImageUrl] = useState(null); // holds selected image URL
  const fileInputRef = useRef(null); // reference for hidden file input


  // all filter states with defaults
  const [filters, setFilters] = useState({
    grayscale: 0,
    brightness: 100,
    contrast: 100,
    blur: 0,
    hue: 0,
    invert: 0,
    opacity: 100,
    saturate: 100,
    sepia: 0,
  });

    // open hidden file input when "Select Image" button is clicked
  const handleSelectImage = () => {
    fileInputRef.current.click();
  }

  // when file is selected, create a blob URL and set it as image source
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUrl(URL.createObjectURL(file));
  };

  // update filter value when slider changes
  const handleChange = (name) => (e, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

   // reset filters back to default values
  const handleReset = () => {
    setFilters({
      grayscale: 0,
      brightness: 100,
      contrast: 100,
      blur: 0,
      hue: 0,
      invert: 0,
      opacity: 100,
      saturate: 100,
      sepia: 0,
    });
  };

  // build css filter string from sate values
  const filterStyle = `grayscale(${filters.grayscale}%) brightness(${filters.brightness}%) contrast(${filters.contrast}%) blur(${filters.blur}px) hue-rotate(${filters.hue}deg) invert(${filters.invert}%) opacity(${filters.opacity}%) saturate(${filters.saturate}%) sepia(${filters.sepia}%)`;

  return (
    <Box sx={{ p: 3 }}>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Button variant="contained" onClick={handleSelectImage} sx={{ mr: 1 }}>
        Select Image
      </Button>
      <Button variant="outlined" onClick={handleReset} disabled={!imageUrl}>
        Reset
      </Button>

      <Grid container spacing={3} mt={2}>
        {/* Left - Image preview */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              minHeight: 300,
              border: "1px dashed grey",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              p: 1,
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: 400,
                  filter: filterStyle,
                }}
              />
            ) : (
              <Typography>Select an image to preview</Typography>
            )}
          </Box>
        </Grid>

        {/* Right - Sliders */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography gutterBottom>
              Grayscale: {filters.grayscale}%
            </Typography>
            <Slider
              value={filters.grayscale}
              onChange={handleChange("grayscale")}
              min={0}
              max={100}
            />

            <Typography gutterBottom>
              Brightness: {filters.brightness}%
            </Typography>
            <Slider
              value={filters.brightness}
              onChange={handleChange("brightness")}
              min={0}
              max={200}
            />

            <Typography gutterBottom>Contrast: {filters.contrast}%</Typography>
            <Slider
              value={filters.contrast}
              onChange={handleChange("contrast")}
              min={0}
              max={200}
            />

            <Typography gutterBottom>Blur: {filters.blur}px</Typography>
            <Slider
              value={filters.blur}
              onChange={handleChange("blur")}
              min={0}
              max={20}
              step={0.5}
            />

            <Typography gutterBottom>Hue Rotate: {filters.hue}°</Typography>
            <Slider
              value={filters.hue}
              onChange={handleChange("hue")}
              min={0}
              max={360}
            />

            <Typography gutterBottom>Invert: {filters.invert}%</Typography>
            <Slider
              value={filters.invert}
              onChange={handleChange("invert")}
              min={0}
              max={100}
            />

            <Typography gutterBottom>Opacity: {filters.opacity}%</Typography>
            <Slider
              value={filters.opacity}
              onChange={handleChange("opacity")}
              min={0}
              max={100}
            />

            <Typography gutterBottom>Saturate: {filters.saturate}%</Typography>
            <Slider
              value={filters.saturate}
              onChange={handleChange("saturate")}
              min={0}
              max={300}
            />

            <Typography gutterBottom>Sepia: {filters.sepia}%</Typography>
            <Slider
              value={filters.sepia}
              onChange={handleChange("sepia")}
              min={0}
              max={100}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
