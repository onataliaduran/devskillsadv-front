import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { MembersProvider } from './context/MembersContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <MembersProvider>
        <App />
      </MembersProvider>
    </ChakraProvider>
  </React.StrictMode>
);
