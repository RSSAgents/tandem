import { Box, Text } from '@mantine/core';
import classes from './Footer.module.css';

export const Footer = () => {
  return (
    <Box component="footer" className={classes.footer}>
      <Text className={classes.logo}>RSSAgents</Text>
      <Text className={classes.creationYear}>2026</Text>
    </Box>
  );
};
