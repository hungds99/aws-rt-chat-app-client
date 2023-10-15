import React, { useContext, useState } from "react";
import { UserServices } from "../../../api/user";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Form, FormItem } from "../../../components/ui/Form";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Text } from "../../../components/ui/Text";
import { Typography } from "../../../components/ui/Typography";
import { UserLogin } from "../../../shared/interface/user";
import { AppContext } from "../../../context/app";

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
