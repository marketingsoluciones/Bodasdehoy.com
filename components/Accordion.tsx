import { ReactChild, useState } from "react"
import { ArrowIcon } from "./icons"

const Accordion = ({title = "Lorem ipsum", children} : {title: string, children?: ReactChild}) => {
    const [isOpen, setOpen] = useState(false)
    return (
        <div className="w-full">
            <div
             onClick={() => setOpen(!isOpen)}
             className="text-gray-300 p-3 bg-color-base rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-100 transition">
            <h2 className={`${isOpen ? "text-gray-300" : "text-gray-200"} text-sm`}>{title}</h2>
            <ArrowIcon width={3} className={`transform w-6 h-6 rotate-90 text-primary transition ${isOpen ? "-rotate-90 duration-700" : ""}`} />
            </div>
            <div className={`overflow-hidden transition-all duration-500 h-auto  ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="accordion-content text-sm">{children}</div>
      </div>
        </div>
    )
}

export default Accordion
