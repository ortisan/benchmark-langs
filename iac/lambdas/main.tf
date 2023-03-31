provider "aws" {
  region = var.region
}

data "aws_caller_identity" "current" {}

module "golang-lambda" {
  source                     = "terraform-aws-modules/lambda/aws"
  function_name              = "golang-lambda"
  description                = "Benchmark golang lambda"
  create_package             = false
  image_uri                  = var.golang_lambda_image
  package_type               = "Image"
  create_lambda_function_url = true
}

module "nodejs_lambda" {
  source                     = "terraform-aws-modules/lambda/aws"
  function_name              = "nodejs-lambda"
  description                = "Benchmark nodejste lambda"
  create_package             = false
  image_uri                  = var.nodejs_lambda_image
  package_type               = "Image"
  create_lambda_function_url = true
}
