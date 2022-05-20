import React from 'react';
import classes from './RussiaCovid.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

const Choose=()=>{
  return(
  <>
    <input name="country" list="countries" />
<datalist id="countries">
   <option value="Naples" />
   <option value="London" />
   <option value="Berlin" />
   <option value="New York" />
   <option value="Frattamaggiore" />
</datalist>
    <input name="time" list="times" />
<datalist id="times">
   <option value="2 weeks" />
   <option value="1 mounth" />
   <option value="3 mounth" />
   <option value="6 mounth" />
</datalist>
<input name="amount" list="amounts" />
<datalist id="amounts">
   <option value="all" />
   <option value="new" />
   <option value="lethal" />
</datalist>
<button id="">Submit</button>
  </>
  )

}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);


export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => randomInteger(0, 1000)),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => randomInteger(0, 1000)),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

 const RussiaCovid = () => {
  return (
    <div className={classes.main}>
      <Choose/>
      <Bar options={options} data={data}></Bar>
    </div>
  );
};

export default RussiaCovid;
