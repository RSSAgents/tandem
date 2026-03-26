import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { LAYOUT_CONFIG } from '../../../constants/layout';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import classes from './MainLayout.module.css';

export const MainLayout = () => {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);

  return (
    <AppShell
      layout="alt"
      header={{ height: LAYOUT_CONFIG.HEADER_HEIGHT }}
      footer={{ height: LAYOUT_CONFIG.FOOTER_HEIGHT }}
      navbar={{
        width: LAYOUT_CONFIG.SIDEBAR_WIDTH,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened }
      }}
      padding={0}
    >
      <AppShell.Navbar withBorder={false}>
        <Sidebar onClose={closeMobile} />
      </AppShell.Navbar>

      <AppShell.Header withBorder={false} px="var(--app-side-padding)">
        <Header onBurgerClick={toggleMobile} burgerOpened={mobileOpened} />
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
