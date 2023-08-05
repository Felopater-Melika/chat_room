import {Message} from "../../../typings";
import {NextRequest, NextResponse} from "next/server";
import redis from "../../../redis";
import {serverPusher} from "../../../pusher";

type Data = {
  message: Message;
};

type ErrorData = {
  body: string;
};

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json({ body: "Method Not Allowed" }, { status: 405 });
  }

  const { message } = await request.json();
  const newMessage = {
    ...message,
    created_at: Date.now(),
  };

  console.log('in add', newMessage);

  // Use the timestamp as the score and the JSON string of the message as the member in the sorted set.
  await redis.zadd("messages", newMessage.created_at.toString(), JSON.stringify(newMessage));

  await serverPusher.trigger("messages", "new-message", newMessage);

  return NextResponse.json({ message: newMessage }, { status: 200 });
}
