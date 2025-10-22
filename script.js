import { WEATHER_CODES } from "./weatherCodes.js";
import { SCHEDULE } from "./schedule.js";
import { Cell } from "./Cell.js";

const WEATHER_API = 'https://api.open-meteo.com/v1/forecast?latitude=39.625&longitude=3.1875&hourly=temperature_2m,weather_code&timezone=Europe%2FBerlin&timeformat=unixtime';

const schedule = await fetch(WEATHER_API)
  .then(data => data.json())
  .then(data => mapSchedule(data.hourly));

draw(schedule);
console.log(getMin(schedule));

function draw(schedule) {
  const root = document.querySelector('#app'),
    table = document.createElement('TABLE');
  const rowCount = getMax(schedule) - getMin(schedule);
  //todo
  for (let row = 0; row < rowCount; row++) {
    table.insertRow();
    for (let col = 0; col < 5) {

    }
  }

  for (let row = 0; row < rowCount; row++) {
    table.insertRow();
  }

  for (let day = 0; day < 7; day++) {

  }

  root.appendChild(table);
}

function getMax(schedule) {
  let max = 0;
  schedule.forEach(cell => {
    if (cell.hour > max) {
      max = cell.hour;
    }
  });
  return max;
}

function getMin(schedule) {
  let min = schedule[0].hour;
  schedule.forEach(cell => {
    if (cell.hour < min) {
      min = cell.hour;
    }
  });
  return min;
}


function mapSchedule(hourlyWeather = {}) {
  const out = [];

  for (let day = 0; day < SCHEDULE.length; day++) {
    for (let [hour, subject] of Object.entries(SCHEDULE[day])) {
      hour = parseInt(hour);
      const index = timeToIndex(day, hour, hourlyWeather.time);
      const temp = hourlyWeather.temperature_2m[index];
      const wCode = hourlyWeather.weather_code[index]
      const obj = new Cell(day, hour, subject, temp, wCode);

      out.push(obj);
    }
  }
  return out;
}

function timeToIndex(day, hour, array) {
  for (let i = 0; i < array.length; i++) {
    const unix = new Date(array[i] * 1000);
    if (unix.getUTCDay() === day && unix.getUTCHours() === hour) {
      return i;
    }
  }
}



// Quotes
const QUOTES_PATH = 'quotes.json';
const quoteData = fetch(QUOTES_PATH)
  .then(data => data.json())
  .then(displayQuote)
  .catch(error => console.error(`Error while fetching data from ${QUOTES_PATH}:\n${error}`));

function displayQuote(quotes) {
  const UNIX_DAYS = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
  const DAILY_QUOTE = UNIX_DAYS % quotes.length;
  const quote = quotes[DAILY_QUOTE];
  const text = `"${quote.quote}"\n\n-${quote.author}`;

  const quoteElem = document.createElement('P');
  quoteElem.innerText = text;
  document.querySelector('#quote').appendChild(quoteElem);
}
