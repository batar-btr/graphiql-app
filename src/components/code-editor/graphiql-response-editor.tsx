import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { graphql } from 'cm6-graphql';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';

export const GraphiqlResponseEditor = () => {
  const result = useAppSelector((state) => state.response.value);

  useEffect(() => {}, [result]);
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
      value={result}
      extensions={[graphql()]}
    />
  );
};
