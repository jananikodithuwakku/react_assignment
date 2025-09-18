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

const getToken = () =>
  localStorage.getItem("access_token") ||
  sessionStorage.getItem("access_token");

function LoginScreen({ setIsLoggedIn, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); //checkbox state
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    if (isLoading) return;
    setIsLoading(true);
    setError("");

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

        setIsLoggedIn(true);
      })

      .catch((err) => {
        console.error("Login Error:", err.response?.data || err.massage);
        setError(err.response?.data?.massage || "Login Failed. Try again.");
      })

      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box sx={{ p: 3, maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h5" sx={{ md: 2, fontWeight: "bold" }}>
        Login
      </Typography>

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
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

function ProfileScreen({ setIsLoggedIn }) {
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = () => {
    axios
      .get("https://auth.dnjs.lk/api/user", {
        headers: {
          Authorization: `Bearer ${getToken()}`, // attach token in header
        },
      })

      .then((res) => {
        console.log("User Details: ", res.data);
        console.log("Profile Pic URL: ", res.data.avatar);
        setUserDetails(res.data);
      })

      .catch((err) => {
        console.error(
          "Error fetching user details: ",
          err.response?.data || err.massage
        );
        setError("Failed to fetch user details.");
      });
  };

  const logout = () => {
    axios
      .post(
        "https://auth.dnjs.lk/api/logout",
        {},
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )

      .finally(() => {
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token");
        setIsLoggedIn(false);
      });
  };

  useEffect(() => {
    if (getToken()) {
      fetchUserDetails();
    }
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: "400px", margin: "0 auto" }}>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {userDetails && (
        <>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            You have logged in!
          </Typography>
          <Typography>Name: {userDetails.name}</Typography>
          <Typography>Bio: {userDetails.description}</Typography>
          {userDetails.avatar && (
            <Box
              component="img"
              src={userDetails.avatar}
              alt="Profile"
              sx={{
                width: "150px",
                height: "150px",
                mt: 2,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
        </>
      )}
      <Button
        variant="outlined"
        color="secondary"
        onClick={logout}
        fullWidth
        sx={{ mt: 3 }}
      >
        Logout
      </Button>
    </Box>
  );
}
export default function Assignment_13() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (getToken()) 
      setIsLoggedIn(true);
    setIsReady(true);
  }, []);

  if (!isReady) return <div>Loading...</div>;

  return (
    <>
      {isLoggedIn ? (
        <ProfileScreen setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <LoginScreen setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}
