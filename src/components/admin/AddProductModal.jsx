import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axiosClient from '../../axiosClient';
import './AddProductModal.css';

const AddProductModal = ({ show, onHide, onProductAdded }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    ProductName: '',
    BrandName: '',
    CategoryName: '',
    Price: '',
    StockQuantity: '',
    ImageFile: null,
    Ingredients: '',
    UsageInstructions: '',
    Benefits: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get categories and brands
        const [categoriesRes, brandsRes] = await Promise.all([
          axiosClient.get('/categories'),
          axiosClient.get('/brands')
        ]);
        
        console.log('Categories response:', categoriesRes);
        console.log('Brands response:', brandsRes);

        // Set the data directly from the response
        setCategories(categoriesRes.data || []);
        setBrands(brandsRes.data || []);

      } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response,
          config: error.config
        });
        toast.error('Failed to load categories and brands');
      }
    };

    if (show) {
      fetchData();
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should not exceed 5MB');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        ImageFile: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      const submitFormData = new FormData();
      
      // Add all form fields except ImageFile
      submitFormData.append('ProductName', formData.ProductName);
      submitFormData.append('BrandName', formData.BrandName);
      submitFormData.append('CategoryName', formData.CategoryName);
      submitFormData.append('Price', formData.Price);
      submitFormData.append('StockQuantity', formData.StockQuantity);
      
      // Only append ImageFile if it exists
      if (formData.ImageFile) {
        submitFormData.append('ImageFile', formData.ImageFile);
      }
      
      // Add optional text fields if they have values
      if (formData.Ingredients) {
        submitFormData.append('Ingredients', formData.Ingredients);
      }
      if (formData.UsageInstructions) {
        submitFormData.append('UsageInstructions', formData.UsageInstructions);
      }
      if (formData.Benefits) {
        submitFormData.append('Benefits', formData.Benefits);
      }

      console.log('Submitting form data:', {
        ProductName: formData.ProductName,
        BrandName: formData.BrandName,
        CategoryName: formData.CategoryName,
        Price: formData.Price,
        StockQuantity: formData.StockQuantity,
        ImageFile: formData.ImageFile?.name || 'No image',
        Ingredients: formData.Ingredients || 'No ingredients',
        UsageInstructions: formData.UsageInstructions || 'No instructions',
        Benefits: formData.Benefits || 'No benefits'
      });

      const response = await axiosClient.post('/products', submitFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('API Response:', response.data);
      toast.success('Product added successfully!');
      onProductAdded(response.data);
      onHide();
      
      // Reset form
      setFormData({
        ProductName: '',
        BrandName: '',
        CategoryName: '',
        Price: '',
        StockQuantity: '',
        ImageFile: null,
        Ingredients: '',
        UsageInstructions: '',
        Benefits: ''
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="add-product-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductName"
                  value={formData.ProductName}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="Price"
                  value={formData.Price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                  min="0"
                  step="0.01"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="CategoryName"
                  value={formData.CategoryName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Select
                  name="BrandName"
                  value={formData.BrandName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.brandName}>
                      {brand.brandName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Stock Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="StockQuantity"
                  value={formData.StockQuantity}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  required
                  min="0"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="file"
                  name="ImageFile"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {imagePreview && (
                  <div className="image-preview-container mt-2">
                    <Image 
                      src={imagePreview} 
                      alt="Preview" 
                      className="image-preview" 
                      thumbnail
                    />
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="Ingredients"
              value={formData.Ingredients}
              onChange={handleChange}
              placeholder="Enter product ingredients"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Usage Instructions</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="UsageInstructions"
              value={formData.UsageInstructions}
              onChange={handleChange}
              placeholder="Enter usage instructions"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Benefits</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="Benefits"
              value={formData.Benefits}
              onChange={handleChange}
              placeholder="Enter product benefits"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal; 