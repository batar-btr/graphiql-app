import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { graphql } from 'cm6-graphql';

export const GraphiqlResponseEditor = () => {
  return (
    <CodeMirror
      className="graphiql-response-editor"
      theme={vscodeDarkInit({
        settings: {
          fontFamily: 'monospace',
          background: 'transparent',
          gutterBackground: 'transparent',
        },
      })}
      readOnly={true}
      value={`{
  first {
    example
  }
}`}
      extensions={[graphql()]}
      onChange={(value, viewUpdate) => {
        console.log('value:', value);
      }}
    />
  );
};
