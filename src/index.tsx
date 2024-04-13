import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { LinearProgress } from '@mui/material';

import App from './App';
import store from './store';
import './index.scss';
import ErrorBoundary from './helpers/ErrorBoundary';


const Home = React.lazy(() => import('./features/Home/Home'));
const Movies = React.lazy(() => import('./features/Movies/Movies'));
const About = React.lazy(() => import('./features/About/About'));
const Episodes = React.lazy(() => import('./features/Episodes/Episodes'));

function AppEntrypoint() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppEntrypoint />,
    children: [
      {
        path: '/',
        element: <React.Suspense fallback={<LinearProgress color='primary' sx={{ mt: 1 }} />}>
                  <Home />
                </React.Suspense>,
      },
      {
        path: 'movies',
        element: <React.Suspense fallback={<LinearProgress color='primary' sx={{mt: 1}} />}>
                  <Movies />
                </React.Suspense>,
      },
      {
        path: 'rickandmorty',
        element: <React.Suspense fallback={<LinearProgress color='primary' sx={{ mt: 1 }} />}>
                  <Episodes />
                </React.Suspense>,
      },
      {
        path: 'about',  
        element: <React.Suspense fallback={<LinearProgress color='primary' sx={{ mt: 1 }} />}>
                  <About />
                </React.Suspense>,
      }, 
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
