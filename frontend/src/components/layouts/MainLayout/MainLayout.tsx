import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import classes from './MainLayout.module.css';

export const MainLayout = () => {
  return (
    <AppShell header={{ height: 60 }} footer={{ height: 50 }} padding={0}>
      <AppShell.Header withBorder={false}>
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

      <AppShell.Footer withBorder={false}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};
