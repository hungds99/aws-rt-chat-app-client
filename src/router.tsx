import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AuthLayout from "./pages/Auth/layout";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/rooms",
    element: <Rooms />,
  },
  {
    path: "/chat/:roomId",
    element: <Chat />,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

export default router;
