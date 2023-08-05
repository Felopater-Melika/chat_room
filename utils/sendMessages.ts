import axios from 'axios';
import { Message } from '../typings';

export const sendMessages = async (message: Message): Promise<Message[]> => {
    const { data } = await axios.post('/api/addMessage', { message });
    return data.message;
};
