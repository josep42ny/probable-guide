export class QuoteService {
  getQuotes() {
    const QUOTES_PATH = '/src/model/quotes.json';

    return fetch(QUOTES_PATH).then((data) => data.json());
  }
}
