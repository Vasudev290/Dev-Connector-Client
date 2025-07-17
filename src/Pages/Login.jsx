import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Slices/userSlices";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constents";

const Login = () => {
  //Local State
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  //Dispatch
  const dispatch = useDispatch();

  //navigation
  const navigate = useNavigate();

  //Handle Login
  const handleLogin = async () => {
    try {
      const loggedUser = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(loggedUser.data.Login_User_Details));
      navigate("/feed");
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm h-80">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset py-2">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input pb-2"
              />
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pb-2"
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary m-2" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
