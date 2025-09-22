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
        const apiMessage = err.response?.data?.error?.message || "Login Failed. Try again.";
        setError(apiMessage);
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

function ProfileScreen({ setIsLoggedIn, setShowChangePassword }) {
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [name, SetName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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
        console.error("Fetch user failed:", err.response?.data || err.message);
        const apiMessage = err.response?.data?.error?.message || "Failed to fetch user details.";
        setError(apiMessage);
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
        const apiMessage = err.response?.data?.error?.message || "Failed to update profile.";
        setError(apiMessage);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less that 2MB");
      setSelectedFile(null);
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width < 200 || img.height < 200) {
        setError("Image must be at least 200x200 pixels");
        setSelectedFile(null);
      } else {
        setError("");
        setSelectedFile(file);
      }
    };
  };

  const uploadAvatar = () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    axios
      .post("https://auth.dnjs.lk/api/avatar", formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Avatar uploaded successfully");
        setError("");
        fetchUserDetails();
      })
      .catch((err) => {
        console.error(
          "Error uploading avatar",
          err.response?.data || err.message
        );
        const apiMessage = err.response?.data?.error?.message || "Failed to upload avatar";
        setError(apiMessage);
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

              {/*Avatar upload section */}
              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {error && (
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={uploadAvatar}
                >
                  Upload
                </Button>
              </Box>

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
        variant="contained"
        sx={{ mt: 2 }}
        fullWidth
        onClick={() => setShowChangePassword(true)}
      >
        Change Password
      </Button>
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

function ChangePasswordScreen({setShowChangePassword}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (password) => {
    const rules = [
      { regex: /^.{8,40}$/, msg: "Password must bo 8-40 characters log" },
      { regex: /[0-9]/, msg: "Must contain a number" },
      { regex: /[a-z]/, msg: "Must contain lowercase" },
      { regex: /[A-Z]/, msg: "Must contain uppercase" },
      { regex: /[*/\-@#$]/, msg: "Must contain special char (*/-@#$)" },
    ];
    for (const rule of rules) {
      if (!rule.regex.test(password)) return rule.msg;
    }
    return null;
  };

  const handleChangePassword = () => {
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password do not match");
      return;
    }
    const validateError = validatePassword(newPassword);
    if (validateError) {
      setError(validateError);
      return;
    }

    axios
      .put(
        "https://auth.dnjs.lk/api/password",
        { old_password: currentPassword, new_password: newPassword },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )

      .then(() => {
        setSuccess("Password changed successfully");
        setConfirmPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })

      .catch((err) => {
        console.error(
          "Change password failed",
          err.response?.data || err.massage
        );
        const apiMessage = err.response?.data?.error?.message || "Failed to change password";
        setError(apiMessage);
      });
  };

  return (
    <Box sx={{ p: 3, maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Change Password
      </Typography>

      <TextField
        fullWidth
        type="password"
        label="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type="password"
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={{ mb: 2 }}
      />

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {success}
        </Typography>
      )}
      <Button
        variant="contained"
        fullWidth
        sx={{ mb: 2 }}
        onClick={handleChangePassword}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => setShowChangePassword(false)}
      >
        Back to Profile
      </Button>
    </Box>
  );
}

export default function Assignment_16() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (getToken()) setIsLoggedIn(true);
    setIsReady(true);
  }, []);

  if (!isReady) return <div>Loading...</div>;

  if (!isLoggedIn) return <LoginScreen setIsLoggedIn={setIsLoggedIn} />;
  if (showChangePassword)
    return (
      <ChangePasswordScreen setShowChangePassword={setShowChangePassword} />
    );

  return (
    <ProfileScreen
      setIsLoggedIn={setIsLoggedIn}
      setShowChangePassword={setShowChangePassword}
    />
  );
}
