import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails';

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/:pokemonName",
    element: <PokemonDetails />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerConfig}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
