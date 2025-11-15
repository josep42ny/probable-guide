import { SCHEDULE } from '../model/schedule.js';
import { HourData } from '../model/HourData.js';

export class WeatherService {
  WEATHER_API =
    'https://api.open-meteo.com/v1/forecast?latitude=39.625&longitude=3.1875&past_days=7&hourly=temperature_2m,weather_code&timezone=auto&timeformat=unixtime';

  getHourData() {
    return fetch(this.WEATHER_API)
      .then((data) => data.json())
      .then((json) => this.#jsonToHourData(json));
  }

  test() {
    console.log(this.#getUnixForCurrentWeek(0, 10));
  }

  #jsonToHourData(json) {
    return this.#parseApiTime(json.hourly);
  }

  #parseApiTime(weather) {
    return SCHEDULE.map((data) => {
      const index = weather.time.indexOf(
        this.#getUnixForCurrentWeek(data.day, data.hour)
      );
      return new HourData(
        data.day,
        data.hour,
        data.subject,
        data.color,
        weather.temperature_2m[index],
        weather.weather_code[index]
      );
    });
  }

  #getUnixForCurrentWeek(weekday, hour, minute = 0, second = 0) {
    const now = new Date();

    // Get start of the current week (Sunday as 0)
    const startOfWeek = new Date(now);
    const currentDay = now.getDay();
    let isoCurrent = currentDay === 0 ? 7 : currentDay;
    const diff = isoCurrent - 1; // start at Monday
    startOfWeek.setDate(now.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);

    // Target date
    const target = new Date(startOfWeek);
    target.setDate(startOfWeek.getDate() + weekday);
    target.setHours(hour, minute, second, 0);

    // Return UNIX timestamp (seconds)
    return Math.floor(target.getTime() / 1000);
  }
}
