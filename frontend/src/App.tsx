
import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Header } from './components/layout/Header';

function App() {

  return (
    <>
      <MantineProvider>
        <div>
          <Header/>
        </div>
      </MantineProvider>
    </>
  )
}

export default App;
