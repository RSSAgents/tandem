import { Accordion, Box, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import classes from './LibraryPage.module.css';
import { FormattedDescription } from '@/utils/formatDescription';

const LibraryPage = () => {
  const { t } = useTranslation('library');
  const libraryData = t('libraryData', { returnObjects: true });

  return (
    <Box className={classes.wrapper}>
      {libraryData.map((category, categoryIndex) => (
        <Box key={categoryIndex} className={classes.category}>
          <Title order={2} className={classes.subtitle}>
            {category.category}
          </Title>

          <Accordion
            defaultValue=""
            className={classes.accordion}
            classNames={{
              item: classes.item,
              control: classes.control,
              panel: classes.panel,
            }}
            chevron={<IconPlus className={classes.icon} />}
          >
            {category.items.map((item) => (
              <Accordion.Item key={item.value} value={item.value}>
                <Accordion.Control>{item.value}</Accordion.Control>
                <Accordion.Panel>
                  <FormattedDescription text={item.description} />
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Box>
      ))}
    </Box>
  );
};

export default LibraryPage;
