import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

/**
 * A card component that displays menu item information
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.item - The menu item object
 * @param {string} props.item.name - The name of the menu item
 * @param {boolean} props.item.display - Whether the item should be displayed normally or faded
 * @param {string[]} [props.item.ingredients] - Optional array of ingredients in the menu item
 * @returns {JSX.Element} A Material-UI Card component displaying the menu item
 */

const MenuCard = ({ item }) => {
  return (
    <Card
      sx={{
        minWidth: 300,
        margin: '10px',
        flex: '0 0 calc(50% - 40px)',
        opacity: item.display ? 1 : 0.5,
      }}
    >
      <CardContent>
        {!item.display && (
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderTop: '2px solid red',
                transform: 'rotate(23deg)',
                transformOrigin: '0 0'
              }} />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderTop: '2px solid red',
                transform: 'rotate(-23deg)',
                transformOrigin: '100% 0'
              }} />
            </div>
          </div>
        )}
        <Typography variant="h5" component="h3" gutterBottom color="primary" sx={{
          color: 'primary'
        }}>
          {item.name}{item.recommended && (
            <span>
              &nbsp;⭐
            </span>
          )}
        </Typography>
        <img width="100" src={`/images/${item.imageUrl}`} alt={item.name} />
        <Typography variant="h6" gutterBottom>
          Price: {item.price} baht
        </Typography>
        <Typography variant="body1" color="black">
          Ingredients: {item.ingredients.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MenuCard;