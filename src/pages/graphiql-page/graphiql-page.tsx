import './graphiql-page.scss';
import { ReflexContainer, ReflexSplitter, ReflexElement, HandlerProps } from 'react-reflex';
import 'react-reflex/styles.css';
import { GraphiqlCodeEditor } from '../../components/code-editor/graphiql-code-editor';
import { GraphiqlVariablesEditor } from '../../components/code-editor/graphiql-variables-editor';
import { GraphiqlResponseEditor } from '../../components/code-editor/graphiql-response-editor';
import { useGraphQLRequest } from '../../service/request';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setResponse } from '../../store/slices/responseSlice';
import { DocumentationExplorer } from '../../explorer/testExplorer';

interface ILayoutState {
  appPaneV1: {
    flex: number;
  };
  appPaneV2: {
    flex: number;
  };
  appPaneV3: {
    flex: number;
  };
  appPaneH1: {
    flex: number;
  };
  appPaneH2: {
    flex: number;
  };
}

const getLayoutState = (): ILayoutState => {
  const item = window.localStorage.getItem('re-flex');

  if (item) {
    return JSON.parse(item);
  }

  return {
    appPaneV1: {
      flex: 0.333333,
    },
    appPaneV2: {
      flex: 0.333333,
    },
    appPaneV3: {
      flex: 0.333333,
    },
    appPaneH1: {
      flex: 0.777778,
    },
    appPaneH2: {
      flex: 0.222222,
    },
  };
};

const GraphiqlPage = () => {
  const layoutState = getLayoutState();

  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.query.value);
  const variable = useAppSelector((state) => state.variable.value);
  const { handleRequest } = useGraphQLRequest();

  const onResizePane = (event: HandlerProps) => {
    const { name, flex } = event.component.props;

    layoutState[name! as 'appPaneV1' | 'appPaneV2' | 'appPaneV3' | 'appPaneH1' | 'appPaneH2'].flex =
      flex!;

    window.localStorage.setItem('re-flex', JSON.stringify(layoutState));
  };

  const handleSubmit = () => {
    try {
      const obj = variable ? JSON.parse(variable) : {};
      handleRequest(query, obj).then((value) => value && dispatch(setResponse({ value })));
    } catch (err: unknown) {
      if (err instanceof Error) {
        const value = `Variables are invalid JSON: ${err.message}`;

        dispatch(setResponse({ value }));
      }
    }
  };

  return (
    <div className="graphiql-page">
      <ReflexContainer orientation="vertical">
        <ReflexElement
          name="appPaneV1"
          minSize={200}
          flex={layoutState.appPaneV1.flex}
          onResize={onResizePane}
        >
          <div className="graphiql-documentation">
            <DocumentationExplorer />
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true} />

        <ReflexElement
          name="appPaneV2"
          minSize={200}
          flex={layoutState.appPaneV2.flex}
          onResize={onResizePane}
        >
          <div className="graphiql-code">
            <div className="graphiql-code-header">
              <span className="graphiql-code-header-title">Operation</span>
              <button className="graphiql-code-header-btn" onClick={() => handleSubmit()}>
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
              <ReflexElement
                name="appPaneH1"
                minSize={100}
                flex={layoutState.appPaneH1.flex}
                onResize={onResizePane}
              >
                <GraphiqlCodeEditor />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement
                name="appPaneH2"
                minSize={56}
                flex={layoutState.appPaneH2.flex}
                onResize={onResizePane}
              >
                <div className="graphiql-code-header graphiql-variables-editor-header">
                  <span className="graphiql-code-header-title">Variables</span>
                </div>
                <GraphiqlVariablesEditor />
              </ReflexElement>
            </ReflexContainer>
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true} />

        <ReflexElement
          name="appPaneV3"
          minSize={200}
          flex={layoutState.appPaneV3.flex}
          onResize={onResizePane}
        >
          <div className="graphiql-response">
            <div className="graphiql-code-header">
              <span className="graphiql-code-header-title">Response</span>
            </div>
            <GraphiqlResponseEditor />
          </div>
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
};

export default GraphiqlPage;
