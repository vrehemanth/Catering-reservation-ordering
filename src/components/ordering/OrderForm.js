import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import MenuList from './MenuList';
import Cart from './Cart';
import { db } from '../../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';

const OrderForm = () => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const [user] = useAuthState(auth);

  const handleAddToCart = (item) => {
    const existing = cart.find(ci => ci.id === item.id);
    if (existing) {
      setCart(prev =>
        prev.map(ci =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        )
      );
    } else {
      setCart(prev => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty === 0) {
      setCart(prev => prev.filter(item => item.id !== itemId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const handlePlaceOrder = async () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  try {
    await addDoc(collection(db, 'orders'), {
      userId: user?.uid || null, // null if user not logged in
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      createdAt: Timestamp.now()
    });
    setCart([]);
    setMessage('Order placed successfully!');
  } catch (err) {
    console.error('Error placing order:', err);
    setMessage('Failed to place order.');
  }
};

  return (
    <Container className="my-4">
      <Row>
        <Col md={8}>
          <MenuList
            cartItems={cart}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </Col>
        <Col md={4}>
          <Cart
            cartItems={cart}
            onOrderNow={handlePlaceOrder}
            onUpdateQuantity={handleUpdateQuantity}
          />

          {message && <Alert variant="info" className="mt-3">{message}</Alert>}
        </Col>
      </Row>
    </Container>
  );
};

export default OrderForm;
