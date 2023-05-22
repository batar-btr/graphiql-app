import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { graphql } from 'cm6-graphql';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setQuery } from '../../store/slices/querySlice';
import { GraphQLSchema } from 'graphql';
import { fetchSchema } from '../../service/fetchSchema';

export const GraphiqlCodeEditor = () => {
  const query = useAppSelector((state) => state.query.value);
  const dispatch = useAppDispatch();
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);

  useEffect(() => {
    fetchSchema().then((s) => s && setSchema(s));
  }, []);

  return (
    schema && (
      <CodeMirror
        className="graphiql-code-editor"
        value={query}
        theme={vscodeDarkInit({
          settings: {
            fontFamily: 'monospace',
            background: '#2d2d2d',
            gutterBackground: '#2d2d2d',
          },
        })}
        extensions={[
          graphql(schema, {
            onShowInDocs(field, type, parentType) {
              alert(`Showing in docs.: Field: ${field}, Type: ${type}, ParentType: ${parentType}`);
            },
            onFillAllFields(_query, token) {
              alert(`Filling all fields. Token: ${token}`);
            },
          }),
        ]}
        onChange={(value) => {
          dispatch(setQuery({ value }));
        }}
      />
    )
  );
};
