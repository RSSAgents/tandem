import { Outlet } from 'react-router-dom';

export const RootLayout = () => (
  <>
    <p>Header - will Header component</p>
    <Outlet />
    <p>Footer - will Footer component</p>
  </>
);
