import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Container } from '@mantine/core';
import classes from './MainLayout.module.css';
import { WidgetConsole } from '@components/features/widgets/WidgetConsole/WidgetConsole';
export const MainLayout = () => (
  <>
    <Container size="fluid" className={classes.layout}>
      <Header />
      <WidgetConsole />
      <Outlet />
      <Footer />
    </Container>
  </>
);
