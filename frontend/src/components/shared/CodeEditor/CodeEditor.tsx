import { Container } from '@mantine/core';
import classes from './CodeEditor.module.css';

import Editor from '@monaco-editor/react';

export const CodeEditor = () => {
  return (
    <Container className={classes.container}>
      <Editor defaultLanguage="javascript" defaultValue="// Code ..." />
    </Container>
  );
};
