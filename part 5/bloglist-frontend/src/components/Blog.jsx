import BlogDetailsToggable from "../components/BlogDetailsToggable";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const updBlog = (oldBlog) => {
    const newBlog = {
      user: oldBlog.user.id,
      likes: oldBlog.likes + 1,
      author: oldBlog.author,
      title: oldBlog.title,
      url: oldBlog.url,
    };

    updateBlog(oldBlog, newBlog);
  };

  const dltBlog = (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.name} by ${blogToDelete.user.name}`
      )
    ) {
      deleteBlog(blogToDelete);
    }
  };

  return (
    <div className="blogStyle">
      {blog.title}
      <BlogDetailsToggable buttonLabel="view">
        {
          <div>
            {blog.url} <br />
            likes {blog.likes}{" "}
            <button onClick={() => updBlog(blog)}>like</button>
            <br />
            {blog.user.name} <br />
            <button onClick={() => dltBlog(blog)}>remove</button>
          </div>
        }
      </BlogDetailsToggable>
    </div>
  );
};

export default Blog;
