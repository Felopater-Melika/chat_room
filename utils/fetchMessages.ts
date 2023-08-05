import axios from "axios";
import { Message } from "../typings";

export const fetchMessages = async (): Promise<Message[]> => {
  const res = await axios.get("/api/getMessages");
  console.log('in fetcher',res.data.messages)
  return res.data.messages;
};
