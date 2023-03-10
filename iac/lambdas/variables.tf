variable "region" {
  default = "us-east-1"
}

variable "golang_lambda_image" {
  default = "779882487479.dkr.ecr.us-east-1.amazonaws.com/golang-lambda:2"
}

variable "js_lambda_image" {
  default = "779882487479.dkr.ecr.us-east-1.amazonaws.com/js-lambda:8"
}
