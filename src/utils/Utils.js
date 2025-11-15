export class Utils {
  static getMaxHour(schedule) {
    return schedule.reduce((t, c) => (c.hour > t ? c.hour : t), -Infinity);
  }

  static getMinHour(schedule) {
    return schedule.reduce((t, c) => (c.hour < t ? c.hour : t), Infinity);
  }
}
