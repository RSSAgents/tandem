import { Accordion, Box, Container, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './LibraryPage.module.css';
import { useLibraryBonus } from '@/hooks/useLibraryBonus';

const LibraryPage = () => {
  useLibraryBonus();
  const { t } = useTranslation('library');
  const libraryData = t('libraryData', { returnObjects: true });

  return (
    <Container>
      {libraryData.map((category, categoryIndex) => (
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
