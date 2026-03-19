import { LIBRARY_ACCORDION } from '@constants/library';
import { Accordion, Box, Container, Title } from '@mantine/core';
import classes from './LibraryPage.module.css';

const LibraryPage = () => {
  return (
    <Container>
      {LIBRARY_ACCORDION.map((category, categoryIndex) => (
        <Box key={categoryIndex} className={classes.category}>
          <Title order={2} className={classes.subtitle}>
            {category.category}
          </Title>

          <Box className={classes.accordion}>
            <Accordion defaultValue="">
              {category.items.map((item) => (
                <Accordion.Item key={item.value} value={item.value}>
                  <Accordion.Control>{item.value}</Accordion.Control>
                  <Accordion.Panel>{item.description}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default LibraryPage;
