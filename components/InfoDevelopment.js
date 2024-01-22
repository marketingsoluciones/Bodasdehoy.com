import { useEffect, useState } from "react"
import { AuthContextProvider } from "../context"
import { parseJwt } from "../utils/Authentication"
import Cookies from "js-cookie"

export const InfoDevelopment = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [isDevelopment, setIsDevelopment] = useState(false)
  const { user, userTemp } = AuthContextProvider()
  const [dateExpire, setDateExpire] = useState("")

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
    const idToken = Cookies.get("idTokenV0.1.0")
    const d = new Date(parseJwt(idToken).exp * 1000)
    setDateExpire(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)
  }, [isMounted])

  return (
    <>
      {isDevelopment &&
        <div className="absolute z-[1000] bg-blue-100">
          <ul className='text-xs font-display font-semibold ml-4 text-gray-800'>
            <li>url: {window?.location?.hostname}</li>
            <li>user: {user?.uid}</li>
            <li>userTemp: {userTemp?.uid}</li>
            <li>idTokenExp: {dateExpire}</li>
          </ul>
        </div>
      }
    </>
  )
}