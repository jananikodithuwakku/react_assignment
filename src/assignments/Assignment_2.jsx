import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

export default function Assignment_2() {
  const [num_1, Setnum_1] = useState("");
  const [num_2, Setnum_2] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null);

  const calcuate = () => {
    const n1 = parseFloat(num_1);
    const n2 = parseFloat(num_2);
    let results;

    switch (operation) {
      case "addition":
        results = n1 + n2;
        break;
      case "subtract":
        results = n1 - n2;
        break;
      case "multiplication":
        results = n1 * n2;
        break;
      case "division":
        results = n1 / n2;
        break;
      default:
        results = "Select Operation";
    }
    setResult(results);
  };

  const isDisabled = !num_1 || !num_2;

  return (
    <Box
      sx={{
        width: 350,
        margin: "50px auto",
        padding: 3,
        border: "1px solid blue",
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h5">Calculator</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={operation}
          label="Operation"
          onChange={(e) => setOperation(e.target.value)}
        >
          <MenuItem value="addition">Addition</MenuItem>
          <MenuItem value="subtract">Subtract</MenuItem>
          <MenuItem value="multiplication">Multiplication</MenuItem>
          <MenuItem value="division">Division</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="First Number"
        type="number"
        value={num_1}
        onChange={(e) => Setnum_1(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Second Number"
        type="number"
        value={num_2}
        onChange={(e) => Setnum_2(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      {!isDisabled && (
        <Button
          variant="contained"
          color="primary"
          onClick={calcuate}
          fullWidth
          sx={{ mb: 2 }}
        >
          Calculate
        </Button>
      )}

      {!isDisabled && result !== null && (
        <Typography variant="h6">Result: {result}</Typography>
      )}
    </Box>
  );
}
