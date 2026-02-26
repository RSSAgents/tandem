import { router } from '@/routes/index';
import { MantineProvider } from '@mantine/core';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { theme } from './theme';

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
