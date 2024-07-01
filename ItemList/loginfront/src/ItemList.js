// src/ItemList.js
import React, { useEffect, useState } from 'react';
import { useApiContext } from './ApiContext';
import './ItemList.css'

const ItemList = () => {
  const { apiRequest } = useApiContext();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await apiRequest('get', '/api/items/');
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, [apiRequest]);

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.key}: {item.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
