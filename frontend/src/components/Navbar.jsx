import { Link } from "react-router-dom";

const Navbar = () => {
  return <>
    <nav className="fixed top-0 flex items-center justify-around z-10 w-full h-20 bg-gray-800 text-white">
      <Link to="/">Logo</Link>
      <Link to="/">Current Credits 0FC</Link>
      <Link to="/">Login</Link>
      <Link to="/">Sign Up</Link>
    </nav>
  </>
}
 
export default Navbar;