variable "region" {
  default = "us-east-1"
}

variable "golang_lambda_image" {
  default = "779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-app:latest"
}

variable "nodejs_lambda_image" {
  default = "779882487479.dkr.ecr.us-east-1.amazonaws.com/nodejs-app:latest"
}
