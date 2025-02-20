import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid from "@mui/material/Grid2";
import { Typewriter } from "react-simple-typewriter";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import { useNavigate } from "react-router-dom";

export default function CarouselHomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        margin: "8rem 0rem 2rem 0rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "url(src/assets/images/HomeSlider/home_banner.jpg)",
          backgroundPosition: "50% 57%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography
          sx={{
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
          <span style={{ color: "var(--primary-color)", fontStyle: "italic" }}>
            <Typewriter
              words={['lipstick never hurts."', 'confidence never hurts."']}
              loop
              typeSpeed={200}
              deleteSpeed={100}
            />
          </span>
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          endIcon={<ArrowForwardTwoToneIcon />}
          sx={{
            textTransform: "none",
            fontFamily: "Lora, serif",
            fontWeight: 600,
            fontSize: "1rem",
            px: 3,
            py: 1,
            mb: "2rem",
            borderRadius: "30px",
            backgroundColor: "black",
            color: "white",
            transition: "background 0.5s ease-out",
            ":hover": {
              background: "linear-gradient(45deg, #FF8E53, #FF6B6B)",
            },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
}
