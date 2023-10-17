import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '../../../components/ui/Card';
import { Divider } from '../../../components/ui/Divider';
import {
  Form,
  FormControl,
  FormGroup,
  FormItem,
  FormLabel
} from '../../../components/ui/Form';
import { Input } from '../../../components/ui/Input';
import { Label } from '../../../components/ui/Label';
import { Typography } from '../../../components/ui/Typography';
import { UserLogin } from '../../../shared/interface/user';
import './style.css';

const Register = () => {
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

  const handleRegister = async () => {};

  return (
    <Card className='auth__card'>
      <CardHeader className='auth__card__title'>
        <Typography as='h3'>Create new account</Typography>
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
          <FormGroup>
            <FormItem>
              <FormLabel htmlFor='firstName'>First Name</FormLabel>
              <FormControl>
                <Input
                  id='firstName'
                  type='text'
                  name='firstName'
                  value={user.email}
                  placeholder='John'
                  onChange={handleInputChange}
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel htmlFor='lastName'>Last Name</FormLabel>
              <FormControl>
                <Input
                  id='lastName'
                  type='text'
                  name='lastName'
                  value={user.email}
                  placeholder='Doe'
                  onChange={handleInputChange}
                />
              </FormControl>
            </FormItem>
          </FormGroup>
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
          <Button className='btn' type='button' onClick={handleRegister}>
            Register
          </Button>
        </Form>
      </CardContent>
      <CardFooter>
        <Divider />
        <Typography as='p'>
          You have an account? <Link to='/login'>Login</Link>
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default Register;
