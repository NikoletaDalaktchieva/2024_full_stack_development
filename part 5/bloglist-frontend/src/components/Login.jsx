import blogService from "../services/blogs";
import loginService from "../services/login";
import { useState } from "react";
import PropTypes from "prop-types";

const Login = ({ setUser, fetchBlogs, setNotificationErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");

      blogService.setToken(user.token);
      fetchBlogs();
    } catch (exception) {
      setNotificationErrorMessage("wrong username or password");
      setTimeout(() => {
        setNotificationErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  fetchBlogs: PropTypes.func.isRequired,
  setNotificationErrorMessage: PropTypes.func.isRequired,
};

Login.displayName = "Login";

export default Login;
