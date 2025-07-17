import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const userData = useSelector((state) => state.user);
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          <img
            src="https://t3.ftcdn.net/jpg/03/21/60/14/360_F_321601471_5jOdjP9lF9MdYHErS2FQH0o1qgrVG3pC.jpg"
            alt="Dev-Connector Logo"
            className="h-8 w-8 mr-2 object-contain rounded" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/32x32/a855f7/ffffff?text=DC";
            }}
          />
          DevConnector
        </Link>
      </div>
      {userData && (
        <div className="flex gap-2">
          <div className="form-control flex items-center">Welcome, {userData.firstName}</div>
          <div className="dropdown dropdown-end mx-3">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="userData photo" src={userData.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
