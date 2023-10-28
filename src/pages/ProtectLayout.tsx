import { useContext, useEffect } from 'react';
import { Outlet, redirect } from 'react-router-dom';
import { AuthContext } from '../providers/auth';

const ProtectPage = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      redirect('/auth/login');
    }
  }, [user]);

  return <Outlet />;
};

export default ProtectPage;
