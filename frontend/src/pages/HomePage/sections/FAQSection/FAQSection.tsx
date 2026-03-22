import { Accordion, Title, Container } from '@mantine/core';
import classes from './FAQSection.module.css';
import { IconPlus } from '@tabler/icons-react';
import { Trans, useTranslation } from 'react-i18next';

export function FAQSection() {
  const { t } = useTranslation('faq');

  const questions = t('questions', { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  const items = questions.map((item) => (
    <Accordion.Item key={item.question} value={item.question}>
      <Accordion.Control>{item.question}</Accordion.Control>
      <Accordion.Panel>{item.answer}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Container className={classes.section} size="md" py={{ base: 60, sm: 80, md: 100 }}>
      <Title
        order={2}
        className={classes.sectionTitle}
        fz={{ base: 32, sm: 36, md: 40, lg: 48 }}
        mb={{ base: 16, sm: 18, md: 20, lg: 24 }}
      >
        <Trans
          i18nKey="title"
          ns="faq"
          components={{ 1: <span className={classes.highlight} /> }}
        />
      </Title>
      <Accordion
        className={classes.myAccordion}
        classNames={{
          item: classes.item,
          control: classes.control,
        }}
        chevron={<IconPlus className={classes.icon} />}
      >
        {items}
      </Accordion>
    </Container>
  );
}
