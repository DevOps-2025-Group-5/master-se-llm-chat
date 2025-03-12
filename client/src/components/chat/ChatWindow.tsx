"use client";
import { ExampleChatService } from "@chatscope/use-chat/dist/examples";
import {
  BasicStorage,
  ChatMessage,
  ChatProvider,
  Conversation,
  ConversationId,
  ConversationRole,
  IStorage,
  MessageContentType,
  Participant,
  Presence,
  TypingUsersList,
  UpdateState,
  User,
  UserStatus,
} from "@chatscope/use-chat";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { AutoDraft } from "@chatscope/use-chat/dist/enums/AutoDraft";
import { Chat } from "./Chat";
import React from "react";
import { Session } from "next-auth";

export const ChatWindow = ({ session }: { session: Session }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const loggedInUser = new User({
    id: "1",
    username: session.user.name,
    avatar: session.user.image,
    presence: new Presence({ status: UserStatus.Available, description: "" }),
    firstName: "",
    lastName: "",
    email: session.user.email,
    bio: "",
  });

  const chatAIUser = new User({
    id: "2",
    username: "AI Bot",
    avatar: "/bot.svg",
    presence: new Presence({ status: UserStatus.Available, description: "" }),
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });

  const users = [{ name: chatAIUser.username, avatar: chatAIUser.avatar }];

  const messageIdGenerator = (message) => nanoid();
  const groupIdGenerator = () => nanoid();

  const userStorage = new BasicStorage({
    groupIdGenerator,
    messageIdGenerator,
  });

  const chatAIStorage = new BasicStorage({
    groupIdGenerator,
    messageIdGenerator,
  });

  const serviceFactory = (storage, updateState) => {
    return new ExampleChatService(storage, updateState);
  };

  const chats = [
    { name: "Me", storage: userStorage },
    { name: "AI Bot", storage: chatAIStorage },
  ];

  function createConversation(id, name) {
    return new Conversation({
      id,
      participants: [
        new Participant({
          id: name,
          role: new ConversationRole([]),
        }),
      ],
      unreadCounter: 0,
      typingUsers: new TypingUsersList({ items: [] }),
      draft: "",
    });
  }

  // Add users and conversations to the states
  chats.forEach((c) => {
    users.forEach((u) => {
      if (u.name !== c.name) {
        c.storage.addUser(
          new User({
            id: u.name,
            presence: new Presence({
              status: UserStatus.Available,
              description: "",
            }),
            firstName: "",
            lastName: "",
            username: u.name,
            email: "",
            avatar: u.avatar,
            bio: "",
          })
        );

        const conversationId = nanoid();

        const myConversation = c.storage
          .getState()
          .conversations.find(
            (cv) =>
              typeof cv.participants.find((p) => p.id === u.name) !==
              "undefined"
          );
        if (!myConversation) {
          c.storage.addConversation(createConversation(conversationId, u.name));

          const chat = chats.find((chat) => chat.name === u.name);

          if (chat) {
            const hisConversation = chat.storage
              .getState()
              .conversations.find(
                (cv) =>
                  typeof cv.participants.find((p) => p.id === c.name) !==
                  "undefined"
              );
            if (!hisConversation) {
              chat.storage.addConversation(
                createConversation(conversationId, c.name)
              );
            }
          }
        }
      }
    });
  });

  return (
    <div className="relative h-lvh">
      <ChatProvider
        storage={userStorage}
        serviceFactory={serviceFactory}
        config={{
          typingThrottleTime: 250,
          typingDebounceTime: 900,
          debounceTyping: true,
          autoDraft: AutoDraft.Save | AutoDraft.Restore,
        }}
      >
        <Chat user={loggedInUser} bot={chatAIUser} />
      </ChatProvider>
    </div>
  );
};
