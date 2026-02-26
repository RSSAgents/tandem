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

const team = [
  {
    name: 'Shakhzod',
    role: 'Team Lead - Mentor',
    github: 'Shakhzod235',
    desc: 'Project architecture, code reviews, mentoring',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Diana',
    role: 'Mentor',
    github: 'bt-diana',
    desc: 'Code mentoring, QA, learning paths',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Khayitbek',
    role: 'Mentor',
    github: 'khayitbek03',
    desc: 'Mentoring, code quality, documentation',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Daria',
    role: 'Mentor',
    github: 'dashque',
    desc: 'Mentoring, code quality, documentation',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Fayzullo',
    role: 'Developer',
    github: 'Fayzullo05',
    desc: 'Repository setup, widgets, API integration',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Ilia',
    role: 'Developer',
    github: 'D15ND',
    desc: 'UI/UX, animations, component design',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Margarita',
    role: 'Developer',
    github: 'solarsungai',
    desc: 'Widgets, AI features, database design',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Marta',
    role: 'Developer',
    github: '27moon',
    desc: 'Widgets, AI features, database design',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Vika',
    role: 'Developer',
    github: 'oneilcode',
    desc: 'Widgets, AI features, database design',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Margarita Maletz',
    role: 'Mentor',
    github: 'margaryta-maletz',
    desc: 'Widgets, AI features, database design',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export const About = () => {
  return (
    <Container size="xl" py="xl">
      <Stack align="center" mb={50}>
        <Title order={1} className={classes.title}>
          Meet Our Team
        </Title>
        <Text c="dimmed" ta="center" maw={600}>
          The creators behind Tandem - united by code, creativity, and the RS School spirit.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl" className={classes.teamGrid}>
        {team.map((member) => (
          <Card key={member.name} p="xl" radius="lg" withBorder className={classes.memberCard}>
            <Stack align="center" gap="sm">
              <Avatar
                src={`https://github.com/${member.github}.png`}
                size={120}
                radius={120}
                className={classes.avatar}
              />
              <Title order={3}>{member.name}</Title>
              <Text c="blue" fw={700} size="sm" tt="uppercase">
                {member.role}
              </Text>
              <Text size="xs" ta="center" c="dimmed">
                {member.desc}
              </Text>
              <Divider w="100%" variant="dashed" my="md" />
              <Text size="sm" ta="center" c="gray.6">
                {member.bio}
              </Text>
              <Button
                component="a"
                href={`https://github.com/${member.github}`}
                target="_blank"
                variant="outline"
                radius="xl"
                size="xs"
                mt="md"
                leftSection={<IconBrandGithub size={14} />}
              >
                GitHub
              </Button>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};
