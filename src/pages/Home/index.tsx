import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to={"/login"}>Login Page</Link>
      <br />
      <Link to={"/rooms"}>Rooms Page</Link>
    </div>
  );
};

export default Home;
