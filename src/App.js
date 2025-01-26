import { useState, useEffect } from 'react';
import logo from './ohkajhu_logo-removed-bg.png';
import './App.css';
import menu from './data/menu.json';
import ingredients from './data/ingredients.json';
import MenuCard from './MenuCard';
import { Typography, Box, Grid, Button } from '@mui/material';
import SelectIngredientsDialog from './components/SelectIngredientsDialog';
import { analytics } from './firebaseConfig';
import { logEvent } from 'firebase/analytics';

function App() {
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState('include');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState(menu.map(item => ({ ...item, display: true })));

  useEffect(() => {
    logEvent(analytics, 'app_loaded');
  }, []);

  const handleCloseFilterDialog = () => {
    const filtered = menu.map(item => {
      const menuIngredients = item.ingredients || [];
      
      if (selectedIngredients.length === 0) {
        item.display = true;
        return item;
      }
      
      if (filterType === 'include') {
        // Display items that contain ALL selected ingredients
        item.display = selectedIngredients.some(ingredient =>
          menuIngredients.includes(ingredient.toLowerCase())
        );
      } else {
        // Display items that contain NONE of selected ingredients
        item.display = !selectedIngredients.some(ingredient =>
          menuIngredients.includes(ingredient.toLowerCase())
        );
      }
      return item;
    });

    logEvent(analytics, 'filter_by_ingredients_dialog_closed');
    logEvent(analytics, 'filter_by_ingredients', {
      filter_type: filterType,
      selected_ingredients: selectedIngredients.join('|'),
    });
    setFilteredMenu(filtered);
    setOpen(false);
  };


  return (
    <div className="App">
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ background: 'white', borderRadius: '300px', height: '150px', width: '150px', display: 'flex' }}>
          <img width={150} height={150} src={logo} alt="logo" />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary', marginTop: '10px' }}>
          Ohkajhu Smoothie
        </Typography>
        <Box sx={{ margin: '20px 0' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(true)
              logEvent(analytics, 'filter_by_ingredients_button_clicked');
            }}
            sx={{
              backgroundColor: 'text.secondary',
              color: 'white'
            }}
          >
            Filter by Ingredients
          </Button>
          <SelectIngredientsDialog
            open={open}
            setOpen={setOpen}
            filterType={filterType}
            setFilterType={setFilterType}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
            handleCloseFilterDialog={handleCloseFilterDialog}
            ingredients={ingredients}
          />
        </Box>
        {selectedIngredients.length > 0 && (
          <Typography variant="body1" sx={{ marginY: 2, color: '#666' }}>
            {filterType === 'include' ? 'Include: ' : 'Exclude: '}
            {selectedIngredients.map((ingredient, index) => (
              <span key={ingredient}>
                {ingredients.find(ing => ing.ingredient === ingredient)?.emoji} {ingredient}
                {index < selectedIngredients.length - 1 ? ', ' : ''}
              </span>
            ))}
          </Typography>
        )}
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            <Grid container spacing={2}>
              {filteredMenu.map(item => (
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <MenuCard item={item} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </Box>
      <Typography variant="body2" sx={{ color: 'primary', marginTop: '20px' }}>
        © 2025, Crafted with 💖 By <a href="https://www.facebook.com/HSpotlight/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} onClick={() => logEvent(analytics, 'hspotlight_link_clicked')}>HSpotlight</a>
      </Typography>
    </div>
  );
}

export default App;
