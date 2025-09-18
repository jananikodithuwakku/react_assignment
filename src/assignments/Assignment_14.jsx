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

function LoginScreen({ setIsLoggedIn }) {
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
  const [name, SetName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserDetails = () => {
    axios
      .get("https://auth.dnjs.lk/api/user", {
        headers: {
          Authorization: `Bearer ${getToken()}`, // attach token in header
        },
      })

      .then((res) => {
        setUserDetails(res.data);
        SetName(res.data.name || "");
        setDescription(res.data.description || "");
      })

      .catch((err) => {
        console.error(
          "Error fetching user details: ",
          err.response?.data || err.message
        );
        setError("Failed to fetch user details.");
      });
  };

  const updateProfile = () => {
    axios
      .put(
        "https://auth.dnjs.lk/api/user",
        { name: name, description: description },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      .then((res) => {
        setUserDetails(res.data);
        alert("Profile updated successfully");
        setIsEditing(false); // go back to view mode
      })
      .catch((err) => {
        console.error(
          "Error updating profile",
          err.response?.data || err.massage
        );
        setError("Failed to update profile.");
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
    if (getToken()) fetchUserDetails();
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
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Profile
          </Typography>

          {!isEditing ? (
            <>
              <Typography variant="body1">Name: {userDetails.name}</Typography>

              <Typography variant="body1">
                Bio: {userDetails.description}
              </Typography>

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
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => setIsEditing(true)}
                fullWidth
              >
                Edit Profile
              </Button>
            </>
          ) : (
            <>
              <TextField
                fullWidth
                label="Name"
                value={name ?? ""}
                onChange={(e) => SetName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Bio"
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={updateProfile}
                fullWidth
                sx={{ mb: 1 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => setIsEditing(false)}
                fullWidth
              >
                Cancel
              </Button>
            </>
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

export default function Assignment_14() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (getToken()) setIsLoggedIn(true);
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
