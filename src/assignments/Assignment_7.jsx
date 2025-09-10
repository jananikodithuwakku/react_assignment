import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, List, ListItem, Box } from "@mui/material";

export default function Assignment_7() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    axios
      .get("https://apis.dnjs.lk/objects/colors.php")
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching colors:", error);
      });
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5">Load Colors from API</Typography>

      <List
        sx={{
          width: "400px",
          margin: "0 auto", 
        }}
      >
        {colors.map((color, index) => (
          <ListItem
            key={index}
            style={{
              backgroundColor: color.code,
              color: "black",
              marginBottom: "5px",
              borderRadius: "5px",
              width: "400px",
            }}
          >
            {color.name} : {color.code}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
