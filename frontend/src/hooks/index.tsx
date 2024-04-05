import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";


export interface Blogs {
    content : string
    title : string;
    id : string;
    author : {
        name : string
    }
}

export const useBlog = ({id}: {id : string}) =>{
    const [loading, setLoading] = useState(true);
    const [blog,setBlog] = useState<Blogs>();

    useEffect(() =>{
        const fetchData = async() =>{
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            });
            setBlog(response.data);
            setLoading(false)
        }
        fetchData()
    },[])
    return{
        loading,
        blog
    }
}

export const useBlogs = () =>{
   
    const [loading, setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blogs[]>([]);

    useEffect(() =>{
        const fetchData = async() =>{
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            });
            setBlogs(response.data);
            setLoading(false)
        }
        fetchData()
    },[])
    return{
        loading,
        blogs
    }
}

