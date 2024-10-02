import { useEffect } from "react"
import useAuth from "../../store/useAuth"
import { Navigate } from "react-router-dom"

const Logout = () => {
    const { LogoutUser } = useAuth()

    useEffect(() => {
        LogoutUser()
    }, [LogoutUser])

    return <Navigate to={"/signin"} />
}

export default Logout