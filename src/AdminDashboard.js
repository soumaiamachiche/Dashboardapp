// AdminDashboard.js
import React, { useState } from 'react';
import Client from './Client';
import Products from './Products';
import Orders from './Orders';
import './adminDashboard.css'; // Custom styles for the admin dashboard

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('client');

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li onClick={() => setActiveView('client')}>Manage Clients</li>
          <li onClick={() => setActiveView('products')}>Manage Products</li>
          <li onClick={() => setActiveView('orders')}>Manage Orders</li>
        </ul>
      </div>
      <div className="content">
        {activeView === 'client' && <Client/>}
        {activeView === 'products' && <Products />}
        {activeView === 'orders' && <Orders />}
      </div>
    </div>
  );
};

export default AdminDashboard;
