import { v4 as uuidv4 } from 'uuid';
import { IMessage, IMessagePayload } from '@/common/types';

export const startFakeApi = (): void => {
  if (localStorage.getItem('messages')) return;

  localStorage.setItem('messages', JSON.stringify([
    {
      _id: uuidv4(),
      user: {
        email: 'john@doe.com',
      },
      message: 'Just saying happy new year to all my loved friends.',
      subject: 'Happy new Year',
      createdAt: '2023-01-01T03:45:20',
    },
    {
      _id: uuidv4(),
      user: {
        email: 'jen@aniston.com',
      },
      message: 'Just saying happy new year to all my loved friends.',
      subject: 'Happy new Year',
      createdAt: '2023-01-01T01:23:20',
    },
    {
      _id: uuidv4(),
      user: {
        email: 'john@doe.com',
      },
      message: 'Just saying merry christmas to all my loved friends.',
      subject: 'Merry Christmas',
      createdAt: '2022-12-25T15:03:25',
    },
  ]));
};

const getMessagesFromStorage = (): IMessage[] => {
  const savedMessages = localStorage.getItem('messages');
  const parsedMessages = savedMessages ? JSON.parse(savedMessages) : [];

  return parsedMessages;
};
const setMessagesInStorage = (messages: IMessage[]): void => {
  localStorage.setItem('messages', JSON.stringify(messages));
};

const simulateLoading = async (): Promise<void> => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export const listMessages = async (): Promise<{ data: IMessage[] }> => {
  await simulateLoading();

  const savedMessages = localStorage.getItem('messages');
  const parsedMessages = savedMessages ? JSON.parse(savedMessages) : [];

  return { data: parsedMessages };
};

export const createMessage = async (message: IMessagePayload): Promise<{ data: IMessage }> => {
  await simulateLoading();

  const newMessage = {
    ...message,
    _id: uuidv4(),
    createdAt: new Date().toISOString(),
  };

  const messages = getMessagesFromStorage();
  messages.push(newMessage);
  setMessagesInStorage(messages);

  return { data: newMessage };
};

export const getMessage = async (messageId: string): Promise<IMessage | undefined> => {
  await simulateLoading();

  const messages = getMessagesFromStorage();

  return messages.find((m) => m._id === messageId);
};

export const removeMessage = async (messageId: string): Promise<boolean> => {
  await simulateLoading();

  let messages = getMessagesFromStorage();
  const initialLength = messages.length;

  messages = messages.filter((m) => m._id !== messageId);

  if (messages.length === initialLength) return false;

  setMessagesInStorage(messages);

  return true;
};
