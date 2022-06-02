import React, {useState} from 'react'
import classes from './RussiaCovidApp.module.css'
import {Dropdown, DropdownButton, Button, Nav} from 'react-bootstrap';
import {Bar, Line} from 'react-chartjs-2'
import {createPeriod, currentDate, randomInteger, getData, colors, periods, dateHandler} from '../dataApi'
import forward from './forward.svg'
import back from './back.svg'

const AllCases = 'Все случаи заражения'
const NewVacations = 'Новые дозы'
const AllVacations = 'Всего введёных доз'
const FullyVaccinated = 'Прошло полную вакцинацию'
const NewCases = 'Новые случаи заражения'
const LethalCases = 'Летальные исходы'
const RecoveryCases = 'Случаи выздоровления'
const Diff = 'Нагрузка на систему здравоохранения'

//как примерно будут выглядеть запросы
const requests = {
  'Все случаи заражения': '/all_cases',
  'Новые случаи заражения': '/new_cases',
  'Летальные исходы': '/lethal_cases',
  'Случаи выздоровления': '/recovery_cases',
  'Новые дозы': '/new_vacations',
  'Всего введёных доз': '/all_vacations',
  'Прошло полную вакцинацию': '/fully_vaccinated'
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
        display: false,
        text: 'Covid-19 in Russia',
      },
    },
};

const BAR = 'Bar'
const LINE_CHART = 'chart'

const storage = window.localStorage

const RussiaCovidApp = () => {
  //вид графика 
  const [graph, setGraph] = useState(BAR)

  //менюшка
  const [active, setActive] = useState(true)

  //переключатель агрегатора с вакцинаций на случаи заражения
  const [vacationsGraph, setVacations] = useState(JSON.parse(storage.getItem('vac')) ?? false) 

  //период, пояснения к нему в dataApi.js 
  const [period, setPeriod] = useState(JSON.parse(storage.getItem('period')) ?? 3) 

  //среди периодов можно выбрать свой, период можно описать первой датой и последней, 
  //изначально он 2 недели с текущей даты
  const [customPeriod, setCustomPeriod] = useState({
    start: new Date(),
    finish: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 14)
  })

  //какие параметры отображаются на графике
  const [parameters, setParameters] = useState(JSON.parse(storage.getItem('params')) ?? [NewCases])

  //это подписи к графикам снизу, обозначение их дат
  const [labels, setLabels] = useState(JSON.parse(storage.getItem('labels')) ?? createPeriod(period))
  
  //тут хранятся данные для построения графиков
  //labels - подписи к ним снизу
  //datasets - массив из самих данных. Каждый элемент массива объект с тремя полями
  //самый сок в поле data. Там, когда api будет готово будет функция getData, которая уже и возвращает
  //нужные данные в нужном виде, причём она async
  const [data, setData] = useState(JSON.parse(storage.getItem('data')) ?? {
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
        text: 'Covid-19 в России ',
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
    const localLabels = createPeriod(start, finish)
    setLabels(localLabels) 
    let localData  
    if(localLabels.length > labels.length){
      localData  = {
        labels: localLabels,
        datasets: parameters.map(param => ({
          label: param,
          data: localLabels.map(() => randomInteger(0, 10000) - randomInteger(0, 10000)),
          backgroundColor: colors[param],
          borderColor: colors[param],
        }))
      }
      setData(localData)
    } else {
      localData  = {
        ...data, labels: localLabels
      }
      setData(localData)
    }    
    storage.setItem('data', JSON.stringify(localData))
    storage.setItem('labels', JSON.stringify(localLabels))
  }

  const changePeriodHandler = eventKey => {
      const localLabels = createPeriod(eventKey)
      setPeriod(eventKey)
      setLabels(localLabels)
      let localData
      if(localLabels.length > labels.length){
        localData = {
          labels: localLabels,
          datasets: parameters.map(param => ({
            label: param,
            data: localLabels.map(() => randomInteger(0, 10000) - randomInteger(0, 10000)),
            backgroundColor: colors[param],
            borderColor: colors[param],
          }))
        }
        setData(localData)
      } else {
        localData = {
          ...data, labels: localLabels
        }
        setData(localData)
      }
      storage.setItem('data', JSON.stringify(localData))
      storage.setItem('labels', JSON.stringify(localLabels))
      storage.setItem('period', JSON.stringify(eventKey))
  }

  const switchParams = event => {
    setVacations(event.target.value === 'Vacations')
    setParameters([])
    storage.setItem('params', JSON.stringify([]))
    storage.setItem('vac', JSON.stringify(event.target.value === 'Vacations'))
  }
      
    // const request = async () => {
    //   console.log('clicked!')
    //   let resp = await axios({
    //     method: 'get',
    //     url: '/api/Diseaseds/New?Period=1&DateFrom=2022-05-29T12%3A28%3A07.792Z'
    //   })
    //   console.log(resp)
    // }

  //здесь поведение добавления различных параметров графика
  //сделал так, чтоб последний параметр Diff мог всегда быть только один, потому что он по своей сути
  //производная от остальных графиков
  const parametersHandler = event => {
    let localParams

    if(parameters.includes(event.target.value)){
      localParams = parameters.filter(param => param !== event.target.value)
      setParameters(localParams)
    } else {
      if(event.target.value === Diff){
        localParams = [Diff]
        setParameters(localParams)
      } else {
        localParams = [...(parameters.filter(param => param !== Diff)), event.target.value]
        setParameters(localParams)
      }
    }   

    setDataByParams(localParams)
    function setDataByParams(localParams){
      let localData
      if(localParams.length === 1 && localParams[0] === Diff) {
        localData = {
          labels,
          datasets: localParams.map(item => ({
            label: 'Разница заболевших и выздоровевших',
            data: labels.map(() => randomInteger(0, 10000) - randomInteger(0, 10000)),
            backgroundColor: '#19E154',
            borderColor: '#19E154',
            }))
          }
        setData(localData)
      } else {
        localData = {
          labels,
          datasets: localParams.map(item => ({
            label: item,
            data: labels.map(() => randomInteger(0, 10000)),
            backgroundColor: colors[item],
            borderColor: colors[item],
            }))
          }
        setData(localData)
      }
      storage.setItem('data', JSON.stringify(localData))
    }
    storage.setItem('params', JSON.stringify(localParams))
  }

  //скачалка в jpg
    const downloadGraphHandler = () => {
      let canv = document.getElementById('canvas')
      let dataURL = canv.toDataURL('image/png')
      let image = new Image()
      image.src = dataURL
      let link = document.createElement('a')
      link.setAttribute("href", image.src);
      link.setAttribute("download", "canvasImage");
      link.click();
    }

    const periodTitles = {
      '0': 'Произвольный период',
      '1': 'Две недели',
      '2': 'Месяц',
      '3': '3 Месяца',
      '4': 'Шесть месяцев',
      '5': 'Всё время'
    }

  return (
    <div className={classes.App}>
        <nav className={active ? classes.navigation + ' ' + classes.active : classes.navigation + ' ' + classes.hidden}>
          
          <div className={classes.navItemContainer}>
            <Button onClick={() => setActive(!active)} variant="Success">
              <img src={active ? back : forward} height={20} alt=''/>
            </Button>
          </div>

          <div className={classes.navItemContainer}>
            <div className={classes.period}>
            <DropdownButton onSelect={changePeriodHandler} variant='primary' title={periodTitles[period]}>
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
                    С <input name='start' onChange={customPeriodHandler} type='date'/> по <input name='finish' onChange={customPeriodHandler} type='date'/> {' '} 
                    <Button style={{marginTop:'5px'}} onClick={changeCustomPeriodHandler} variant='success'>OK</Button>
                </div>
                : null
            }
            </div>
          </div>

          <div className={classes.navItemContainer}>
            <Button value='Covid' onClick={switchParams} size='sm' className={classes.parametersBtn} variant='dark'>Статистика распространения</Button>
            <Button value='Vacations' onClick={switchParams} size='sm' className={classes.parametersBtn} variant='dark'>Статистика вакцинирования</Button>
          </div>

          <div className={classes.navItemContainer}>
            {!vacationsGraph ?
            <div className={classes.parameters}>
              <Button onClick={parametersHandler} value={AllCases} className={classes.parametersBtn} variant={parameters.indexOf(AllCases) !== -1 ? 'danger' : 'outline-dark'}>Все случаи заболевания</Button>
              <Button onClick={parametersHandler} value={NewCases} className={classes.parametersBtn} variant={parameters.indexOf(NewCases) !== -1 ? 'warning' : 'outline-dark'}>Новые случаи заболевания</Button>
              <Button onClick={parametersHandler} value={LethalCases} className={classes.parametersBtn} variant={parameters.indexOf(LethalCases) !== -1 ? 'secondary' : 'outline-dark'}>Летальные исходы</Button>
              <Button onClick={parametersHandler} value={RecoveryCases} className={classes.parametersBtn} variant={parameters.indexOf(RecoveryCases) !== -1 ? 'success' : 'outline-dark'}>Случаи выздоровления</Button>
              <Button onClick={parametersHandler} value={Diff} className={classes.parametersBtn} variant={parameters.indexOf(Diff) !== -1 ? 'info' : 'outline-dark'}>Разница между заболевшими и выздоровевшими</Button>
            </div>
            : <div className={classes.parameters}>
                <Button onClick={parametersHandler} value={AllVacations} className={classes.parametersBtn} variant={parameters.indexOf(AllVacations) !== -1 ? 'secondary' : 'outline-dark'}>{AllVacations}</Button>
                <Button onClick={parametersHandler} value={NewVacations} className={classes.parametersBtn} variant={parameters.indexOf(NewVacations) !== -1 ? 'warning' : 'outline-dark'}>{NewVacations}</Button>
                <Button onClick={parametersHandler} value={FullyVaccinated} className={classes.parametersBtn} variant={parameters.indexOf(FullyVaccinated) !== -1 ? 'success' : 'outline-dark'}>{FullyVaccinated}</Button>
              </div>}
          </div>
        </nav>
        <main className={classes.main}>
          <div className={classes.barContainer}>
            <Nav variant='tabs' onSelect={(selectedKey) => setGraph(selectedKey)} defaultActiveKey={BAR}>
              <Nav.Item>
                <Nav.Link eventKey={BAR}>Bar</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={LINE_CHART}>Line</Nav.Link>
              </Nav.Item>
            </Nav>
            {
              graph === BAR
              ? <Bar id={'canvas'} options={options} data={data}></Bar>
              : <Line id={'canvas'} options={options} data={data}></Line>
            }
            <Button onClick={downloadGraphHandler} style={{marginTop: '20px'}} variant='primary'>Download on PNG</Button>
          </div>
        </main>
        {/* <div>
            
        </div> */}
    </div>
  )
}

export default RussiaCovidApp