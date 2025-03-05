variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-central-1"
}

variable "az1" {
  description = "AWS region"
  type        = string
  default     = "eu-central-1a"
}

variable "ami" {
  description = "AWS AMI string (region specific)"
  type        = string
  default     = "ami-07eef52105e8a2059"
}

variable "instance_type" {
  description = "AWS EC2 instance type (default is free tier eligible)"
  type        = string
  default     = "t2.micro"
}

variable "keypair_name" {
  description = "Name of existing keypair to use in EC2 instance"
  type        = string
  default     = "terraform_key_pair"
}
