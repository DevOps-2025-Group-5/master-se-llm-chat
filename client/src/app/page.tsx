import React from "react";
import { ChatWindow } from "../components/chat/ChatWindow";
import { auth } from "../utils/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

const Home = async () => {
  const session = await auth();
  if (!session) {
    return redirect("/auth/signin");
  }
  return (
    <SessionProvider session={session}>
      <ChatWindow />
    </SessionProvider>
  );
};

export default Home;
