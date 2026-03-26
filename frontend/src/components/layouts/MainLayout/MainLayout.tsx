import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { LAYOUT_CONFIG } from '../../../constants/layout';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import classes from './MainLayout.module.css';

export const MainLayout = () => {
  return (
    <AppShell
      layout="alt"
      header={{ height: LAYOUT_CONFIG.HEADER_HEIGHT }}
      footer={{ height: LAYOUT_CONFIG.FOOTER_HEIGHT }}
      navbar={{
        width: LAYOUT_CONFIG.SIDEBAR_WIDTH,
        breakpoint: 'sm',
        collapsed: { mobile: true }
      }}
      padding={0}
    >
      <AppShell.Navbar withBorder={false}>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Header withBorder={false} px="var(--app-side-padding)">
        <Header />
      </AppShell.Header>

      <AppShell.Main className={classes.main}>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer withBorder={false} px="var(--app-side-padding)">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};
