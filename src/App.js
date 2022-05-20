import React, {useState} from 'react';
import {Nav} from 'react-bootstrap';
import classes from './App.module.css';
import RussiaCovid from './RussiaCovid/RussiaCovid';
import WorldCovid from './WorldCovid/WorldCovid';

function App() {
  const [world, setWorld] = useState(true);

  const keyHandler = (selectedKey) => {
    selectedKey === 'Russia' ? setWorld(false) : setWorld(true);
  };

  return (
    <div className={classes.App}>
      <header className={classes.header}>
        <Nav justify variant='tabs' onSelect={keyHandler}>
          <Nav.Item/>
          <Nav.Item>
            <Nav.Link eventKey="Russia">В России</Nav.Link >
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="World">В Мире</Nav.Link>
          </Nav.Item>
          <Nav.Item/>
        </Nav>
      </header>
      <main className={classes.main}>
        {
          world ? <WorldCovid/> : <RussiaCovid/>
        }
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
