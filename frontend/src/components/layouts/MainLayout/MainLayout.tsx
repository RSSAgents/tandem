import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <p>Footer component</p>
  </>
);
