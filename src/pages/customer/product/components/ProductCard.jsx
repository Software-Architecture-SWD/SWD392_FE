import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStockStatus = (quantity) => {
    if (quantity <= 0) return { text: "Out of Stock", variant: "danger" };
    if (quantity <= 10) return { text: "Low Stock", variant: "warning" };
    return { text: "In Stock", variant: "success" };
  };

  const stockStatus = getStockStatus(product.stockQuantity);

  return (
    <Card className="product-card h-100">
      <div className="product-image-container">
        <Card.Img 
          variant="top" 
          src={product.imageUrl || "https://via.placeholder.com/200"} 
          alt={product.productName}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200";
          }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="product-title">{product.productName}</Card.Title>
        <div className="flex-grow-1">
          <div className="price-container">
            <Card.Text className="current-price">
              {formatPrice(product.price)}
            </Card.Text>
            {product.originalPrice > product.price && (
              <Card.Text className="original-price">
                {formatPrice(product.originalPrice)}
              </Card.Text>
            )}
          </div>
          <Badge bg={stockStatus.variant} className="mb-2">
            {stockStatus.text}
          </Badge>
        </div>
        <Link to={`/products/${product.id}`} className="mt-auto">
          <Button variant="primary" className="w-100">
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard; 