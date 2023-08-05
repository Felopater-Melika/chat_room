import {NextRequest, NextResponse} from "next/server";
import redis from "../../../redis";
import {Message} from "../../../typings";

type Data = {
  messages: Message[];
};

type ErrorData = {
  body: string;
};

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.json({ body: "Method not allowed" }, { status: 405});
  }

  const messagesRes = await redis.hvals("messages");
  const messages: Message[] = messagesRes
    .map((message) => JSON.parse(message).message)
    .sort((a, b) => b.created_at - a.created_at);

  return NextResponse.json({ messages }, { status: 200 });
}
