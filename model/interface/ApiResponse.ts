interface ApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: string;
    weather_code: string;
  }
  hourly: {
    time: number[];
    temperature_2m: number[];
    weather_code: number[];
  }
}
