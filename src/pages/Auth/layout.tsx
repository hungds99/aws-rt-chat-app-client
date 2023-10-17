import { Outlet } from 'react-router-dom';
import './style.css';

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__content'>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
