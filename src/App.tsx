import { createContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import { getUserFromJWT } from "./shared/common/auth";
import { User } from "./shared/interface/user";

interface AppContextProps {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  wss: WebSocket | null;
}

export const AppContext = createContext<AppContextProps>({
  authUser: null,
  setAuthUser: () => {},
  wss: null,
});

function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const wssRef = useRef<WebSocket | null>(null);

  const verifyApp = () => {
    const token = localStorage.getItem("accessToken");
    const user = getUserFromJWT(token);
    if (user) {
      setAuthUser(user);
      if (!wssRef?.current) {
        wssRef.current = new WebSocket("ws://localhost:3001", "echo-protocol");
        wssRef.current.onopen = () => {
          wssRef.current?.send(
            JSON.stringify({
              action: "auth",
              data: { ...user },
            }),
          );
        };
      }
    }
  };

  useEffect(() => {
    verifyApp();
  }, []);

  useEffect(() => {
    if (wssRef.current) {
      wssRef.current.onmessage = (event) => {
        console.log(event.data);
      };
    }
    return () => {
      if (wssRef.current) {
        // wssRef.current.close(1000, 'User disconnected');
        // wssRef.current = null;
      }
    };
  }, [authUser]);

  return (
    <AppContext.Provider value={{ authUser, setAuthUser, wss: wssRef.current }}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="auth" element={<Auth />} />
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
      </div>
    </AppContext.Provider>
  );
}

export default App;
