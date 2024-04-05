import AppBar from "../components/AppBar";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

const Blog = () => {
    const {id} = useParams()
    const {blog,loading} = useBlog({
        id : id || ''
    });

  return (
    <div>
        <AppBar />
        {loading ? <div> Loading....</div> : 
            <FullBlog  blog={blog}/>
        }
    </div>
    
  )
}

export default Blog