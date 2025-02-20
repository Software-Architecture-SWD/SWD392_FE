import React from "react";
import { Box, CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="50vh"
    >
      <CircularProgress sx={{ color: "var(--primary-color)" }} />
    </Box>
  );
}

export default Loading;
