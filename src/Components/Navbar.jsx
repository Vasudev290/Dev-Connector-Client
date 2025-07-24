import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constents";
import { removeUser } from "../Slices/userSlices";

const Navbar = () => {
  //useSelector
  const userData = useSelector((state) => state.user);

  //Dispatch
  const dispatch = useDispatch();

  //Navigate
  const navigate = useNavigate();

  //HandleLogout
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {
        withCredentials: true,
      });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          <img
            src="https://i.pinimg.com/736x/f8/4a/e3/f84ae37ddc41832d9c0a67b622f1b19e.jpg"
            alt="Dev-Connector Logo"
            className="h-8 w-8 mr-2 object-contain rounded"
            
          />
          DevConnector
        </Link>
      </div>
      {userData && (
        <div className="flex gap-2">
          <div className="form-control flex items-center">
            Welcome, {userData.firstName}
          </div>
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
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
 