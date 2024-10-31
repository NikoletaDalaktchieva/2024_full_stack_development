import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'
import NotificationInfo from "./components/NotificationInfo"
import NotificationError from "./components/NotificationError"
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationInfoMessage, setNotificationInfoMessage] = useState(null);
  const [notificationErrorMessage, setNotificationErrorMessage] =
    useState(null);

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      fetchBlogs()
    }
  }, [])

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>

      <h2> create new</h2>
      <CreateBlog setBlogs ={setBlogs} blogs={blogs} setNotificationInfoMessage = {setNotificationInfoMessage} setNotificationErrorMessage={setNotificationErrorMessage}/>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return (
    <div>
      <NotificationInfo message={notificationInfoMessage} />
      <NotificationError message={notificationErrorMessage} />
     {user === null ?
      <Login setBlogs ={setBlogs} setUser = {setUser} fetchBlogs = {fetchBlogs} setNotificationErrorMessage = {setNotificationErrorMessage}/> :
      blogForm()
    }
    </div>
  )
}

export default App