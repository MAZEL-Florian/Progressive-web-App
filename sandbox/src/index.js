import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Agenda from './components/Agenda';
import Counter from './components/Counter';
import Typer from './components/Typer';
import Weather from './components/Weather';
import Home from './components/Home';

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/agenda",
        element: <Agenda/>
      },
      {
        path: "/counter",
        element: <Counter/>
      },
      {
        path: "/typer",
        element: <Typer/>
      },
      {
        path: "/weather",
        element: <Weather/>
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerConfig}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
