import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: process.env.APP_ID!,
  key: process.env.KEY!,
  secret: process.env.SECRET!,
  cluster: "us2",
  useTLS: true,
});

export const clientPusher = new ClientPusher("e1ad3a3a03b6ca1d8c09", {
  cluster: "us2",
  forceTLS: true,
});
