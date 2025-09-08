import {
  Box,
  List,
  ListItem,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function Assignment_3() {
  const [numbers, setNumbers] = useState([]);
  const [input, setInput] = useState("");

  const add = () => {
    const num = parseFloat(input);
    if (!isNaN(num)) {
      setNumbers([...numbers, num]);
      setInput("");
    }
  };
  const total = numbers.reduce((sum, number) => sum + number, 0);

  const average = numbers.length > 0 ? (total / numbers.length).toFixed(2) : 0;

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
      <Typography variant="h6">Total:{total}</Typography>
      <Typography variant="h6">Average:{average}</Typography>

      <List sx={{ mb: 2 }}>
        {numbers.map((num, index) => (
          <ListItem key={index} sx={{ display: "list-item", padding: 0 }}>
            {num}
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
