import './graphiql-page.scss';
import { ReflexContainer, ReflexSplitter, ReflexElement, HandlerProps } from 'react-reflex';
import 'react-reflex/styles.css';
import { GraphiqlCodeEditor } from '../../components/code-editor/graphiql-code-editor';
import { GraphiqlVariablesEditor } from '../../components/code-editor/graphiql-variables-editor';
import { GraphiqlResponseEditor } from '../../components/code-editor/graphiql-response-editor';
import { useGraphQLRequest } from '../../service/request';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setResponse } from '../../store/slices/responseSlice';
import { DocumentationExplorer } from '../../explorer/Explorer';
import useAuth from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';
import Spinner from '../../components/spinner/Spinner';

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
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const [layoutState, setLayoutState] = useState(getLayoutState());
  const [sidebarHidden, setSidebarHidden] = useState(true);

  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.query.value);
  const variable = useAppSelector((state) => state.variable.value);
  const { handleRequest } = useGraphQLRequest();

  const onResizePane = (event: HandlerProps) => {
    const { name, flex } = event.component.props;

    setLayoutState((prevState) => ({
      ...prevState,
      [name! as 'appPaneV1' | 'appPaneV2' | 'appPaneV3' | 'appPaneH1' | 'appPaneH2']: {
        flex: flex,
      },
    }));

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

  const closeSidebar = () => setSidebarHidden((prev) => !prev);

  return (
    <div className="graphiql-page">
      <div className="graphiql-sidebar">
        <button onClick={closeSidebar} className="graphiql-sidebar-btn">
          <svg height="1em" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.75 3C0.75 4.24264 1.75736 5.25 3 5.25H17.25M0.75 3C0.75 1.75736 1.75736 0.75 3 0.75H16.25C16.8023 0.75 17.25 1.19772 17.25 1.75V5.25M0.75 3V21C0.75 22.2426 1.75736 23.25 3 23.25H18.25C18.8023 23.25 19.25 22.8023 19.25 22.25V6.25C19.25 5.69771 18.8023 5.25 18.25 5.25H17.25"
              stroke="currentColor"
              strokeWidth="1.5"
            ></path>
            <line
              x1="13"
              y1="11.75"
              x2="6"
              y2="11.75"
              stroke="currentColor"
              strokeWidth="1.5"
            ></line>
          </svg>
        </button>
      </div>
      <ReflexContainer orientation="vertical">
        <ReflexElement
          name="appPaneV1"
          minSize={200}
          flex={layoutState.appPaneV1.flex}
          onResize={onResizePane}
          style={{ display: `${sidebarHidden ? 'none' : 'flex'}` }}
        >
          {
            <Suspense fallback={<Spinner />}>
              <div className="graphiql-documentation">
                <DocumentationExplorer />
              </div>
            </Suspense>
          }
        </ReflexElement>

        <ReflexSplitter
          propagate={true}
          style={{ display: `${sidebarHidden ? 'none' : 'flex'}` }}
        />

        <ReflexElement
          name="appPaneV2"
          minSize={200}
          flex={layoutState.appPaneV2.flex}
          onResize={onResizePane}
        >
          <div className="graphiql-code">
            <div className="graphiql-code-header">
              <span className="graphiql-code-header-title">{t('operation')}</span>
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
                <span className="graphiql-code-header-btn-text">{t('buttonQuery')}</span>
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
                  <span className="graphiql-code-header-title">{t('variable')}</span>
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
              <span className="graphiql-code-header-title">{t('response')}</span>
            </div>
            <Suspense fallback={<Spinner />}>
              <GraphiqlResponseEditor />
            </Suspense>
          </div>
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
};

export default GraphiqlPage;
