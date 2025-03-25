import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import "./ProductList.css";

const ProductList = ({ products }) => {
  return (
    <Row className="product-list">
      {products.map((product) => (
        <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList; 