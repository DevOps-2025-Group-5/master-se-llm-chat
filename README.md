# master-se-llm-chat

## Setup

1. Install [Node.js](https://nodejs.org/en/download/)
2. Install the dependencies by running

```bash
cd client
npm install
cd ../chat-api
npm install
```

3. Create a `.env` file in the `chat-api`:

```bash
cp .env-sample .env
```

4. Add your OpenAI API key to the `.env` file:

```
OPENAI_API_KEY=your-api-key
```

5. Start the backend server:

```bash
docker-compose up -d
```

6. Start the frontend server:

```bash
cd ../client
npm run dev
```
