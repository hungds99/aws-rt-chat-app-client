import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AuthLayout from "./pages/Auth/layout";
import Messages from "./pages/Conversations/Messages";
import ConversationsLayout from "./pages/Conversations/layout";
import Home from "./pages/Home";
import ProtectLayout from "./pages/ProtectLayout";
import { AuthProvider } from "./providers/auth";

const router = createBrowserRouter([
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
    element: <ProtectLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/conversations",
        element: <ConversationsLayout />,
        children: [
          {
            path: ":roomId",
            element: <Messages />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
