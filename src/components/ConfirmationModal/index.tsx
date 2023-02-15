import { ReactElement, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
  HStack,
} from '@chakra-ui/react';
import { IoAlertCircleOutline } from 'react-icons/io5';

interface Props {
  button?: ReactElement;
  action: () => Promise<void>;
  isDisabled?: boolean;
}

function DangerConfirmation({
  button,
  action,
  isDisabled,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const submit = async (): Promise<void> => {
    setLoading(true);

    await action();

    setLoading(false);
    onClose();
  };
  return (
    <>
      <Box
        onClick={
          isDisabled
            ? () => undefined
            : (e) => {
              e.stopPropagation();
              onOpen();
            }
        }
        display="inline-block"
      >
        {button || <Button>Open Modal</Button>}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-testid="danger-confirmation-modal" overflow="hidden">
          <ModalHeader fontWeight="400" bg="red.50" color="red.500">
            <HStack>
              <Box
                display="inline-block"
                p="4px"
                borderRadius="100%"
                bg="red.100"
                color="red.400"
              >
                <IoAlertCircleOutline size="24px" />
              </Box>
              <Text>Confirm action</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton
            color="red.500"
            fontSize="20px"
            top="15px"
            right="15px"
            _hover={{
              bg: 'red.100',
            }}
          />
          <ModalBody>
            <Text my="24px" fontSize="18px" textAlign="center">
              Are you sure you want to do this?
              <br />
              <strong>You can not undo this action.</strong>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" isLoading={loading} onClick={submit}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DangerConfirmation;
