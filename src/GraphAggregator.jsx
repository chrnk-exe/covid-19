import React, {useState} from 'react';
import classes from './GraphAggregator.module.css';
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
import {createPeriod, currentDate, randomInteger, getData, colors} from './dataApi'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const AllCases = 'Все случаи заражения'
const NewVacations = 'Новые дозы'
const AllVacations = 'Всего введёных доз'
const FullyVaccinated = 'Прошло полную вакцинацию'
const NewCases = 'Новые случаи заражения'
const LethalCases = 'Летальные исходы'
const RecoveryCases = 'Случаи выздоровления'
const Diff = 'Нагрузка на систему здравоохранения'

const requests = {
  'Все случаи заражения': '/all_cases',
  'Новые случаи заражения': '/new_cases',
  'Летальные исходы': '/lethal_cases',
  'Случаи выздоровления': '/recovery_cases',
  'Новые дозы': '/new_vacations',
  'Всего введёных доз': '/all_vacations',
  'Прошло полную вакцинацию': '/fully_vaccinated'
}


//агрегатор графиков, то есть место, где их можно накладывать друг на друга
const GraphAggregator = ({country}) => {
  //переключатель агрегатора с вакцинаций на случаи заражения
  const [vacationsGraph, setVacations] = useState(false) 

  //период, пояснения к нему в dataApi.js 
  const [period, setPeriod] = useState(3) 

  //среди периодов можно выбрать свой, период можно описать первой датой и последней, 
  //изначально он 2 недели с текущей даты
  const [customPeriod, setCustomPeriod] = useState({
    start: new Date(),
    finish: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 14)
  })

  //какие параметры отображаются на графике
  const [parameters, setParameters] = useState([NewCases])

  //это подписи к графикам снизу, обозначение их дат
  const [labels, setLabels] = useState(createPeriod(period))
  
  //тут хранятся данные для построения графиков
  //labels - подписи к ним снизу
  //datasets - массив из самих данных. Каждый элемент массива объект с тремя полями
  //самый сок в поле data. Там, когда api будет готово будет функция getData, которая уже и возвращает
  //нужные данные в нужном виде, причём она будет асинхронная
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: NewCases,
        data: labels.map(() => randomInteger(0, 10000)),
        backgroundColor: colors[NewCases],
      },
    ],
  })

  //настройки графика, пришлось перевернуть ось X, чтобы даты шли слева направо
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
        text: 'Covid-19 in ' + country,
      },
    },
  };

  //обработка инпутов с датами
  const customPeriodHandler = event => {
    event.target.name === 'start' 
    ? setCustomPeriod({...customPeriod, start: new Date(event.target.value)}) 
    : setCustomPeriod({...customPeriod, finish: new Date(event.target.value)}) 
  }

  //изменение периода, на самом деле тут надо будет менять и data, но api ещё нет
  const changeCustomPeriodHandler = event => {
    const start = new Date(customPeriod.start)
    const finish = new Date(customPeriod.finish)
    setLabels(createPeriod(start, finish))
  }

  //просто изменение периода
  const changePeriodHandler = eventKey => {
    const localLabels = createPeriod(eventKey) //<-- чтобы в setData было свежее изменение, потому что
    //все функции изменения состояния компонента срабатывают не сразу, это добавили в новом реакте, чтобы
    //при каждом setState не перерендеривался компонент
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

  //здесь поведение добавления различных параметров графика
  //сделал так, чтоб последний параметр Diff мог всегда быть только один, потому что он по своей сути
  //производная от остальных графиков
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

    //отдельная обработка параметра Diff
    if(localParams.length === 1 && localParams[0] === Diff) {
      setData({
        labels,
        datasets: localParams.map(item => ({
          label: 'Разница заболевших и выздоровевших',
          data: labels.map(() => randomInteger(0, 10000) - randomInteger(0, 10000)),
          backgroundColor: '#19E154',
          }))
        })
    } else {
      setData({
      labels,
      datasets: localParams.map(item => ({
        label: item,
        data: labels.map(() => randomInteger(0, 10000)),
        backgroundColor: colors[item],
        }))
      })
    }
  }

  //тут ничего сложного, просто удаление одного из параметров
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

  //свич с вакцинаций на больных и обратно
  const switchParams = event => {
    setVacations(event.target.value === 'Vacations')
    setParameters([])
  }

  return (
    <div className={classes.main}>
      <nav className={classes.menu}>
        <Button value='Covid' onClick={switchParams} size='sm' className={classes.parametersBtn} variant='dark'>Статистика распространения</Button>
        <Button value='Vacations' onClick={switchParams} size='sm' className={classes.parametersBtn} variant='dark'>Статистика вакцинирования</Button>
      </nav>
      <Bar options={options} data={data}></Bar>
      <div className={classes.options}>
        <div className={classes.period}>
          <DropdownButton onSelect={changePeriodHandler} variant='primary' title='Период'>
            <Dropdown.Item eventKey='5' active={period === '5'}>Всё время</Dropdown.Item>
            <Dropdown.Item eventKey='1' active={period === '1'}>2 Недели</Dropdown.Item>
            <Dropdown.Item eventKey='2' active={period === '2'}>Месяц</Dropdown.Item>
            <Dropdown.Item eventKey='3' active={period === '3'}>3 Месяца</Dropdown.Item>
            <Dropdown.Item eventKey='4' active={period === '4'}>6 Месяцев</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey='0' active={period === '0'}>Произвольный период</Dropdown.Item>
          </DropdownButton>
          {
            period === '0' 
            ? <div className={classes.customPeriod}>
                From <input name='start' onChange={customPeriodHandler} type='date'/> to <input name='finish' onChange={customPeriodHandler} type='date'/> {' '} 
                <Button onClick={changeCustomPeriodHandler} variant='success'>OK</Button>
              </div>
            : null
          }
        </div>
        { !vacationsGraph
        ? (<div className={classes.parameters}>
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
        </div>)
        : (
          <div className={classes.parameters}>
            <div className={classes.parametersToAdd}>
              <Button size='lg' onClick={parametersHandler} value={NewVacations} className={classes.parametersBtn} variant='secondary'>{NewVacations}</Button>
              <Button size='lg' onClick={parametersHandler} value={AllVacations} className={classes.parametersBtn} variant='warning'>{AllVacations}</Button>
              <Button size='lg' onClick={parametersHandler} value={FullyVaccinated} className={classes.parametersBtn} variant='success'>{FullyVaccinated}</Button>
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
        )
        }
      </div>
      
    </div>
  );
};

export default GraphAggregator;
