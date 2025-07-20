// File: src/components/ordering/MenuList.js
import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  Spinner,
  ButtonGroup,
  ToggleButton,
  Form
} from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

const MenuList = ({ cartItems = [], onAddToCart, onUpdateQuantity }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'menu'));
        const items = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            type: (data.type || 'veg').toLowerCase().trim() // normalize
          };
        });
        setMenuItems(items);
      } catch (error) {
        console.error('Failed to load menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const getCartItem = (itemId) => cartItems.find(item => item.id === itemId);

  const handleIncrease = (item) => {
    const existing = getCartItem(item.id);
    if (existing) {
      onUpdateQuantity(item.id, existing.quantity + 1);
    }
  };

  const handleDecrease = (item) => {
    const existing = getCartItem(item.id);
    if (existing && existing.quantity > 1) {
      onUpdateQuantity(item.id, existing.quantity - 1);
    } else {
      onUpdateQuantity(item.id, 0); // Remove from cart
    }
  };

  const filteredItems = menuItems.filter(item => {
    const itemType = item.type?.toLowerCase();
    const matchesFilter = filter === 'all' || itemType === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return <Spinner animation="border" className="d-block mx-auto" />;

  return (
    <>
      {/* Filter and Search Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <ButtonGroup>
          {['all', 'veg', 'non-veg'].map(value => (
            <ToggleButton
              key={value}
              id={`filter-${value}`}
              type="radio"
              name="filter"
              value={value}
              variant={
                value === 'veg' ? 'outline-success'
                : value === 'non-veg' ? 'outline-danger'
                : 'outline-secondary'
              }
              checked={filter === value}
              onChange={(e) => {
                setFilter(e.currentTarget.value);
              }}
            >
              {value === 'veg' ? 'Veg Only' : value === 'non-veg' ? 'Non-Veg Only' : 'All'}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <Form.Control
          type="text"
          placeholder="Search menu items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: '250px' }}
        />
      </div>

      {/* Menu Cards */}
      <Row>
        {filteredItems.length === 0 && (
          <p className="text-center">No matching items found.</p>
        )}
        {filteredItems.map(item => {
          const cartItem = getCartItem(item.id);
          return (
            <Col md={6} lg={4} className="mb-4" key={item.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text className="fw-bold">₹{item.price}</Card.Text>
                  <Card.Text className={`text-${item.type === 'veg' ? 'success' : 'danger'}`}>
                    {item.type === 'veg' ? 'Veg' : 'Non-Veg'}
                  </Card.Text>

                  {cartItem ? (
                    <ButtonGroup>
                      <Button variant="danger" onClick={() => handleDecrease(item)}>-</Button>
                      <Button variant="light" disabled>{cartItem.quantity}</Button>
                      <Button variant="success" onClick={() => handleIncrease(item)}>+</Button>
                    </ButtonGroup>
                  ) : (
                    <Button variant="primary" onClick={() => onAddToCart({ ...item, quantity: 1 })}>
                      Add to Cart
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default MenuList;
