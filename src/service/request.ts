import { request, gql, Variables, ClientError } from 'graphql-request';
import { handleResponse } from './handleError';
import { useAppDispatch } from '../hooks/redux-hooks';
import { setResponse } from '../store/slices/responseSlice';
import { setLoading } from '../store/slices/loadingSlice';

export const useGraphQLRequest = () => {
  const dispatch = useAppDispatch();

  const handleRequest = async (query: string, variables: Variables) => {
    dispatch(setLoading({ value: true }));
    const endpoint = 'https://rickandmortyapi.com/graphql';
    try {
      const responseData = await request(
        endpoint,
        gql`
          ${query}
        `,
        variables
      );
      const resp = JSON.stringify(responseData, null, 2);
      dispatch(setLoading({ value: false }));
      return resp;
    } catch (err: unknown) {
      if (err instanceof ClientError) {
        const value = handleResponse(err);
        dispatch(setResponse({ value }));
        dispatch(setLoading({ value: false }));
      }
    }
  };

  return { handleRequest };
};
