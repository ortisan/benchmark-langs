# Benchmarking performance

POC para comparação de performance e consumo de recursos entre:

1. Golang X Nodejs em container
2. Golang X Nodejs em lambda
3. Arquitetura de lambda Arm X X66

## Grafana Dashboards

- [Nodejs](https://grafana.com/grafana/dashboards/13978-node-exporter-quickstart-and-dashboard/?pg=blog&plcmt=body-txt)
- [Golang]

## Testes

### Golang X Nodejs Container

Golang 500rps

```
langs/k6-scripts$ k6 run golang-ping.js --out json=result-golang-app.json

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: golang-ping.js
     output: json (result-golang-app.json)

  scenarios: (100.00%) 1 scenario, 200 max VUs, 5m30s max duration (incl. graceful stop):
           * constant_request_rate: 500.00 iterations/s for 5m0s (maxVUs: 100-200, gracefulStop: 30s)

WARN[0000] Insufficient VUs, reached 200 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=constant_request_rate

running (5m01.0s), 000/200 VUs, 59875 complete and 0 interrupted iterations
constant_request_rate ✓ [=============] 000/200 VUs  5m0s  500 iters/s

     ✓ status was 200

     checks.........................: 100.00% ✓ 59875      ✗ 0    
     data_received..................: 8.4 MB  28 kB/s
     data_sent......................: 6.9 MB  23 kB/s
     dropped_iterations.............: 90125   299.419425/s
     http_req_blocked...............: avg=3.41µs   min=919ns    med=2.55µs   max=4.29ms   p(90)=4.84µs   p(95)=5.92µs  
     http_req_connecting............: avg=265ns    min=0s       med=0s       max=3.92ms   p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=278.34µs min=102.29µs med=255.02µs max=10.45ms  p(90)=412.48µs p(95)=469.78µs
       { expected_response:true }...: avg=278.34µs min=102.29µs med=255.02µs max=10.45ms  p(90)=412.48µs p(95)=469.78µs
     http_req_failed................: 0.00%   ✓ 0          ✗ 59875
     http_req_receiving.............: avg=32.74µs  min=9.75µs   med=27.94µs  max=8.38ms   p(90)=53.93µs  p(95)=64.19µs 
     http_req_sending...............: avg=13.92µs  min=4.38µs   med=11.52µs  max=385.05µs p(90)=24.16µs  p(95)=31.13µs 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=231.67µs min=81.59µs  med=212.27µs max=10.3ms   p(90)=344.54µs p(95)=393.46µs
     http_reqs......................: 59875   198.920811/s
     iteration_duration.............: avg=1s       min=1s       med=1s       max=1.01s    p(90)=1s       p(95)=1s      
     iterations.....................: 59875   198.920811/s
     vus............................: 200     min=200      max=200
     vus_max........................: 200     min=200      max=200

```

Nodejs 500 RPS

```sh

(base) marcelo@marcelo-A72-LIV:~/Documents/ambiente/projetos/benchmark-langs/k6-scripts$ k6 run nodejs-ping.js --out json=result-nodejs-app.json

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: nodejs-ping.js
     output: json (result-nodejs-app.json)

  scenarios: (100.00%) 1 scenario, 200 max VUs, 5m30s max duration (incl. graceful stop):
           * constant_request_rate: 500.00 iterations/s for 5m0s (maxVUs: 100-200, gracefulStop: 30s)

WARN[0000] Insufficient VUs, reached 200 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=constant_request_rate

running (5m00.6s), 000/200 VUs, 59800 complete and 0 interrupted iterations
constant_request_rate ✓ [======================================] 000/200 VUs  5m0s  500 iters/s

     ✓ status was 200

     checks.........................: 100.00% ✓ 59800      ✗ 0    
     data_received..................: 11 MB   38 kB/s
     data_sent......................: 6.9 MB  23 kB/s
     dropped_iterations.............: 90201   300.113477/s
     http_req_blocked...............: avg=4.34µs   min=866ns    med=2.75µs   max=3.7ms   p(90)=7.74µs   p(95)=8.93µs  
     http_req_connecting............: avg=265ns    min=0s       med=0s       max=3.62ms  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=381µs    min=128.49µs med=305.09µs max=42.98ms p(90)=577.84µs p(95)=761.5µs 
       { expected_response:true }...: avg=381µs    min=128.49µs med=305.09µs max=42.98ms p(90)=577.84µs p(95)=761.5µs 
     http_req_failed................: 0.00%   ✓ 0          ✗ 59800
     http_req_receiving.............: avg=32.77µs  min=9.73µs   med=24.29µs  max=9.02ms  p(90)=56.54µs  p(95)=75.88µs 
     http_req_sending...............: avg=18.19µs  min=4.27µs   med=12.13µs  max=10.97ms p(90)=37.11µs  p(95)=42.48µs 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=330.03µs min=111.24µs med=259.26µs max=42.85ms p(90)=503.6µs  p(95)=663.72µs
     http_reqs......................: 59800   198.964379/s
     iteration_duration.............: avg=1s       min=1s       med=1s       max=1.04s   p(90)=1s       p(95)=1s      
     iterations.....................: 59800   198.964379/s
     vus............................: 200     min=200      max=200
     vus_max........................: 200     min=200      max=200

```

## Comandos de exemplo

```sh
aws ecr get-login-password \
        --region us-east-1 | docker login \
        --username AWS \
        --password-stdin 779882487479.dkr.ecr.us-east-1.amazonaws.com

VERSION=latest
docker build -t golang-app .
docker tag golang-app:latest 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-app:$VERSION
docker push 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-app:$VERSION

docker run --publish 8080:8080 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-app:latest

VERSION=latest
docker build -t nodejs-app .
docker tag nodejs-app:latest 779882487479.dkr.ecr.us-east-1.amazonaws.com/nodejs-app:$VERSION
docker push 779882487479.dkr.ecr.us-east-1.amazonaws.com/nodejs-app:$VERSION

docker run --publish 8080:8080 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-app:latest

VERSION=1
docker build -t golang-lambda .
docker tag  golang-lambda:latest 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-lambda:$VERSION
docker push 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-lambda:$VERSION

VERSION=1
docker build -t js-lambda .
docker tag js-lambda:latest 779882487479.dkr.ecr.us-east-1.amazonaws.com/js-lambda:$VERSION
docker push 779882487479.dkr.ecr.us-east-1.amazonaws.com/js-lambda:$VERSION

terraform init
terraform destroy --auto-approve
terraform apply --auto-approve

k6 run golang-ping.js --out json=result-golang-app.json
k6 run nodejs-ping.js --out json=result-nodejs-app.json


```sh
