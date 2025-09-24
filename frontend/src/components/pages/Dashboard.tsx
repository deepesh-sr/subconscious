
import { useState } from "react";
import Sidebar from "../Sidebar";
import { Button } from "../ui/Button";
import Signin from "../icons/SigninIcon";
import Card from "../ui/Card";
import AddContentModal from "../AddContentModal";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    
    <div className="flex flex-row p-4" >

      <div className="h-screen w-53"><Sidebar/></div>
      <div className="flex flex-col w-full">
        <div className="flex justify-end gap-2 bg-gray-50 p-2 ">
          <Button 
            text="AddContent" 
            startIcon={<Signin />}
            onClick={() => setModalOpen(true)}
            className="rounded-3xl"
          />
          <Button text="Share" className="rounded-3xl" startIcon={<Signin />}></Button>
        </div>
        <div className="border-gray-200 h-screen bg-gray-50 p-3 ">
        <Card
          icon1={<Signin />} 
          icon2={<Signin />} 
          icon3={<Signin />} 
          title={"Youtube"} 
          link={"youtube.com"} 
          content={<iframe width="250" height="200" className="rounded-3xl" src="https://www.youtube.com/embed/8INxnLlqrJw?si=lPghksoGHLA97jv5" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>} 
        />
        </div>
      </div>

      <AddContentModal open={modalOpen} setOpen={setModalOpen} />
    </div>
    
  )
}

export default Dashboard;