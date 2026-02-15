import { Box } from '@mantine/core';
import { footerStyles } from './FooterStyles';

export const Footer = () => {
  return (
    <Box component="header" style={footerStyles.footer}>
      <div style={footerStyles.logo}>RSSAgents</div>
      <div style={footerStyles.creationYear}>2026</div>
    </Box>
  );
};
