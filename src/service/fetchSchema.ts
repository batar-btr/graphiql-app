import { buildClientSchema, getIntrospectionQuery } from 'graphql';

const endpoint = 'https://rickandmortyapi.com/graphql';

export const fetchSchema = async () => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });
    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    const schema = buildClientSchema(result.data);

    return schema;
  } catch (err) {
    console.error(err);
  }
};
