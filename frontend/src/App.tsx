import { appStyles } from './AppStyles';
import '@mantine/core/styles.css';
import { Box, MantineProvider } from '@mantine/core';
import { Header } from '@components/layout/Header/Header';
import { Footer } from '@components/layout/Footer/Footer';

function App() {
  return (
    <MantineProvider>
      <Box component="main" style={appStyles.main}>
        <Header />
        <Footer />
      </Box>
    </MantineProvider>
  );
}

export default App;
