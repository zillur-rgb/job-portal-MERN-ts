import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { chakraTheme } from './styles/theme.ts';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={chakraTheme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChakraProvider>
    </BrowserRouter>
  </Provider>,
);
