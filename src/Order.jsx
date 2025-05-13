import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  runTransaction
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import db from './firebase';
import './Order.css';

const Order = () => {
  const navigate = useNavigate();
  const [orderItems] = useState([
    { id: 1, name: 'Burger', price: 59.99 },
    { id: 2, name: 'Pizza', price: 89.99 },
    { id: 3, name: 'Pasta', price: 70.99 },
    { id: 4, name: 'Salad', price: 45.99 }
  ]);
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleChange = (e, itemId) => {
    const quantity = parseInt(e.target.value);
    const item = orderItems.find(i => i.id === itemId);
    const existing = order.find(i => i.id === itemId);
    let updatedOrder;

    if (existing) {
      updatedOrder = order.map(i => i.id === itemId ? { ...i, quantity } : i);
    } else {
      updatedOrder = [...order, { id: itemId, name: item.name, quantity, price: item.price }];
    }

    setOrder(updatedOrder);
    updateTotalPrice(updatedOrder);
  };

  const updateTotalPrice = (newOrder) => {
    const total = newOrder.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    try {
      const counterRef = doc(db, 'counters', 'orders');
      const orderNumber = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        let newOrderNumber = 1;
        if (counterDoc.exists()) {
          newOrderNumber = counterDoc.data().value + 1;
          if (newOrderNumber > 100) newOrderNumber = 1;
        }
        transaction.set(counterRef, { value: newOrderNumber });
        return newOrderNumber;
      });

      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        orderNumber,
        items: order.filter(item => item.quantity > 0),
        total: totalPrice,
        status: 'Pending',
        timestamp: serverTimestamp()
      });

      alert(`Your order #${orderNumber} has been placed!`);
      navigate('/order status');
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("Error placing order");
    }
  };

  const handleLogout = () => {
    alert('You have logged out!');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="user-info">
          <p>{user?.displayName || 'User'}</p>
          <p>{user?.email || 'Email not available'}</p>
        </div>
        <ul className="nav-links">
          <li>📋 Dashboard</li>
          <li onClick={() => navigate('/reservation')}>📅 Reservation</li>
          <li onClick={() => navigate('/waitlist')}>⏳ Waitlist</li>
          <li onClick={() => navigate('/notification')}>🔔 Notification</li>
          <li onClick={() => navigate('/order')}>🛒 Order</li>
          <li onClick={() => navigate('/order status')}>📄 Order Status</li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>

      <div className="order-container">
        <h2 className="order-title">Make Your Order</h2>
        <form onSubmit={handleSubmit} className="order-form">
          <div className="order-items">
            {orderItems.map(item => (
              <div key={item.id} className="order-item">
                <label>{item.name}</label>
                <input
                  type="number"
                  min="0"
                  defaultValue="0"
                  onChange={(e) => handleChange(e, item.id)}
                />
                <span>₱{item.price}</span>
              </div>
            ))}
          </div>
          <div className="order-summary">
            <p>Total Price: <strong>₱{totalPrice.toFixed(2)}</strong></p>
            <button type="submit" className="order-button">Place Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Order;
