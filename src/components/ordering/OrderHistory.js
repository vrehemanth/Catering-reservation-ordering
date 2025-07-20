import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { Card, Container, ListGroup } from 'react-bootstrap';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, where('userId', '==', user?.uid));
      const snapshot = await getDocs(q);
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    if (user) fetchOrders();
  }, [user]);

  return (
    <Container className="my-4">
      <h4>Order History</h4>
      {orders.map(order => (
        <Card key={order.id} className="mb-3">
          <Card.Body>
            <Card.Title>Order ID: {order.id}</Card.Title>
            <ListGroup>
              {order.items.map((item, idx) => (
                <ListGroup.Item key={idx}>
                  {item.name} - ₹{item.price}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Text className="mt-2"><strong>Total:</strong> ₹{order.total}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default OrderHistory;
