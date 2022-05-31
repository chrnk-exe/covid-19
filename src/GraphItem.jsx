import React, {useState} from 'react'
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
import classes from './GraphItem.module.css'
import { randomInteger, colors, getData } from './dataApi';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

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


//просто график который отображает что ему дали, по url надо будет как раз и забирать данные с бэка
const GraphItem = ({children, labels, label, url}) => {
    const data = {
        labels,
        datasets:[{
            label,
            data: labels.map(() => randomInteger(0, 10000)), //await getData(url)
            backgroundColor: colors[label]
        }]
    }

  return (
    <div className={classes.graphItem}>
        {children}
        <Bar options={options} data={data}></Bar>
    </div>
  )
}

export default GraphItem