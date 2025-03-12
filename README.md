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

4. Add your OpenAI API key and GitHub OAuth to the `.env` file:

```
OPENAI_API_KEY=your-api-key
AUTH_GITHUB_SECRET=[your-github-auth-secret]
```

For the GitHub OAuth secret, you can create a new OAuth app [here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
You can also request the key from Roman.

⚠️ Important: Make sure you don't share the keys publicly. ⚠️

1. Start the container:

```bash
docker-compose up -build
```

