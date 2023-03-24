const  Fastify = require('fastify');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { FastifyInstrumentation } = require('@opentelemetry/instrumentation-fastify');

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
