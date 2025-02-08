import { Box, Container, Typography, Button } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

export default function Story() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ backgroundColor: "rgba(0, 0, 0, 1)", width: "100%", mb: "5rem" }}
    >
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", alignItems: "stretch" }}
      >
        {/* Left Image Section */}
        <Grid size={4} sx={{ display: "flex" }}>
          <Box sx={{ width: "100%", height: "100%" }}>
            <img
              src="src/assets/images/HomeStory/story1.jpg"
              alt="Beauty Story"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Grid>

        {/* Right Text Section */}
        <Grid
          size={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="lg" sx={{ color: "white" }}>
            <Box textAlign="left">
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontFamily: "Lora, serif",
                  fontSize: "3rem",
                  color: "var(--primary-color)",
                  textShadow: "0 0 5px rgb(255, 4, 238)",
                  mb:"1rem",
                }}
              >
                BeautyProduct – Your Destination for Radiant Beauty
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontFamily: "Lora, serif", fontSize: "1.5rem", mb:"2rem" }}
              >
                Welcome to <strong>BeautyProduct</strong>, where beauty meets
                confidence! We bring you a curated selection of high-quality
                skincare, makeup, and self-care essentials to enhance your
                natural glow.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontFamily: "Lora, serif", fontSize: "1.5rem", mb:"2rem" }}
              >
                At <strong>BeautyProduct</strong>, we believe that beauty is for
                everyone. Whether you're looking for nourishing skincare, bold
                makeup looks, or expert beauty tips, our carefully selected
                products cater to all skin types and styles.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontFamily: "Lora, serif", fontSize: "1.5rem", mb:"1rem" }}
              >
                Explore the latest trends, discover must-have beauty essentials,
                and embrace the glow you deserve. Because at{" "}
                <strong>BeautyProduct</strong>, your beauty is our priority!
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                sx={{
                  fontFamily: "Lora, serif",
                  fontSize: "2rem",
                  textShadow: "0 0 2px rgb(255, 4, 238)",
                  color: "var(--primary-color)",
                }}
              >
                ✨ Glow Every Day with BeautyProduct! ✨
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  mt: "2rem",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate("/blogs")}
                  sx={{
                    background: "linear-gradient(45deg,#ff6b6b, #FF8E53)",
                    color: "white",
                    fontSize: "1.2rem",
                    fontFamily: "Lora, serif",
                    padding: "10px 20px",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    boxShadow: "0px 4px 10px rgba(255, 107, 107, 0.4)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      background: "linear-gradient(45deg, #FF8E53, #FF6B6B)",
                      boxShadow: "0px 6px 14px rgba(255, 107, 107, 0.6)",
                    },
                  }}
                >
                  READ MORE
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
