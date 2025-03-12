import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../features/authSlice";
import { toast } from "react-toastify";

function ForgotPassPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const response = await dispatch(forgotPassword({ email })).unwrap();
      toast.success(response?.message || "Reset password email sent!");
      navigate("/reset-password")
      setEmail("");
    } catch (err) {
      toast.error(err?.message || "Failed to send reset password email.");
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
          <Grid item xs={12}>
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
              FORGOT PASSWORD
            </Typography>
            <Typography variant="body2" color="gray" textAlign="center">
              Enter your email address to receive a password reset link.
            </Typography>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <TextField
              fullWidth
              label="Enter your Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 1, width: 500 }}
              error={!!error}
              helperText={error || ""}
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                margin: "auto 0",
                width: "70%",
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
              {loading ? "Sending..." : "SEND"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ForgotPassPage;
