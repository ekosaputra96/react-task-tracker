import { Link } from "react-router-dom";

const About = ({ isLogin }) => {
  const path = isLogin === "" ? "/login" : "/todos";
  return (
    <div>
      <h4>Version 1.0.0</h4>
      <Link to={path}>Go Back</Link>
    </div>
  );
};

export default About;
