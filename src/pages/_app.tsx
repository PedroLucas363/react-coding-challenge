import { useEffect } from 'react';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { startFakeApi } from '@/fakeApi';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    startFakeApi();
  }, []);

  return (
    <ChakraProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
