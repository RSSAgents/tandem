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
    <Container size="md" py={150}>
      <Title order={2} className={classes.sectionTitle}>
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
