import { EditorState } from '@/types/codeEditor';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: EditorState = {
  code: '',
};

const editorStore = createSlice({
  name: 'codeEditor',
  initialState,
  reducers: {
    setCodeEditor: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
  },
});

export const { setCodeEditor } = editorStore.actions;
export default editorStore.reducer;
