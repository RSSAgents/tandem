import { Box, Container } from '@mantine/core';
import MonacoEditor from '@monaco-editor/react';
import classes from './CodeEditor.module.css';
import { CodeEditorConfig } from './CodeEditorConfig';

export const CodeEditor = () => {
  const config = CodeEditorConfig();

  return (
    <Container className={classes.container}>
      <Box className={classes.block}>
        <MonacoEditor {...config} />
      </Box>
    </Container>
  );
};
