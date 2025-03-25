import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import axiosClient from '../../../../axiosClient';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    categoryName: '',
    brandName: '',
    sortPrice: '',
    pageSize: 10
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        pageSize: filters.pageSize
      });

      if (filters.categoryName) {
        params.append('categoryName', filters.categoryName);
      }
      if (filters.brandName) {
        params.append('brandName', filters.brandName);
      }
      if (filters.sortPrice) {
        params.append('sortPrice', filters.sortPrice);
      }

      console.log('Fetching products with URL:', `/products/filter?${params.toString()}`);
      
      const response = await axiosClient.get(`/products/filter?${params.toString()}`);
      console.log('API Response:', response.data);

      if (response.data?.data) {
        const productsData = response.data.data;
        console.log('Products data:', productsData);
        
        setProducts(productsData);
        // Apply search filter to the fetched products
        filterProducts(productsData, searchTerm);
        const total = response.data.totalCount || productsData.length;
        setTotalPages(Math.ceil(total / filters.pageSize));
      } else {
        console.log('No products found or invalid response format');
        setProducts([]);
        setFilteredProducts([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response,
        config: error.config
      });
      setError('Failed to fetch products. Please try again later.');
      setProducts([]);
      setFilteredProducts([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  // Function to filter products based on search term
  const filterProducts = (productsToFilter, term) => {
    if (!term.trim()) {
      setFilteredProducts(productsToFilter);
      return;
    }

    const searchTermLower = term.toLowerCase();
    const filtered = productsToFilter.filter(product =>
      product.productName.toLowerCase().includes(searchTermLower)
    );
    setFilteredProducts(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    filterProducts(products, newSearchTerm);
  };

  useEffect(() => {
    console.log('Current filters:', filters);
    fetchProducts();
  }, [currentPage, filters]);

  const handleFilterChange = (newFilters) => {
    console.log('Applying new filters:', newFilters);
    setCurrentPage(1);
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Container className="products-page py-4">
      <Row>
        <Col md={3}>
          <ProductFilter 
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
        </Col>
        <Col md={9}>
          {/* Search Bar */}
          <div className="mb-4">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </InputGroup>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading products...</span>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <Row xs={1} sm={2} lg={3} className="g-4">
                {filteredProducts.map(product => (
                  <Col key={product.id}>
                    <ProductCard 
                      product={{
                        ...product,
                        formattedPrice: formatPrice(product.price),
                        formattedOriginalPrice: product.originalPrice && formatPrice(product.originalPrice)
                      }}
                    />
                  </Col>
                ))}
              </Row>
              
              {totalPages > 1 && !searchTerm && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    <Pagination.First 
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                    />
                    <Pagination.Prev 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    
                    <Pagination.Next 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                    <Pagination.Last 
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage; 