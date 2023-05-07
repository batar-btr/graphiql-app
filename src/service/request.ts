import { request, gql, Variables } from 'graphql-request';

export const requestSubmit = async (query: string, variable: Variables) => {
  // const obj = JSON.parse(variable);

  const req = await request(
    'https://rickandmortyapi.com/graphql',
    gql`
      ${query}
    `,
    variable
  ).then((data) => {
    console.log(data);
    const response = JSON.stringify(data, null, 2);
    return response;
  });

  return req;
};
