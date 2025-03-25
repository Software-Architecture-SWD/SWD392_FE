import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form, Modal, Spinner, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import axiosClient from '../../axiosClient';
import { toast } from 'react-toastify';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    categoryName: '',
    brandName: '',
    pageSize: 10
  });

  // Form state
  const [formData, setFormData] = useState({
    brandName: '',
    categoryName: '',
    productName: '',
    price: '',
    stockQuantity: '',
    imageFile: null,
    ingredients: '',
    usageInstructions: '',
    benefits: ''
  });

  // Preview image
  const [imagePreview, setImagePreview] = useState(null);

  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    brandId: '',
    categoryId: '',
    brandName: '',
    categoryName: '',
    productName: '',
    price: '',
    stockQuantity: '',
    imageFile: null,
    ingredients: '',
    usageInstructions: '',
    benefits: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, [currentPage, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
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

      const response = await axiosClient.get(`/products/filter?${params.toString()}`);
      console.log('Products response:', response.data);
      
      if (response.data?.data) {
        const productsData = response.data.data;
        setProducts(productsData);
        filterProducts(productsData, searchTerm);
        setTotalPages(Math.ceil(response.data.totalCount / filters.pageSize));
      } else {
        setProducts([]);
        setFilteredProducts([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosClient.get('/categories');
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axiosClient.get('/brands');
      setBrands(response.data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setBrands([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile' && files && files[0]) {
      setFormData({ ...formData, imageFile: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axiosClient.post('/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowAddModal(false);
      fetchProducts();
      // Reset form
      setFormData({
        brandName: '',
        categoryName: '',
        productName: '',
        price: '',
        stockQuantity: '',
        imageFile: null,
        ingredients: '',
        usageInstructions: '',
        benefits: ''
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axiosClient.delete(`/products/${id}`);
        toast.success('Product deleted successfully');
        fetchProducts(); // Refresh the list
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      }
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

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setCurrentPage(1);
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditFormData({
      brandId: product.brandId || '',
      categoryId: product.categoryId || '',
      brandName: product.brandName || '',
      categoryName: product.categoryName || '',
      productName: product.productName || '',
      price: product.price || '',
      stockQuantity: product.stockQuantity || '',
      imageFile: null,
      ingredients: product.ingredients || '',
      usageInstructions: product.usageInstructions || '',
      benefits: product.benefits || ''
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile' && files && files[0]) {
      setEditFormData(prev => ({ ...prev, imageFile: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setEditFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      
      // Find selected brand and category names
      const selectedBrand = brands.find(b => b.id === parseInt(editFormData.brandId));
      const selectedCategory = categories.find(c => c.id === parseInt(editFormData.categoryId));

      // Prepare data with brand and category names
      const dataToSend = {
        ...editFormData,
        brandName: selectedBrand?.brandName || '',
        categoryName: selectedCategory?.categoryName || ''
      };

      Object.keys(dataToSend).forEach(key => {
        if (dataToSend[key] !== null && dataToSend[key] !== '') {
          formDataToSend.append(key, dataToSend[key]);
        }
      });

      await axiosClient.put(`/products/${editingProduct.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Product updated successfully');
      setShowEditModal(false);
      fetchProducts();
      setEditingProduct(null);
      setEditFormData({
        brandId: '',
        categoryId: '',
        brandName: '',
        categoryName: '',
        productName: '',
        price: '',
        stockQuantity: '',
        imageFile: null,
        ingredients: '',
        usageInstructions: '',
        benefits: ''
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="product-management py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Product Management</h2>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Add New Product
          </Button>
        </Col>
      </Row>

      {/* Filters Section */}
      <Row className="mb-4">
        <Col md={4}>
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
        </Col>
        <Col md={4}>
          <Form.Select
            name="categoryName"
            value={filters.categoryName}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            name="brandName"
            value={filters.brandName}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.brandName}>
                {brand.brandName}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <div className="alert alert-danger">{error}</div>
          </Col>
        </Row>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(searchTerm ? filteredProducts : products).map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    )}
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.brandName}</td>
                  <td>{product.categoryName}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{product.stockQuantity}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && !searchTerm && (
            <Row className="mt-4">
              <Col className="d-flex justify-content-center">
                <Button
                  variant="outline-primary"
                  className="me-2"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <span className="mx-3 align-self-center">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline-primary"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </Col>
            </Row>
          )}
        </>
      )}

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Select
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.brandName}>
                        {brand.brandName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price (VND)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                name="imageFile"
                onChange={handleInputChange}
                accept="image/*"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2"
                  style={{ maxWidth: '200px' }}
                />
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                as="textarea"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Usage Instructions</Form.Label>
              <Form.Control
                as="textarea"
                name="usageInstructions"
                value={formData.usageInstructions}
                onChange={handleInputChange}
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Benefits</Form.Label>
              <Form.Control
                as="textarea"
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                rows={3}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Adding...
                  </>
                ) : (
                  'Add Product'
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Add Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Select
                    name="brandId"
                    value={editFormData.brandId}
                    onChange={handleEditInputChange}
                    required
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.brandName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="categoryId"
                    value={editFormData.categoryId}
                    onChange={handleEditInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={editFormData.productName}
                onChange={handleEditInputChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price (VND)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditInputChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="stockQuantity"
                    value={editFormData.stockQuantity}
                    onChange={handleEditInputChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                name="imageFile"
                onChange={handleEditInputChange}
                accept="image/*"
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2"
                  style={{ maxWidth: '200px' }}
                />
              ) : editingProduct?.imageUrl && (
                <img
                  src={editingProduct.imageUrl}
                  alt="Current"
                  className="mt-2"
                  style={{ maxWidth: '200px' }}
                />
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                as="textarea"
                name="ingredients"
                value={editFormData.ingredients}
                onChange={handleEditInputChange}
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Usage Instructions</Form.Label>
              <Form.Control
                as="textarea"
                name="usageInstructions"
                value={editFormData.usageInstructions}
                onChange={handleEditInputChange}
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Benefits</Form.Label>
              <Form.Control
                as="textarea"
                name="benefits"
                value={editFormData.benefits}
                onChange={handleEditInputChange}
                rows={3}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Updating...
                  </>
                ) : (
                  'Update Product'
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductManagement; 