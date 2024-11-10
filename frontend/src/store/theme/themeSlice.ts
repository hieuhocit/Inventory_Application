import { ITheme } from '@/types/definitions';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ITheme = {
  mode: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;
