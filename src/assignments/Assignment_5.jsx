import {
  Box,
  Button,
  IconButton,
  ListItem,
  TextField,
  Typography,
  List,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function Assignment_5() {
  const [numbers, setNumbers] = useState([]);
  const [input, setInput] = useState("");

  const add = () => {
    const num = parseFloat(input);

    if (!isNaN(num)) {
      setNumbers([...numbers, num]);
      setInput("");
    }
  };

  //Delete Number
  const Delete = (index) => {
    const newNumber = numbers.filter((_, i) => i !== index);
    setNumbers(newNumber);
  };

  //Sort Ascending
  const sortAsc = () => {
    const sorted = [...numbers].sort((a, b) => a - b);
    setNumbers(sorted);
  };

  //Sort Descending
  const sortDesc = () => {
    const sorted = [...numbers].sort((a, b) => b - a);
    setNumbers(sorted);
  };

  //Move Up
  const moveUp = (index) => {
    if (index === 0) return;
    const newNumbers = [...numbers];
    [newNumbers[index - 1], newNumbers[index]] = [
      newNumbers[index],
      newNumbers[index - 1],
    ];
    setNumbers(newNumbers);
  };

  //Move Down
  const moveDown = (index) => {
    if (index === numbers.length - 1) return;
    const newNumbers = [...numbers];
    [newNumbers[index], newNumbers[index + 1]] = [
      newNumbers[index + 1],
      newNumbers[index],
    ];
    setNumbers(newNumbers);
  };

  return (
    <Box>
      <Typography variant="h5">Assignment 05</Typography>

      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={sortAsc}
          sx={{ mr: 1 }}
        >
          Sort Ascending
        </Button>
        <Button variant="contained" color="secondary" onClick={sortDesc}>
          Sort Descending
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          label="Enter Number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" onClick={add}>
          Add
        </Button>
      </Box>

      <List>
        {numbers.map((num, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ListItemText primary={num} />
            <Button
              variant="outlined"
              size="small"
              disabled={index === 0}
              onClick={() => moveUp(index)}
            >
              Move up
            </Button>

            <Button
              variant="outlined"
              size="small"
              disabled={index === numbers.length - 1}
              onClick={() => moveDown(index)}
            >
              Move Down
            </Button>

            <IconButton edge="end" color="error" onClick={() => Delete(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
