import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { graphql } from 'cm6-graphql';
import { useAppSelector } from '../../hooks/redux-hooks';
import Spinner from '../spinner/Spinner';

export const GraphiqlResponseEditor = () => {
  const result = useAppSelector((state) => state.response.value);
  const loading = useAppSelector((state) => state.loading.value);

  return loading ? (
    <Spinner />
  ) : (
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
