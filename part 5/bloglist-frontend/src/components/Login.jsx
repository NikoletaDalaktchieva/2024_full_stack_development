import blogService from '../services/blogs'
import loginService from '../services/login'
import { useState } from 'react'



const Login = ({ setBlogs, setUser, fetchBlogs, setNotificationErrorMessage }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )


      setUser(user)
      setUsername('')
      setPassword('')

      blogService.setToken(user.token)
      fetchBlogs()
    } catch (exception) {
      console.log('Wrong credentials')
      setNotificationErrorMessage("wrong username or password")
      setTimeout(() => {
        setNotificationInfoMessage(null);
      }, 5000);
    }
  }

  return (<form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>) 
}
  
export default Login