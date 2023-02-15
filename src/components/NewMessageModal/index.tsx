import { useState } from 'react';
import { Toast, useDisclosure } from '@chakra-ui/react';

import { Content } from './content';
import { createMessage } from '@/fakeApi';
import { IMessage } from '../../common/types';

type Props = {
  button?: React.ReactElement;
  setMessages?: React.Dispatch<React.SetStateAction<IMessage[]>>;
};

export default function NewMessageModal({ button, setMessages }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [subject, setSubject] = useState('');
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');

  const [sending, setSending] = useState(false);

  const handleSendMessage = async (): Promise<void> => {
    setSending(true);

    try {
      const { data } = await createMessage({
        user: {
          email: recipient,
        },
        message: content,
        subject,
      });

      if (setMessages) setMessages((prev) => [...prev, data]);

      setRecipient('');
      setContent('');
      setSubject('');
      onClose();

      Toast({
        status: 'success',
        title: 'Message sent successfully',
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      Toast({
        status: 'error',
        title: 'It seems that something went wrong',
      });
    }
    setSending(false);
  };

  const handleTypeSubject = (inputSubject: string) => {
    setSubject(inputSubject);
  };

  const handleTypeRecipient = (inputRecipient: string) => {
    setRecipient(inputRecipient);
  };

  const handleTypeContent = (inputContent: string) => {
    setContent(inputContent);
  };

  return (
    <Content
      button={button}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      sending={sending}
      subject={subject}
      recipient={recipient}
      content={content}
      onTypeSubject={handleTypeSubject}
      onTypeRecipient={handleTypeRecipient}
      onTypeContent={handleTypeContent}
      onSendMessage={handleSendMessage}
    />
  );
}
