import { NavLink } from 'react-router-dom'
import './Navbar.css'
import useAuth from '../../auth/useAuth'

export const Navbar = () => {
  const { isLoggedIn } = useAuth()

  return (
    <div className="navbar">
      <div className='titleDiv'>
        <h2>आई<span>❤️</span>tiffin</h2>
        <p>Admin Panel</p>
      </div>
      <div className='logoutBtn'>
        {isLoggedIn ?
          <NavLink to={"/logout"}><button>Log Out</button></NavLink>
          :
          <NavLink to={"/"}><button>Log In</button></NavLink>
        }
      </div>
    </div>
  )
}