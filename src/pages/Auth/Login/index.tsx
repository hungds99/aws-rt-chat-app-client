import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
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
  FormItem,
  FormLabel
} from '../../../components/ui/Form';
import { Input } from '../../../components/ui/Input';
import { Typography } from '../../../components/ui/Typography';
import { AuthContext } from '../../../providers/auth';
import './style.css';

const loginValidation = {
  email: Yup.string().email().required(),
  password: Yup.string().required()
};

const Login = () => {
  const { login } = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object(loginValidation),
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        navigate('/');
      } catch (error) {
        setIsError(true);
      }
    }
  });

  return (
    <Card className='auth__card'>
      <CardHeader className='auth__card__title'>
        <Typography as='h3'>Sign in with your account</Typography>
      </CardHeader>
      <CardContent>
        <Form onSubmit={formik.handleSubmit}>
          <FormItem>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <FormControl>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='example@gmail.com'
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <FormControl>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='********'
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
              />
            </FormControl>
          </FormItem>
          <Typography as='p' size='sm' color='danger'>
            {isError ? 'Invalid email or password' : ''}
          </Typography>
          <Button type='submit'>Login</Button>
        </Form>
      </CardContent>
      <CardFooter>
        <Divider />
        <Typography as='p'>
          Don't have an account? <Link to='/register'>Register</Link>
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default Login;
