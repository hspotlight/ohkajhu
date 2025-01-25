import React from 'react';

const MenuCard = ({ item }) => {
  return (
    <div 
      style={{
        width: '300px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'white',
        color: '#333',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        margin: '10px',
        flex: '0 0 calc(50% - 40px)',
        maxWidth: 'calc(50% - 40px)'
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{item.name}</h3>
      <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Price: {item.price} baht</p>
      <p style={{ color: '#666' }}>Ingredients: {item.ingredients.join(', ')}</p>
      {item.recommended && (
        <p style={{ 
          color: '#f39c12',
          fontWeight: 'bold',
          margin: '10px 0 0 0'
        }}>⭐ Recommended</p>
      )}
    </div>
  );
};

export default MenuCard;