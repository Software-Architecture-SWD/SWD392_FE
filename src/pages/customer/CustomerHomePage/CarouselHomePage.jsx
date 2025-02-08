import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid from "@mui/material/Grid2";
import { Typewriter } from "react-simple-typewriter";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import { animated, useSpring } from "react-spring";
import { useState } from "react";

// Import images correctly
import slider1 from "/src/assets/images/HomeSlider/slider1.jpg";
import slider2 from "/src/assets/images/HomeSlider/slider2.jpg";
import slider3 from "/src/assets/images/HomeSlider/slider3.jpg";
import { useNavigate } from "react-router-dom";

const AnimatedButton = animated(Button);

export default function CarouselHomePage() {
  const slides = [slider1, slider2, slider3];
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  // Define the spring animation
  const springProps = useSpring({
    boxShadow: isHovered
      ? "0 0 10px 10px #FF8E53"
      : "0 0 0px 0px var(--primary-color)",
    config: { tension: 100, friction: 100 },
  });

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
        }}
      >
        <Typography
          sx={{
            color: "black",
            fontFamily: "Lora",
            fontSize: { xs: "3vw", sm: "2.5vw", md: "2rem", lg: "2.5rem" },
            textAlign: "center",
            fontStyle: "italic",
            letterSpacing: "0.2rem",
            mb: "1rem",
          }}
        >
          "True beauty comes from within, but a little{" "}
          <span style={{ color: "var(--primary-color)", fontStyle: "italic" }}>
            <Typewriter
              words={['lipstick never hurts."', 'confidence never hurts."']}
              loop
              typeSpeed={150}
              deleteSpeed={100}
            />
          </span>
        </Typography>

        <AnimatedButton
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
          }}
          style={springProps}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Get Started
        </AnimatedButton>
      </Box>

      {/* React Responsive Carousel */}
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        interval={2000}
        showThumbs={false}
        showStatus={false}
      >
        {slides.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                width: "80%",
                objectFit: "cover",
                display: "block",
                margin: "0 auto",
                borderRadius: "1rem",
              }}
            />
          </div>
        ))}
      </Carousel>
    </Box>
  );
}
