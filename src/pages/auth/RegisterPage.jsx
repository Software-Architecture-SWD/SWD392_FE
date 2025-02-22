import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Grid from "@mui/material/Grid2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!formData.email.trim()) {
      toast.error("Email is required!");
      return;
    }

    if (!formData.username.trim()) {
      toast.error("Username is required!");
      return;
    }

    if (!formData.password) {
      toast.error("Password is required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("The confirmation password does not match!");
      return;
    }

    if (!termsAccepted) {
      toast.info("You need to accept the terms and conditions!");
      return;
    }

    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      console.log("Registering user:", newUser);
      const res = await dispatch(registerUser(newUser)).unwrap();
      toast.success(res.message || "Registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.details || "Registration failed!");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: "15px",
          overflow: "hidden",
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "white",
          padding: "2rem",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              textAlign="center"
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                onClick={() => navigate("/login")}
                sx={{
                  position: "absolute",
                  left: "0",
                  cursor: "pointer",
                }}
              >
                <ArrowCircleLeftIcon
                  sx={{
                    fontSize: "2rem",
                    color: "black",
                    transition: "0.2s ease",
                    ":hover": {
                      color: "#ff6b6b",
                    },
                  }}
                />
              </Typography>
              REGISTER
            </Typography>
            <hr style={{ marginBottom: "1rem" }} />
          </Grid>

          {/* Form Fields */}
          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid size={6}>
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>

            {/* Right Column */}
            <Grid size={6}>
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* Terms and Conditions */}
          <Grid size={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  sx={{ color: error ? "red" : "inherit" }}
                />
              }
              label={
                <Typography variant="body2">
                  I accept with{" "}
                  <Typography
                    component="a"
                    href="/terms"
                    target="_blank"
                    sx={{
                      color: "var(--primary-color)",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    terms and conditions
                  </Typography>
                </Typography>
              }
            />
          </Grid>

          {/* Register Button */}
          <Grid size={12}>
            <Button
              fullWidth
              disabled={loading}
              sx={{
                background: "linear-gradient(135deg, #ff6b6b, #ff8e53)",
                color: "white",
                padding: "10px",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "10px",
                transition: "0.3s",
                "&:hover": {
                  background: "linear-gradient(135deg, #ff8e53, #ff6b6b)",
                },
              }}
              onClick={handleRegister}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
