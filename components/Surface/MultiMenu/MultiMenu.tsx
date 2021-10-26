import { FC } from "react"

export const MultiMenu : FC = ({children}) => {
    return (
        <div className="w-full mx-auto inset-x-0 bg-color-base shadow-md h-auto py-10 absolute bottom-10 left-0 transform translate-y-full pt-10 pb-6 z-20 rounded-xl">
            {children}
        </div>
    )
}

