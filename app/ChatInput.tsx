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

  return (
      <form
          onSubmit={sendMessage}
          className='fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100 bg-gray-900'
      >
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter message here...'
            disabled={!session}
            type='text'
            className='flex-1 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed'
        />
        <button
            type='submit'
            disabled={!input}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Send
        </button>
      </form>
  );
}

export default ChatInput;
