const Fastify = require('fastify');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { FastifyInstrumentation } = require('@opentelemetry/instrumentation-fastify');


const stocks = {
  "ITSA4.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=ITSA4.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
  "PETR4.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=PETR4.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
  "MGLU3.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=MGLU3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
  "VALE3.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=VALE3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
  "PRIO3.SA": "https://query1.finance.yahoo.com/v7/finance/quote?symbols=PRIO3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US",
}

const fastify = Fastify({
  logger: true
})

registerInstrumentations({
  instrumentations: [
    // Fastify instrumentation expects HTTP layer to be instrumented
    new HttpInstrumentation(),
    new FastifyInstrumentation(),
  ],
});

fastify.get('/ping', function (request, reply) {
  reply.send({ message: 'pong' })
})

fastify.get('/stocks', async function (request, reply) {
  let mapStocksPromises = Object.keys(stocks).map(async (code) => {
    const res = await fetch(stocks[code]);
    return await res.json();
  });
  const stocksResponses = await Promise.all(mapStocksPromises);
  reply.send({ stockdatas: stocksResponses })
})

fastify.get('/healthcheck', function (request, reply) {
  reply.send({ status: 'up' })
})

fastify.listen({ port: 8081, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
