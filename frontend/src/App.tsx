import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/pages/Dashboard"
import Signup from "./components/pages/Signup"
import Signin from "./components/pages/Signin"


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
    </Routes>
    
    </>
  )
}

export default App