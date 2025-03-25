import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axiosClient from "../../../../axiosClient";
import "./ProductFilter.css";

const ProductFilter = ({ onFilterChange, currentFilters }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          axiosClient.get("/categories"),
          axiosClient.get("/brands")
        ]);

        console.log('Categories response:', categoriesRes.data);
        console.log('Brands response:', brandsRes.data);

        if (Array.isArray(categoriesRes.data)) {
          setCategories(categoriesRes.data);
        }
        if (Array.isArray(brandsRes.data)) {
          setBrands(brandsRes.data);
        }
      } catch (error) {
        console.error("Error fetching filters:", error);
        setCategories([]);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...currentFilters,
      [name]: value
    });
  };

  if (loading) {
    return (
      <div className="text-center py-3">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading filters...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="filters">
      <h3>Filters</h3>
      
      <div className="filter-section">
        <h4>Category</h4>
        <Form.Select
          name="categoryName"
          value={currentFilters.categoryName}
          onChange={handleFilterChange}
          className="custom-select"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </Form.Select>
      </div>

      <div className="filter-section">
        <h4>Brand</h4>
        <Form.Select
          name="brandName"
          value={currentFilters.brandName}
          onChange={handleFilterChange}
          className="custom-select"
        >
          <option value="">All Brands</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.brandName}>
              {brand.brandName}
            </option>
          ))}
        </Form.Select>
      </div>

      <div className="filter-section">
        <h4>Sort by Price</h4>
        <Form.Select
          name="sortPrice"
          value={currentFilters.sortPrice}
          onChange={handleFilterChange}
          className="custom-select"
        >
          <option value="">No sorting</option>
          <option value="desc">Price: High to Low</option>
          <option value="asc">Price: Low to High</option>
        </Form.Select>
      </div>

      <style jsx>{`
        .filters {
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .filter-section {
          margin-bottom: 20px;
        }

        .filter-section h4 {
          margin-bottom: 10px;
          font-size: 16px;
          color: #333;
        }

        .custom-select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: white;
          cursor: pointer;
        }

        .custom-select:hover {
          border-color: #999;
        }

        .custom-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13,110,253,.25);
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default ProductFilter; 