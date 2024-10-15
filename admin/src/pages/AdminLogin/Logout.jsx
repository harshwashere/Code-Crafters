import { useEffect } from "react"
import useAuth from "../../auth/useAuth"
import { Navigate } from "react-router-dom"

const Logout = () => {
    const { LogoutUser } = useAuth()

    useEffect(() => {
        LogoutUser()
    }, [LogoutUser])

    const ans = confirm('Do you want to logout')
    if (ans === true) {
        return <Navigate to={"/"} />
    }
}

export default Logout