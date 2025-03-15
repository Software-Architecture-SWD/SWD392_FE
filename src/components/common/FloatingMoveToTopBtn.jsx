import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const FloatingMoveToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Fab
      aria-label="scroll to top"
      onClick={scrollToTop}
      sx={{
        color: "white",
        backgroundColor: "var(--primary-color)",
        position: "fixed",
        bottom: 16,
        right: 16,
        display: isVisible ? "flex" : "none",
        boxShadow: "0px 1px 7px 5px rgb(0, 0, 0, 0.5)",
        transition: "all 0.3s ease-in-out",
        ":hover": {
          color: "white",
          backgroundColor: "var(--primary-color)",
          boxShadow: "0px 1px 10px 5px black",
        },
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default FloatingMoveToTopBtn;
