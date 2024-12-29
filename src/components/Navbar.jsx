import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-8" src={logo} alt="Workflowlogo Chronly" />
              <span className="text-lg font-bold ml-2">Chronly</span>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
