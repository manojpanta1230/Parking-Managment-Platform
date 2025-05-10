// Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

  // Fetch user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name); // Access the name from the stored user object
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage on logout
    setUserName(null); // Reset user name state
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">
                ParkingSystem
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            {userName ? (
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-2xl text-indigo-600" />
                <span className="text-sm text-gray-600 font-medium">
                  Welcome, {userName}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4 items-center">
                <Link to="/login" className="text-indigo-600 hover:underline">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
