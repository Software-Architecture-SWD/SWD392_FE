import { Typography } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../../components/common/SearchBar";
import { useState } from "react";

export default function BlogsPage() {
  const blogsData = [
    {
      id: 1,
      title: "Understanding React Hooks",
      image: "https://picsum.photos/400",
      description:
        "Learn how React Hooks revolutionized state and side effects in functional components.",
      type: "blog",
    },
    {
      id: 2,
      title: "Modern UI Design Principles",
      image: "https://picsum.photos/400",
      description:
        "Explore the latest trends in UI/UX design to create intuitive user experiences.",
      type: "blog",
    },
    {
      id: 3,
      title: "Hands-on React Workshop",
      image: "https://picsum.photos/400",
      description:
        "Join our interactive workshop and build a real-world React app from scratch!",
      type: "workshop",
    },
    {
      id: 4,
      title: "JavaScript Best Practices",
      image: "https://picsum.photos/400",
      description:
        "Discover JavaScript coding patterns to write clean and efficient code.",
      type: "blog",
    },
    {
      id: 5,
      title: "Full-Stack Development Workshop",
      image: "https://picsum.photos/400",
      description:
        "A hands-on workshop covering front-end and back-end development essentials.",
      type: "workshop",
    },
  ];

  return (
    <>
      <Typography variant="h2" sx={{ fontFamily: "Lora", textAlign: "center" }}>
        Blogs
      </Typography>

      <SearchBar />
    </>
  );
}
