import React from "react";
import { ChatWindow } from "../components/chat/ChatWindow";
import { auth } from "../utils/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  if (!session) {
    return redirect("/auth/signin");
  }
  return <ChatWindow session={session} />;
};

export default Home;
