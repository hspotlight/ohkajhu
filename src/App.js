import logo from './logo.svg';
import './App.css';
import menu from './data/menu.json';
import MenuCard from './MenuCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {menu.map(item => (
              <MenuCard item={item} />
            ))}
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;
