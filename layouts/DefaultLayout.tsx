import { FC } from "react"
import Navigation from "../components/Navigation"


const DefaultLayout: FC = ({children}) => {
    return (
        <div className="bg-base relative">
            <Navigation />
        
        <main>
            {children}
        </main>
        </div>
    )
}

export default DefaultLayout
