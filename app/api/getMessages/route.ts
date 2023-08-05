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

  const messagesJSON = await redis.zrange("messages", 0, -1);
  const messages: Message[] = messagesJSON
      .map((message) => JSON.parse(message))
      .sort((a, b) => b.created_at - a.created_at);


  console.log('in get', messages);

  return NextResponse.json({ messages }, { status: 200 });
}
