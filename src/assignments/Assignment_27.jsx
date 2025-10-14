import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Assignment_27() {
  const [image, setImage] = useState(null); // store uploaded image
  const dropRef = useRef(null); // reference for drop area

  //handle file input
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file)); // preview image
    }
  };

  // handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => e.preventDefault(); // allow drop

  // handle paste
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData.items;
      for (let item of items) {
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          setImage(URL.createObjectURL(file));
          break;
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  //reset image
  const handleReset = () => setImage(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >

      <Typography variant="h5">Image Upload</Typography>

      <Box
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        sx={{
          width: 500,
          height: 300,
          border: "2px dashed #888",
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          cursor: "pointer",
          bgcolor: "#423f3fff",
        }}
      >
        {image ? (
          <img
            src={image}
            alt="uploaded"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: "10px",
              objectFit: "contain",
            }}
          />
        ) : (
          <>
            <Typography>Drag & Drop Image Here</Typography>
            <Typography>or Paste</Typography>
          </>
        )}
      </Box>

      <Button
        variant="contained"
        component="label"
        sx={{ bgcolor: "#1976d2", borderRadius: 3 }}
      >
        Choose File
        <input type="file" hidden accept="image/*" onChange={handleFileInput} />
      </Button>

      {image && (
        <Button
          variant="outlined"
          color="error"
          onClick={handleReset}
          sx={{ borderRadius: 3 }}
        >
          Reset
        </Button>
      )}

    </Box>
  );
}
