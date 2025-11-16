import { WeatherService } from './src/services/weather.service.js';
import { ScheduleView } from './src/view/schedule.view.js';
import { QuoteService } from './src/services/quote.service.js';
import { QuoteView } from './src/view/quote.view.js';

const weatherService = new WeatherService();
weatherService.getHourData().then((data) => ScheduleView.draw(data));

const quoteService = new QuoteService();
quoteService.getQuotes().then((data) => QuoteView.draw(data));
