import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, List, ListItem, Typography } from "@mui/material";

export default function Assignment_8() {
  const [colors, setColors] = useState([]);
  const [search, setSearch] = useState("");

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

  const searchBar = () => {
    axios
      .get(`https://apis.dnjs.lk/objects/colors.php?search=${search}`)
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching searched colors:", error);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Search Colors
      </Typography>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          width: "400px",
          padding: "10px",
          margin: "0 auto",
        }}
      >
        <TextField
          label="Search Color"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={searchBar}>
          Search
        </Button>
      </div>

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
    </div>
  );
}
