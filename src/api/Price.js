import { AlphaVantageKey as apiKey } from './Keys';

export async function getPrices(symbol) {
  return new Promise(function (resolve, reject) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    fetch(url)
      .then(resp => {
        return resp.json();
      }).then(data => {
        let allDailyPrices = Object.values(data)[1];
        let chartDates = [];
        let chartDailyClosePrices = [];
        for (let i = 0; i < 20; i++) {
          let dailyOCHLPrices = Object.values(allDailyPrices)[i];
          if (dailyOCHLPrices != undefined) {
            let date = Object.keys(allDailyPrices)[i];
            chartDates.push(date);
            let dailyClosePrice = Object.values(dailyOCHLPrices)[3];
            chartDailyClosePrices.push(parseFloat(dailyClosePrice));
          } else {
            break;
          }
        }

        let responseObject = {
          dates: chartDates,
          prices: chartDailyClosePrices.reverse(),
        }
        resolve(responseObject);
      })
      .catch(error => {
        reject({ status: 'error', error: error });
      });
  });
}