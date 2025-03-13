const authorizeGitHub = async (accessToken, clientId, clientSecret) => {
  const response = await fetch(
    `https://api.github.com/applications/${clientId}/token`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: accessToken,
      }),
    }
  );
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error("Authorization failed");
  }
  return data;
};
