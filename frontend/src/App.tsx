import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer/Footer';

function App() {
  return (
    <>
      <MantineProvider>
        <div className="main">
          <Header />
          <Footer />
        </div>
      </MantineProvider>
    </>
  );
}

export default App;
