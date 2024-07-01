// src/ItemEditor.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApiContext } from './ApiContext';
import './ItemEditor.css';

const ItemEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apiRequest } = useApiContext();
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await apiRequest('get', `/api/items/${id}/`);
        setKey(data.key);
        setValue(data.value);
      } catch (error) {
        console.error('Failed to fetch item:', error);
      }
    };

    fetchItem();
  }, [id, apiRequest]);

  const handleSave = async () => {
    try {
      await apiRequest('put', `/api/items/${id}/`, { key, value });
      navigate('/items');
    } catch (error) {
      console.error('Failed to save item:', error);
    }
  };

  return (
    <div className="item-editor-container">
      <h2>Edit Item</h2>
      <input
        type="text"
        placeholder="Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <input
        type="text"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ItemEditor;
