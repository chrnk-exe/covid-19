import React, {useState} from 'react';
import classes from './App.module.css';
import RussiaCovidApp from './RussiaCovid/RussiaCovidApp';
import {Nav} from 'react-bootstrap'
import WorldCovidApp from './WorldCovid/WorldCovidApp';

function App() {
  const [world, setWorld] = useState(false);
  return (
    <div className={classes.App}>
      <header className={classes.header}>
        {/* <h2>Анализ динамики распространения Covid-19 в России</h2> */}
        <Nav className={classes.navigation} variant='tabs' onSelect={(selectedKey) => setWorld(selectedKey === "World")} defaultActiveKey={'Russia'}>
        <Nav.Item/>
        <Nav.Item>
          <Nav.Link className={classes.navItem} eventKey="Russia">В России</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={classes.navItem} eventKey="World">В Мире</Nav.Link>
        </Nav.Item>
        <Nav.Item/>
      </Nav>
      </header>
      
      <main className={classes.main}>
        {world 
        ?<WorldCovidApp/>
        :<RussiaCovidApp/>}
      </main>
    </div>
  );
}

export default App;
