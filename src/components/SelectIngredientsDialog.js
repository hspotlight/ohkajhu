import React from 'react';
import { Dialog, Grid, DialogTitle, DialogContent, DialogActions, FormControl, RadioGroup, FormControlLabel, Radio, Typography, InputLabel, Select, MenuItem, Checkbox, ListItemText, Button } from '@mui/material';

const SelectIngredientsDialog = ({ open, setOpen, filterType, setFilterType, selectedIngredients, setSelectedIngredients, ingredients, handleCloseFilterDialog }) => {
  return (
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
            <Typography variant="body1" sx={{ color: 'black' }}>
              note: (select all menu that contain at least one of the selected ingredients)
            </Typography>

            <FormControlLabel value="exclude" control={<Radio />} label="Exclude ingredients" />
            <Typography variant="body1" sx={{ color: 'black' }}>
              note: (select all menu that do not contain any of the selected ingredients)
            </Typography>
          </RadioGroup>
        </FormControl>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {ingredients.map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient.ingredient);
            return (
              <Grid item xs={4} sm={3} key={ingredient.ingredient}>
                <Button
                  fullWidth
                  variant={isSelected ? "contained" : "outlined"}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '80px',
                    backgroundColor: isSelected ? 'primary.main' : 'transparent',
                    color: isSelected ? 'white' : 'primary.main',
                    '&:hover': {
                      backgroundColor: isSelected ? 'primary.dark' : 'primary.light',
                    }
                  }}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient.ingredient));
                    } else {
                      setSelectedIngredients([...selectedIngredients, ingredient.ingredient]);
                    }
                  }}
                >
                  <Typography variant="h5" component="div">
                    {ingredient.emoji}
                  </Typography>
                  <Typography variant="caption">
                    {ingredient.ingredient}
                  </Typography>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          setSelectedIngredients([]);
          setOpen(false);
        }}>
          Reset
        </Button>
        <Button onClick={handleCloseFilterDialog} variant="contained" sx={{ backgroundColor: 'text.secondary', color: 'white' }}>
          Apply Filter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectIngredientsDialog;