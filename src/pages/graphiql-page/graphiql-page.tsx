import './graphiql-page.scss';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import 'react-reflex/styles.css';
import { GraphiqlCodeEditor } from '../../components/code-editor/graphiql-code-editor';
import { GraphiqlVariablesEditor } from '../../components/code-editor/graphiql-variables-editor';

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
              <span className="graphiql-code-header-title">Operation</span>
              <button className="graphiql-code-header-btn">
                <span className="graphiql-code-header-btn-img">
                  <svg viewBox="0 0 40 40">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      d="M3.897 5.425v29.15a2.5 2.5 0 0 0 3.681 2.203l27.205-14.575a2.5 2.5 0 0 0 0-4.406L7.578 3.222a2.5 2.5 0 0 0-3.681 2.203z"
                    ></path>
                  </svg>
                </span>
                <span className="graphiql-code-header-btn-text">Query</span>
              </button>
            </div>
            <ReflexContainer orientation="horizontal">
              <ReflexElement minSize={100}>
                <GraphiqlCodeEditor />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement minSize={50} size={100}>
                <div className="graphiql-code-header graphiql-variables-editor-header">
                  <span className="graphiql-code-header-title">Variables</span>
                </div>
                <GraphiqlVariablesEditor />
              </ReflexElement>
            </ReflexContainer>
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
