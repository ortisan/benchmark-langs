import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

// export let options = {
//   stages: [
//     { duration: '10s', target: 20, rps: 1 },
//     { duration: '10s', target: 50, rps: 1 },
//     { duration: '10s', target: 100, rps: 1 },
//   ],
// };

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '5m',
      preAllocatedVUs: 100, // how large the initial pool of VUs would be
      maxVUs: 500, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let res = http.get("https://oaq7euoio7azju4pp22o7n2bta0refuf.lambda-url.us-east-1.on.aws", params);

  sleep(1);

  // // console.log(JSON.stringify(res))
  check(res, { 'status was 200': (r) => r.status == 200 });
}