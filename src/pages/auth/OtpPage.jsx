import React, { useState, useRef, useEffect } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, clearToken, verifyOtp } from "../../features/authSlice";
import { toast } from "react-toastify";

export default function OtpPage() {
  const accessToken = localStorage.getItem("accessToken");
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(600); 
  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (otpValue.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    try {
      await dispatch(verifyOtp({ email, otp: otpValue })).unwrap();
      toast.success("OTP Verified Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.message || "OTP Verification Failed");
    }
  };

  const handleResendOtp = async () => {
    if (!email.trim()) {
      toast.error("Email is required to send OTP");
      return;
    }

    try {
      await dispatch(sendOtp({ email })).unwrap();
      toast.success("OTP Sent Successfully");

      // Reset countdown to 10 minutes
      setCountdown(600);
    } catch (error) {
      toast.error(error?.message || "Failed to resend OTP");
    }
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    dispatch(sendOtp());
  }, [dispatch, navigate, accessToken]);

  if (!accessToken) return null;

  // Format countdown (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
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
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                onClick={() => {
                  dispatch(clearToken());
                  navigate("/login");
                }}
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
              ENTER OTP
            </Typography>
            <Typography variant="body2" color="gray" textAlign="center">
              We have sent a verification code to your email.
            </Typography>
          </Grid>

          {/* Email Field */}
          <Grid size={12} width="100%" display="flex" justifyContent="center">
            <TextField
              fullWidth
              label="Enter your Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 1, width: 500 }}
            />
          </Grid>

          {/* OTP Inputs */}
          <Grid container spacing={2} justifyContent="center" mb={3}>
            {otp.map((digit, index) => (
              <Grid key={index}>
                <TextField
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  variant="outlined"
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center", fontSize: "1.5rem" },
                  }}
                  sx={{ width: 70, height: 50 }}
                />
              </Grid>
            ))}
          </Grid>

          {/* Countdown Timer */}
          <Grid size={12} textAlign="center" mb={2}>
            <Typography variant="body2" color="red">
              Time remaining: {formatTime(countdown)}
            </Typography>
          </Grid>

          {/* Verify OTP Button */}
          <Grid size={12}>
            <Button
              fullWidth
              disabled={loading}
              onClick={handleSubmit}
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
            >
              Verify OTP
            </Button>
          </Grid>

          {/* Resend OTP Button */}
          <Grid size={12} textAlign="center">
            <Button
              onClick={handleResendOtp}
              sx={{
                color: "gray",
                textDecoration: "underline",
              }}
            >
              Resend OTP
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
