import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import axiosClient from "../../../../axiosClient";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/products/${id}`);
        console.log("📦 Product Response:", response);
        
        if (response.data?.message === "Product retrieved successfully.") {
          setProduct(response.data.data);
          setError(null);
        } else {
          setError("Product not found");
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        if (error.response?.status === 404 || 
            (error.response?.status === 500 && error.response?.data?.message?.includes("not found"))) {
          setError("Product not found");
        } else {
          setError(error.response?.data?.message || "Failed to fetch product details");
        }
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2 className="mb-4">Oops!</h2>
          <p className="mb-4">{error}</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2 className="mb-4">Product Not Found</h2>
          <p className="mb-4">The product you're looking for doesn't exist or has been removed.</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </Container>
    );
  }

  const stockStatus = getStockStatus(product.stockQuantity);

  return (
    <Container className="product-detail-page py-5">
      <Row>
        <Col md={6} className="mb-4">
          <div className="product-image-container">
            <img
              src={product.imageUrl || "https://via.placeholder.com/400"}
              alt={product.productName}
              className="product-image"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400";
              }}
            />
          </div>
        </Col>
        <Col md={6}>
          <h1 className="product-title mb-3">{product.productName}</h1>
          
          <div className="price-container mb-4">
            <div className="current-price">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice > product.price && (
              <div className="original-price">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <Badge bg={stockStatus.variant} className="mb-4">
            {stockStatus.text}
          </Badge>

          {product.benefits && (
            <div className="mb-4">
              <h5>Benefits:</h5>
              <p>{product.benefits}</p>
            </div>
          )}

          {product.ingredients && (
            <div className="mb-4">
              <h5>Ingredients:</h5>
              <p>{product.ingredients}</p>
            </div>
          )}

          {product.usageInstructions && (
            <div className="mb-4">
              <h5>How to Use:</h5>
              <p>{product.usageInstructions}</p>
            </div>
          )}

          <Button 
            variant="primary" 
            size="lg" 
            className="w-100"
            disabled={product.stockQuantity <= 0}
          >
            {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage; 