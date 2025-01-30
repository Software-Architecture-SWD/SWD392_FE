import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid from "@mui/material/Grid2";
import { Typewriter } from "react-simple-typewriter";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";

// Import images correctly
import slider1 from "/src/assets/images/HomeSlider/slider1.jpg";
import slider2 from "/src/assets/images/HomeSlider/slider2.jpg";
import slider3 from "/src/assets/images/HomeSlider/slider3.jpg";

export default function CarouselHomePage() {
  const slides = [slider1, slider2, slider3];

  return (
    <Box
      sx={{
        margin: "8rem 0rem 5rem 0rem",
        borderTop: "2px solid black",
        borderBottom: "2px solid black",
      }}
    >
      <Grid container spacing={0}>
        <Grid size={4.5} sx={{ borderRight: "3px solid" }}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #E0E0E0, #FFFFFF)",
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
                fontSize: { xs: "3vw", sm: "2.5vw", md: "2rem", lg: "3rem" },
                textAlign: "center",
                letterSpacing: "0.2rem",
              }}
            >
              "True beauty comes from within, but a little{" "}
              <span
                style={{ color: "var(--primary-color)", fontStyle: "italic" }}
              >
                <Typewriter
                  words={['lipstick never hurts."', 'confidence never hurts."']}
                  loop
                  typeSpeed={150}
                  deleteSpeed={100}
                />
              </span>
            </Typography>

            <Button
              sx={{
                marginTop: "2rem",
                border: "2px solid black",
                // borderRadius: "2rem",
                padding: "0.8rem",
                backgroundColor: "var(--black-color)",
                color: "var(--white-color)",
                boxShadow: "0px 0px 0.8rem 1px var(--primary-color)",
                ":hover": {
                  boxShadow: "0px 0px 2rem 5px var(--primary-color)",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Lora",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginRight: "0.5rem",
                }}
              >
                GET START
              </Typography>
              <ArrowForwardTwoToneIcon />
            </Button>
          </Box>
        </Grid>

        <Grid size={7.5}>
          {/* React Responsive Carousel */}
          <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            interval={2000}
            showThumbs={false}
            showStatus={false}
            sx={{ width: "100%" }}
          >
            {slides.map((src, index) => (
              <div key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </div>
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
