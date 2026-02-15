import './App.css';
import '@mantine/core/styles.css';
import { Box, MantineProvider } from '@mantine/core';
import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer/Footer';

function App() {
  return (
    <>
      <MantineProvider>
        <Box component="main" className="main">
          <Header />
          <Footer />
        </Box>
      </MantineProvider>
    </>
  );
}

export default App;
