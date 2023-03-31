
const stocks = {
  "ITSA4.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=ITSA4.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
  // "PETR4.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=PETR4.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
  // "MGLU3.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=MGLU3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
  // "VALE3.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=VALE3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
  // "PRIO3.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=PRIO3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
}

exports.handler = async function (event, context) {
  let mapStocksPromises = Object.keys(stocks).map(async (code) => {
    const res = await fetch(stocks[code]);
    return await res.json();
  });
  const stocksResponses = await Promise.all(mapStocksPromises);
  return stocksResponses;
};