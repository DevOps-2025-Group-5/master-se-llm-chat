import { encode } from "next-auth/jwt";
import { v4 as uuid } from "uuid";
import { sign } from "jsonwebtoken";

const backendEntrypoint = `${process.env.BACKEND_ENTRYPOINT}:${process.env.BACKEND_PORT}`;
const secret = process.env.AUTH_SECRET;

const generateAccessToken = async (
  id: string,
  accessToken: string,
  provider: string
) => {
  if (provider === "credentials") {
    return sign({ id }, secret, { expiresIn: "1h" });
  }
  return accessToken;
};

export const sendMessage = async (message, accessToken, provider, id) => {
  try {
    const token = await generateAccessToken(id, accessToken, provider);
    console.log("Token:", token);

    const response = await fetch(`${backendEntrypoint}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newMessage: message, provider, id: id }),
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
