import './index.scss';
import './firebase';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './pages/error-page';
import AuthPage from './pages/auth-page/auth-page';
import GraphiqlPage from './pages/graphiql-page/graphiql-page';
import WelcomePage from './pages/welcome-page/welcome-page';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Suspense } from 'react';
import Spinner from './components/spinner/Spinner';
import './i18n';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomePage /> },
      {
        path: 'auth-signin',
        element: <AuthPage mode="sign-in" />,
      },
      {
        path: 'auth-signup',
        element: <AuthPage mode="sign-up" />,
      },
      {
        path: 'graphiql',
        element: <GraphiqlPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  </React.StrictMode>
);
