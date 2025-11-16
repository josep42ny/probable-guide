import { Utils } from '../utils/Utils.js';
import { WEATHER_CODES } from '../model/weatherCodes.js';

export class ScheduleView {
  static draw(schedule) {
    const root = document.querySelector('#app'),
      table = document.createElement('TABLE'),
      OFFSETS = [5, -10, -15, null, 10, 5, null],
      minHour = Utils.getMinHour(schedule),
      maxHour = Utils.getMaxHour(schedule),
      rowCount = maxHour - minHour + 1;

    for (let row = 0; row < rowCount; row++) {
      const tRow = table.insertRow();
      tRow.appendChild(this.#createHourElement(row + minHour, OFFSETS[row]));
      for (let col = 0; col < 5; col++) {
        tRow.insertCell(-1);
      }
    }

    for (let value of Object.values(schedule)) {
      const row = table.rows[value.hour - minHour];
      const cell = row.cells[value.day + 1];
      cell.classList = value.color;

      cell.appendChild(this.#createSubjectElement(value.subject));
      cell.appendChild(
        this.#createWeatherElement(value.temperature, value.wmoCode)
      );
    }

    const dividerRow = table.insertRow(3);
    this.#createDividerElement(dividerRow);

    root.appendChild(table);
  }

  static #createWeatherElement(temperature, wmoCode) {
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

  static #createSubjectElement(subject) {
    const capitalized = subject.charAt(0).toUpperCase() + subject.slice(1);
    return document.createTextNode(capitalized);
  }

  static #createDividerElement(row) {
    row.classList = 'divider';
    row.insertCell();
    const dividerCell = row.insertCell();
    dividerCell.classList = 'pattern';
    dividerCell.setAttribute('colspan', 5);
  }

  static #createHourElement(hour, offset) {
    const elem = document.createElement('TD');
    elem.classList = 'hours';
    elem.appendChild(this.#createHourNumberElement(hour));
    elem.appendChild(this.#createStyledNumber(offset));
    return elem;
  }

  static #createHourNumberElement(hour) {
    const elem = document.createElement('P');
    elem.innerText = `${hour}:00
  ${hour + 1}:00`;

    return elem;
  }

  static #createStyledNumber(number) {
    if (!number) return document.createTextNode('');

    const elem = document.createElement('SPAN');
    elem.classList = number < 0 ? 'red' : 'green';
    elem.innerText = number < 0 ? number : `+${number}`;

    return elem;
  }
}
