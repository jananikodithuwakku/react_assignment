import {
  Box,
  Button,
  IconButton,
  ListItem,
  TextField,
  Typography,
  List
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function Assignment_4() {
  const [numbers, setNumbers] = useState([]);
  const [input, setInput] = useState("");

  const add = () => {
    const num = parseFloat(input);

    if (!isNaN(num)) {
      setNumbers([...numbers, num]);
      setInput("");
    }
  };

  const Delete = (index) => {
    const newNumber = numbers.filter((_, i) => i !== index);
    setNumbers(newNumber);
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: "50px auto",
        textAlign: "center",
        padding: 3,
        border: "1px solid black",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5">Number List with Delete</Typography>

      <List sx={{ mb: 2 }}>
        {numbers.map((num, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid blacks",
            }}
          >
            {num}
            <IconButton 
              edge="end" 
              color="error" 
              onClick={() => Delete(index)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        <TextField
          label="Enter Number"
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={add}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
