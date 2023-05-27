import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import variableSlice from './slices/variableSlice';
import querySlice from './slices/querySlice';
import responseSlice from './slices/responseSlice';
import loadingSlice from './slices/loadingSlice';
import schemaSlice from './slices/schemaSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    variable: variableSlice,
    query: querySlice,
    response: responseSlice,
    loading: loadingSlice,
    schema: schemaSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
