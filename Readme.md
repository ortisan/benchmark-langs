# Benchmarking performance

POC para comparação de performance e consumo de recursos entre:

1. Golang X Nodejs em container
2. Golang X Nodejs em lambda

## Grafana Dashboards

- [Golang](https://github.com/ortisan/benchmark-langs/grafana/golang-metrics.json)
- [Nodejs](https://github.com/ortisan/benchmark-langs/grafana/nodejs-metrics.json)

## Testes

### Golang X Nodejs Container

#### Ping

Golang Ping 500 RPS

```
(base) marcelo@marcelo-A72-LIV:~/Documents/ambiente/projetos/benchmark-langs/k6-scripts$ k6 run golang-ping.js --out json=result-golang-app.json

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: golang-ping.js
     output: json (result-golang-app.json)

  scenarios: (100.00%) 1 scenario, 500 max VUs, 5m30s max duration (incl. graceful stop):
           * constant_request_rate: 500.00 iterations/s for 5m0s (maxVUs: 100-500, gracefulStop: 30s)

WARN[0008] Insufficient VUs, reached 500 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=constant_request_rate

running (5m01.0s), 000/500 VUs, 148894 complete and 0 interrupted iterations
constant_request_rate ✓ [======================================] 000/500 VUs  5m0s  500 iters/s

     ✓ status was 200

     checks.........................: 100.00% ✓ 148894     ✗ 0     
     data_received..................: 21 MB   70 kB/s
     data_sent......................: 17 MB   57 kB/s
     dropped_iterations.............: 1107    3.677719/s
     http_req_blocked...............: avg=5.43µs   min=861ns   med=2.42µs   max=36.71ms  p(90)=7.57µs   p(95)=8.42µs  
     http_req_connecting............: avg=1.54µs   min=0s      med=0s       max=36.55ms  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=223.02µs min=91.82µs med=202.53µs max=15.15ms  p(90)=333.5µs  p(95)=371.7µs 
       { expected_response:true }...: avg=223.02µs min=91.82µs med=202.53µs max=15.15ms  p(90)=333.5µs  p(95)=371.7µs 
     http_req_failed................: 0.00%   ✓ 0          ✗ 148894
     http_req_receiving.............: avg=23.57µs  min=8.59µs  med=19.36µs  max=834.67µs p(90)=38.76µs  p(95)=48.27µs 
     http_req_sending...............: avg=16.8µs   min=3.99µs  med=10.05µs  max=2.22ms   p(90)=36.12µs  p(95)=40.22µs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=182.64µs min=74.57µs med=164.19µs max=14.91ms  p(90)=276.42µs p(95)=309.97µs
     http_reqs......................: 148894  494.661502/s
     iteration_duration.............: avg=1s       min=1s      med=1s       max=1.03s    p(90)=1s       p(95)=1s      
     iterations.....................: 148894  494.661502/s
     vus............................: 500     min=297      max=500 
     vus_max........................: 500     min=297      max=500 

```

Nodejs Ping 500 RPS

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

  scenarios: (100.00%) 1 scenario, 500 max VUs, 5m30s max duration (incl. graceful stop):
           * constant_request_rate: 500.00 iterations/s for 5m0s (maxVUs: 100-500, gracefulStop: 30s)

WARN[0006] Insufficient VUs, reached 500 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=constant_request_rate

running (5m01.0s), 000/500 VUs, 148605 complete and 0 interrupted iterations
constant_request_rate ✓ [======================================] 000/500 VUs  5m0s  500 iters/s

     ✓ status was 200

     checks.........................: 100.00% ✓ 148605     ✗ 0     
     data_received..................: 28 MB   93 kB/s
     data_sent......................: 17 MB   57 kB/s
     dropped_iterations.............: 1396    4.637832/s
     http_req_blocked...............: avg=5.74µs   min=840ns    med=2.52µs   max=39.44ms  p(90)=7.54µs   p(95)=8.37µs  
     http_req_connecting............: avg=1.84µs   min=0s       med=0s       max=39.35ms  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=349.6µs  min=128.31µs med=260.65µs max=104.4ms  p(90)=426.01µs p(95)=494.07µs
       { expected_response:true }...: avg=349.6µs  min=128.31µs med=260.65µs max=104.4ms  p(90)=426.01µs p(95)=494.07µs
     http_req_failed................: 0.00%   ✓ 0          ✗ 148605
     http_req_receiving.............: avg=25.02µs  min=9.4µs    med=20.7µs   max=4.79ms   p(90)=40.24µs  p(95)=48.86µs 
     http_req_sending...............: avg=16.72µs  min=4.24µs   med=10.43µs  max=2.4ms    p(90)=35.89µs  p(95)=39.91µs 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=307.85µs min=106.14µs med=220.24µs max=104.28ms p(90)=368.58µs p(95)=427.37µs
     http_reqs......................: 148605  493.699864/s
     iteration_duration.............: avg=1s       min=1s       med=1s       max=1.1s     p(90)=1s       p(95)=1s      
     iterations.....................: 148605  493.699864/s
     vus............................: 500     min=297      max=500 
     vus_max........................: 500     min=297      max=500 
```

#### Com chamadas de APIs

Golang 500 RPS

```sh
(base) marcelo@marcelo-A72-LIV:~/Documents/ambiente/projetos/benchmark-langs/k6-scripts$ k6 run golang-stocks.js --out json=result-golang-app-stocks.jsonclear

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: golang-stocks.js
     output: json (result-golang-app-stocks.jsonclear)

  scenarios: (100.00%) 1 scenario, 500 max VUs, 5m30s max duration (incl. graceful stop):
           * constant_request_rate: 500.00 iterations/s for 5m0s (maxVUs: 100-500, gracefulStop: 30s)

WARN[0003] Insufficient VUs, reached 500 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=constant_request_rate

running (5m01.2s), 000/500 VUs, 111375 complete and 0 interrupted iterations
constant_request_rate ✓ [======================================] 000/500 VUs  5m0s  500 iters/s

     ✗ status was 200
      ↳  99% — ✓ 111259 / ✗ 116

     checks.........................: 99.89% ✓ 111259     ✗ 116   
     data_received..................: 87 MB  288 kB/s
     data_sent......................: 13 MB  44 kB/s
     dropped_iterations.............: 38626  128.256452/s
     http_req_blocked...............: avg=7.91µs   min=854ns   med=3.68µs   max=38.81ms p(90)=8.4µs    p(95)=9.57µs  
     http_req_connecting............: avg=2.83µs   min=0s      med=0s       max=38.65ms p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=247.34ms min=26.02ms med=177.79ms max=2s      p(90)=439.98ms p(95)=571.79ms
       { expected_response:true }...: avg=245.52ms min=26.02ms med=177.72ms max=1.98s   p(90)=437.89ms p(95)=567.46ms
     http_req_failed................: 0.10%  ✓ 116        ✗ 111259
     http_req_receiving.............: avg=46.45µs  min=8.13µs  med=25.8µs   max=4.52ms  p(90)=90.86µs  p(95)=112.99µs
     http_req_sending...............: avg=21.34µs  min=3.85µs  med=16.54µs  max=2.73ms  p(90)=38.65µs  p(95)=43.79µs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=247.27ms min=25.96ms med=177.71ms max=2s      p(90)=439.89ms p(95)=571.74ms
     http_reqs......................: 111375 369.817284/s
     iteration_duration.............: avg=1.24s    min=1.02s   med=1.17s    max=3s      p(90)=1.44s    p(95)=1.57s   
     iterations.....................: 111375 369.817284/s
     vus............................: 500    min=285      max=500 
     vus_max........................: 500    min=285      max=500 

```

Nodejs 500 RPS

```sh
(base) marcelo@marcelo-A72-LIV:~/Documents/ambiente/projetos/benchmark-langs/k6-scripts$ k6 run nodejs-stocks.js --out json=result-nodejs-app-stocks.json

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: nodejs-stocks.js
     output: json (result-nodejs-app-stocks.json)

  scenarios: (100.00%) 1 scenario, 500 max VUs, 5m30s max duration (incl. graceful stop):
           * constant_request_rate: 500.00 iterations/s for 5m0s (maxVUs: 100-500, gracefulStop: 30s)

WARN[0002] Insufficient VUs, reached 500 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=constant_request_rate

running (5m01.2s), 000/500 VUs, 109669 complete and 0 interrupted iterations
constant_request_rate ✓ [======================================] 000/500 VUs  5m0s  500 iters/s

     ✓ status was 200

     checks.........................: 100.00% ✓ 109669     ✗ 0     
     data_received..................: 90 MB   300 kB/s
     data_sent......................: 13 MB   43 kB/s
     dropped_iterations.............: 40332   133.910227/s
     http_req_blocked...............: avg=9.5µs    min=1.4µs   med=3.51µs   max=45.27ms p(90)=6µs      p(95)=8.35µs  
     http_req_connecting............: avg=4.85µs   min=0s      med=0s       max=45.21ms p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=268.93ms min=25.48ms med=185.47ms max=2s      p(90)=490.99ms p(95)=615.47ms
       { expected_response:true }...: avg=268.93ms min=25.48ms med=185.47ms max=2s      p(90)=490.99ms p(95)=615.47ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 109669
     http_req_receiving.............: avg=61.21µs  min=15.05µs med=38.09µs  max=15.12ms p(90)=97.56µs  p(95)=139.78µs
     http_req_sending...............: avg=20.66µs  min=5.9µs   med=16.4µs   max=3.16ms  p(90)=34.99µs  p(95)=41.35µs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=268.85ms min=25.41ms med=185.37ms max=2s      p(90)=490.86ms p(95)=615.39ms
     http_reqs......................: 109669  364.122799/s
     iteration_duration.............: avg=1.26s    min=1.02s   med=1.18s    max=3s      p(90)=1.49s    p(95)=1.61s   
     iterations.....................: 109669  364.122799/s
     vus............................: 500     min=295      max=500 
     vus_max........................: 500     min=295      max=500 
```

### Lambdas

#### [Ciclo de Vida](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-context.html)

![image](images/lambda-lifecycle.png)

**Fase Inicial**:

- Cria ou descongela a função
- Faz download do código;
- Configura as variáveis de ambiente;
- Roda as funções de inicialização - Tudo que não pertença à função **handler**

**Fase Execução**:

- A função **handler** é executada. Só pagamos por esse tempo (Billing execution).

**Fase Desligamento**:

- Quando a função não recebe requisições por [x segundos](https://acloudguru.com/blog/engineering/how-long-does-aws-lambda-keep-your-idle-functions-around-before-a-cold-start), a lambda é desligada.

Lamdba Golang 100 RPS

```sh
running (5m30.0s), 000/500 VUs, 29110 complete and 10 interrupted iterations
constant_request_rate ✓ [======================================] 008/500 VUs  5m0s  100 iters/s

     ✗ status was 200
      ↳  87% — ✓ 25462 / ✗ 3648

     checks.........................: 87.46% ✓ 25462     ✗ 3648 
     data_received..................: 28 MB  86 kB/s
     data_sent......................: 4.8 MB 15 kB/s
     dropped_iterations.............: 880    2.666643/s
     http_req_blocked...............: avg=4.65ms   min=0s       med=8.5µs    max=7.97s    p(90)=11.52µs  p(95)=13.52µs 
     http_req_connecting............: avg=1.79ms   min=0s       med=0s       max=7.56s    p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=205.2ms  min=0s       med=202.34ms max=1.73s    p(90)=297.39ms p(95)=353.62ms
       { expected_response:true }...: avg=234.68ms min=161.96ms med=207.86ms max=1.73s    p(90)=308.47ms p(95)=362.67ms
     http_req_failed................: 12.56% ✓ 3658      ✗ 25462
     http_req_receiving.............: avg=777.72µs min=0s       med=89.85µs  max=919.1ms  p(90)=142.72µs p(95)=176.2µs 
     http_req_sending...............: avg=32.27µs  min=0s       med=38.4µs   max=408.81µs p(90)=53.74µs  p(95)=60.68µs 
     http_req_tls_handshaking.......: avg=2.83ms   min=0s       med=0s       max=2.57s    p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=204.39ms min=0s       med=202.12ms max=1.73s    p(90)=296.27ms p(95)=352.17ms
     http_reqs......................: 29120  88.241645/s
     iteration_duration.............: avg=4.97s    min=1.16s    med=1.21s    max=31.01s   p(90)=31s      p(95)=31s     
     iterations.....................: 29110  88.211342/s
     vus............................: 500    min=100     max=500
     vus_max........................: 500    min=100     max=500
```

Lambda Nodejs 100 RPS

```sh
running (5m30.0s), 000/500 VUs, 26924 complete and 18 interrupted iterations
constant_request_rate ✓ [======================================] 012/500 VUs  5m0s  100 iters/s

     ✗ status was 200
      ↳  86% — ✓ 23328 / ✗ 3596

     checks.........................: 86.64% ✓ 23328     ✗ 3596 
     data_received..................: 23 MB  69 kB/s
     data_sent......................: 4.4 MB 13 kB/s
     dropped_iterations.............: 3058   9.266587/s
     http_req_blocked...............: avg=6.89ms   min=0s       med=8.59µs   max=16.94s p(90)=11.34µs  p(95)=13.29µs 
     http_req_connecting............: avg=3.19ms   min=0s       med=0s       max=15.75s p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=341.54ms min=0s       med=222.82ms max=7.33s  p(90)=502.08ms p(95)=1.15s   
       { expected_response:true }...: avg=394.45ms min=152.59ms med=237.24ms max=7.33s  p(90)=593.6ms  p(95)=1.28s   
     http_req_failed................: 13.41% ✓ 3614      ✗ 23328
     http_req_receiving.............: avg=1.36ms   min=0s       med=90.58µs  max=2.19s  p(90)=131.64µs p(95)=155.06µs
     http_req_sending...............: avg=31.98µs  min=0s       med=38.32µs  max=1.45ms p(90)=52.24µs  p(95)=58.42µs 
     http_req_tls_handshaking.......: avg=3.59ms   min=0s       med=0s       max=1.29s  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=340.14ms min=0s       med=222.49ms max=7.33s  p(90)=495.2ms  p(95)=1.13s   
     http_reqs......................: 26942  81.641721/s
     iteration_duration.............: avg=5.35s    min=1.15s    med=1.25s    max=31.01s p(90)=31s      p(95)=31s     
     iterations.....................: 26924  81.587176/s
     vus............................: 500    min=100     max=500
     vus_max........................: 500    min=100     max=500
```

#### Report AWS

Query CloudWatch Log Insights:

```txt
filter @type = "REPORT" |
parse @message /Init Duration: (?<init>\S+)/ |
stats avg(@billedDuration) as avgBilledDuration,count() as total, count(init) as coldStarts, median(init) as avgInitDuration, max(init) as maxInitDuration, avg(@maxMemoryUsed)/1000/1000 as memoryused
```

Golang

```json
[
    {
        "avgBilledDuration": "7.2808",
        "total": "25466",
        "coldStarts": "34",
        "avgInitDuration": "82.71",
        "maxInitDuration": "710.04",
        "memoryused": "24.8359"
    }
]
```

Nodejs

```json
[
    {
        "avgBilledDuration": "39.5122",
        "total": "23330",
        "coldStarts": "109",
        "avgInitDuration": "278.9925",
        "maxInitDuration": "687.43",
        "memoryused": "117.6351"
    }
]
```

## Comandos de exemplo

```sh
aws ecr get-login-password \
        --region us-east-1 | docker login \
        --username AWS \
        --password-stdin 779882487479.dkr.ecr.us-east-1.amazonaws.com

export VERSION=latest
docker build -t golang-app .
docker tag golang-app:latest 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-app:$VERSION
docker push 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-app:$VERSION

docker run --publish 8080:8080 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-app:latest

export VERSION=latest
docker build -t nodejs-app .
docker tag nodejs-app:latest 779882487479.dkr.ecr.us-east-1.amazonaws.com/nodejs-app:$VERSION
docker push 779882487479.dkr.ecr.us-east-1.amazonaws.com/nodejs-app:$VERSION

terraform init
terraform destroy --auto-approve
terraform apply --auto-approve

k6 run golang-ping.js --out json=result-golang-app.json
k6 run nodejs-ping.js --out json=result-nodejs-app.json

k6 run golang-stocks.js --out json=result-golang-app-stocks.json
k6 run nodejs-stocks.js --out json=result-nodejs-app-stocks.json

k6 run golang-lambda-stocks.js --out json=result-golang-lambda-stocks.json
k6 run nodejs-lambda-stocks.js --out json=result-nodejs-lambda-stocks.json

k6 run golang-ping.js --out json=result-golang-app.json

```

Reports AWS
