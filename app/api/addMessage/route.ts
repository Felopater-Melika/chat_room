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
    return NextResponse.json({ body: "Method Not Allowed" }, { status: 405 })
  }

  const message = await request.json()

  const newMessage = {
    ...message,
    created_at: Date.now(),
  };

  console.log('in add',newMessage)

  await redis.hset("messages", message.id, JSON.stringify(newMessage));
  await serverPusher.trigger("messages", "new-message", newMessage);

  NextResponse.json({ message: newMessage }, { status: 200 });
}
