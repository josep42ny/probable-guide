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
