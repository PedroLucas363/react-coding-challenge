import { useEffect, useState } from 'react';
import Head from 'next/head';
import { BiTrashAlt } from 'react-icons/bi';
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  Spinner,
  IconButton,
  Th,
  Select,
  useToast,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import Template from '@/components/Template';
import { IMessage } from '@/common/types';
import { listMessages, removeMessage } from '@/fakeApi';

import DangerConfirmation from '@/components/ConfirmationModal';
import MessageModal from '@/components/MessageModal';
import NewMessageModal from '@/components/NewMessageModal/index';

export default function Home() {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      setLoading(true);
      const { data } = await listMessages();

      setMessages(data);
      setLoading(false);
    };
    getData();
  }, []);

  const convertAmPm = (date: string): string => {
    const dt = new Date(date);
    let hours = dt.getHours();
    const AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    const minutes = dt.getMinutes();
    const finalTime = `${hours}:${minutes} ${AmOrPm}`;
    return finalTime;
  };

  const [removingId, setRemovingId] = useState<string>();
  const handleRemoveMessage = async (message: IMessage): Promise<void> => {
    setRemovingId(message._id);
    await removeMessage(message._id);

    setMessages(messages.filter((m) => m._id !== message._id));
    setRemovingId(undefined);

    toast({
      status: 'success',
      title: 'Message removed successfully',
    });
  };

  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const maxPerPage = 5;

  useEffect(() => {
    if (messages) setPages(Math.ceil(messages.length / maxPerPage));
  }, [messages]);

  useEffect(() => {
    if (pages === 0) return;

    if (pages - 1 < page) {
      setPage(pages - 1);
    }
  }, [pages]);

  const [selectedMessage, setSelectedMessage] = useState<IMessage>();
  const [messageIsOpen, setMessageIsOpen] = useState(false);

  useEffect(() => {
    if (selectedMessage) {
      setMessageIsOpen(true);
      return;
    }

    setMessageIsOpen(false);
  }, [selectedMessage]);

  const renderMessages = () => (
    <Table>
      <Thead>
        <Tr>
          <Th>User</Th>
          <Th>Subject</Th>
          <Th>Date</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {messages
          .slice(page * maxPerPage, page * maxPerPage + maxPerPage)
          .map((message) => (
            <Tr
              key={message._id}
              cursor="pointer"
              _hover={{ bg: 'gray.50' }}
              onClick={() => setSelectedMessage(message)}
            >
              <Td>
                <HStack spacing="16px">
                  <Avatar name={message.user.email} />
                  <Text>{message.user.email}</Text>
                </HStack>
              </Td>
              <Td w="100%" fontWeight="600">
                {message.subject}
              </Td>
              <Td whiteSpace="nowrap">
                {message.createdAt.substring(0, 10)}
                {' '}
                at
                {' '}
                {convertAmPm(message.createdAt)}
              </Td>
              <Td>
                <DangerConfirmation
                  button={(
                    <IconButton
                      colorScheme="red"
                      aria-label="remove"
                      icon={<BiTrashAlt />}
                      isLoading={removingId === message._id}
                      size="sm"
                    />
                  )}
                  action={() => handleRemoveMessage(message)}
                />
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );

  return (
    <>
      <Head>
        <title>RBR Test</title>
      </Head>
      <Template>
        <MessageModal
          isOpen={messageIsOpen}
          onClose={() => setSelectedMessage(undefined)}
          message={selectedMessage}
          remove={handleRemoveMessage}
        />
        <HStack justifyContent="space-between" mb="24px">
          <Heading as="h2" fontSize="24px">
            Messages
          </Heading>
          <Box>
            <NewMessageModal
              button={<Button colorScheme="blue">New Message</Button>}
              setMessages={setMessages}
            />
          </Box>
        </HStack>
        {loading ? <Spinner /> : renderMessages()}

        {!loading && (
          <HStack justifyContent="flex-end" mt="24px">
            <Text>Page</Text>
            <Select
              w="90px"
              value={page}
              onChange={(e) => setPage(parseInt(e.target.value, 10))}
            >
              {Array.from({
                length: pages,
              }).map((_el, index) => (
                <option key={uuidv4()} value={index}>
                  {index + 1}
                </option>
              ))}
            </Select>
          </HStack>
        )}
      </Template>
    </>
  );
}
