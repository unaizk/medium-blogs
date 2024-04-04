import { Avatar } from "./BlogCard"

const AppBar = () => {
  return (
    <div className="flex justify-between px-10 py-4 border-b">
        <div className="flex justify-center flex-col">
            Medium
        </div>
        <div>
            <Avatar name="Unais" size='big'/>
        </div>
    </div>
  )
}

export default AppBar