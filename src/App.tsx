import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { wsAuth } from './api/websocket/auth';
import wsClient from './api/ws';
import { AppContext } from './context/app';
import router from './router';
import { getUserFromJWT } from './shared/common/auth';
import { User } from './shared/interface/user';

function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);

  const verifyApp = () => {
    const token = localStorage.getItem('accessToken');
    const user = getUserFromJWT(token);
    if (user) {
      setAuthUser(user);
      wsAuth.auth(user);
    }
  };

  useEffect(() => {
    return () => {
      if (wsClient.readyState === 1) {
        wsClient.close(3000, 'Close connection');
      }
    };
  }, []);

  useEffect(() => {
    verifyApp();
  }, []);

  return (
    <AppContext.Provider value={{ authUser, setAuthUser }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
