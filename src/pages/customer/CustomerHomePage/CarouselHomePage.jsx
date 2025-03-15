import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Typewriter } from "react-simple-typewriter";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import { useNavigate } from "react-router-dom";

export default function CarouselHomePage() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Box sx={{ margin: "0rem 0rem 2rem 0rem" }}>
      <Box
        sx={{
          position: "relative",
          height: "35rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "url(src/assets/images/HomeSlider/home_banner.jpg)",
          backgroundPosition: "50% 38%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay Layer */}
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
            height: "100%",
            width: "40%",
            top: 0,
            left: 0,
          }}
        />

        {/* Text Container */}
        <Box
          sx={{
            position: "absolute",
            width: "40%",
            left: "0%", // Adjust position
            zIndex: 2, // Ensures it's above the overlay
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              width: "100%",
              color: "white",
              fontFamily: "Lora",
              fontSize: { xs: "3vw", sm: "2.5vw", md: "2rem", lg: "2.5rem" },
              textAlign: "center",
              fontStyle: "italic",
              letterSpacing: "0.2rem",
              mb: "1rem",
              mt: "2rem",
              cursor: "default",
            }}
          >
            "True beauty comes from within, but a little{" "}
            <span
              style={{ color: "var(--primary-color)", fontStyle: "italic" }}
            >
              lipstick never hurts."
            </span>
          </Typography>

          {!accessToken && (
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              endIcon={<ArrowForwardTwoToneIcon />}
              sx={{
                textTransform: "none",
                fontFamily: "Lora, serif",
                fontWeight: 600,
                fontSize: "1rem",
                width: "20rem",
                borderRadius: 2,
                px: 3,
                py: 1,
                backgroundColor: "rgb(255, 255, 255)",
                boxShadow: "0 0 10px 3px var(--primary-color)",
                color: "black",
                transition: "all 0.4s ease-out",
                ":hover": {
                  background: "linear-gradient(45deg, #FF8E53, #FF6B6B)",
                  boxShadow: "0 0 10px 5px rgb(179, 175, 175)",
                  color: "white",
                },
              }}
            >
              Get Started
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
