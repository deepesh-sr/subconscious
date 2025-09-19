interface AddContentModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AddContentModal = ({ open, setOpen }: AddContentModalProps) => {
  return (
    open && <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white border-blue-600 rounded-lg p-6 z-10 shadow-lg">
            <div><button onClick={()=>setOpen(false)} className="float-right text-gray-500 hover:text-gray-700">✕</button></div>
            <input type="text" placeholder="Enter title here" className="w-full p-2 border border-gray-300 rounded mt-4" />
        </div>
    </div>
  )
}

export default AddContentModal