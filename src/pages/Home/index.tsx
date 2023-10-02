import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to={"/auth"}>Login Page</Link>
    </div>
  );
};

export default Home;
