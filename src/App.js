import logo from './ohkajhu_logo-removed-bg.png';
import './App.css';
import menu from './data/menu.json';
import MenuCard from './MenuCard';
import { Box, Grid } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box sx={{background: 'white', borderRadius: '300px', height: '150px', width: '150px', display: 'flex'}}>
          <img width={150} height={150} src={logo} alt="logo" />
        </Box>
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            <Grid container spacing={2}>
              {menu.map(item => (
                <Grid item xs={12} sm={6} md={4}>
                  <MenuCard item={item} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;
