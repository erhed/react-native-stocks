import { YahooKey as apiKey } from './Keys';

export async function getInformation(symbol) {
  return new Promise(function (resolve, reject) {
    fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail?region=US&lang=en&symbol=${symbol}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": `${apiKey}`,
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