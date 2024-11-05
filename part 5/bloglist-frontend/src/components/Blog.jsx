import BlogDetailsToggable from "../components/BlogDetailsToggable";
import PropTypes from "prop-types";

const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
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

  const isCreator = blog.user.id == user.id;

  return (
    <div className="blogStyle">
      {blog.title} {blog.author}
      <BlogDetailsToggable buttonLabel="view">
        {
          <div>
            <p>{blog.url}</p>
            <p>
              likes {blog.likes}{" "}
              <button onClick={() => updBlog(blog)}>like</button>
            </p>
            <p>
              {blog.user.name}
              {isCreator && (
                <button onClick={() => dltBlog(blog)}>remove</button>
              )}
            </p>
          </div>
        }
      </BlogDetailsToggable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

Blog.displayName = "Blog";

export default Blog;
