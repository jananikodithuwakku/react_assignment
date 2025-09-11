import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Assignment_9() {
  const [color, setColor] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    axios
      .get("https://apis.dnjs.lk/objects/colors.php")
      .then((response) => {
        setColor(response.data);
        setSearchMode(false);
      })
      .catch((error) => {
        console.error("Error fetching color:", error);
      });
  }, []);

  useEffect(() => {
    if (searchMode) {
      fetchColor();
    }
  }, [page]);

  const fetchColor = () => {
    axios
      .get(
        `https://apis.dnjs.lk/objects/colors.php?search=${search}&page=${page}&limit=${limit}`
      )
      .then((response) => {
        setColor(response.data.data);
        setTotal(response.data.total);
        setSearchMode(true);
      })
      .catch((error) => {
        console.error("Error fetching searched color:", error);
      });
  };

  const searchBar = () => {
    if (search.trim() === "") return;
    setPage(1);
    fetchColor();
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Search Colors with Pagination
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          width: "400px",
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
      </Box>

      <List sx={{ width: "400px", margin: "0 auto" }}>
        {color.map((color, index) => (
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

      {searchMode && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "20px",
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              sx={{ color: "black" }}
              key={i} // gives a unique React key for each button
              variant={page === i + 1 ? "contained" : "outlined"}
              onClick={() => setPage(i + 1)}
            >
              {i + 1} {/*displays page numbers starting at 1, not 0.*/}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}
