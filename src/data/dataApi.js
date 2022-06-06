import axios from "axios";

// периоды сделал как у них в бэке
export const periods = {
  '0': 'customPeriod', //пользователь сам задаёт период
  '1': 14, //две недели
  '2': 30, //месяц
  '3': 90, //три месяца
  '4': 180, //шесть месяцев
  '5': 'allTime', //всё время пандемии (только какое не особо понятно)
}

//из старта и финиша делает массив с подписями к графику
//но если задан только один параметр, то делает этот массив не от start to finish, а от текущей даты n подписей
export function createPeriod(start, finish){
    let dates = []
    if(finish){
      const oneDay = 1000 * 60 * 60 * 24; 
      //разница в днях между start и finish
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

  //просто форматирует дату из её вида в виде объекта Date в строчку из даты и месяца
function formatData(date) {
    date = new Date(date)
    return [date.getDate(), Month[date.getMonth()]].join(' ')
}

  //Я решил не использовать faker а просто сделать свою рандом функцию
export function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export const Month = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август',
'сентябрь', 'октябрь', "ноябрь", "декабрь"]
  
export const currentDate = new Date()

// вот тут должен быть запрос внутри которого и обрабатываются данные
// https://github.com/axios/axios документация к axios, там описано что возвращает и как с ней работать,
// почти такая же штука как и fetch, но немного посильнее
export async function getData(request, labels, country, ...params){
    let resp = await axios({
        method: 'get',
        url: request + '_' + country,
        data: {
          first_date: labels[labels.length-1],
          last_date: labels[0]
        }
    })
    
    //handling resp
    //...
    //...

    if(resp.status == 200){
        return new Promise((resolve, reject) => {
            resolve(JSON.parse(resp.data))
        })
    }

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

export const dateHandler = (period, labels) => {
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