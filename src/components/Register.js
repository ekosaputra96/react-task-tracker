import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // on submit
  const submit = async (x) => {
    x.preventDefault();
    // check email
    if (!email) {
      alert("Please add an email");
      return;
    }

    if (!name) {
      alert("Please add a name");
      return;
    }
    if (!password) {
      alert("Please add a password");
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_TODOS_LIST_API}/users/register`,
        {
          email,
          name,
          password,
        }
      );
      if (!data.success) {
        alert(data.msg);
        return;
      }
      setEmail("");
      setPassword("");
      setName("");
      alert(data.msg);
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h4>Welcome to Register</h4>
      <form action="" className="add-form" onSubmit={submit}>
        <div className="form-control">
          <label htmlFor="email">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name..."
            value={name}
            onChange={(x) => {
              return setName(x.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            value={email}
            onChange={(x) => {
              return setEmail(x.target.value);
            }}
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
            onChange={(x) => {
              return setPassword(x.target.value);
            }}
          />
        </div>
        <input type="submit" value="Register" className="btn btn-block" />
      </form>
      <p>
        Already have an acoount ? <Link to="/login">Login Here</Link>
      </p>
    </>
  );
};

export default Register;
