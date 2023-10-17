import React, { useContext, useState } from 'react';
import { UserServices } from '../../../api/services/user';
import { Button } from '../../../components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '../../../components/ui/Card';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel
} from '../../../components/ui/Form';
import { Input } from '../../../components/ui/Input';
import { Label } from '../../../components/ui/Label';
import { Typography } from '../../../components/ui/Typography';
import { AppContext } from '../../../context/app';
import { UserLogin } from '../../../shared/interface/user';
import './style.css';
import { Divider } from '../../../components/ui/Divider';

const Login = () => {
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
    <Card className='auth__card'>
      <CardHeader className='auth__card__title'>
        <Typography as='h3'>Sign in with your account</Typography>
      </CardHeader>
      <CardContent>
        <Form>
          <FormItem>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <FormControl>
              <Input
                id='email'
                type='text'
                name='email'
                value={user.email}
                placeholder='example@gmail.com'
                onChange={handleInputChange}
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <Label htmlFor='password'>Password</Label>
            <FormControl>
              <Input
                id='password'
                type='password'
                name='password'
                value={user.password}
                placeholder='********'
                onChange={handleInputChange}
              />
            </FormControl>
          </FormItem>
          <Button className='btn' type='button' onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </CardContent>
      <CardFooter>
        <Divider />
        <Typography as='p' className='auth__card__footer'>
          Don't have an account? <a href='/signup'>Sign up</a>
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default Login;
