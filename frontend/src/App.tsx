import { router } from '@/routes/index';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import './globals.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
