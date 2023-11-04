import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { wsAuth } from "../api/websocket/auth";
import { AuthContext } from "../providers/auth";

const ProtectPage = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    user && wsAuth.auth(user);
  }, [user]);

  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectPage;
