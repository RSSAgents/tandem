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

const TITLE = 'Meet Our Team';
const SUBTITLE = 'The creators behind Tandem - united by code, creativity, and the RS School spirit.';
const GUTHUBNAME = 'GitHub';
const AVATAR_SIZE = 120;
const GITHUB_ICON_SIZE = 14;
const GRID_COLS = { base: 1, sm: 2, lg: 3 };
const GITHUB_BASE_URL = 'https://github.com';
const getGithubAvatarUrl = (username: string) => `${GITHUB_BASE_URL}/${username}.png`;
const getGithubProfileUrl = (username: string) => `${GITHUB_BASE_URL}/${username}`;

const team = [
  {
    name: 'Shakhzod',
    role: 'Team Lead - Mentor',
    github: 'Shakhzod235',
    desc: 'Project architecture, code reviews, mentoring',
    bio: 'Project architect and technical strategist. He designed the application`s core architecture and conducted deep code reviews to ensure the project`s scalability and integrity.',
  },
  {
    name: 'Diana',
    role: 'Mentor',
    github: 'bt-diana',
    desc: 'Code mentoring, QA, learning paths',
    bio: 'Quality assurance lead and educational curator. Diana focused on code mentoring, QA processes, and defining learning paths to ensure the training content meets modern industry standards.',
  },
  {
    name: 'Khayitbek',
    role: 'Mentor',
    github: 'khayitbek03',
    desc: 'Mentoring, code quality, documentation',
    bio: 'Maintained high coding standards and contributed to improving development best practices within the team.',
  },
  {
    name: 'Daria',
    role: 'Mentor',
    github: 'dashque',
    desc: 'Mentoring, code quality, documentation',
    bio: 'Technical advisor. Provided crucial insights and expert advice, helping the team navigate complex frontend challenges.',
  },
  {
    name: 'Fayzullo',
    role: 'Developer',
    github: 'Fayzullo05',
    desc: 'Repository setup, widgets, API integration',
    bio: 'Is the one who made everyone actually read the code. He came up with a "fill-in-the-blanks" format: you`re given a snippet and statements about it where you have to plug in the right words. It’s a perfect check to see if you really get the logic or are just skimming through.',
  },
  {
    name: 'Ilia',
    role: 'Developer',
    github: 'D15ND',
    desc: 'UI/UX, animations, component design',
    bio: 'Made sure algorithms stopped being boring. He brought Stack operations (LIFO and HIFO) to life with animations: you literally see data flying into and out of the stack. You watch a "live" example first, and then immediately test yourself with a quiz.',
  },
  {
    name: 'Margarita',
    role: 'Developer',
    github: 'solarsungai',
    desc: 'Widgets, AI features, database design',
    bio: 'Developed an AI assistant that acts as a smart mentor. Her AI doesn`t just sit there—it asks you questions, checks your answers, and gives hints if you’re stuck. It’s designed to evaluate your knowledge level in real-time and guide you through the tasks just like a real-life tutor would.',
  },
  {
    name: 'Marta',
    role: 'Developer',
    github: '27moon',
    desc: 'Widgets, AI features, database design',
    bio: 'Built a Garbage Collector simulator where you don`t need to cram theory: you just see a graph of objects and figure out the "extra" ones to delete yourself. Her "this" widget finally explains in plain English where that tricky variable actually points in different situations.',
  },
  {
    name: 'Vika',
    role: 'Developer',
    github: 'oneilcode',
    desc: 'Widgets, AI features, database design',
    bio: 'Turned every beginner`s nightmare - asynchrony - into a game. In her widget, you manually drag-and-drop console.log lines to arrange them in the exact order the Event Loop would execute them.',
  },
  {
    name: 'Margarita Maletz',
    role: 'Mentor',
    github: 'margaryta-maletz',
    desc: 'Team mentor and motivator',
    bio: 'She guided the team through the development process, providing constant support, encouragement, and strategic direction to reach the project goals.',
  },
];

export const About = () => {
  return (
    <Container size="xl" py="xl">
      <Stack align="center" mb={50}>
        <Title order={1} mt={30} mb={5} className={classes.title}>
          {TITLE}
        </Title>
        <Text c="dimmed" ta="center" mb={20} maw={700} className={classes.subtitle}>
          {SUBTITLE}
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
                {GUTHUBNAME}
              </Button>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};
