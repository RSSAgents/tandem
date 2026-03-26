import { Box } from '@mantine/core';
import MonacoEditor from '@monaco-editor/react';
import { RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CodeEditor.module.css';
import { CodeEditorConfig } from './CodeEditorConfig';
import { setCodeEditor } from './slice/editorSlice';

export const CodeEditor = () => {
  const config = CodeEditorConfig();
  const dispatch = useDispatch();
  const editorCode = useSelector((state: RootState) => state.editorStore.code);

  const handleEditorChange = (code: string | undefined) => {
    dispatch(setCodeEditor(code ?? ''));
  };

  return (
    <Box className={classes.block}>
      <MonacoEditor {...config} value={editorCode} onChange={handleEditorChange} />
    </Box>
  );
};
