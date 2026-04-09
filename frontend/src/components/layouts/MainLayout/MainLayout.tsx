import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { LAYOUT_CONFIG } from '../../../constants/layout';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import classes from './MainLayout.module.css';

export const MainLayout = () => {
  const [opened, { toggle, close }] = useDisclosure();

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (opened) {
      document.body.classList.add('sidebar-opened');
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.classList.remove('sidebar-opened');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.classList.remove('sidebar-opened');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [opened]);

  return (
    <AppShell
      layout="alt"
      header={{ height: LAYOUT_CONFIG.HEADER_HEIGHT }}
      footer={{ height: LAYOUT_CONFIG.FOOTER_HEIGHT }}
      navbar={{
        width: LAYOUT_CONFIG.SIDEBAR_WIDTH,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding={0}
    >
      <AppShell.Navbar withBorder={false}>
        <Sidebar onClose={close} />
      </AppShell.Navbar>

      {opened && <div className={classes.overlay} onClick={close} aria-hidden="true" />}

      <AppShell.Header withBorder={false} px="var(--app-side-padding)">
        <Header onBurgerClick={toggle} burgerOpened={opened} />
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
