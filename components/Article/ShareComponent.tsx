import { useState } from "react"
import { SaveIcon, ShareIcon } from "../Icons"

export const ShareComponent = () => {
    const [shared, setShared] = useState(false)
    return (
        <div className="flex items-center ... gap-3 justify-end">
            <button 
                className="rounded-full p-2 w-10 h-10 border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition"
                onClick={() => setShared(!shared)}    
            >
            <SaveIcon className="w-6 h-6" fill={shared ? "currentColor " : "none"} />
            </button>
            <button className="rounded-full p-2 w-10 h-10 border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition">
            <ShareIcon className="w-5 h-5" />
            </button>
        </div>
    )
}




