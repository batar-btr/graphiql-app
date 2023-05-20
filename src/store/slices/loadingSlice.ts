import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  value: boolean;
}

const initialState: InitialState = {
  value: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, { payload: { value } }: PayloadAction<InitialState>) {
      state.value = value;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
