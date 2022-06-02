import React, {useState, useEffect} from 'react';
import classes from './App.module.css';
import RussiaCovidApp from './RussiaCovid/RussiaCovidApp';
import {Nav} from 'react-bootstrap'
import WorldCovidApp from './WorldCovid/WorldCovidApp';

const storage = window.localStorage

function App() {
  const [world, setWorld] = useState(false);
  useEffect(() => {
    return () => {
      storage.clear()
    }
  }, [])
  return (
    <div className={classes.App}>
      <header className={classes.header}>
        <h3 className={classes.logo}>Анализ динамики распространения Covid-19 в России</h3>
      </header>
      
      <main className={classes.main}>
        <RussiaCovidApp/>
      </main>
    </div>
  );
}

export default App;
