import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home';
import { PostsProvider } from './contexts/PostsProvider';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostsProvider>
      <RouterProvider router={router} />
    </PostsProvider>
  </React.StrictMode>,
)
