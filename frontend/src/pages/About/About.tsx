import {
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import classes from './About.module.css';
import { useTranslation } from 'react-i18next';

const AVATAR_SIZE = 100;
const GITHUB_ICON_SIZE = 14;
const GRID_COLS = { base: 1, sm: 2, lg: 3 };

export const About = () => {
  const { t } = useTranslation('about');

  const teamMembers = [
    'shakhzod',
    'margaritaMaletz',
    'diana',
    'khayitbek',
    'daria',
    'fayzullo',
    'ilia',
    'margarita',
    'marta',
    'vika',
  ] as const;

  return (
    <Container size="lg" py="xl">
      <Stack align="center" mb={50}>
        <Title order={1} className={classes.title}>
          {t('about.title')}
        </Title>
        <Text c="dimmed" ta="center" mb={20} className={classes.subtitle}>
          {t('about.subtitle')}
        </Text>
      </Stack>

      <SimpleGrid cols={GRID_COLS} spacing="xl" className={classes.teamGrid}>
        {teamMembers.map((memberKey) => (
          <Card
            key={t(`about.team.${memberKey}.github`)}
            component="a"
            href={`https://github.com/${t(`about.team.${memberKey}.github`)}`}
            target="_blank"
            p="xl"
            radius="lg"
            withBorder
            className={classes.memberCard}
          >
            <Stack align="center" justify="space-between" h="100%" gap="md">
              <Stack align="center" gap="sm" w="100%">
                <Avatar
                  src={`https://github.com/${t(`about.team.${memberKey}.github`)}.png`}
                  size={AVATAR_SIZE}
                  radius={120}
                  className={classes.avatar}
                />
                <Title order={3} className={classes.memberName}>
                  {t(`about.team.${memberKey}.name`)}
                </Title>
                <Text c="blue" fw={700} size="md" tt="uppercase" className={classes.roleText}>
                  {t(`about.team.${memberKey}.role`)}
                </Text>
                <Text size="xsmd" ta="center" c="dimmed" className={classes.description}>
                  {t(`about.team.${memberKey}.desc`)}
                </Text>
                <Divider w="100%" variant="dashed" mt="xs" mb="sm" />
                <Text size="md" ta="center" c="gray.6" className={classes.bioText}>
                  {t(`about.team.${memberKey}.bio`)}
                </Text>
              </Stack>
              <Button
                variant="outline"
                radius="md"
                size="xs"
                mt="md"
                className={classes.githubButton}
                leftSection={<IconBrandGithub size={GITHUB_ICON_SIZE} />}
              >
                {t('about.githubButton')}
              </Button>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};
