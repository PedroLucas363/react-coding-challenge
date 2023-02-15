import { Box, Flex } from '@chakra-ui/react';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      bg="gray.50"
      p="24px"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Box
        bg="white"
        p="32px"
        borderRadius="10px"
        maxW="100%"
        w="1200px"
        boxShadow="2px 2px 20px rgba(0, 0, 0, 0.05)"
      >
        {children}
      </Box>
    </Flex>
  );
}
