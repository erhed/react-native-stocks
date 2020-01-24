import { AlphaVantageKey as apiKey } from './Keys';

export async function searchForAsset(input) {
  return new Promise(function (resolve, reject) {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=${apiKey}`;
    fetch(url)
      .then(resp => {
        return resp.json();
      }).then(json => {
        let allMatches = json.bestMatches;
        let relevantMatches = [];
        allMatches.map(asset => {
          let symbol = Object.values(asset)[0];
          let name = Object.values(asset)[1];
          let type = Object.values(asset)[2];
          let region = Object.values(asset)[3];
          if (type === 'Equity' && region === 'United States') {
            relevantMatches.push({
              id: symbol + name + type + region,
              name: name,
              symbol: symbol,
            });
          }
        })
        resolve(relevantMatches);
      })
      .catch(error => {
        reject({ status: 'error', error: error });
      });
  });
}