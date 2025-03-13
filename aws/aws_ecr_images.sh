#!/bin/bash

RED='\e[31m'
GREEN='\e[32m'
YELLOW='\e[33m'
NC='\e[0m' # No Color

ECR_PREFIX=536697267559.dkr.ecr.eu-central-1.amazonaws.com
CHAT_API_NAME=student-llm-chat/chat-api
CLIENT_NAME=student-llm-chat/client
IMAGE_TAG=latest

CHAT_API_IMAGE_TAG=${ECR_PREFIX}/${CHAT_API_NAME}:${IMAGE_TAG}
CLIENT_IMAGE_TAG=${ECR_PREFIX}/${CLIENT_NAME}:${IMAGE_TAG}

if [ "$1" == "build" ]; then
    echo -e "${GREEN}Build docker image: ${CHAT_API_IMAGE_TAG}${NC}"
    docker build -t  ${CHAT_API_IMAGE_TAG} ../chat-api

    echo -e "${GREEN}Build docker image: ${CLIENT_IMAGE_TAG}${NC}"
    docker build -t  ${CLIENT_IMAGE_TAG} ../client
elif [ "$1" == "push" ]; then
    if docker images -q "${CHAT_API_IMAGE_TAG}"; then
        echo -e "${GREEN}Push docker image to ECR: ${CHAT_API_IMAGE_TAG}${NC}"
        docker push ${CHAT_API_IMAGE_TAG}
    else
        echo -e "${RED}Docker image ${CHAT_API_IMAGE_TAG} does not exist${NC}"
    fi

    if docker images -q "${CLIENT_IMAGE_TAG}"; then
        echo -e "${GREEN}Push docker image to ECR: ${CLIENT_IMAGE_TAG}${NC}"
        docker push ${CLIENT_IMAGE_TAG}
    else
        echo -e "${RED}Docker image ${CLIENT_IMAGE_TAG} does not exist${NC}"
    fi
elif [ "$1" == "delete" ]; then
    if docker inspect --type=image "${CHAT_API_IMAGE_TAG}" > /dev/null 2>&1; then
        echo -e "${GREEN}Delete docker image: ${CHAT_API_IMAGE_TAG}${NC}"
        docker rmi ${CHAT_API_IMAGE_TAG}
    else
        echo -e "${RED}Docker image ${CHAT_API_IMAGE_TAG} does not exist${NC}"
    fi

    if docker inspect --type=image "${CLIENT_IMAGE_TAG}" > /dev/null 2>&1; then
        echo -e "${GREEN}Delete docker image: ${CLIENT_IMAGE_TAG}${NC}"
        docker rmi ${CLIENT_IMAGE_TAG}
    else
        echo -e "${RED}Docker image ${CLIENT_IMAGE_TAG} does not exist${NC}"
    fi
else
    echo -e "${YELLOW}Usage: $0 { build | push | delete }${NC}"
    exit 1
fi
