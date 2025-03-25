import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AdminHeader from '../components/admin/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <Container fluid className="py-4">
        <Outlet />
      </Container>
      {/* Add AdminFooter component here later */}
    </div>
  );
};

export default AdminLayout; 