import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ProductCard from "../../../components/common/ProductCard";
import { useState } from "react";
import { API_GET_PRODUCT } from "../../../constants";
import Grid from "@mui/material/Grid2";
import axiosClient from "../../../axiosClient";
import useProducts from "../../../hooks/useProducts";

export default function NewArrival() {
  const { products, loading, error } = useProducts();

  return (
    <Box sx={{ backgroundColor: "white", mb: "5rem" }}>
      <Typography
        sx={{
          textAlign: "center",
          fontFamily: "'Libre Barcode 128 Text', cursive",
          fontSize: "5rem",
          fontWeight: "500",
          color: "var(--black-color)",
        }}
      >
        NEW ARRIVAL
      </Typography>

      <Box
        sx={{
          border: "2px dashed black",
          marginLeft: "2rem",
          marginRight: "2rem",
          height: "100%",
        }}
      >
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
      </Box>
    </Box>
  );
}
