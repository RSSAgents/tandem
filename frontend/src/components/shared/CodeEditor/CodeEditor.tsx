import { Container } from '@mantine/core';
import MonacoEditor from '@monaco-editor/react';
import classes from './CodeEditor.module.css';
import { CodeEditorConfig } from './CodeEditorConfig';

export const CodeEditor = () => {
  return (
    <Container className={classes.container}>
      <MonacoEditor {...CodeEditorConfig} />
    </Container>
  );
};
