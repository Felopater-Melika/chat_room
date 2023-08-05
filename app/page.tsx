import React from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Message } from "../typings";
import { getServerSession } from "next-auth/next";
import Providers from "./providers";
import redis from "../redis";

async function HomePage() {

  const messagesRes = await redis.hvals("messages");
  const messages: Message[] = messagesRes
      .map((message: any) => JSON.parse(message).message)
      .sort((a: any, b: any) => b.created_at - a.created_at);



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
