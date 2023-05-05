import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  uid: null | string;
  email: null | string;
  token: null | string;
}

const initialState: InitialState = {
  uid: null,
  email: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload: { uid, email, token } }: PayloadAction<InitialState>) {
      state.uid = uid;
      state.email = email;
      state.token = token;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
