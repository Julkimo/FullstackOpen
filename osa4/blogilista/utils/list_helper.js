const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const countLikes = (likeTotal, blog) => {
      return likeTotal + blog.likes
    }

    return blogs.reduce(countLikes, 0)
}

const favouriteBlog = (blogs) => {
    const compareBlogs = (currrentFavourite, blog) => {
        if(blog == null) { } // do nothing with empty blogs

        else if(currrentFavourite.likes < blog.likes)
            currrentFavourite = blog
      
      return currrentFavourite
    }
    
    const favourite = blogs.reduce(compareBlogs, blogs[0])
    return favourite
}
  
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}