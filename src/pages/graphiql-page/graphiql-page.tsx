import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { graphql } from 'cm6-graphql';
import { TestSchema } from './testSchema';
import './graphiql-page.scss';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import 'react-reflex/styles.css';

const GraphiqlPage = () => {
  return (
    <div className="graphiql-page">
      <ReflexContainer orientation="vertical">
        <ReflexElement minSize={200}>
          <div className="graphiql-doc"></div>
        </ReflexElement>

        <ReflexSplitter propagate={true} />

        <ReflexElement minSize={200}>
          <div className="graphiql-code">
            <div className="graphiql-code-header">
              <span>Operation</span>
              <button className="graphiql-code-header-btn">{`Query`}</button>
            </div>
            <CodeMirror
              className="graphiql-code-editor"
              value={`query Query{
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
                    alert(
                      `Showing in docs.: Field: ${field}, Type: ${type}, ParentType: ${parentType}`
                    );
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
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true} />

        <ReflexElement minSize={200}>
          <div className="graphiql-results"></div>
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
};

export default GraphiqlPage;
