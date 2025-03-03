provider "aws" {
  region = "eu-central-1"
}

data "aws_vpc" "default" {
  default = true
}

resource "aws_default_subnet" "default_az1" {
  availability_zone = "eu-central-1a"
}
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

resource "aws_instance" "ChatInstance" {
  ami             = "ami-07eef52105e8a2059"
  instance_type   = "t2.micro"
  security_groups = [aws_security_group.http_sg.name]
  key_name        = "AnsibleKeyPair"

  tags = {
    Name = "chat-instance"
  }
}
