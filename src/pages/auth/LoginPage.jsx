import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { motion } from "framer-motion";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosClient from "../../axiosClient";
import { API_POST_LOGIN, BASE_URL } from "../../constants";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function handleLogin() {
    axiosClient
      .post(API_POST_LOGIN, { username, password })
      .then((res) => {
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("Login successful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        }}
      >
        {/* Left Side - Login Form */}
        <Grid container sx={{ flex: 1 }}>
          <Grid
            size={7.5}
            sx={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
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
                onClick={() => navigate("/")}
                sx={{
                  position: "absolute",
                  left: "0",
                  cursor: "pointer",
                  padding: "0",
                  height: "100%",
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
              LOG IN
            </Typography>
            <Typography variant="body2" color="gray" textAlign="center" mb={3}>
              How are you today ?
            </Typography>

            <TextField
              label="Username"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              variant="outlined"
              size="small"
              fullWidth
              type={showPassword ? "text" : "password"}
              sx={{ mb: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: "secondary",
                      "&.Mui-checked": {
                        color: "var(--primary-color)",
                      },
                    }}
                  />
                }
                label="Remember Me"
                sx={{ fontFamily: "Lora" }}
              />

              <Link to={"/forgot-password"} color="var(--primary-color)">
                Forgot Password
              </Link>
            </Box>

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
              onClick={handleLogin}
            >
              Log In
            </Button>

            <Typography
              variant="body2"
              sx={{ textAlign: "center", mt: 2, color: "gray" }}
            >
              Don't have an account?{" "}
              <motion.span
                onClick={() => navigate("/register")}
                whileHover={{ scale: 1.1 }}
                style={{
                  color: "var(--primary-color)",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Register
              </motion.span>
            </Typography>
          </Grid>

          {/* Right Side - Dark Sidebar */}
          <Grid
            size={4.5}
            sx={{
              backgroundColor: "#222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="src/assets/images/Auth/login.jpg"
              alt=""
              style={{
                width: "100%",
                objectFit: "cover",
                filter: "brightness(80%)",
                transform: "scale(1)",
                transition: "0.3s ease-out",
              }}
              onMouseEnter={(e) => {
                e.target.style.filter = "brightness(100%)";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.filter = "brightness(80%)";
                e.target.style.transform = "scale(1)";
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
