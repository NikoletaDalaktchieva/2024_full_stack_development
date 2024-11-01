import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import CreateBlog from "./components/CreateBlog";
import NotificationInfo from "./components/NotificationInfo";
import NotificationError from "./components/NotificationError";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationInfoMessage, setNotificationInfoMessage] = useState(null);
  const [notificationErrorMessage, setNotificationErrorMessage] =
    useState(null);
  const blogFormRef = useRef();

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    } catch (e) {
      if (e.response.data.error.includes("Unauthorized")) setUser(null);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      fetchBlogs();
    }
  }, []);

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog.data));
        setNotificationInfoMessage(
          `a new blog ${returnedBlog.data.title} by ${returnedBlog.data.author} added`
        );
        setTimeout(() => {
          setNotificationInfoMessage(null);
        }, 5000);
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          setNotificationErrorMessage(e.response.data.error);
        } else {
          setNotificationErrorMessage(e.message);
        }
        setTimeout(() => {
          setNotificationErrorMessage(null);
        }, 5000);
      });
  };

  const updateBlog = (oldBlog, newBlog) => {
    blogService
      .update(oldBlog.id, newBlog)
      .then((returnedBlog) => {
        setBlogs(
          blogs
            .map((b) => (oldBlog.id === b.id ? returnedBlog.data : b))
            .sort((a, b) => b.likes - a.likes)
        );
      })
      .catch((e) => {
        console.log(e);
        setNotificationErrorMessage(`Cannot update blog ${oldBlog.name}`);
        setTimeout(() => {
          setNotificationErrorMessage(null);
        }, 5000);
      });
  };

  const deleteBlog = (blogToDelete) => {
    blogService
      .deleteBlog(blogToDelete.id)
      .then(() => {
        setBlogs(blogs.filter((bb) => bb.id !== blogToDelete.id));
      })
      .catch((e) => {
        console.log(e);
        setNotificationErrorMessage(`Cannot delete blog ${blogToDelete.name}`);
        setTimeout(() => {
          setNotificationErrorMessage(null);
        }, 5000);
      });
  };

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={logout}>logout</button>
      </p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateBlog createBlog={addBlog} user={user} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );

  return (
    <div>
      <NotificationInfo message={notificationInfoMessage} />
      <NotificationError message={notificationErrorMessage} />
      {user === null ? (
        <Login
          setBlogs={setBlogs}
          setUser={setUser}
          fetchBlogs={fetchBlogs}
          setNotificationErrorMessage={setNotificationErrorMessage}
        />
      ) : (
        blogForm()
      )}
    </div>
  );
};

export default App;
