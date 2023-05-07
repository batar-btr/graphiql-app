import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { graphql } from 'cm6-graphql';
import { TestSchema } from '../../pages/graphiql-page/testSchema';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { json } from '@codemirror/lang-json';

import { setVariable } from '../../store/slices/variableSlice';

export const GraphiqlVariablesEditor = () => {
  const dispatch = useAppDispatch();

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
      extensions={[json()]}
      onChange={(value, viewUpdate) => {
        dispatch(setVariable({ value }));
      }}
    />
  );
};
