import { SCHEDULE } from '../../schedule.js';
import { HourData } from '../model/HourData.js';

export class WeatherService {
  WEATHER_API =
    'https://api.open-meteo.com/v1/forecast?latitude=39.625&longitude=3.1875&hourly=temperature_2m,weather_code&timezone=auto&timeformat=unixtime';

  getHourData() {
    return fetch(this.WEATHER_API)
      .then((data) => data.json())
      .then(this.#jsonToHourData);
  }

  #jsonToHourData(json = {}) {
    const times = json.hourly.time;
    const hourData = [];

    for (let time of times) {
      const date = new Date(time * 1000);
      const obj = new HourData(
        date.getDay(),
        date.getHours(),
        time,
        '-',
        '-',
        '-'
      );

      hourData.push(obj);
    }

    return hourData;
  }
}
