import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestSubmit } from '../../service/request';
import { Variables } from 'graphql-request';

interface InitialState {
  value: string;
}

const initialState: InitialState = {
  value: ``,
};

// export const setResponse = createAsyncThunk(
//   'response/setResponse',
//   async (query: string, variables: Variables) => {
//     console.log(query, variables);

//     return await requestSubmit(query, variables);
//   }
// );

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
