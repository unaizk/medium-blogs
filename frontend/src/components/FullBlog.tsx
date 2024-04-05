import { Blogs } from "../hooks"
import { Avatar } from "./BlogCard"


const FullBlog = ({blog } : {blog : Blogs}) => {
  return (
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
                <div className="col-span-8 ">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd Dec 2023
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 ">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    
                    <div className="flex w-full">
                        <div className="flex justify-center flex-col pr-4">
                            <Avatar size="big" name={blog.author.name}/>
                        </div>
                        
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name}
                            </div>
                    
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the users attention
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
  )
}

export default FullBlog