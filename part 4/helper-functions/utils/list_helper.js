const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}


const favoriteBlog = (blogs) => {
  if(!blogs[0]) return null
  return blogs.reduce((mostLiked, blog) => {
    return (blog.likes > mostLiked.likes) ? blog : mostLiked
  }, blogs[0])
}


const mostBlogs = (blogs) => {
  if (!blogs[0]) return null

  const authorBlogCount = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1
    return count
  }, {})

  let topAuthor = { author: '', blogs: 0 }
  for (const [author, blogCount] of Object.entries(authorBlogCount)) {
    if (blogCount > topAuthor.blogs) {
      topAuthor = { author, blogs: blogCount }
    }
  }
  return topAuthor
}


const mostLikes = (blogs) =>  {
  if(!blogs[0]) return null

  const authorLikesCount = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + blog.likes
    return count
  }, {})

  let topAuthor = { author: '', likes: 0 }
  for (const [author, likes] of Object.entries(authorLikesCount)) {
    if (likes > topAuthor.likes) {
      topAuthor = { author: author, likes: likes }
    }
  }

  return topAuthor
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}