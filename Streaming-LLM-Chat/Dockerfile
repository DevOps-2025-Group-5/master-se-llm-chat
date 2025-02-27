FROM python:3.11-alpine3.20

# Install build tools
RUN apk add --no-cache build-base openblas-dev

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

COPY . /usr/src/app

EXPOSE 5000

ENTRYPOINT ["python3"]

CMD ["python", "./main.py"]