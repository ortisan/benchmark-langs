build-ecs:
	VERSION=latest
	docker build -t golang-app .
	docker tag golang-app:latest 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-app:$VERSION
	docker push 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-app:$VERSION

	# cd apps/golang
	# VERSION=latest
	# docker build -t golang-app .
	# docker tag  golang-app:latest 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-lambda:$VERSION
	# docker push 779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-lambda:$VERSION