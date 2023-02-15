import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
} from '@chakra-ui/react';

type Props = {
  button?: React.ReactElement;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  sending: boolean;
  subject: string;
  recipient: string;
  content: string;
  onTypeSubject: (input: string) => void;
  onTypeRecipient: (input: string) => void;
  onTypeContent: (input: string) => void;
  onSendMessage: () => Promise<void>;
};

export function Content({
  button,
  isOpen,
  onClose,
  onOpen,
  sending,
  subject,
  recipient,
  content,
  onTypeSubject,
  onTypeRecipient,
  onTypeContent,
  onSendMessage,
}: Props) {
  return (
    <>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        display="inline-block"
      >
        {button || <Button>Open Modal</Button>}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="800px">
          <ModalHeader>New message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="24px">
              <FormLabel>Subject</FormLabel>
              <Input
                value={subject}
                onChange={(e) => onTypeSubject(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Recipient</FormLabel>
              <Input
                value={recipient}
                onChange={(e) => onTypeRecipient(e.target.value)}
                placeholder="someone@mail.com"
              />
            </FormControl>
            <FormControl mt="24px">
              <FormLabel>My message</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => onTypeContent(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={onSendMessage}
              isDisabled={!subject || !recipient || !content}
              colorScheme="blue"
              isLoading={sending}
            >
              Send message
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
