import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { graphql } from 'cm6-graphql';
import { TestSchema } from '../../pages/graphiql-page/testSchema';

export const GraphiqlVariablesEditor = () => {
  return (
    <CodeMirror
      className="graphiql-variables-editor"
      theme={vscodeDarkInit({
        settings: {
          fontFamily: 'monospace',
          background: '#2d2d2d',
          gutterBackground: '#2d2d2d',
        },
      })}
      extensions={[graphql()]}
      onChange={(value, viewUpdate) => {
        console.log('value:', value);
      }}
    />
  );
};
