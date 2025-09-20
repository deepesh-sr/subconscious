const Signup = () => {
  return (
    
        <div className=" flex justify-center items-center h-screen ">
            <div className="flex flex-row border-gray-50 outline-gray-100">
            <form className="border-2 rounded-2xl p-3 flex flex-col justify-center items-center" action="">
                <input type="text" name="Username" placeholder="Enter Username" />
                <input type="text" name="Password" placeholder="Enter Password" />
                <button className="w-full bg-amber-100" type="submit">Signup</button>
            </form>
            </div>
        </div>

  )
}

export default Signup