import {
  Avatar,
  Button,
  Heading,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { IMessage } from '@/common/types';
import DangerConfirmation from '@/components/ConfirmationModal';

interface Props {
  message: IMessage | undefined;
  isOpen: boolean;
  onClose: () => void;
  remove: (message: IMessage) => Promise<void>;
}

export default function MessageModal({
  message,
  isOpen,
  onClose,
  remove,
}: Props) {
  const handleRemove = async (): Promise<void> => {
    if (!message) return;

    await remove(message);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="500px">
        <ModalHeader>
          <HStack spacing="16px">
            <Avatar name={message?.user.email} />
            <Text>{message?.user.email}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading as="h2" fontSize="20px">
            {message?.subject}
          </Heading>
          <Text mt="24px">{message?.message}</Text>
        </ModalBody>

        <ModalFooter mt="32px">
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <DangerConfirmation
            action={handleRemove}
            button={<Button colorScheme="red">Remove message</Button>}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
