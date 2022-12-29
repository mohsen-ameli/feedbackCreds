import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import useFetch from "./hooks/useFetch"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)

  const { data } = useFetch(`/get-user/${user?.user_id}/`)

  return (
    <nav className="fixed top-0 flex items-center justify-around z-10 w-full h-20 bg-gray-800 text-white">
      <Link to="/">Logo</Link>
      {user ? (
        <>
          <Link to="/">Current Credits {data.credit}FC</Link>
          <button onClick={logout}>Log Out</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  )
}

export default Navbar
