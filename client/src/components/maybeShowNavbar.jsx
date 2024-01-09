import { useState , useEffect } from "react"
import { useLocation } from "react-router-dom"

export const MaybeShowNavbar = ({children}) => {
    const [showNavbar , setShowNavbar] = useState(false)
    const location = useLocation()
    useEffect(()=> {
        // console.log(location);
        if (location.pathname === '/auth') {
            setShowNavbar(false)
        }else {
            setShowNavbar(true)
        }
      } , [location])
    
    return <>{showNavbar && children}</>
}