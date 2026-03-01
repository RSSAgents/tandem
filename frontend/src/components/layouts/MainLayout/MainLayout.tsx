import { Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import classes from './MainLayout.module.css';

export const MainLayout = () => (
  <>
    <Container size="fluid" className={classes.layout}>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  </>
);
