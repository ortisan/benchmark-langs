const Fastify = require('fastify');
const otelSDK = require('./tracing');
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });


const stocks = {
  "ITSA4.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=ITSA4.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
  // "PETR4.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=PETR4.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
  // "MGLU3.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=MGLU3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
  // "VALE3.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=VALE3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
  // "PRIO3.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=PRIO3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
}


// Start SDK before nestjs factory create
otelSDK.start();

const fastify = Fastify({
  logger: true
})

fastify.get('/ping', function (request, reply) {
  reply.send({ message: 'pong' })
})

fastify.get('/stocks', async function (request, reply) {
  let mapStocksPromises = Object.keys(stocks).map(async (code) => {
    const res = await fetch(stocks[code]);
    return await res.json();
  });
  const stocksResponses = await Promise.all(mapStocksPromises);
  reply.send({ stocksDetails: stocksResponses })
})

fastify.get('/healthcheck', function (request, reply) {
  reply.send({ status: 'up' })
})

fastify.get('/metrics', async (req, reply) => {
  try {
    reply.header('Content-Type', register.contentType);
    let metrics = await register.metrics()
    reply.send(metrics);
  } catch (ex) {
    reply.statusCode = 500
    reply.send(ex);
  }
});

fastify.listen({ port: 8081, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})

