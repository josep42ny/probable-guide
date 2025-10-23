class WeatherService {

  private WEATHER_API = 'https://api.open-meteo.com/v1/forecast?latitude=39.625&longitude=3.1875&hourly=temperature_2m,weather_code&timezone=auto&timeformat=unixtime';


  private mapSchedule(data: any): Cell[] {
    return [];
  }

  public async getSchedule(): Promise<Cell[]> {
    const schedule = await fetch(this.WEATHER_API)
      .then(data => data.json())
      .then(data => this.mapSchedule(data.hourly));
    return [];
  }

}