// Orders.js
import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './client.css'; // Custom styles for orders

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from('Orders').select('*');
      if (error) throw error;
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders.');
    }
  };

  const addOrder = async () => {
    try {
      const { data, error } = await supabase.from('Orders').insert([
        { product_id: productId, quantity: parseInt(quantity), status }
      ]);
      if (error) throw error;
      setOrders([...orders, ...data]);
      setProductId('');
      setQuantity('');
      setStatus('');
      toast.success('Order added successfully!');
    } catch (error) {
      console.error('Error adding order:', error);
      toast.success('Failed to add order.');
    }
  };

  const updateOrder = async (id, updatedProductId, updatedQuantity, updatedStatus) => {
    try {
      const { data, error } = await supabase.from('Orders').update({
        product_id: updatedProductId,
        quantity: parseInt(updatedQuantity),
        status: updatedStatus
      }).eq('id', id);
      if (error) throw error;
      setOrders(orders.map(order => (order.id === id ? data[0] : order)));
      toast.success('Order updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order.');
    }
  };

  const deleteOrder = async (id) => {
    try {
      const { error } = await supabase.from('Orders').delete().eq('id', id);
      if (error) throw error;
      setOrders(orders.filter(order => order.id !== id));
      toast.success('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order.');
    }
  };

  return (
    <div>
      <h1>Orders</h1>
      <div className="form-container">
        <input 
          type="text" 
          value={productId} 
          onChange={(e) => setProductId(e.target.value)} 
          placeholder="Enter product ID" 
        />
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          placeholder="Enter quantity" 
        />
        <input 
          type="text" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          placeholder="Enter status" 
        />
        <button onClick={addOrder}>Add Order</button>
      </div>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Product ID: {order.product_id} - Quantity: {order.quantity} - Status: {order.status}
            <button onClick={() => {
              const newProductId = prompt('Enter new product ID', order.product_id);
              const newQuantity = prompt('Enter new quantity', order.quantity);
              const newStatus = prompt('Enter new status', order.status);
              if (newProductId && newQuantity && newStatus) {
                updateOrder(order.id, newProductId, newQuantity, newStatus);
              }
            }}>Update</button>
            <button onClick={() => deleteOrder(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Orders;
