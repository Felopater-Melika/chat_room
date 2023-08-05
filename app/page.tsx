import React from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Message } from "../typings";
import { getServerSession } from "next-auth/next";
import Providers from "./providers";
import redis from "../redis";

async function HomePage() {

    const messagesJSON = await redis.zrange("messages", 0, -1);
    const messages: Message[] = messagesJSON
        .map((message) => JSON.parse(message))
        .sort((a, b) => b.created_at - a.created_at);


  const session = await getServerSession();

  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <ChatInput session={session} />
      </main>
    </Providers>
  );
}

export default HomePage;
