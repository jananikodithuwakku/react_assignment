import {
  Box,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Assignment_12() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [token, setToken] = useState(""); //access token
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); //checkbox state
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    if(isLoading)return;
    setIsLoading(true);
    setError("");
    setUserDetails(null);

    axios
      .post("https://auth.dnjs.lk/api/login", {
        email: email,
        password: password,
      })

      .then((res) => {
        console.log("Login Response:", res.data);
        const accessToken = res.data.access_token;

        //save token in localstorage or sessionStorage
        if (keepLoggedIn) {
          localStorage.setItem("access_token", accessToken);
        } else {
          sessionStorage.setItem("access_token", accessToken);
        }

        setToken(accessToken);
        setShowForm(false);
      })

      .catch((err) => {
        console.error("Login Error:", err.response?.data || err.massage);
        setError(err.response?.data?.massage || "Login Failed. Try again.");
      })

      .finally(() => {
        setIsLoading(false);
      });
  };

  //fetch user details once token is available
  const fetchUserDetails = () => {
    if (!token) return;

    axios
      .get("https://auth.dnjs.lk/api/user", {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in header
        },
      })

      .then((res) => {
        console.log("User Details: ", res.data);
        console.log("Profile Pic URL: ", res.data.avatar);
        setUserDetails(res.data);
      })

      .catch((err) => {
      console.error("Error fetching user details:", err.response?.data || err.message);

      // If token is invalid, clear storage & go back to login
      if (err.response?.status === 401) {
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token");
        setToken("");
        setShowForm(true);
        setError("Session expired. Please log in again.");
      } else {
        setError("Failed to fetch user details.");
      }
    });
  };

  useEffect(() => {
    const savedToken =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (savedToken) {
      setToken(savedToken);
      setShowForm(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  return (
    <Box sx={{ p: 3, maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h5" sx={{ md: 2, fontWeight: "bold" }}>
        Login with Persistent Storage
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

          <FormControlLabel
            control={
              <Checkbox
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
            }
            label="Keep me Logged in"
          />

          <Button 
            variant="contained" 
            color="primary" 
            onClick={login} 
            disabled={isLoading}
            >
            {isLoading ? "Logging in...":"Login"}
          </Button>
        </>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {userDetails && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            You have logged!
          </Typography>
          <Typography>Name: {userDetails.name}</Typography>
          <Typography>Bio: {userDetails.bio}</Typography>
          {userDetails.avatar && (
            <Box
              component="img"
              src={userDetails.avatar}
              alt="Profile"
              sx={{
                width: "150px",
                height: "150px",
                mt: 1,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
