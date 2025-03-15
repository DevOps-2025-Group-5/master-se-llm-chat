const backendEntrypoint = `${process.env.BACKEND_ENTRYPOINT}:${process.env.BACKEND_PORT}`;

export const sendMessage = async (message, accessToken, provider) => {
  try {
    console.log("Access Token:", accessToken);
    const response = await fetch(`${backendEntrypoint}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ newMessage: message, provider }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response:", data);
    return data.message.answer;
  } catch (error) {
    console.error("Error:", error);
    return "Internal Server Error";
  }
};
