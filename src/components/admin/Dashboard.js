import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, Modal, Alert } from 'react-bootstrap';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 
import { db } from '../../firebase/config';
import ManageMenu from './ManageMenu';

function Dashboard() {
  const navigate = useNavigate(); 

  const [menuItems, setMenuItems] = useState([]);
  const [reservationsCount, setReservationsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', type: 'veg' });
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState('');

  const fetchMenu = async () => {
    const snapshot = await getDocs(collection(db, 'menu'));
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMenuItems(items);
  };

  const fetchReservations = async () => {
    const snapshot = await getDocs(collection(db, 'reservations'));
    setReservationsCount(snapshot.size);
  };

  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, 'orders'));
    setOrdersCount(snapshot.size);
  };

  useEffect(() => {
    fetchMenu();
    fetchReservations();
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'menu', id));
    fetchMenu();
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'menu'), {
        ...newItem,
        price: parseFloat(newItem.price),
        createdAt: new Date()
      });
      setSuccess('Menu item added successfully!');
      setNewItem({ name: '', price: '', description: '', type: 'veg' });
      setShowModal(false);
      fetchMenu();
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Reservations</Card.Title>
              <Card.Text>
                View and manage all reservations.<br />
                <strong>{reservationsCount}</strong>
              </Card.Text>
              <Button variant="outline-primary" onClick={() => navigate('/admin/reservations')}>
                Manage Reservations
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>
                Track all customer orders here.<br />
                <strong>{ordersCount}</strong>
              </Card.Text>
              <Button variant="outline-success" onClick={() => navigate('/admin/orders')}>
                Manage Orders
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Menu Items</Card.Title>
              <Card.Text>
                View, edit and delete food items.<br />
                <strong>{menuItems.length}</strong>
              </Card.Text>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Item
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Menu List */}
      <h4 className="mt-4">Current Menu</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price (₹)</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td className={item.type === 'veg' ? 'text-success' : 'text-danger'}>
                {item.type === 'veg' ? 'Veg' : 'Non-Veg'}
              </td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal: Add Menu Item */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleAddMenuItem}>
          <Modal.Header closeButton>
            <Modal.Title>Add Menu Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
              >
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Add Item</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* ManageMenu Section */}
      <ManageMenu />
    </Container>
  );
}

export default Dashboard;
