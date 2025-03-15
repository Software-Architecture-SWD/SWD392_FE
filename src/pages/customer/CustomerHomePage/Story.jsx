import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

const Story = () => {
  const navigate = useNavigate();
  const stories = [
    {
      title: "Exploring the Mountains",
      description: "A thrilling journey through the rocky landscapes.",
      image: "src/assets/images/HomeStory/story2.jpg",
    },
    {
      title: "City Lights",
      description: "The beauty of urban life at night.",
      image: "src/assets/images/HomeStory/story1.jpg",
    },
    {
      title: "Forest Trails",
      description: "Discover the hidden paths in the woods.",
      image: "src/assets/images/HomeStory/story3.jpg",
    },
    {
      title: "Coastal Escape",
      description: "Relax by the sea with stunning views.",
      image: "src/assets/images/HomeStory/story4.jpg",
    },
    {
      title: "Desert Adventures",
      description: "Uncover the secrets of the sands.",
      image: "src/assets/images/HomeStory/story5.jpg",
    },
    {
      title: "Winter Wonderland",
      description: "Snow-covered landscapes await.",
      image: "src/assets/images/HomeStory/story5.jpg",
    },
  ];

  return (
    <Container maxWidth="100%" sx={{ py: 4, backgroundColor: "#f9f9f9" }}>
      <Typography
        variant="h2"
        gutterBottom
        textAlign="center"
        fontFamily="Lora"
        fontWeight="600"
      >
        Featured Story
      </Typography>
      <Card
        sx={{
          mb: 4,
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          ":hover": {
            transform: "scale(1.02)",
            boxShadow: "0 6px 30px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="400"
          image="src/assets/images/HomeStory/story2.jpg"
          alt="Featured Story"
          sx={{ borderRadius: "4px 4px 0 0" }}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            Adventure Awaits
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.6 }}
          >
            Embark on a journey to explore the unknown.
          </Typography>
          <Button
            onClick={() => navigate("/blogs")}
            sx={{
              backgroundColor: "black",
              color: "white",
              borderRadius: 2,
              px: 3,
              py: 1,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease-in, background 0.3s ease-in",
              ":active": {
                transform: "scale(0.95)",
              },
              ":hover": {
                background: "linear-gradient(45deg, #FF8E53, #FF6B6B)",
              },
            }}
          >
            Read More
          </Button>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontFamily="Lora"
        fontWeight="500"
      >
        More Stories
      </Typography>

      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        emulateTouch
        centerMode
        centerSlidePercentage={35}
        showArrows
        autoPlay
        interval={3000}
        stopOnHover
        swipeable
        renderIndicator={(onClickHandler, isSelected, index, label) => (
          <li
            style={{
              background: isSelected ? "#FF6B6B" : "#ddd",
              width: 10,
              height: 10,
              borderRadius: "50%",
              display: "inline-block",
              margin: "0 5px",
              cursor: "pointer",
            }}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            role="button"
            tabIndex={0}
            aria-label={`${label} ${index + 1}`}
          />
        )}
      >
        {stories.map((story, index) => (
          <Box
            key={index}
            sx={{
              padding: "0 10px",
              transition: "transform 0.3s",
              ":hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                ":hover": {
                  boxShadow: "0 6px 30px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={story.image}
                alt={story.title}
                sx={{ borderRadius: "4px 4px 0 0" }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mb: 1, textAlign: "center" }}
                >
                  {story.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", lineHeight: 1.5 }}
                >
                  {story.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Carousel>
    </Container>
  );
};

export default Story;
