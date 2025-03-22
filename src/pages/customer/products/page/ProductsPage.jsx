import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Col, Container, Row, Spinner, Pagination, Alert } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ProductFilter from '../components/ProductFilter';
import { API } from '../../../../services';
import '../styles/style.css';
import '../styles/main.css';
import '../styles/products.css';

export default function ProductsPage() {
  // State declarations
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  // Calculate optimal page size based on screen dimensions
  const calculateOptimalPageSize = useCallback(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const cardWidth = 300; // Approximate width of a product card
    const cardHeight = 400; // Approximate height of a product card
    const cardsPerRow = Math.floor(screenWidth * 0.7 / cardWidth); // 70% of screen width
    const rowsPerPage = Math.floor(screenHeight * 0.7 / cardHeight); // 70% of screen height
    return Math.max(cardsPerRow * rowsPerPage, 12); // Minimum 12 products
  }, []);

  // Handle window resize and update products per page
  useEffect(() => {
    const handleResize = () => {
      setProductsPerPage(calculateOptimalPageSize());
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Calculate initial page size

    return () => window.removeEventListener('resize', handleResize);
  }, [calculateOptimalPageSize]);

  // Fetch products when filters, page, or page size changes
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        page: currentPage,
        pageSize: productsPerPage,
      };
      
      // Add filters to params if selected
      if (selectedBrand) params.brandName = selectedBrand;
      if (selectedCategory) params.categoryName = selectedCategory;
      
      // Use the base endpoint for all cases
      const response = await API.products.getProducts(params);
      
      // Format products data
      const formattedProducts = API.products.formatProductData(
        response.products || []
      );
      
      setProducts(formattedProducts);
      
      // Set total pages directly from response or calculate if not available
      setTotalPages(response.totalPages || Math.ceil(formattedProducts.length / productsPerPage));
      
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message || "Failed to load products");
      setProducts([]);
      
    } finally {
      setLoading(false);
    }
  }, [currentPage, productsPerPage, selectedBrand, selectedCategory]);

  // Load products when dependencies change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle filter changes
  const handleFilterChange = (filters) => {
    setSelectedBrand(filters.brandName);
    setSelectedCategory(filters.categoryName);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render loading state
  if (loading) return (
    <Container className="mt-5 section-margin--small mb-5">
      <Row>
        <Col className="col-xl-3 col-lg-3 col-md-4">
          <ProductFilter onFilterChange={handleFilterChange} />
        </Col>
        <Col className="col-xl-9 col-lg-9 col-md-8 text-center">
          <Spinner animation="border" variant="warning">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    </Container>
  );

  return (
    <div>
      <Container className="mt-5 section-margin--small mb-5">
        <Row>
          <Col className="col-xl-3 col-lg-3 col-md-4">
            <ProductFilter onFilterChange={handleFilterChange} />
          </Col>
          <Col className="col-xl-9 col-lg-9 col-md-8">
            {error ? (
              <Alert variant="danger" className="text-center mt-4">
                <h4>{error}</h4>
                {(selectedBrand || selectedCategory) && (
                  <p className="mt-3">
                    Try selecting different filters to find products.
                  </p>
                )}
              </Alert>
            ) : products.length === 0 ? (
              <Alert variant="info" className="text-center mt-4">
                <h4>No products found</h4>
                {(selectedBrand || selectedCategory) && (
                  <p className="mt-3">
                    Try selecting different filters to find products.
                  </p>
                )}
              </Alert>
            ) : (
              <>
                <div className="mb-3">
                  <span className="text-muted">
                    Showing {products.length} products
                    {selectedBrand && ` in brand "${selectedBrand}"`}
                    {selectedCategory && ` in category "${selectedCategory}"`}
                  </span>
                </div>
                <Row>
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      style={{ width: "19rem" }}
                      className="m-2 p-2 card-desk card d-flex flex-column product-card"
                    >
                      <div className="product-img-container">
                        <Card.Img 
                          variant="top" 
                          src={product.imageUrl} 
                          className="product-img"
                        />
                        <div className="product-overlay">
                          <Link to={`/product/${product.id}`}>
                            <Button variant="light" className="view-detail-btn">View Detail</Button>
                          </Link>
                        </div>
                      </div>
                      <Card.Body className="d-flex flex-column">
                        <div className="product-info">
                          <Card.Title className="product-title">
                            {product.productName || 'No Title'}
                          </Card.Title>
                          <div className="product-brand-category">
                            {product.brandName && <span className="brand">{product.brandName}</span>}
                            {product.categoryName && <span className="category">{product.categoryName}</span>}
                          </div>
                          <Card.Text className="product-description">
                            {product.description 
                              ? product.description.length > 100 
                                ? product.description.substring(0, 100) + '...'
                                : product.description
                              : 'No description available'}
                          </Card.Text>
                          <div className="price-container">
                            <span className="price">
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                              }).format(product.price)}
                            </span>
                            {product.oldPrice && (
                              <span className="old-price">
                                {new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                                }).format(product.oldPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </Row>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Col md={{ span: 6, offset: 3 }}>  
                    <Row className="mt-4 justify-content-center">
                      <Pagination>
                        <Pagination.First 
                          onClick={() => paginate(1)}
                          disabled={currentPage === 1}
                        />
                        <Pagination.Prev 
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        />
                        {[...Array(totalPages)].map((_, index) => (
                          <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => paginate(index + 1)}
                          >
                            {index + 1}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next 
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        />
                        <Pagination.Last 
                          onClick={() => paginate(totalPages)}
                          disabled={currentPage === totalPages}
                        />
                      </Pagination>
                    </Row>
                  </Col>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}