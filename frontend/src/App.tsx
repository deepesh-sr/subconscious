
import { Button } from "./components/ui/Button";
import Signin from "./components/icons/Signin.tsx";


function App() {
  return (
    <>
    <Button  text="Login" startIcon={<Signin/>}></Button>
    </>
  )
}

export default App;