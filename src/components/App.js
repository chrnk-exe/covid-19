import React, {useState, useEffect} from 'react';
import classes from '../styles/App.module.css';
import RussiaCovidApp from './RussiaCovidApp';
import {Nav} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { covidReducer } from '../redux/covidReducer';
const out = useSelector(covidReducer);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const storage = window.localStorage

function App() {
  // const [world, setWorld] = useState(false);
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
