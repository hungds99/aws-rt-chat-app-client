import { useRoutes } from 'react-router-dom';
import About from './About';
import Auth from './Auth';
import Chat from './Chat';
import Home from './Home';

const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: 'about',
          element: <About />,
        },
      ],
    },
    { path: 'auth', element: <Auth /> },
    { path: 'chat', element: <Chat /> },
  ]);

  return element;
};

export default Routes;
