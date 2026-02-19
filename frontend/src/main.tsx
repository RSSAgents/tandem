import '@mantine/core/styles.css';
import { store } from '@store/index.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';
import MantineProviderWrapper from './providers/MantineProviderWrapper.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProviderWrapper>
        <App />
      </MantineProviderWrapper>
    </Provider>
  </StrictMode>,
);
