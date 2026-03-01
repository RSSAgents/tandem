import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import classes from './MainLayout.module.css';
import { LAYOUT_CONFIG } from '../../../constants/layout';

export const MainLayout = () => {
  return (
    <AppShell
      header={{ height: LAYOUT_CONFIG.HEADER_HEIGHT }}
      footer={{ height: LAYOUT_CONFIG.FOOTER_HEIGHT }}
      padding={0}
    >
      <AppShell.Header withBorder={false} px="var(--app-side-padding)">
        <Header />
      </AppShell.Header>

      <AppShell.Main className={classes.main}>
        <div className={classes.appBoard}>
          <aside className={classes.sidebarSection}>
            <Sidebar />
          </aside>

          <section className={classes.contentSection}>
            <Outlet />
          </section>
        </div>
      </AppShell.Main>

      <AppShell.Footer withBorder={false} px="var(--app-side-padding)">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};
