import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import useBlogs from "../hooks"


const Blogs = () => {
    const {loading, blogs} = useBlogs()

  return (
    <div>
        <AppBar />
        {loading ? <div>Loading...... </div> :  <div className="flex justify-center">
            <div >
                {blogs.map((blog) => (
                     <BlogCard authorName={blog.author.name}
                     title = {blog.title}
                     content = {blog.content}
                     publishedDate = '2nd Feb 2024'
                     id = {blog.id} />
                ))}
               
               
            </div>
            
        </div>}
       
    </div>
   
  )
}

export default Blogs