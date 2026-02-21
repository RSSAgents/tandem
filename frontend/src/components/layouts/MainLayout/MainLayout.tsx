import { Outlet } from 'react-router-dom';

export const MainLayout = () => (
  <>
    <p>Header component</p>
    <Outlet />
    <p>Footer component</p>
  </>
);
