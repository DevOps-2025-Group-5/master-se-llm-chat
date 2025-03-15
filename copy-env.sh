#!/bin/bash

# Copy .env file to chat-api and client directories
cp .env ./chat-api/.env
cp .env ./client/.env

echo ".env file copied to chat-api and client directories."