import { Box, Text } from '@mantine/core';
import { footerStyles } from './FooterStyles';

export const Footer = () => {
  return (
    <Box component="footer" style={footerStyles.footer}>
      <Text style={footerStyles.logo}>RSSAgents</Text>
      <Text style={footerStyles.creationYear}>2026</Text>
    </Box>
  );
};
