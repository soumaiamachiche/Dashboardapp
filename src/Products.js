// Products.js
import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './client.css'; // Custom styles for products



const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('Products').select('*');
      if (error) throw error;
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products.');
    }
  };

  const addProduct = async () => {
    try {
      const { data, error } = await supabase.from('Products').insert([
        { name, price: parseFloat(price), description }
      ]);
      if (error) throw error;
      setProducts([...products, ...data]);
      setName('');
      setPrice('');
      setDescription('');
      toast.success('Product added successfully!');
    } catch (error) {
      toast.success('Failed to add product.');
    }
  };

  const updateProduct = async (id, updatedName, updatedPrice, updatedDescription) => {
    try {
      const { data, error } = await supabase.from('Products').update({
        name: updatedName,
        price: parseFloat(updatedPrice),
        description: updatedDescription
      }).eq('id', id);
      if (error) throw error;
      setProducts(products.map(product => (product.id === id ? data[0] : product)));
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product.');
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase.from('Products').delete().eq('id', id);
      if (error) throw error;
      setProducts(products.filter(product => product.id !== id));
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product.');
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="form-container">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter product name" 
        />
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="Enter product price" 
        />
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter product description" 
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} - {product.description}
            <button onClick={() => {
              const newName = prompt('Enter new name', product.name);
              const newPrice = prompt('Enter new price', product.price);
              const newDescription = prompt('Enter new description', product.description);
              if (newName && newPrice && newDescription) {
                updateProduct(product.id, newName, newPrice, newDescription);
              }
            }}>Update</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Products;
