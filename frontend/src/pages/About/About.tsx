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

const AVATAR_SIZE = 120;
const GITHUB_ICON_SIZE = 14;
const GRID_COLS = { base: 1, sm: 2, lg: 3 };
const GITHUB_BASE_URL = 'https://github.com';
const getGithubAvatarUrl = (username: string) => `${GITHUB_BASE_URL}/${username}.png`;
const getGithubProfileUrl = (username: string) => `${GITHUB_BASE_URL}/${username}`;

export const About = () => {
  const { t } = useTranslation('about');

  const teamData = t('team', { returnObjects: true });
  const team = Array.isArray(teamData) ? teamData : [];

  return (
    <Container size="xl" py="xl">
      <Stack align="center" mb={50}>
        <Title order={1} mt={30} mb={5} className={classes.title}>
          {t('title')}
        </Title>
        <Text c="dimmed" ta="center" mb={20} maw={700} className={classes.subtitle}>
          {t('subtitle')}
        </Text>
      </Stack>

      <SimpleGrid cols={GRID_COLS} spacing="xl" className={classes.teamGrid}>
        {team.map((member) => (
          <Card
            key={member.github}
            component="a"
            href={getGithubProfileUrl(member.github)}
            target="_blank"
            p="xl"
            radius="lg"
            withBorder
            className={classes.memberCard}
          >
            <Stack align="center" justify="space-between" h="100%" gap="md">
              <Stack align="center" gap="sm" w="100%">
                <Avatar
                  src={getGithubAvatarUrl(member.github)}
                  size={AVATAR_SIZE}
                  radius={120}
                  className={classes.avatar}
                />
                <Title order={3} className={classes.memberName} mt="sm">
                  {member.name}
                </Title>
                <Text c="blue" fw={700} size="sm" tt="uppercase" className={classes.roleText}>
                  {member.role}
                </Text>
                <Text size="xs" ta="center" c="dimmed" className={classes.description}>
                  {member.desc}
                </Text>
                <Divider w="100%" variant="dashed" mt="xs" mb="sm" />
                <Text size="sm" ta="center" c="gray.6" className={classes.bioText}>
                  {member.bio}
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
                {t('githubButton')}
              </Button>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};
