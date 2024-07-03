import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    questions: [],
  },
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    updateQuestion: (state, action) => {
      const { index, question } = action.payload;
      state.questions[index] = question;
    },
    reorderQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const { addQuestion, updateQuestion, reorderQuestions } = formSlice.actions;

export default formSlice.reducer;
