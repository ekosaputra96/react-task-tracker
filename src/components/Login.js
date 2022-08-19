import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
const Login = ({ setToken }) => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    // check
    if (!email) {
      alert("Please add an email");
      return;
    }

    if (!password) {
      alert("Please add a password");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_TODOS_LIST_API}/users/login`,
        {
          email,
          password,
        }
      );

      if (!data.success) {
        alert(data.msg);
        console.log(data);
        return;
      }
      // alert(`${data.msg} with account : ${data.data.email}`);
      setEmail("");
      setPassword("");
      setToken({ name: data.data.name, token: data.data.token });
      // return;
      history.push("/todos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h4>Welcome to Login Page </h4>
      <form action="" className="add-form" onSubmit={onLogin}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Login" className="btn btn-block" />
      </form>
      <p>
        have not an account ? <Link to="/">Register Here</Link>
      </p>
    </>
  );
};

export default Login;
