import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/auth";

const ProtectPage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export default ProtectPage;
