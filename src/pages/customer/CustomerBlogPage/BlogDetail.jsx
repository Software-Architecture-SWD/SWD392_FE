import { Typography, Box, Container, Divider, Button } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";

function BlogDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;

  if (!blog) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" color="error">
          No Blog Data Found
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      {/* Blog Title */}
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          mb: 6,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            position: "relative",
            ":hover": {
              color: "var(--primary-color)",
              backgroundColor: "white",
            },
          }}
          onClick={() => navigate("/blogs")}
        >
          <KeyboardBackspaceIcon
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              color: "black",
              fontSize: 30,
              transition: "color 0.1s ease",
              ":hover": {
                color: "var(--primary-color)",
              },
            }}
          />
        </Button>
        <Typography
          variant="h3"
          sx={{ fontFamily: "Lora", fontWeight: 600, textAlign: "right" }}
        >
          {blog.title}
        </Typography>
      </Box>

      {/* Blog Content */}
      {blog.paragraphs.map((paragraph, index) => (
        <Box key={index} sx={{ mb: 5 }}>
          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "var(--primary-color)",
              mb: 2,
            }}
          >
            {paragraph.subTitle}
          </Typography>

          {/* Image */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <img
              src={paragraph.image}
              alt={paragraph.subTitle}
              style={{
                width: "100%",
                maxWidth: "100%",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              }}
            />
          </Box>

          {/* Content */}
          <Typography
            variant="body1"
            sx={{
              fontSize: "18px",
              lineHeight: "1.8",
              color: "text.secondary",
            }}
          >
            {paragraph.content}
          </Typography>

          {index !== blog.paragraphs.length - 1 && (
            <Divider sx={{ mt: 4, mb: 4 }} />
          )}
        </Box>
      ))}
    </Container>
  );
}

export default BlogDetail;
