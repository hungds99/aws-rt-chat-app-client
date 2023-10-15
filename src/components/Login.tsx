import React, { useContext, useState } from "react";
import { Form } from "react-router-dom";
import { AppContext } from "../App";
import { UserServices } from "../api/user";
import { UserLogin } from "../shared/interface/user";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { FormItem } from "./ui/Form";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Text } from "./ui/Text";
import { Typography } from "./ui/Typography";

const Login = () => {
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
      <Typography as="h1">Authentication</Typography>
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
        <Text className="text-center text-error">
          Email or password is incorrect. Please try again.
        </Text>
        <div className="text-center">
          <Button className="btn" type="button" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default Login;
