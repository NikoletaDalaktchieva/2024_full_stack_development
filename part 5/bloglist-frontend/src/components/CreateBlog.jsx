import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({blogs, setBlogs, setNotificationInfoMessage, setNotificationErrorMessage}) => {
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newUrl, setNewUrl] = useState("");


    const addBlog = (event) => {
        event.preventDefault();

        const newBlog = { title: newTitle, author: newAuthor, url: newUrl };
  
        blogService
        .create(newBlog)
        .then((response) => {
            setBlogs(blogs.concat(response.data));
            setNotificationInfoMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
            setNewTitle("");
            setNewAuthor("");
            setNewUrl("");
    
            setTimeout(() => {
                setNotificationInfoMessage(null);
            }, 5000);
        })
        .catch((e) => {
            if (e.response && e.response.data) {
                setNotificationErrorMessage(e.response.data.error)
            } else {
                setNotificationErrorMessage(e.message)
            }
            setTimeout(() => {
                setNotificationErrorMessage(null);
            }, 5000);
        });
    }

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
      };
    
      const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value);
      };

      const handleUrlChange = (event) => {
        setNewUrl(event.target.value);
      };


    return (<div>
    <form onSubmit={addBlog}>
        title: <input value={newTitle} onChange={handleTitleChange} /> <br/>
        author: <input value={newAuthor} onChange={handleAuthorChange} /> <br/>
        url: <input value={newUrl} onChange={handleUrlChange} /><br/>
        <button type="submit">create</button>
    </form> 
    </div>)
     
}
  
  export default CreateBlog