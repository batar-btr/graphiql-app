import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
  value: boolean;
}

const initialState: InitialState = {
  value: true,
};

const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    setSchemaslice(state, { payload: { value } }: PayloadAction<InitialState>) {
      state.value = value;
    },
  },
});

export const { setSchemaslice } = schemaSlice.actions;
export default schemaSlice.reducer;
