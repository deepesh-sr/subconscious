import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/pages/Dashboard"
import Signup from "./components/pages/Signup"
import Signin from "./components/pages/Signin"
import Home from "./components/pages/Home"


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dasboard" element={<Dashboard/>} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
    </Routes>
    
    </>
  )
}

export default App