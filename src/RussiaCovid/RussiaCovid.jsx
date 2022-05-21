import React, {useState} from 'react';
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
import {DropdownButton, Dropdown} from 'react-bootstrap'

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const Month = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август',
 'сентябрь', 'октябрь', "ноябрь", "декабрь"]

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);
// const labels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

function formatData(date) {
  date = new Date(date)
  return [date.getDate(), Month[date.getMonth()]].join(' ')
}


const RussiaCovid = () => {
  const [period, setPeriod] = useState(3)
  const periods = {
    '1': 'allTime',
    '2': 14,
    '3': 30,
    '4': 90,
    '5': 180,
    '6': 365,
  }
  const labels = []
  for(let i = 0; i < periods[period]; i++){
    let currentDate = new Date()
    // console.log(currentDate, )
    labels.push(formatData(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i)));
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Covid in Russia',
        data: labels.map(() => randomInteger(0, 1000)),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      xAxis: {
        reverse: true
      }
    },
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

  return (
    <div className={classes.main}>
      <Bar options={options} data={data}></Bar>
      <div className={classes.options}>
        <div className={classes.period}>
          <DropdownButton onSelect={(eKey) => setPeriod(eKey)} variant='primary' title='Период'>
            <Dropdown.Item eventKey='1' active={period === '1'}>Всё время</Dropdown.Item>
            <Dropdown.Item eventKey='2' active={period === '2'}>2 Недели</Dropdown.Item>
            <Dropdown.Item eventKey='3' active={period === '3'}>Месяц</Dropdown.Item>
            <Dropdown.Item eventKey='4' active={period === '4'}>3 Месяца</Dropdown.Item>
            <Dropdown.Item eventKey='5' active={period === '5'}>6 Месяцев</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey='6' active={period === '6'}>Произвольный период</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
};

export default RussiaCovid;
