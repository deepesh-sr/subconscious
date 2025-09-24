import axios from "axios"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

 async function handleSubmit(e : any){
  e.preventDefault();
try{

  const result = await axios.post('http://localhost:3000/api/v1/signup',{
    username : usernameInputRef.current?.value,
    password : passwordInputRef.current?.value
  });
  
  if(result.status === 200){
    alert("Signup done")
    navigate('/signin')
  } 
    
}catch(e){
  console.error("Siginup Failed",e);
}
  }
  return (
      <div className=" flex justify-center items-center h-screen ">
        <div className="flex flex-row border-gray-50 outline-gray-100">
          <form onSubmit={handleSubmit} className="border-2 rounded-2xl p-3 flex flex-col justify-center items-center" action="">
            <input ref={usernameInputRef} type="text" name="Username" placeholder="Enter Username" />
            <input ref={passwordInputRef} type="text" name="Password" placeholder="Enter Password" />
            <button type="submit" className="w-full bg-amber-100">Signup</button>
          </form>
        </div>
      </div>
  )
}

export default Signup