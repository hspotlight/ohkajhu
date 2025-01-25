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
        <Typography variant="h5" component="h3" gutterBottom color="primary">
          {item.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Price: {item.price} baht
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ingredients: {item.ingredients.join(', ')}
        </Typography>
        {item.recommended && (
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'warning.main',
              fontWeight: 'bold',
              marginTop: 1
            }}
          >
            ⭐ Recommended
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuCard;