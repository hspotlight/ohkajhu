import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControl, RadioGroup, FormControlLabel, Radio, Typography, InputLabel, Select, MenuItem, Checkbox, ListItemText, Button } from '@mui/material';

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
        <FormControl sx={{ width: '100%', mt: 2 }}>
          <InputLabel label="select-ingredients">Select Ingredients</InputLabel>
          <Select
            label="select-ingredients"
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
        <Button onClick={handleCloseFilterDialog} variant="contained" sx={{ backgroundColor: 'text.secondary', color: 'white' }}>
          Apply Filter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectIngredientsDialog;