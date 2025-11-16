export class QuoteView {
  static draw(quotes) {
    const UNIX_DAYS = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
    const DAILY_QUOTE = UNIX_DAYS % quotes.length;
    const quote = quotes[DAILY_QUOTE];
    const text = `${quote.quote}\n-${quote.author}`;

    const quoteElem = document.createElement('Q');
    quoteElem.innerText = text;
    quoteElem.innerHTML += '&emsp;';
    document.querySelector('#quote').appendChild(quoteElem);
  }
}
