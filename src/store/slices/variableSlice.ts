import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  value: string;
}

const initialState: InitialState = {
  value: '{ "id": "2" }',
};

const variableSlice = createSlice({
  name: 'variable',
  initialState,
  reducers: {
    setVariable(state, { payload: { value } }: PayloadAction<InitialState>) {
      state.value = value;
      console.log(value);
    },
  },
});

export const { setVariable } = variableSlice.actions;
export default variableSlice.reducer;
