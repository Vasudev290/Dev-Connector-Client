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
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginFrom, setIsLoginForm] = useState(true);

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
      setErrorMessage(error?.response?.data?.error || "Something went wrong!");
    }
  };

  //Handle toggle
  const handleToggleForm = () => {
    const newValue = !isLoginFrom;
    setIsLoginForm(newValue);
    navigate(newValue ? "/login" : "/signup");
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-80 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset py-1">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input pb-1"
              />
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pb-1"
              />
            </fieldset>
          </div>
          <p className="text-red-500 text-center font-bold">{errorMessage}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary m-2" onClick={handleLogin}>
              Login
            </button>
          </div>
          <p
            className="text-center font-bold cursor-pointer text-blue-500 hover:underline"
            onClick={handleToggleForm}
          >
            {isLoginFrom
              ? "New User? Sign Up Here!"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
