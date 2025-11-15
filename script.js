import { WeatherService } from './src/services/weather.service.js';
import { Utils } from './src/utils/Utils.js';
import { WEATHER_CODES } from './src/model/weatherCodes.js';

const w = new WeatherService();
w.getHourData().then(draw);

/*
import { SCHEDULE } from "./schedule.js";
import { Cell } from "./Cell.js";

const WEATHER_API = 'https://api.open-meteo.com/v1/forecast?latitude=39.625&longitude=3.1875&hourly=temperature_2m,weather_code&timezone=auto&timeformat=unixtime';

const schedule = await fetch(WEATHER_API)
  .then(data => data.json())
  .then(data => mapSchedule(data.hourly));

draw(schedule);
*/
function draw(schedule) {
  const root = document.querySelector('#app'),
    table = document.createElement('TABLE'),
    minHour = Utils.getMinHour(schedule),
    maxHour = Utils.getMaxHour(schedule),
    rowCount = maxHour - minHour + 1;

  for (let row = 0; row < rowCount; row++) {
    const tRow = table.insertRow();
    for (let col = 0; col < 5; col++) {
      tRow.insertCell();
    }
  }

  for (let value of Object.values(schedule)) {
    const row = table.rows[value.hour - minHour];
    const cell = row.cells[value.day];
    cell.classList = value.color;

    cell.appendChild(createSubjectElement(value.subject));
    cell.appendChild(createWeatherElement(value.temperature, value.wmoCode));
  }

  const HOURS = [
    '8:00\n9:00',
    '9:00\n10:00',
    '10:00\n11:00',
    '11:00\n12:00',
    '12:00\n13:00',
    '13:00\n14:00',
    '14:00\n15:00',
  ];
  const OFFSETS = [5, -10, -15, null, 10, 5, null];
  for (let row = 0; row < table.rows.length; row++) {
    const hour = table.rows[row].insertCell(0);
    hour.classList = 'hours';
    hour.appendChild(createHourElement(HOURS[row]));
    hour.appendChild(createStyledNumber(OFFSETS[row]));
  }

  const divider = table.insertRow(3);
  divider.classList = 'divider';
  divider.insertCell();
  const dividerCell = divider.insertCell();
  dividerCell.classList = 'pattern';
  dividerCell.setAttribute('colspan', 5);

  root.appendChild(table);
}

function createWeatherElement(temperature, wmoCode) {
  const weatherContainer = document.createElement('DIV');
  weatherContainer.classList = 'weather-container';

  const temp = document.createElement('P');
  temp.innerText = `${temperature}ºC`;
  weatherContainer.appendChild(temp);

  const icon = document.createElement('I');
  icon.classList = `wi ${WEATHER_CODES[wmoCode]}`;
  weatherContainer.appendChild(icon);

  return weatherContainer;
}

function createSubjectElement(subject) {
  const capitalized = subject.charAt(0).toUpperCase() + subject.slice(1);
  return document.createTextNode(capitalized);
}

function createHourElement(hour) {
  const elem = document.createElement('P');
  elem.innerText = hour;

  return elem;
}

function createStyledNumber(number) {
  if (!number) return document.createTextNode('');

  const elem = document.createElement('SPAN');
  elem.classList = number < 0 ? 'red' : 'green';
  elem.innerText = number < 0 ? number : `+${number}`;

  return elem;
}

/*

function mapSchedule(hourlyWeather = {}) {
  const out = [];

  for (let day = 0; day < SCHEDULE.length; day++) {
    for (let [hour, subject] of Object.entries(SCHEDULE[day])) {
      hour = parseInt(hour);
      const index = timeToIndex(day, hour, hourlyWeather.time);
      const temp = hourlyWeather.temperature_2m[index];
      const wCode = hourlyWeather.weather_code[index];
      const obj = new Cell(day, hour, subject.name, subject.color, temp, wCode);

      out.push(obj);
    }
  }

  return out;
}

function timeToIndex(day, hour, array) {
  const UTC_OFFSET_BERLIN = 2;
  for (let i = 0; i < array.length; i++) {
    const unix = new Date(array[i] * 1000);
    if (parseInt((unix.getDay() + 6) % 7) === day && unix.getUTCHours() + UTC_OFFSET_BERLIN === hour) {
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
  const text = `${quote.quote}\n-${quote.author}`;

  const quoteElem = document.createElement('Q');
  quoteElem.innerText = text;
  quoteElem.innerHTML += '&emsp;';
  document.querySelector('#quote').appendChild(quoteElem);
}
*/
