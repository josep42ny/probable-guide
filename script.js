const QUOTES_PATH = 'https://zenquotes.io/api/today';
const quoteData = fetch(QUOTES_PATH)
  .then(data => data.json())
  .then(displayQuote)
  .catch(error => console.error(`Error while fetching data from ${QUOTES_PATH}:\n${error}`));

function displayQuote(quote) {
  const text = `${quote.q}\n\n-${quote.a}`;

  const quoteElem = document.createElement('P');
  quoteElem.innerText = text;
  document.querySelector('#quote').appendChild(quoteElem);
}
