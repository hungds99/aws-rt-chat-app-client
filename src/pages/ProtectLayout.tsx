import { useContext, useEffect } from 'react';
import { Outlet, redirect } from 'react-router-dom';
import { AuthContext } from '../providers/auth';
import { wsAuth } from '../api/websocket/auth';

const ProtectPage = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      redirect('/auth/login');
    }
    wsAuth.auth(user);
  }, [user]);

  return <Outlet />;
};

export default ProtectPage;
