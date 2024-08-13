import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './client.css';

// Initialize Supabase client
const supabaseUrl = 'https://ydodpiylmiwndjzulbbw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkb2RwaXlsbWl3bmRqenVsYmJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1NDY4MzksImV4cCI6MjAzOTEyMjgzOX0.UOaEzZzXrybTSm0RLMYQRA00IKLGJ2_Aaeg3ygytWXE';
const supabase = createClient(supabaseUrl, supabaseKey);

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  // Fetch clients from Supabase
  const fetchClients = async () => {
    try {
      const { data, error } = await supabase.from('Client').select('*');
      if (error) {
        console.error('Error fetching clients:', error);  // Log the error object
        toast.error('Failed to fetch clients.');
      } else {
        setClients(data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred.');
    }
  };

  // Add a new client
  const addClient = async () => {
    try {
      const { data, error } = await supabase
        .from('Client')
        .insert([{ name, email, phone: parseFloat(phone) }]);

      if (error) {
        console.error('Error adding client:', error);  // Log the error object
        toast.error(`Failed to add client: ${error.message}`);
      } else {
        setClients([...clients, ...data]);
        setName('');
        setEmail('');
        setPhone('');
        toast.success('Client added successfully!');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.success('Client Added sucessfully');
    }
  };

  // Update an existing client
  const updateClient = async (id, updatedName, updatedEmail, updatedPhone) => {
    try {
      const { data, error } = await supabase
        .from('Client')
        .update({
          name: updatedName,
          email: updatedEmail,
          phone: parseFloat(updatedPhone)
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating client:', error);  // Log the error object
        toast.error(`Failed to update client: ${error.message}`);
      } else {
        setClients(clients.map(client => (client.id === id ? data[0] : client)));
        toast.success('Client updated successfully!');
      }
    } catch (err) {
      toast.success('Client updated successfully!');

    }
  };

  // Delete a client
  const deleteClient = async (id) => {
    try {
      const { error } = await supabase.from('Client').delete().eq('id', id);

      if (error) {
        console.error('Error deleting client:', error);  // Log the error object
        toast.error(`Failed to delete client: ${error.message}`);
      } else {
        setClients(clients.filter(client => client.id !== id));
        toast.success('Client deleted successfully!');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <h1>Clients</h1>
      <div className="form-container">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter client name" 
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter client email" 
        />
        <input 
          type="text" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="Enter client phone" 
        />
        <button onClick={addClient}>Add Client</button>
      </div>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            {client.name} - {client.email} - {client.phone}
            <button onClick={() => {
              const newName = prompt('Enter new name', client.name);
              const newEmail = prompt('Enter new email', client.email);
              const newPhone = prompt('Enter new phone', client.phone);
              if (newName && newEmail && newPhone) {
                updateClient(client.id, newName, newEmail, newPhone);
              }
            }}>Update</button>
            <button onClick={() => deleteClient(client.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Clients;
