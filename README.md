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
cd ..
cp chat-api/.env-sample chat-api/.env
```

4. Add your OpenAI API key to the `.env` file:

```
OPENAI_API_KEY=your-api-key
```

5. Start the API server:

```bash
cd chat-api
npm run start
```

6. Start the db server:

```bash
docker-compose up -d
```

7. Start the client:

```bash
cd ..
cd client
npm run dev
```

8. Migrate the database:

```bash
cd ..
cd chat-api/sqldata
docker exec -it chat-api-db-1 mysql -u chatuser -pchatpassword
```

```sql
CREATE DATABASE chatdb;
exit
```

```bash
docker exec -i chat-api-db-1 mysql -u chatuser -pchatpassword chatdb < chatdb.sql
```

