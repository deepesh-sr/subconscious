import type { ReactElement } from "react"

interface cardProps{
    icon1 : ReactElement;
    icon2 : ReactElement;
    icon3 : ReactElement;
    title : String;
    content : ReactElement;
    link : String
}

const Card = ({icon1,icon2,icon3,title,content,link} : cardProps) => {
  return (
    <div className="shadow-lg flex-col border-gray-900 bg-gray-50 h-auto overflow-x-hidden w-72 outline-amber-50">
        <div className="flex justify-around items-center">
            <div className="flex-shrink px-2 py-2 bg mx-2 my-2">{icon1}</div>
            <div className="flex justify-center flex-1 px-2 py-2 mx-2 my-2">{title}</div>
            <div className="flex-shrink px-2 py-2 bg-gray-100 mx-2 my-2">{icon2}</div>
            <div className="flex-shrink px-2 py-2 bg-gray-100 mx-2 my-2">{icon3}</div>
        </div>
        <div className=" flex-1 px-2 py-2 mx-2">
            {content}
        </div>
        <div className="flex-1 px-2 py-2 mx-2">
            {link}
        </div>
    </div>
  )
}

export default Card