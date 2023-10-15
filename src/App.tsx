import { createContext, useEffect, useMemo, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { WSServices } from './api/ws';
import router from './router';
import { getUserFromJWT } from './shared/common/auth';
import { User } from './shared/interface/user';

interface AppContextProps {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  ws: WebSocket | null;
}

export const AppContext = createContext<AppContextProps>({
  authUser: null,
  setAuthUser: () => {},
  ws: null
});

function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const verifyApp = () => {
    const token = localStorage.getItem('accessToken');
    const user = getUserFromJWT(token);
    if (user) {
      setAuthUser(user);
      WSServices.auth(ws, user);
    }
  };

  const intWs = useMemo(() => {
    if (ws?.readyState === ws?.CLOSED || !ws) {
      const ws = new WebSocket('ws://127.0.0.1:3001');
      setWs(ws);
      return ws;
    }
    return ws;
  }, [ws]);

  useEffect(() => {
    return () => {
      if (ws.readyState === 1) {
        ws?.close(3000, 'Close connection');
      }
    };
  }, [ws, authUser]);

  useEffect(() => {
    verifyApp();
  }, []);

  return (
    <AppContext.Provider value={{ authUser, setAuthUser, ws }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
