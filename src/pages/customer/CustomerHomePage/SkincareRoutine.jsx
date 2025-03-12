import { Box, Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function SkincareRoutine() {
  const [darkMode, setDarkMode] = useState(false);
  const steps = [
    {
      title_m: "Cleanser",
      description_m: "Wash your face with a gentle cleanser.",
      title_n: "Cleanser",
      description_n: "Remove dirt, oil, and makeup.",
    },
    {
      title_m: "Toner",
      description_m: "Apply to balance pH and prep skin.",
      title_n: "Toner",
      description_n: "Restore skin balance.",
    },
    {
      title_m: "Serum",
      description_m: "Use Vitamin C for brightening.",
      title_n: "Serum",
      description_n: "Use retinol or hyaluronic acid.",
    },
    {
      title_m: "Moisturizer",
      description_m: "Hydrate your skin.",
      title_n: "Moisturizer",
      description_n: "Lock in hydration.",
    },
    {
      title_m: "Sunscreen",
      description_m: "SPF 30+ to protect from UV rays.",
      title_n: "Lip Balm",
      description_n: "Keep lips soft overnight.",
    },
  ];

  const routines = [
    {
      img: "src/assets/images/HomeRoutine/r1.jpg",
      title: "Vegan & Cruelty Free",
      description:
        "All products are 100% Vegan and have been registered with the Vegan Society. We will never test our products or ingredients on animals nor do we use suppliers who test them on our behalf.",
    },
    {
      img: "src/assets/images/HomeRoutine/r2.jpg",
      title: "Clean Ingredients",
      description:
        "We avoid any raw materials that are considered toxic or harmful to sensitive skin. If the safety of an ingredient is unclear, we avoid it until more concrete evidence is available.",
    },
    {
      img: "src/assets/images/HomeRoutine/r3.jpg",
      title: "UK Made",
      description:
        "All of our products are made in the UK, widely considered a leading hub for ethical cosmetic practices, and comply with current European Cosmetic Safety legislation.",
    },
    {
      img: "src/assets/images/HomeRoutine/r4.jpg",
      title: "Carbon Neutral",
      description:
        "Plenaire is a certified carbon neutral company, offsetting emissions to contribute to clean drinking water projects in Odisha, India.",
    },
  ];

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
            mb: "4rem",
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
              fontSize: "1.8rem",
              fontWeight: "bold",
              textAlign: "center",
              background: "rgba(0, 0, 0, 0.15)",
              padding: "1rem 2rem",
              borderRadius: "4px",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
              maxWidth: "45%",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: {
                  lg: "2rem",
                  md: "1.5rem",
                  sm: "1rem",
                  xs: "0.5rem",
                },
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
                sx={{
                  display: "block",
                  fontSize: {
                    lg: "3rem",
                    md: "1.5rem",
                    sm: "1rem",
                    xs: "0.5rem",
                  },
                  fontFamily: "Lora",
                }}
              >
                Nourish.
              </Typography>
              <Typography
                component="div"
                sx={{
                  display: "block",
                  fontSize: {
                    lg: "3rem",
                    md: "1.5rem",
                    sm: "1rem",
                    xs: "0.5rem",
                  },
                  fontFamily: "Lora",
                }}
              >
                Hydrate.
              </Typography>
              <Typography
                component="div"
                sx={{
                  display: "block",
                  fontSize: {
                    lg: "3rem",
                    md: "1.5rem",
                    sm: "1rem",
                    xs: "0.5rem",
                  },
                  fontFamily: "Lora",
                }}
              >
                Glow.
              </Typography>

              <Typography
                component="div"
                sx={{
                  display: "block",
                  fontSize: {
                    lg: "1.6rem",
                    md: "1rem",
                    sm: "1rem",
                    xs: "0.5rem",
                  },
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
                fontSize: {
                  lg: "1rem",
                  md: "0.7rem",
                  sm: "0.5rem",
                  xs: "0.2rem",
                },
                padding: "0.8rem",
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

        <Box>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontFamily: "Lora",
              fontWeight: "600",
              letterSpacing: "0.2rem",
              mb: "4rem",
            }}
          >
            Quick Skincare Routine
          </Typography>

          <Box>
            <Paper
              elevation={4}
              sx={{
                padding: 2,
                borderRadius: "20px",
                backgroundColor: darkMode ? "#0B192C" : "white",
                mb: "2rem",
                transition: "background-color 0.3s ease-in-out",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  borderBottom: darkMode
                    ? "1px solid white"
                    : "1px solid black",
                  paddingBottom: "1rem",
                  mb: "1rem",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "Lora",
                    fontWeight: "500",
                    textAlign: "center",
                    flexGrow: 1,
                    color: darkMode ? "white" : "black",
                    transition: "color 0.3s ease-in-out",
                  }}
                >
                  {darkMode ? "Night Routine" : "Morning Routine"}
                </Typography>

                <Button
                  onClick={() => setDarkMode(!darkMode)}
                  sx={{
                    position: "absolute",
                    right: "0",
                    borderRadius: "20px",
                    padding: "8px 16px",
                    backgroundColor: darkMode ? "#333" : "#FFD700",
                    color: darkMode ? "white" : "black",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    "&:hover": {
                      backgroundColor: darkMode ? "#444" : "#FFC107",
                    },
                  }}
                >
                  {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
                  {darkMode ? "Night" : "Morning"}
                </Button>
              </Box>

              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {steps.map((step, index) => (
                  <Grid size={2.4} key={index} sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        background: "linear-gradient(45deg,#ff6b6b, #FF8E53)",
                        boxShadow: "0px 4px 10px rgba(255, 107, 107, 0.4)",
                        borderRadius: "50%",
                        width: 50,
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        margin: "0 auto",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #FF8E53, #FF6B6B)",
                          boxShadow: "0px 6px 14px rgba(255, 107, 107, 0.6)",
                          cursor: "default",
                        },
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography
                      sx={{
                        marginTop: 1,
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: darkMode ? "white" : "black",
                      }}
                    >
                      {darkMode ? step.title_n : step.title_m}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: darkMode ? "lightgray" : "gray",
                      }}
                    >
                      {darkMode ? step.description_n : step.description_m}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            <Box>
              <Grid container spacing={2}>
                {routines.map((routine, index) => (
                  <Grid size={3} key={index}>
                    <Box
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={routine.img}
                        alt={routine.title}
                        style={{
                          width: "50%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          marginTop: "1rem",
                          color: "var(--primary-text-color)",
                        }}
                      >
                        {routine.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          marginTop: "0.5rem",
                          color: "gray", // Adjust color for description text
                          maxWidth: "250px",
                          margin: "0 auto",
                        }}
                      >
                        {routine.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
