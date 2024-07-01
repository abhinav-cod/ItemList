import React, { useEffect, useState } from 'react';
import { useApiContext } from './ApiContext';
import { Link } from 'react-router-dom';
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
    <div className="item-list">
      <h2>Item List</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>ID:</strong> {item.id} <br />
            <strong>Key:</strong> {item.key} <br />
            <strong>Value:</strong> {item.value} <br />
            <Link to={`/edit/${item.id}`}>Edit<br /><br /></Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
