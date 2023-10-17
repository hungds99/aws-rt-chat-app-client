import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../providers/auth";
import "./style.css";

const AuthLayout = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" />;
  } else {
    return isLoading ? (
      <div className="auth-layout">
        <div className="auth-layout__content">
          <Outlet />
        </div>
      </div>
    ) : null;
  }
};

export default AuthLayout;
