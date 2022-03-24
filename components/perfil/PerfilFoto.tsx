import { AuthContextProvider } from "../../context"

export const PerfilFoto = () =>{
    const {user} = AuthContextProvider()
    return (
        <div className="w-full flex flex-col items-center justify-center gap-2">
                <img src={user?.photoURL ?user?.photoURL:"/placeholder/user.png"} alt={"imagen del perfil"} className="border-primary border-2 rounded-full objeto-cover h-40 w-40" />   
                <h2 className="text-xl font-semibold w-full text-center text-tertiary">{user?.displayName}</h2>
                <div className="w-fit flex items-center gap-1 text-tertiary -mt-3">
                <small className="text-gray-700">{user?.role && user.role.length > 0 && user?.role[0]}</small>
                |
                <small>{user?.city}</small>
                </div>
        </div>
    )
}

