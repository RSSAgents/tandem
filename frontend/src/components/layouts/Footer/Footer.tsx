import schoolIcon from '@/images/logo/rs-logo.svg';
import { Anchor, Avatar, Box, Text } from '@mantine/core';
import classes from './Footer.module.css';

export const Footer = () => {
  return (
    <Box component="footer" className={classes.footer}>
      <Text className={classes.logo}>RSSAgents</Text>
      <Anchor
        className={classes.school}
        href="https://rs.school/courses/javascript"
        target="_blank"
      >
        <Avatar src={schoolIcon} size={30} />
      </Anchor>
      <Text className={classes.creationYear}>2026</Text>
    </Box>
  );
};
