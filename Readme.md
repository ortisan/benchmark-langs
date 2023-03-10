
aws ecr get-login-password \
        --region us-east-1 | docker login \
        --username AWS \
        --password-stdin 779882487479.dkr.ecr.us-east-1.amazonaws.com

VERSION=2
docker build -t golang-lambda .
docker tag  golang-lambda:latest 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-lambda:$VERSION
docker push 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-lambda:$VERSION

VERSION=8
docker build -t js-lambda .
docker tag js-lambda:latest 779882487479.dkr.ecr.us-east-1.amazonaws.com/js-lambda:$VERSION
docker push 779882487479.dkr.ecr.us-east-1.amazonaws.com/js-lambda:$VERSION

terraform init
terraform destroy --auto-approve
terraform apply --auto-approve

k6 run go-get.js
