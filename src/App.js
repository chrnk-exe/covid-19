import React from 'react';
import classes from './App.module.css';
import RussiaCovidApp from './RussiaCovid/RussiaCovidApp';

function App() {
  return (
    <div className={classes.App}>
      <header className={classes.header}>
        <h2>Анализ динамики распространения Covid-19 в России</h2>
      </header>
      <main className={classes.main}>
        <RussiaCovidApp/>
      </main>
    </div>
  );
}

export default App;
