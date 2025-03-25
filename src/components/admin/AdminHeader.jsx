import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearToken } from '../../features/authSlice';
import { toast } from 'react-toastify';

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearToken());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand as={Link} to="/admin">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar" />
        <Navbar.Collapse id="admin-navbar">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/admin" 
              active={location.pathname === '/admin'}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/products" 
              active={location.pathname === '/admin/products'}
            >
              Products
            </Nav.Link>
            <NavDropdown title="More" id="admin-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/categories">Categories</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/brands">Brands</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/orders">Orders</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/admin/users">Users</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title="Admin" id="admin-user-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/admin/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminHeader; 