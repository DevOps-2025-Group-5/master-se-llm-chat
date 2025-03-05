data "aws_vpc" "default" {
  default = true
}


# Network setup
resource "aws_default_subnet" "default_az1" {
  availability_zone = var.az1
}

# Key pair setup
resource "tls_private_key" "tf_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "tf_keypair" {
  key_name   = var.keypair_name
  public_key = tls_private_key.tf_key.public_key_openssh
}

output "private_key_pem" {
  value     = tls_private_key.tf_key.private_key_pem
  sensitive = true
}

# Security group and rules setup
resource "aws_security_group" "http_sg" {
  name        = "http_sg"
  description = "Allow HTTP inbound traffic and all outbound traffic"
  vpc_id      = data.aws_vpc.default.id
}

resource "aws_security_group_rule" "http_ingress" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.http_sg.id
}

resource "aws_security_group_rule" "ssh_ingress" {
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.http_sg.id
}

resource "aws_security_group_rule" "all_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.http_sg.id
}

# Instance setup
resource "aws_instance" "ChatInstance" {
  ami             = var.ami
  instance_type   = var.instance_type
  security_groups = [aws_security_group.http_sg.name]
  key_name        = var.keypair_name

  tags = {
    Name = "chat-instance"
  }
}

output "chat_public_ip" {
  value     = aws_instance.ChatInstance.public_ip
  sensitive = false
}

output "chat_public_dns" {
  value     = aws_instance.ChatInstance.public_dns
  sensitive = false
}

# Cognito configuration
resource "aws_cognito_user_pool" "chat" {
  name = "chat-user-pool"
}

resource "aws_cognito_user_pool_client" "tf_up_client" {
  name                          = "tf-userpool_client"
  user_pool_id                  = aws_cognito_user_pool.chat.id
  supported_identity_providers  = ["COGNITO"]
  explicit_auth_flows           = ["ALLOW_USER_SRP_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_PASSWORD_AUTH"]
  generate_secret               = false
  prevent_user_existence_errors = "LEGACY"
  refresh_token_validity        = 1
  access_token_validity         = 1
  id_token_validity             = 1
  token_validity_units {
    refresh_token = "hours"
    access_token  = "hours"
    id_token      = "hours"
  }

}
