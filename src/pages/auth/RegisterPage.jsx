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

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (!termsAccepted) {
      setError("You must accept the Terms and Conditions to proceed.");
      return;
    }
    setError("");
    console.log("Form Data:", formData);
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
                label="First Name"
                name="firstName"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.firstName}
                onChange={handleChange}
              />
              <TextField
                label="Last Name"
                name="lastName"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.lastName}
                onChange={handleChange}
              />
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
                label="Phone"
                name="phone"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.phone}
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
              <TextField
                label="Address"
                name="address"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.address}
                onChange={handleChange}
              />
              <TextField
                label="City"
                name="city"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.city}
                onChange={handleChange}
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
                <Typography variant="body2" >
                  I agree to the{" "}
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
                    Terms and Conditions
                  </Typography>
                </Typography>
              }
            />
            {error && (
              <Typography color="red" fontSize="0.875rem">
                {error}
              </Typography>
            )}
          </Grid>

          {/* Register Button */}
          <Grid size={12}>
            <Button
              fullWidth
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
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
