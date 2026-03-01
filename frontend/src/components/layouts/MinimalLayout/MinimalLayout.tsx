import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Container } from '@mantine/core';
import classes from './MinimalLayout.module.css';

export const MinimalLayout = () => (
  <>
    <Container size="fluid" className={classes.layout}>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  </>
);
