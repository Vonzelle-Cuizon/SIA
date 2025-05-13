import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import db from './firebase';
import './OrderStatus.css';

const OrderStatus = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
        return;
      }

      setUser(currentUser);

      const q = query(
        collection(db, 'orders'),
        where('userId', '==', currentUser.uid),
        orderBy('timestamp', 'desc')
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersData);
      });

      return () => unsubscribeSnapshot(); // Clean up Firestore listener
    });

    return () => unsubscribeAuth(); // Clean up Auth listener
  }, [navigate]);

  const handleLogout = () => {
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <div className="order-status-page">
      <div className="dashboard-container">
        <div className="sidebar">
          <div className="user-info">
            <p>{user?.displayName || 'User'}</p>
            <p>{user?.email || 'Email not available'}</p>
          </div>
          <ul className="nav-links">
            <li onClick={() => navigate('/dashboard')}>📋 Dashboard</li>
            <li onClick={() => navigate('/reservation')}>📅 Reservation</li>
            <li onClick={() => navigate('/waitlist')}>⏳ Waitlist</li>
            <li onClick={() => navigate('/notification')}>🔔 Notification</li>
            <li onClick={() => navigate('/order')}>🛒 Order</li>
            <li onClick={() => navigate('/order status')}>📄 Order Status</li>
          </ul>
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>

        <div className="order-status-container">
          <h2 className="order-status-title">📄 Order Status</h2>
          <table className="order-status-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Items</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.orderNumber || '—'}</td>
                  <td>
                    {order.items?.map((item, idx) => (
                      <div key={idx}>{item.name}, {item.quantity}</div>
                    )) || '—'}
                  </td>
                  <td>{order.status}</td>
                  <td>{order.timestamp?.toDate().toLocaleString() || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
