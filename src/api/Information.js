import { AlphaVantageKey as apiKey } from './Keys';

export async function getInformation(symbol) {
  return new Promise(function (resolve, reject) {
    fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail?region=US&lang=en&symbol=${symbol}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "abde10a14cmsh6524a34d037ff59p11f814jsnd0bb33b5ec29"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        //console.warn(json);
        resolve(json.summaryProfile.longBusinessSummary);
      })
      .catch(error => {
        reject({ status: 'error', error: error });
      });
  });
}