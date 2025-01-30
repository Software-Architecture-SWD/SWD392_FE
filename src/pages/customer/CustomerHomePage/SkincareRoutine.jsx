import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function SkincareRoutine() {
  return (
    <>
      <Box sx={{ margin: "0rem 2rem 5rem 2rem" }}>
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "Lora",
            textTransform: "uppercase",
            fontStyle: "italic",
            fontSize: "2.5rem",
            fontWeight: "500",
            letterSpacing: "0.2rem",
            mb: "4rem",
          }}
        >
          “Good things take time but{" "}
          <span style={{ color: "var(--primary-color)" }}>good skin</span> comes
          right after the minute you decide to{" "}
          <span style={{ color: "var(--primary-color)" }}>
            take care of it.”
          </span>
        </Typography>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "60vw",
            margin: "0 auto",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {/* Video */}
          <video
            src="src/assets/videos/VideoHomePage/video1.mp4"
            autoPlay
            muted
            loop
            width="100%"
            style={{
              height: "auto",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          {/* Text */}
          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              bottom: "0",
              color: "white",
              fontSize: "1.8rem",
              fontWeight: "bold",
              textAlign: "center",
              background: "rgba(0, 0, 0, 0.6)",
              padding: "1rem 2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              maxWidth: "40%",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "2px",
                lineHeight: "1.5",
                background: "linear-gradient(90deg, #ff9a9e, #fad0c4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontFamily: "Lora",
              }}
            >
              <Typography
                component="div"
                sx={{ display: "block", fontSize: "3rem", fontFamily: "Lora" }}
              >
                Nourish.
              </Typography>
              <Typography
                component="div"
                sx={{ display: "block", fontSize: "3rem", fontFamily: "Lora" }}
              >
                Hydrate.
              </Typography>
              <Typography
                component="div"
                sx={{ display: "block", fontSize: "3rem", fontFamily: "Lora" }}
              >
                Glow.
              </Typography>

              <Typography
                component="div"
                sx={{
                  display: "block",
                  fontSize: "1.6rem",
                  fontStyle: "italic",
                  color: "#fbc2eb",
                  marginTop: "1rem",
                  fontFamily: "Lora",
                }}
              >
                Every day is a step towards radiant skin.
              </Typography>
            </Typography>
            <Button
              sx={{
                backgroundColor: "var(--white-color)",
                color: "var(--black-color)",
                borderRadius: "0",
                fontWeight: "bold",
                fontSize: "1rem",
                padding: "1rem",
                mt: "2rem",
                ":hover": {
                  backgroundColor: "var(--black-color)",
                  color: "var(--white-color)",
                },
              }}
            >
              DISCOVER YOUR SKIN TYPE
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
