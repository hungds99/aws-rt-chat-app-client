import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__content'>
        <div className='auth-layout__content--inner'>
          <div className='auth-layout__content--logo'>
            <img src={''} alt='logo' />
          </div>
          <div className='auth-layout__content--form'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
