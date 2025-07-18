import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Slices/userSlices";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    emailId: "",
    password: "",
    photoUrl: "",
    about: "",
    skills: "",
  });

  const [isLoginFrom, setIsLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    try {
      const payload = {
        ...formData,
        age: Number(formData.age),
        skills: formData.skills.split(",").map((skill) => skill.trim()),
      };

      const resSignup = await axios.post(`${BASE_URL}/signup`, payload, {
        withCredentials: true,
      });
      dispatch(addUser(resSignup.data));
      setSuccessMessage("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(error?.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center my-8">
      <div className="card bg-base-300 w-full max-w-xl shadow-md">
        <div className="card-body">
          <h2 className="card-title justify-center">Sign Up</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["First Name", "firstName"],
              ["Last Name", "lastName"],
              ["Age", "age"],
              ["Gender", "gender"],
              ["Email", "emailId"],
              ["Password", "password"],
              ["Photo URL", "photoUrl"],
              ["About", "about"],
              ["Skills (comma separated)", "skills"],
            ].map(([label, name]) => (
              <div key={name}>
                <label className="label text-sm font-semibold">{label}</label>
                {name === "about" ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={3}
                  />
                ) : (
                  <input
                    type={name === "password" ? "password" : "text"}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                )}
              </div>
            ))}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center font-bold mt-2">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 text-center font-bold mt-2">
              {successMessage}
            </p>
          )}

          <div className="card-actions justify-center mt-4">
            <button className="btn btn-success" onClick={handleSignup}>
              Signup
            </button>
          </div>
          <p
            className="text-center font-bold cursor-pointer py-1 hover:underline"
            onClick={() => {
              setIsLoginForm((prev) => {
                const newValue = !prev;
                navigate(newValue ? "/login" : "/signup");
                return newValue;
              });
            }}
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

export default Signup;
