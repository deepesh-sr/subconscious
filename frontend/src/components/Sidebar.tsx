import Signin from "./icons/Signin"
import SideItem from "./ui/SideItem"

const Sidebar = () => {
  return (
    <div>
        <div>
            SUBCONSCIOUS            
        </div>
        <br />
        <div className="flex flex-col gap-1">
            <SideItem icon={<Signin/>} title={"Twitter"}/>
        </div>
    </div>
  )
}

export default Sidebar