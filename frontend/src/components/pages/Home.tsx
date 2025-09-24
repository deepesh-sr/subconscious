import { Button } from '../ui/Button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    function handleSignup(){
        navigate('/signup')
    }
    function handleSignin(){
        navigate('/signin')
    }
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-3'>
      <div className='text-[100px] text-primary'>SUBCONSCIOUS</div>
      <div className='flex flex-row gap-3'>
        <Button color='primary' onClick={handleSignup} text='Signup'/>
        <Button color='primary' onClick={handleSignin} text='Signin'/>
      </div>
    </div>
  )
}

export default Home