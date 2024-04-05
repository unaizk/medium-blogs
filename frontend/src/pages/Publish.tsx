import { ChangeEvent, useState } from 'react'
import AppBar from '../components/AppBar'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const Publish = () => {
    const [title, setTitle] = useState('');
    const [description , setDescription] = useState('')
    const navigate = useNavigate()
  return (
    <div>
        <AppBar /> 
        <div className='flex justify-center pt-10'>
            <div className='max-w-screen-lg w-full'>
                <input onChange={(e) =>{setTitle(e.target.value)}} type="text" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="Title"></input>
                <TextEditor  onChange={(e) =>{
                    setDescription(e.target.value)
                }}/>
                <button onClick={async() =>{
                    const response  = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content : description
                    },{
                        headers : {
                            Authorization : localStorage.getItem("token")
                        }
                    })
                    navigate(`/blog/${response.data.id}`)
                }} className='mt-2 inline-flex item-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800'>
                    Publish Post
            </button>
            </div>
        </div>
    </div>
    
  )
}

const TextEditor = ({onChange} : {onChange : (e: ChangeEvent<HTMLTextAreaElement>) => void}) =>{
    return (
        
<div>
   <div className='w-full mb-4'>
        <div className='flex item-center justify-between border'>
            <div className=' bg-white rounded-b-lg w-full'>
                <label className='sr-only'>Publish post</label>
                <textarea onChange={onChange} rows={8} className='focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2' placeholder='Write an article... ' required />
            </div>
        </div>
       
   </div>
</div>

    )
}

export default Publish