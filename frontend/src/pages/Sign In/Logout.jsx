import { useEffect } from "react"
import useAuth from "../../store/useAuth"
import { Navigate } from "react-router-dom"

const Logout = () => {
    const { LogoutUser } = useAuth()
    const ans = confirm('Do you want to logout?')

    useEffect(() => {
        if (ans === true) {
            LogoutUser()
        }
    }, [LogoutUser, ans])

    return <Navigate to={"/signin"} />
}

export default Logout