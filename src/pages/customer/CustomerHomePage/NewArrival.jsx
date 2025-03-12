import { Box, Typography } from "@mui/material";
import React from "react";
import ProductCard from "../../../components/common/ProductCard";
import Grid from "@mui/material/Grid2";
import Loading from "../../../components/common/Loading";
import InfiniteScrollText from "./InfiniteScrollText";

export default function NewArrival() {
  const loading = true;

  return (
    <Box sx={{ backgroundColor: "white", mb: "5rem" }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          fontFamily: "'Lora', cursive",
          fontWeight: "600",
          color: "var(--black-color)",
          mb: "1rem",
        }}
      >
        NEW ARRIVAL
      </Typography>

      <Box
        sx={{
          // border: "2px dashed black",
          marginLeft: "2rem",
          marginRight: "2rem",
          height: "100%",
        }}
      >
        {loading ? (
          <Loading />
        ) : error ? (
          <Typography textAlign="center" color="error" p={2}>
            Failed to load products
          </Typography>
        ) : (
          <Grid
            container
            spacing={5}
            sx={{
              margin: "2rem 2rem 2rem 2rem",
            }}
          >
            {products.map((product) => (
              <Grid
                size={{ lg: 3, md: 4, sm: 6, xs: 12 }}
                key={product.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <InfiniteScrollText />
    </Box>
  );
}
