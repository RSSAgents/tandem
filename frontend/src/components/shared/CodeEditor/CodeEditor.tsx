import { Container } from '@mantine/core';
import MonacoEditor from '@monaco-editor/react';
import classes from './CodeEditor.module.css';

export const CodeEditor = () => {
  return (
    <Container className={classes.container}>
      <MonacoEditor defaultLanguage="javascript" defaultValue="// Code ..." />
    </Container>
  );
};
