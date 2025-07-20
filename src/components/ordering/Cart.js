import React from 'react';
import { Card, Button, ListGroup, ButtonGroup } from 'react-bootstrap';

const Cart = ({ cartItems = [], onUpdateQuantity, onOrderNow }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Card className="mt-4">
      <Card.Header>Your Cart</Card.Header>
      <ListGroup variant="flush">
        {cartItems.length === 0 ? (
          <ListGroup.Item>No items in cart.</ListGroup.Item>
        ) : (
          cartItems.map((item) => (
            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.name}</strong> <br />
                ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
              </div>
              <ButtonGroup>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >−</Button>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >+</Button>
              </ButtonGroup>
            </ListGroup.Item>
          ))
        )}
        <ListGroup.Item className="fw-bold">Total: ₹{total}</ListGroup.Item>
      </ListGroup>
      <Card.Footer>
        <Button variant="success" className="w-100" onClick={onOrderNow} disabled={cartItems.length === 0}>
          Order Now
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Cart;
