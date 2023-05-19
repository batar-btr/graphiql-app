import { ClientError } from 'graphql-request';

export const handleResponse = (error: ClientError) => {
  const data = {
    errors:
      error.response.errors &&
      error.response.errors.map((err) => ({
        message: err.message,
        locations:
          err.locations &&
          err.locations.map((loc) => {
            const arr = [];
            arr.push(`"line": ${loc.line}, "column": ${loc.column}`);
            return `${arr}`;
          }),
        extensions: err.extensions,
      })),
  };
  return JSON.stringify(data, null, 2);
};
