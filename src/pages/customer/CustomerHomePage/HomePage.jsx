import React from "react";
import { Box, Typography } from "@mui/material";
import CarouselHomePage from "./CarouselHomePage";
import NewArrival from "./NewArrival";
import SkincareRoutine from "./SkincareRoutine";
import Story from "./Story";
import FloatingMoveToTopBtn from "../../../components/common/FloatingMoveToTopBtn";

export default function HomePage() {
  return (
    <Box>
      <CarouselHomePage />
      <NewArrival />
      <SkincareRoutine />
      <Story />
      <FloatingMoveToTopBtn />
    </Box>
  );
}
