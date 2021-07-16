import { FC } from "react"
import Footer from "../components/Footer"
import Navigation from "../components/Navigation"


const DefaultLayout: FC = ({children}) => {
    return (
        <div className="bg-base relative min-h-screen">
            <Navigation />
        
        <main>
            {children}
        </main>
        <Footer />
        </div>
    )
}

export default DefaultLayout
