import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { graphql } from 'cm6-graphql';
import { TestSchema } from '../../pages/graphiql-page/testSchema';

export const GraphiqlCodeEditor = () => {
  return (
    <CodeMirror
      className="graphiql-code-editor"
      value={`query Query {
  first {
    example
  }
}`}
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
      }}
    />
  );
};
