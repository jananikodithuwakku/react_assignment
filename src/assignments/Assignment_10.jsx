import { Box, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function Assignment_10() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const login = () => {
    setError("");
    setResponse(null);

    axios
      .post("https://auth.dnjs.lk/api/login", {
        email: email,
        password: password,
      })

      .then((res) => {
        console.log("API Response:", res.data); // log response
        setResponse(res.data);
      })

      .catch((err) => {
        console.error("Login Error:", err.response?.data || err.massage);
        setError(err.response?.data?.massage || "Login Failed. Try again.");
      })

      .finally(() => {
        if (!error) {
          setShowForm(false);
        }
      });
  };

  return (
    <Box sx={{ p: 3, maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h5" sx={{ md: 2, fontWeight: "bold" }}>
        Login with JWT
      </Typography>

      {showForm && (
        <>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ md: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ md: 2 }}
          />

          <Button variant="contained" color="primary" onClick={login}>
            Login
          </Button>
        </>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {response && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body" sx={{ fontWeight: "bold" }}>
            Login Success
          </Typography>
          <pre style={{ background: "#eeebebff", padding: "10px" }}>
            {/* Show API response in a formatted way */}
            {JSON.stringify(response, null, 2)}{" "}
            {/* Convert response object to readable JSON with 2-space indentation */}
          </pre>
        </Box>
      )}
    </Box>
  );
}
