import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Rating } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function ProductCard({ product }) {
  // State for quantity
  const [quantity, setQuantity] = useState(1);

  // Calculate total price
  const totalPrice = product.price * quantity;

  // Handle increase and decrease of quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 325,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardMedia
        sx={{ height: 200 }}
        image={product.image}
        title={product.name}
      />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography
          variant="body3"
          sx={{
            fontSize: "0.8rem",
            fontWeight: "600",
            display: "inline-flex",
            border: "2px solid green",
            borderRadius: "20px",
            padding: "0.2rem 1rem 0.2rem 1rem",
            mb: "0.5rem",
            mr: "0.5rem",
          }}
        >
          {product.type}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontFamily: "'Lora'",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
        >
          <Rating
            name="read-only"
            value={3.5}
            size="small"
            precision={0.5}
            readOnly
          />
          <span
            style={{
              color: "var(--secondary-text-color)",
              fontSize: "0.8rem",
              marginLeft: "0.4rem",
            }}
          >
            (3.5)
          </span>
        </Box>
        <Typography
          variant="body3"
          sx={{
            color: "var(--secondary-text-color)",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "1rem",
          }}
        >
          {product.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: "1rem",
            flexWrap: "wrap",
            columnGap: "3rem",
            rowGap: "1rem",
          }}
        >
          {/* Quantity */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgb(245, 245, 245)",
              borderRadius: "8px",
              padding: "4px",
              boxShadow: "0px 0px 5px black inset",
            }}
          >
            <Button
              size="small"
              onClick={decreaseQuantity}
              disabled={quantity === 1}
              sx={{
                borderRadius: "8px",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                },
                transition: "background-color 0.2s ease",
                padding: "4px",
                color: "var(--primary-color)",
              }}
            >
              <RemoveIcon sx={{ fontSize: "1.2rem" }} />
            </Button>

            <Typography
              sx={{
                mx: 1,
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "black",
                lineHeight: "1.4",
              }}
            >
              {quantity}
            </Typography>

            <Button
              size="small"
              onClick={increaseQuantity}
              sx={{
                borderRadius: "8px",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                },
                transition: "background-color 0.2s ease",
                padding: "4px",
                color: "var(--primary-color)",
              }}
            >
              <AddIcon sx={{ fontSize: "1.2rem" }} />
            </Button>
          </Box>

          {/* Price */}
          <Typography
            sx={{
              fontSize: "1.9rem",
              fontFamily: "Lora",
              fontStyle: "italic",
              fontWeight: "500",
              color: "var(--primary-color)",
              textAlign: "center",
            }}
          >
            {totalPrice}$
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        sx={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <Button
          size="medium"
          sx={{
            backgroundColor: "var(--black-color)",
            color: "var(--white-color)",
            marginBottom: "1rem",
            width: "clamp(50%, 100% - 1rem, 100%)",
            transition: "background-color 0.3s ease",
            ":hover": {
              backgroundColor: "var(--primary-color)",
            },
          }}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}
