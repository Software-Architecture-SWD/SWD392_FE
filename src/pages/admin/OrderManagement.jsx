import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Spinner, Badge } from 'react-bootstrap';
import axiosClient from '../../axiosClient';
import { toast } from 'react-toastify';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('/orders');
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axiosClient.put(`/orders/${orderId}/status`, { status: newStatus });
      toast.success('Order status updated successfully');
      fetchOrders();
      setShowDetailsModal(false);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <Container fluid className="order-management py-4">
      <Row className="mb-4">
        <Col>
          <h2>Order Management</h2>
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
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{formatDate(order.orderDate)}</td>
                <td>${calculateTotal(order.items).toFixed(2)}</td>
                <td>
                  <Badge bg={getStatusBadgeVariant(order.status)}>
                    {order.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleViewDetails(order)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Order Details Modal */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <div className="order-info mb-4">
                <h5>Order Information</h5>
                <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
                <p><strong>Order Date:</strong> {formatDate(selectedOrder.orderDate)}</p>
                <p><strong>Status:</strong> 
                  <Badge bg={getStatusBadgeVariant(selectedOrder.status)} className="ms-2">
                    {selectedOrder.status}
                  </Badge>
                </p>
              </div>

              <div className="shipping-info mb-4">
                <h5>Shipping Information</h5>
                <p><strong>Address:</strong> {selectedOrder.shippingAddress}</p>
                <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              </div>

              <div className="order-items mb-4">
                <h5>Order Items</h5>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.productName}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                      <td><strong>${calculateTotal(selectedOrder.items).toFixed(2)}</strong></td>
                    </tr>
                  </tfoot>
                </Table>
              </div>

              <div className="status-actions">
                <h5>Update Status</h5>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'pending')}
                  >
                    Mark as Pending
                  </Button>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'processing')}
                  >
                    Mark as Processing
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'shipped')}
                  >
                    Mark as Shipped
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'delivered')}
                  >
                    Mark as Delivered
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')}
                  >
                    Mark as Cancelled
                  </Button>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderManagement; 