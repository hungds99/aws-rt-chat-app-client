import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { UserServices } from "../../api/user";
import { UserLogin } from "../../shared/interface/user";

const Auth = () => {
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
    <section className="h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h1>Auth Page</h1>
        <div className="flex flex-col gap-3 w-96">
          <input
            className="border"
            type="text"
            name="email"
            id="email"
            value={user.email}
            onChange={handleInputChange}
          />
          <input
            className="border"
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
