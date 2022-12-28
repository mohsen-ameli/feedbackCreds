import { Link } from "react-router-dom"
import useFetch from "./hooks/useFetch"

const Navbar = () => {
  const { data } = useFetch("/get-user/1/")

  return (
    <nav className="fixed top-0 flex items-center justify-around z-10 w-full h-20 bg-gray-800 text-white">
      <Link to="/">hey</Link>
      <Link to="/">Current Credits {data.credit}FC</Link>
      <Link to="/">Login</Link>
      <Link to="/">Sign Up</Link>
    </nav>
  )
}

export default Navbar
