import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MenuCard = ({ item }) => {
  return (
    <Card
      sx={{
        minWidth: 300,
        margin: '10px',
        flex: '0 0 calc(50% - 40px)',
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