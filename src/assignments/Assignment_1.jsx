import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

function Assignment_1() {
  const [Section, setSection] = useState(1);

  return (
    <Box>
      <Box>
        <Button
          variant={Section === 1 ? "contained" : "outlined"} onClick={() => setSection(1)} sx={{ mx: 1 }} disableElevation>
          Section #1
        </Button>
        <Button
          variant={Section === 2 ? "contained" : "outlined"} onClick={() => setSection(2)} sx={{ mx: 1 }}disableElevation>
          Section #2
        </Button>
        <Button
          variant={Section === 3 ? "contained" : "outlined"} onClick={() => setSection(3)}sx={{ mx: 1 }} disableElevation>
          Section #3
        </Button>
      </Box>
      {Section === 1 && (
        <Typography variant="h5"> The enduring strength of nature </Typography>)}

      {Section === 2 && (
        <Typography variant="h5"> The quiet beauty of human connection</Typography>)}

      {Section === 3 && (
        <Typography variant="h5"> The evocative power of memory </Typography>)}
    </Box>
  );
}

export default Assignment_1;
