"use client";
import Image from "next/image";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const handleSendMessage = (message) => {
  console.log(message);
};

export default function Home() {
  return (
    <div className="relative h-lvh">
      <MainContainer>
        <ChatContainer>
          <MessageList></MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={handleSendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
