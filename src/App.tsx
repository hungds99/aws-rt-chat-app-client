import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import { getUserFromJWT } from './shared/common/auth';
import { User } from './shared/interface/user';
import { WSServices } from './api/ws';

export const ws = new WebSocket('ws://127.0.0.1:3001', 'echo-protocol');

interface AppContextProps {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
}

export const AppContext = createContext<AppContextProps>({
  authUser: null,
  setAuthUser: () => {}
});

function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);

  const verifyApp = () => {
    const token = localStorage.getItem('accessToken');
    const user = getUserFromJWT(token);
    if (user) {
      setAuthUser(user);
      WSServices.auth(user);
    }
  };

  useEffect(() => {
    verifyApp();
    WSServices.subscribeConnection();
  }, []);

  return (
    <AppContext.Provider value={{ authUser, setAuthUser }}>
      <div className='bg-yellow-100 p-4 text-center'>Chat app</div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='auth' element={<Auth />} />
            <Route path='rooms' element={<Rooms />} />
            <Route path='chat' element={<Chat />} />
            <Route
              path='*'
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
