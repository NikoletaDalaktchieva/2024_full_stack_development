import { useState } from "react";

const CreateBlog = ({ createBlog, user }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user.id,
    };
    createBlog(newBlog);
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  return (
    <div>
      <h2> create new</h2>
      <form onSubmit={addBlog}>
        title:{" "}
        <input
          value={newTitle}
          onChange={handleTitleChange}
          data-testid="title-input"
        />{" "}
        <br />
        author:{" "}
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
          data-testid="author-input"
        />{" "}
        <br />
        url:{" "}
        <input
          value={newUrl}
          onChange={handleUrlChange}
          data-testid="url-input"
        />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
