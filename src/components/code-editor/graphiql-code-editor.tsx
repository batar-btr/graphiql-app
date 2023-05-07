import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { graphql } from 'cm6-graphql';
import { TestSchema } from '../../pages/graphiql-page/testSchema';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setQuery } from '../../store/slices/querySlice';

export const GraphiqlCodeEditor = () => {
  const query = useAppSelector((state) => state.query.value);
  const dispatch = useAppDispatch();
  console.log('render');

  return (
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
        graphql(TestSchema, {
          onShowInDocs(field, type, parentType) {
            alert(`Showing in docs.: Field: ${field}, Type: ${type}, ParentType: ${parentType}`);
          },
          onFillAllFields(view, schema, _query, cursor, token) {
            alert(`Filling all fields. Token: ${token}`);
          },
        }),
      ]}
      onChange={(value, viewUpdate) => {
        console.log('value:', value);
        dispatch(setQuery({ value }));
      }}
    />
  );
};
