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

function formatData(date) {
  date = new Date(date)
  return [date.getDate(), Month[date.getMonth()]].join(' ')
}

const AllCases = 'Все случаи заражения'
const NewCases = 'Новые случаи заражения'
const LethalCases = 'Летальные исходы'
const RecoveryCases = 'Случаи выздоровления'
const Diff = 'Нагрузка на систему здравоохранения'

const colors = {
  'Все случаи заражения': "#FE5767",
  'Новые случаи заражения': "#FFE92F",
  'Летальные исходы': '#89929A',
  'Случаи выздоровления': '#19E154',
}

const RussiaCovid = () => {

  const [period, setPeriod] = useState(3)
  const [customPeriod, setCustomPeriod] = useState({
    start: new Date(),
    finish: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 14)
  })
  const [parameters, setParameters] = useState([NewCases])


  const periods = {
    '1': 'allTime',
    '2': 14,
    '3': 30,
    '4': 90,
    '5': 180,
    '6': 'customPeriod',
  }

  const [labels, setLabels] = useState(createPeriod(period))
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Новые случаи заражения',
        data: labels.map(() => randomInteger(0, 10000)),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  })

  function createPeriod(start, finish){
    let dates = []
    if(finish){
      const oneDay = 1000 * 60 * 60 * 24; 
      const diffTime = Math.round(Math.abs(start.getTime() - finish.getTime()) / oneDay + 1)
      for(let i = 0; i < diffTime; i++){
        dates.push(formatData(new Date(finish.getFullYear(), finish.getMonth(), finish.getDate() - i)));
      }
      return dates
    } else if(start) {
      for(let i = 0; i < periods[start]; i++){
        dates.push(formatData(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i)));
      }
      return dates
    }
  }

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
        text: 'Covid-19 in Russia',
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
    const localLabels = createPeriod(eventKey)
    setPeriod(eventKey)
    setLabels(localLabels)
    setData({
      labels: localLabels,
      datasets: parameters.map(item => ({
        label: item,
        data: localLabels.map(() => randomInteger(0, 10000)),
        backgroundColor: colors[item],
      }))
    })
  }

  const parametersHandler = event => {
    let localParams
    if(!parameters.includes(event.target.value) && !(parameters.length == 1 && parameters[0] === Diff)){
      setParameters([...parameters, event.target.value])
      localParams = [...parameters, event.target.value]
    } else {
      setParameters([event.target.value])
      localParams = [event.target.value]
    }
    if(event.target.value === Diff){
      setParameters([Diff])
      localParams = [Diff]
    }
    setData({
      labels,
      datasets: localParams.map(item => ({
        label: item,
        data: labels.map(() => randomInteger(0, 10000)),
        backgroundColor: colors[item],
      }))
    })
  }

  const deleteParameterHandler = event => {
    let localParams = parameters.filter(param => param != event.target.value)
    setParameters(parameters.filter(param => param != event.target.value))
    setData({
      labels,
      datasets: localParams.map(item => ({
        label: item,
        data: labels.map(() => randomInteger(0, 10000)),
        backgroundColor: colors[item],
      }))
    })
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
                From <input name='start' onChange={customPeriodHandler} type='date'/> to <input name='finish' onChange={customPeriodHandler} type='date'/> {' '} 
                <Button onClick={changeCustomPeriodHandler} variant='success'>OK</Button>
              </div>
            : null
          }
        </div>
        <div className={classes.parameters}>
          <div className={classes.parametersToAdd}>
            <Button onClick={parametersHandler} value={AllCases} className={classes.parametersBtn} variant='danger'>Все случаи заболевания</Button>
            <Button onClick={parametersHandler} value={NewCases} className={classes.parametersBtn} variant='warning'>Новые случаи заболевания</Button>
            <Button onClick={parametersHandler} value={LethalCases} className={classes.parametersBtn} variant='secondary'>Летальные исходы</Button>
            <Button onClick={parametersHandler} value={RecoveryCases} className={classes.parametersBtn} variant='success'>Случаи выздоровления</Button>
            <Button onClick={parametersHandler} value={Diff} className={classes.parametersBtn} variant='info'>Разница между заболевшими и выздоровевшими</Button>
          </div>
          <div className={classes.addedParameters}>
            {
              parameters.map((param, index) => (
                <div key={index}>
                  <Button 
                  value={param} 
                  onClick={deleteParameterHandler} 
                  className={classes.parametersBtn} 
                  variant='outline-dark'>
                    {param} ×
                  </Button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default RussiaCovid;
