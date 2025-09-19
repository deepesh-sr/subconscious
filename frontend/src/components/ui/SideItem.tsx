import type { ReactElement } from "react"

interface SideItemProps {
    icon: ReactElement;
    title: String;
}

const SideItem = ({ icon, title }: SideItemProps) => {
    return (
        <div className="flex gap-2">
            <div>
                {icon}
            </div>
            <div>
                {title}
            </div>
        </div>
    )
}

export default SideItem