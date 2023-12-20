import { useEffect, useState } from "react"
import { AuthContextProvider, EventContextProvider } from "../context"

export const InfoDevelopment = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [isDevelopment, setIsDevelopment] = useState(false)
  const { user, userTemp } = AuthContextProvider()

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
    return () => {
      setIsMounted(false)
    }
  }, [])

  useEffect(() => {
    const path = window?.location?.hostname
    const c = path?.split(".")
    const idx = c?.findIndex(el => el === "com")
    setIsDevelopment(idx === -1)
  }, [isMounted])


  return (
    <>
      {isDevelopment &&
        <div className="absolute z-[1000] bg-blue-100">
          <ul className='text-xs font-display font-semibold ml-4 text-gray-800'>
            <li>url: {window?.location?.hostname}</li>
            <li>user: {user?.uid}</li>
            <li>userTemp: {userTemp?.uid}</li>
            {/* <li>domain: {config?.domain}</li>
            <li>event?.nombre: {event?.nombre}</li> */}
          </ul>
        </div>
      }
    </>
  )
}