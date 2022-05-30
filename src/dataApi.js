import axios from "axios";

export const periods = {
  '0': 'customPeriod',
  '1': 14,
  '2': 30,
  '3': 90,
  '4': 180,
  '5': 'allTime',
}

export function createPeriod(start, finish){
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

function formatData(date) {
    date = new Date(date)
    return [date.getDate(), Month[date.getMonth()]].join(' ')
}

export function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export const Month = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август',
'сентябрь', 'октябрь', "ноябрь", "декабрь"]
  
export const currentDate = new Date()

export async function getData(request, country, ...params){
    // let resp = await axios({
    //     method: 'get',
    //     url: request + '_' + country,
    // })
    // if(resp.status == 200){
    //     return new Promise((resolve, reject) => {
    //         resolve(JSON.parse(resp.data))
    //     })
    // }

    return 
}

export const colors = {
  'Все случаи заражения': "#FE5767",
  'Новые случаи заражения': "#FFE92F",
  'Летальные исходы': '#89929A',
  'Случаи выздоровления': '#19E154',
  'Новые дозы': '#89929A',
  'Всего введёных доз': "#FFE92F",
  'Прошло полную вакцинацию': '#19E154'
}