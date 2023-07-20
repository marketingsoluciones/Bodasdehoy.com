import { AuthContextProvider, SidebarContextProvider } from '../context'
import { useRouter } from 'next/router';
import Link from 'next/link';

const ButtonEmpezar = () => {
    const { showButtons } = SidebarContextProvider()
    const router = useRouter()
    const { user } = AuthContextProvider()
    return (
        <>
            {(() => {
                if (!user && showButtons) {
                    return (
                        <div className="flex cursor-pointer bg-primary font-semibold rounded-full w-max px-4 text-xs py-2 text-color-base fixed md:bottom-24 bottom-32 right-1 md:right-6 z-30 items-center gap-2  transition-all duration-500 shadow-lg">
                            <Link href={`/login?d=${router.asPath.slice(1, router.asPath.length)}`} passHref>
                                <a>
                                    Empezar Gratis
                                </a>
                            </Link>
                        </div>
                    )
                }
            })()}
        </>
    )
}

export default ButtonEmpezar 