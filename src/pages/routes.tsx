import { useRoutes } from 'react-router-dom';
import About from './About';
import Auth from './Auth';
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
  ]);

  return element;
};

export default Routes;
