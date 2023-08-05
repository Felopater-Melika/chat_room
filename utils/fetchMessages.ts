import axios from "axios";
import { Message } from "../typings";

export const fetchMessages = async (): Promise<Message[]> => {
  const res = await axios.get("/api/getMessages");
  return res.data.messages;
};
