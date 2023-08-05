'use client';
import React, { useEffect } from "react";
import { Message } from "../typings";
import { clientPusher } from "../pusher";
import { fetchMessages } from "../utils/fetchMessages";
import MessageComponent from "./MessageComponent";
import {useQuery} from "@tanstack/react-query";

type Props = {
  initialMessages: Message[];
};

function MessageList({ initialMessages }: Props) {
  const {
    data: messages,
    error,
    refetch,
    isFetching
  } = useQuery<Message[]>(['messages'], fetchMessages);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", (data: Message) => {
      if (messages?.find((message: Message) => message.id === data.id)) return;

      console.log("new message", data);

      refetch();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [ refetch]);

  return (
      <div className="space-y-5 px-5 pt-8 pb-32 ">
        {(messages || initialMessages).map((message) => (
            <MessageComponent message={message} key={message.id} />
        ))}
      </div>
  );
}

export default MessageList;
