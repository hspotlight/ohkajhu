import { useState } from 'react';
import logo from './ohkajhu_logo-removed-bg.png';
import './App.css';
import menu from './data/menu.json';
import ingredients from './data/ingredients.json';
import MenuCard from './MenuCard';
import { Box, Grid, InputLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, RadioGroup, FormControlLabel, Radio, Select, MenuItem, ListItemText, Checkbox } from '@mui/material';

function App() {
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState('include');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState(menu.map(item => ({...item, display: true})));

  const handleCloseFilterDialog = () => {
    const filtered = menu.map(item => {
      const menuIngredients = item.ingredients || [];
      
      if(selectedIngredients.length === 0) {
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

    setFilteredMenu(filtered);
    setOpen(false);
  };


  return (
    <div className="App">
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ background: 'white', borderRadius: '300px', height: '150px', width: '150px', display: 'flex' }}>
          <img width={150} height={150} src={logo} alt="logo" />
        </Box>
        <Box sx={{ margin: '20px 0' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Filter by Ingredients
          </Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="filter-dialog-title"
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle id="filter-dialog-title">
              Filter Menu by Ingredients
            </DialogTitle>
            <DialogContent>
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <FormControlLabel value="include" control={<Radio />} label="Include ingredients" />
                  <FormControlLabel value="exclude" control={<Radio />} label="Exclude ingredients" />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ width: '100%', mt: 2 }}>
                <InputLabel>Select Ingredients</InputLabel>
                <Select
                  multiple
                  value={selectedIngredients}
                  onChange={(e) => setSelectedIngredients(e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {ingredients.map((ingredient) => {
                    return (
                      <MenuItem key={ingredient.ingredient} value={ingredient.ingredient}>
                        <Checkbox checked={selectedIngredients.indexOf(ingredient.ingredient) > -1} />
                        <ListItemText 
                          primary={
                            <>
                              {ingredient?.emoji} {ingredient.ingredient}
                            </>
                          }
                        />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {
                setSelectedIngredients([]);
                setOpen(false);
              }}>
                Reset
              </Button>
              <Button onClick={handleCloseFilterDialog} variant="contained">
                Apply Filter
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
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
    </div>
  );
}

export default App;
