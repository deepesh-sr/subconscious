
import { useState } from "react";
import { Button } from "./components/ui/Button";
import Card from "./components/ui/Card.tsx";
import Signin from "./components/icons/Signin.tsx";
import AddContentModal from "./components/AddContentModal.tsx";


function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    
    <div className="flex flex-row p-4" >

      <div className="h-screen w-53">Siderbar</div>
      <div className="flex flex-col w-full">
        <div className="flex  justify-end gap-2">
          <Button 
            text="AddContent" 
            startIcon={<Signin />}
            onClick={() => setModalOpen(true)}
          />
          <Button text="Share" startIcon={<Signin />}></Button>
        </div>
        <div className="border-gray-200">
        <Card 
          icon1={<Signin />} 
          icon2={<Signin />} 
          icon3={<Signin />} 
          title={"Youtube"} 
          link={"youtube.com"} 
          content={<iframe width="250" height="200" src="https://www.youtube.com/embed/8INxnLlqrJw?si=lPghksoGHLA97jv5" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>} 
        />
        </div>
      </div>

      <AddContentModal open={modalOpen} setOpen={setModalOpen} />
    </div>
    
  )
}

export default App;