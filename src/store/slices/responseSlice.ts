import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
  value: string;
}

const initialState: InitialState = {
  value: ``,
};

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setResponse(state, { payload: { value } }: PayloadAction<InitialState>) {
      state.value = value;
    },
  },
});

export const { setResponse } = responseSlice.actions;
export default responseSlice.reducer;
