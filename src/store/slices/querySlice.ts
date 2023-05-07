import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  value: string;
}

const initialState: InitialState = {
  value: `query($id: ID!) {
    character(id: $id) {
      name
      status
      species
    }
  }`,
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery(state, { payload: { value } }: PayloadAction<InitialState>) {
      state.value = `${value}`;
    },
  },
});

export const { setQuery } = querySlice.actions;
export default querySlice.reducer;
