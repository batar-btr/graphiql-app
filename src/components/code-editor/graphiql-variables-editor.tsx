import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { graphql } from 'cm6-graphql';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

import { setVariable } from '../../store/slices/variableSlice';

export const GraphiqlVariablesEditor = () => {
  const dispatch = useAppDispatch();
  const variable = useAppSelector((state) => state.variable.value);

  return (
    <CodeMirror
      className="graphiql-variables-editor"
      value={variable}
      theme={vscodeDarkInit({
        settings: {
          fontFamily: 'monospace',
          background: '#2d2d2d',
          gutterBackground: '#2d2d2d',
        },
      })}
      extensions={[graphql()]}
      onChange={(value) => {
        dispatch(setVariable({ value }));
      }}
    />
  );
};
