import React from "react";
import { Message } from "../typings";
import Image from "next/image";
import { useSession } from "next-auth/react";
import TimeAgo from "react-timeago";

type Props = {
  message: Message;
};

function MessageComponent({ message }: Props) {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;

  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      {/*<div className={`flex-shrink-0 ${isUser && "order-2"}`}>*/}
      {/*  <Image*/}
      {/*    src={message.profilePic}*/}
      {/*    alt="pfp"*/}
      {/*    height={10}*/}
      {/*    width={50}*/}
      {/*    className="rounded-full mx-z"*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <div*/}
      {/*    className={`text-[0.65rem] px-[2px] pb-[2px]  ${*/}
      {/*      isUser ? "text-blue-400 text-right" : "text-red-400 text-left"*/}
      {/*    } `}*/}
      {/*  >*/}
      {/*    {message.username}*/}
      {/*  </div>*/}
      {/*  <div className="flex items-end">*/}
      {/*    <div*/}
      {/*      className={`px-3 py-2 rounded-lg w-fit text-white ${*/}
      {/*        isUser ? "bg-blue-400 ml-auto order-2" : "bg-red-400"*/}
      {/*      }`}*/}
      {/*    >*/}
      {/*      <div>{message.message}</div>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className={`text-[0.65rem] italic px-2 text-gray-300 ${*/}
      {/*        isUser && "text-right"*/}
      {/*      }`}*/}
      {/*    >*/}
      {/*      <TimeAgo date={message.created_at} />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      hi
    </div>
  );
}

export default MessageComponent;
