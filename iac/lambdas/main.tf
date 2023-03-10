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

module "js_lambda" {
  source                     = "terraform-aws-modules/lambda/aws"
  function_name              = "js-lambda"
  description                = "Benchmark js lambda"
  create_package             = false
  image_uri                  = var.js_lambda_image
  package_type               = "Image"
  create_lambda_function_url = true
}
