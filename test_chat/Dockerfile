FROM python:3.11-alpine3.20

# Install build tools
RUN apk add --no-cache build-base openblas-dev rust cargo

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

COPY . /usr/src/app

EXPOSE 5000

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]