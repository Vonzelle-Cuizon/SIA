import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import './index.css';
import App from './App.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Reservation from './Reservation.jsx';
import Register from './Register.jsx';
import Order from './Order.jsx';
import Notification from './Notification.jsx';
import Waitlist from './Waitlist.jsx';
import OrderStatus from './OrderStatus.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order" element={<Order />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/order status" element={<OrderStatus />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);