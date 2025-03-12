import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

export default function AboutUsPage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: "60vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          position: "relative",
          background: "url(src/assets/images/AboutUs/about_us.jpg)",
          backgroundPosition: "50% 40%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", fontFamily: "Playfair Display", zIndex: 1 }}
        >
          About Us
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontStyle: "italic", opacity: 0.9, mt: 2, zIndex: 1 }}
        >
          "Radiating confidence through beauty & self-care."
        </Typography>
      </Box>

      {/* Mission Section */}
      <Container sx={{ py: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontFamily: "Playfair Display",
            mb: 2,
            color: "#D81B60",
          }}
        >
          Our Philosophy
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: "800px", mx: "auto", color: "gray", lineHeight: 1.8 }}
        >
          We believe that beauty is an expression of self-love. Our mission is
          to provide high-quality, ethically sourced beauty products that
          empower every individual to feel confident and radiant in their own
          skin.
        </Typography>
      </Container>

      {/* Team Section */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontFamily: "Playfair Display",
            textAlign: "center",
            mb: 4,
            color: "#D81B60",
          }}
        >
          Meet Our Experts
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              name: "Sophia Rose",
              role: "Founder & CEO",
              img: "https://www.course-api.com/images/people/person-1.jpeg",
            },
            {
              name: "Liam Harper",
              role: "Head of Skincare",
              img: "https://www.course-api.com/images/people/person-2.jpeg",
            },
            {
              name: "Ella Simmons",
              role: "Makeup Artist",
              img: "https://www.course-api.com/images/people/person-3.jpeg",
            },
            {
              name: "Ella Simmons",
              role: "Makeup Artist",
              img: "https://www.course-api.com/images/people/person-4.jpeg",
            },
            {
              name: "Ella Simmons",
              role: "Makeup Artist",
              img: "https://www.course-api.com/images/people/person-5.jpeg",
            },
            {
              name: "Ella Simmons",
              role: "Makeup Artist",
              img: "https://www.course-api.com/images/people/person-1.jpeg",
            },
          ].map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 2,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  borderRadius: "15px",
                  background: "linear-gradient(135deg, #FFF1F5, #FFE4E1)",
                }}
              >
                <CardMedia
                  component="img"
                  image={member.img}
                  alt={member.name}
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    mx: "auto",
                    my: 2,
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Playfair Display",
                      color: "#C2185B",
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Section */}
      <Box sx={{ background: "#FFF0F5", py: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontFamily: "Playfair Display",
            mb: 2,
            color: "#D81B60",
          }}
        >
          Get in Touch
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: "600px", mx: "auto", color: "gray", mb: 3 }}
        >
          Have questions? We'd love to hear from you! Reach out and let’s
          redefine beauty together.
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontStyle: "italic", color: "#C2185B" }}
        >
          📧 Email: hello@beautybrand.com
        </Typography>
      </Box>
    </Box>
  );
}
