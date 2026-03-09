import { Container, Flex, Loader } from '@mantine/core';
import styles from './PageLoader.module.css';

export const PageLoader = () => {
  return (
    <Container size={800} className={styles.mainContainer}>
      <Flex justify="center" align="center" className={styles.flex} style={{ minHeight: '400px' }}>
        <Loader size="lg" />
      </Flex>
    </Container>
  );
};
