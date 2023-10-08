import { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WSServices } from "./api/ws";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import { getUserFromJWT } from "./shared/common/auth";
import { User } from "./shared/interface/user";

interface AppContextProps {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  ws: WebSocket | null;
}

export const AppContext = createContext<AppContextProps>({
  authUser: null,
  setAuthUser: () => {},
  ws: null,
});

function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const verifyApp = () => {
    const token = localStorage.getItem("accessToken");
    const user = getUserFromJWT(token);
    if (user) {
      setAuthUser(user);
      WSServices.auth(ws, user);
    }
  };

  const intWs = useMemo(() => {
    if (ws?.readyState === ws?.CLOSED || !ws) {
      const ws = new WebSocket("ws://127.0.0.1:3001");
      setWs(ws);
      return ws;
    }
    return ws;
  }, [ws]);

  useEffect(() => {
    return () => {
      if (ws.readyState === 1) {
        ws?.close(3000, "Close connection");
      }
    };
  }, [ws, authUser]);

  useEffect(() => {
    verifyApp();
  }, []);

  return (
    <AppContext.Provider value={{ authUser, setAuthUser, ws }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="auth" element={<Auth />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="chat" element={<Chat />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
