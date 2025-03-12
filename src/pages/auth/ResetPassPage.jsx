import React, { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/authSlice"; 
import { toast } from "react-toastify";

function ResetPassPage() {
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Extract email and token from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setEmail(queryParams.get("email") || "");
    setToken(queryParams.get("token") || "");
  }, [location]);

  // Handle reset password
  const handleSubmit = async () => {
    if (!newPassword) {
      toast.error("Please enter your new password.");
      return;
    }

    try {
      const response = await dispatch(
        resetPassword({ email, token, newPassword })
      ).unwrap();
      toast.success(response?.message || "Password reset successful!");
      navigate("/login"); // Redirect to login page after success
    } catch (err) {
      toast.error(err?.message || "Failed to reset password.");
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
              RESET PASSWORD
            </Typography>
            <Typography variant="body2" color="gray" textAlign="center">
              Enter your new password.
            </Typography>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <TextField
              fullWidth
              label="Enter your New Password"
              type="password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 1, width: 500 }}
              error={!!error}
              helperText={error || ""}
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              fullWidth
              disabled={loading}
              onClick={handleSubmit}
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
              {loading ? "Processing..." : "RESET PASSWORD"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ResetPassPage;
