import React, {useState} from 'react'
import RussiaCovid from './RussiaCovid';
import classes from './RussiaCovidApp.module.css'
import {Dropdown, DropdownButton, Button} from 'react-bootstrap';
import {createPeriod, currentDate, randomInteger, getData, colors, periods} from './dataApi'
import GraphItem from './GraphItem';

const AllCases = 'Все случаи заражения'
const NewVacations = 'Новые дозы'
const AllVacations = 'Всего введёных доз'
const FullyVaccinated = 'Прошло полную вакцинацию'
const NewCases = 'Новые случаи заражения'
const LethalCases = 'Летальные исходы'
const RecoveryCases = 'Случаи выздоровления'
const Diff = 'Нагрузка на систему здравоохранения'

const OperationalData = [AllCases, RecoveryCases, LethalCases, FullyVaccinated]

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
const RussiaCovidApp = () => {
    const [period, setPeriod] = useState('1')
    const [labels, setLabels] = useState(createPeriod(period))
    const [customPeriod, setCustomPeriod] = useState({
        start: new Date(),
        finish: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 14)
      })

    const dateHandler = (period, labels) => {
        switch(period){
            case '0': return labels.length + ' дней'
            case '1': return '14 дней'
            case '2': return 'месяц'
            case '3': return '3 месяца'
            case '4': return 'полгода'
            case '5': return 'всё время'
            default: return ' '
        }
    }

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
      }

  return (
    <div className={classes.App}>
        <div>
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
                    С <input name='start' onChange={customPeriodHandler} type='date'/> по <input name='finish' onChange={customPeriodHandler} type='date'/> {' '} 
                    <Button style={{marginTop:'5px'}} onClick={changeCustomPeriodHandler} variant='success'>OK</Button>
                </div>
                : <button onClick={() => console.log(dateHandler(period, labels))}>console.log</button>
            }
            </div>
        </div>
        <div className={classes.dataGraphics}>
            {
                OperationalData.map((item, index) => (
                    <GraphItem key={index} labels={labels} label={item}><h5>{item} за {dateHandler(period, labels)}</h5></GraphItem>
                ))
            }
        </div>
        <div>
            <h2>Агрегатор графиков</h2>
            <RussiaCovid/>
        </div>
    </div>
  )
}

export default RussiaCovidApp