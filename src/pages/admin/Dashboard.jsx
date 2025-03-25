import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaUsers, FaBlog } from 'react-icons/fa';
import axiosClient from '../../axiosClient';
import './Dashboard.css';
import AddProductModal from '../../components/admin/AddProductModal';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalBlogs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleProductAdded = (newProduct) => {
    // Update stats after adding a new product
    setStats(prev => ({
      ...prev,
      totalProducts: prev.totalProducts + 1
    }));
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch products count
        const productsResponse = await axiosClient.get('/products');
        const totalProducts = productsResponse.data?.totalCount || 0;

        // For now, we'll use sample data for other stats since APIs might not be available
        setStats({
          totalProducts,
          totalOrders: 150,
          totalUsers: 50,
          totalBlogs: 25,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, link }) => (
    <Card className="stat-card h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Card.Title className="mb-0">{title}</Card.Title>
            <h2 className="mt-3 mb-0">
              {loading ? <div className="loading-placeholder"></div> : value}
            </h2>
          </div>
          <div 
            className="icon-container" 
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon size={24} color={color} />
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="bg-transparent border-top-0">
        <Link to={link} className="text-decoration-none">
          View Details →
        </Link>
      </Card.Footer>
    </Card>
  );

  const QuickAction = ({ title, description, onClick, variant = "primary" }) => (
    <Card className="quick-action-card shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant={variant} onClick={onClick}>
          {title}
        </Button>
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      
      {/* Statistics Cards */}
      <Row className="g-4 mb-4">
        <Col sm={6} xl={3}>
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={FaBox}
            color="#0d6efd"
            link="/admin/products"
          />
        </Col>
        <Col sm={6} xl={3}>
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={FaShoppingCart}
            color="#198754"
            link="/admin/orders"
          />
        </Col>
        <Col sm={6} xl={3}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={FaUsers}
            color="#dc3545"
            link="/admin/users"
          />
        </Col>
        <Col sm={6} xl={3}>
          <StatCard
            title="Total Blogs"
            value={stats.totalBlogs}
            icon={FaBlog}
            color="#6f42c1"
            link="/admin/blogs"
          />
        </Col>
      </Row>

      {/* Quick Actions */}
      <h2 className="section-title">Quick Actions</h2>
      <Row className="g-4">
        <Col md={6} xl={3}>
          <QuickAction
            title="Add Product"
            description="Create a new product listing"
            onClick={() => setShowAddProduct(true)}
            variant="primary"
          />
        </Col>
        <Col md={6} xl={3}>
          <QuickAction
            title="Manage Orders"
            description="View and manage customer orders"
            onClick={() => {/* Add order management modal */}}
            variant="success"
          />
        </Col>
        <Col md={6} xl={3}>
          <QuickAction
            title="User Management"
            description="Manage user accounts and roles"
            onClick={() => {/* Add user management modal */}}
            variant="danger"
          />
        </Col>
        <Col md={6} xl={3}>
          <QuickAction
            title="Blog Posts"
            description="Create and manage blog content"
            onClick={() => {/* Add blog management modal */}}
            variant="info"
          />
        </Col>
      </Row>

      {/* Modals */}
      <AddProductModal
        show={showAddProduct}
        onHide={() => setShowAddProduct(false)}
        onProductAdded={handleProductAdded}
      />
    </Container>
  );
};

export default Dashboard; 