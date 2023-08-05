'use client'
import React, { FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Message } from '../typings';
import { getServerSession } from 'next-auth/next';
import { fetchMessages } from '../utils/fetchMessages';
import { sendMessages } from '../utils/sendMessages';
import {useMutation, useQueryClient} from "@tanstack/react-query";

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
};

function ChatInput({ session }: Props) {
  const [input, setInput] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation(sendMessages, {
    onMutate: async (newMessage) => {
      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData<Message[]>(['messages']);

      // Optimistically update to the new value
      // @ts-ignore
      queryClient.setQueryData(['messages'], old => old ? [...old, newMessage] : [newMessage]);

      return { previousMessages };
    },
    onError: (err, newMessage, context) => {
      // Rollback to the previous value if the mutation fails
      queryClient.setQueryData(['messages'], context?.previousMessages);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages']);
    },
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    const messageToSend = input;
    setInput('');

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      // @ts-ignore
      username: session?.user?.name!,
      created_at: Date.now(),
      // @ts-ignore
      email: session?.user?.email!,
      // @ts-ignore
      profilePic: session?.user?.image!,
    };

    mutation.mutate(message);
  };

  // rest of the component
}


export default ChatInput;
