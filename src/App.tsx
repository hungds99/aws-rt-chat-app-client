import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AuthLayout from './pages/Auth/layout';
import Home from './pages/Home';
import ProtectLayout from './pages/ProtectLayout';
import RoomDetail from './pages/Rooms/RoomDetail';
import RoomsLayout from './pages/Rooms/layout';
import { AuthProvider } from './providers/auth';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
  {
    element: <ProtectLayout />,
    children: [
      {
        path: '/',
        index: true,
        element: <Home />
      },
      {
        path: '/rooms',
        element: <RoomsLayout />,
        children: [
          {
            path: ':roomId',
            element: <RoomDetail />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <h1>Not Found</h1>
  }
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
