import React from "react";
import { Box, Typography } from "@mui/material";
import CarouselHomePage from "./CarouselHomePage";
import NewArrival from "./NewArrival";
import SkincareRoutine from "./SkincareRoutine";

export default function HomePage() {
  return (
    <Box>
      <CarouselHomePage />
      <NewArrival />
      <SkincareRoutine />
    </Box>
  );
}
