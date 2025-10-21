import { WEATHER_CODES } from "./weatherCodes.js";

const WEATHER_API = 'https://api.open-meteo.com/v1/forecast?latitude=39.625&longitude=3.1875&hourly=temperature_2m,weather_code&timezone=Europe%2FBerlin&timeformat=unixtime';
const weatherData = await fetch(WEATHER_API)
  .then(data => data.json());
console.log(weatherData);
const elem = document.querySelector('#weather');
const hourly = weatherData.hourly;
for (let i = 0; i < hourly.time.length; i++) {
  const date = new Date(hourly.time[i] * 1000);
  if (date.getHours() >= 8 && date.getHours() < 14) {
    const cell = createCell(hourly.temperature_2m[i], hourly.weather_code[i]);
    elem.appendChild(cell);
  }
}

function createCell(temperature, weatherCode) {
  const icon = document.createElement('I');
  icon.classList = `wi ${WEATHER_CODES[weatherCode]}`;
  const temp = document.createElement('P');
  temp.innerText = `${temperature}°C`;

  const wrapper = document.createElement('DIV');
  wrapper.appendChild(icon);
  wrapper.appendChild(temp);
  return wrapper;
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
