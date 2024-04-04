import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";


const useBlogs = () =>{
    interface Blogs {
        content : string
        title : string;
        id : string;
        author : {
            name : string
        }
    }
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

export default useBlogs