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
import {DropdownButton, Dropdown, Button} from 'react-bootstrap'

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const Month = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август',
 'сентябрь', 'октябрь', "ноябрь", "декабрь"]
const currentDate = new Date()


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
  const [customPeriod, setCustomPeriod] = useState({
    start: new Date(),
    finish: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 14)
  })

  const periods = {
    '1': 'allTime',
    '2': 14,
    '3': 30,
    '4': 90,
    '5': 180,
    '6': 'customPeriod',
  }

  const [labels, setLabels] = useState(createPeriod(period))

  function createPeriod(start, finish){
    let dates = []
    if(finish){
      const oneDay = 1000 * 60 * 60 * 24; 
      const diffTime = Math.round(Math.abs(start.getTime() - finish.getTime()) / oneDay + 1)
      for(let i = 0; i < diffTime; i++){
        dates.push(formatData(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i)));
      }
      return dates
    } else if(start) {
      for(let i = 0; i < periods[start]; i++){
        dates.push(formatData(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i)));
      }
      return dates
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Covid in Russia',
        data: labels.map(() => randomInteger(0, 10000)),
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

  const customPeriodHandler = event => {
    event.target.name === 'start' 
    ? setCustomPeriod({...customPeriod, start: new Date(event.target.value)}) 
    : setCustomPeriod({...customPeriod, finish: new Date(event.target.value)}) 
  }

  const changeCustomPeriodHandler = event => {
    const start = new Date(customPeriod.start)
    const finish = new Date(customPeriod.finish)
    setLabels(createPeriod(start, finish))
  }

  const changePeriodHandler = eventKey => {
    setPeriod(eventKey)
    setLabels(createPeriod(eventKey))
  }

  return (
    <div className={classes.main}>
      <Bar options={options} data={data}></Bar>
      <div className={classes.options}>
        <div className={classes.period}>
          <DropdownButton onSelect={changePeriodHandler} variant='primary' title='Период'>
            <Dropdown.Item eventKey='1' active={period === '1'}>Всё время</Dropdown.Item>
            <Dropdown.Item eventKey='2' active={period === '2'}>2 Недели</Dropdown.Item>
            <Dropdown.Item eventKey='3' active={period === '3'}>Месяц</Dropdown.Item>
            <Dropdown.Item eventKey='4' active={period === '4'}>3 Месяца</Dropdown.Item>
            <Dropdown.Item eventKey='5' active={period === '5'}>6 Месяцев</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey='6' active={period === '6'}>Произвольный период</Dropdown.Item>
          </DropdownButton>
          {
            period === '6' 
            ? <div className={classes.customPeriod}>
                From <input name='start' onChange={customPeriodHandler} type='date'/> to <input name='finish' onChange={customPeriodHandler} type='date'/> 
                <Button onClick={changeCustomPeriodHandler} variant='success'>OK</Button>
              </div>
            : null
          }
        </div>
      </div>
    </div>
  );
};

export default RussiaCovid;
