import React, { useContext, useState } from "react";
import { UserServices } from "../../../api/services/user";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card";
import { Form, FormItem } from "../../../components/ui/Form";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Typography } from "../../../components/ui/Typography";
import { AppContext } from "../../../context/app";
import { UserLogin } from "../../../shared/interface/user";

const Register = () => {
  const context = useContext(AppContext);
  const [user, setUser] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const authUser = await UserServices.login(user.email, user.password);
    context.setAuthUser(authUser);
  };

  return (
    <Card>
      <CardHeader>
        <Typography as="h1">Register new account</Typography>
      </CardHeader>
      <CardContent>
        <Form>
          <FormItem>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </FormItem>
          <div className="text-center">
            <Button className="btn" type="button" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Register;
