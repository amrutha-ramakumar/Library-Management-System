import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, token, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-bold">
          LibraryApp
        </Link>
      </div>

      <div className="flex gap-4">
        {/* <Link to="/" className="hover:underline">
          Home
        </Link> */}

{!user && (
    <Link to="/" className="hover:underline">
      Home
    </Link>
  )}
  
        {user && (
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        )}

        {role === "ADMIN" && (
          <>
            <Link to="/allbooks" className="hover:underline">
              Manage Books
            </Link>
            <Link to="/users" className="hover:underline">
              View Users
            </Link>
            <Link to="/transactions" className="hover:underline">
              Transactions
            </Link>
          </>
        )}

        {role === "USER" && (
          <>
          <Link to="/books" className="hover:underline">
          Books
        </Link>
          <Link to="/borrowed-books" className="hover:underline">
            My Borrowed Books
          </Link>
          </>
        )}

        {user && (
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
        )}

        {!token ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
