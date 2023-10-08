import { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { UserServices } from '../../api/user';
import { UserLogin } from '../../shared/interface/user';

const Auth = () => {
  const context = useContext(AppContext);
  const [user, setUser] = useState<UserLogin>({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    const authUser = await UserServices.login(user.email, user.password);
    context.setAuthUser(authUser);
  };

  return (
    <section className='section'>
      <div className='form-wrapper'>
        <h1 className='title'>Authentication</h1>
        <form className='form'>
          <div className='form-item'>
            <label className='form-label' htmlFor='email'>
              Email
            </label>
            <input
              className='form-input'
              type='text'
              name='email'
              id='email'
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-item'>
            <label className='form-label' htmlFor='password'>
              Password
            </label>
            <input
              className='form-input'
              type='password'
              name='password'
              id='password'
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <p className='text-center text-error'>
            Email or password is incorrect. Please try again.
          </p>
          <div className='text-center'>
            <button className='btn' type='button' onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Auth;
