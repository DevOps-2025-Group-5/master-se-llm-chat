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

3. Create a `.env` file in the root `\` directory:

```bash
cd ..
cp .env-sample .env
```

4. Run this command in the `client` folder to add the AUTH secret

```
npx auth 
```

5. Add/modify the AUTH secret and other necessary secrets in `.env` file:

```
OPENAI_API_KEY=your key
AUTH_GITHUB_ID=your-github-auth-id
AUTH_GITHUB_SECRET=your-github-auth-secret
```

For the GitHub OAuth secret and ID, you can create a new OAuth app [here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
You can also request the key from Roman.

⚠️ Important: Make sure you don't share the keys publicly. ⚠️

6. Start the container:

```bash
docker-compose up --build
```

7. After successful build, you can migrate and seed the user database by running:

```bash
docker exec -it master-se-llm-chat-chat-client-1 sh
npm run db:reset
```

