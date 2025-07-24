import { useState } from "react";
import UserCard from "../Components/UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useDispatch } from "react-redux";
import { addUser } from "../Slices/userSlices";

const EditProfile = ({ user }) => {
  //Local State
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  //Dispatch
  const dispatch = useDispatch();

  //Save and edit profile data
  const saveProfile = async () => {
    setErrorMessage("");
    try {
      const resData = await axios.put(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          skills,
          photoUrl,
        },
        { withCredentials: true }
      );
      console.log(resData.data);
      dispatch(addUser(resData.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1500);
    } catch (error) {
      setErrorMessage(error?.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-80 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset py-1">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input pb-1"
                  />
                </fieldset>
                <fieldset className="fieldset py-1">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input pb-1"
                  />
                </fieldset>
                <fieldset className="fieldset py-1">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input pb-1"
                  />
                </fieldset>
                <fieldset className="fieldset py-1">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input pb-1"
                  />
                </fieldset>
                <fieldset className="fieldset py-1">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input pb-1"
                  />
                </fieldset>
                <fieldset className="fieldset py-1">
                  <legend className="fieldset-legend">Skills</legend>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="input pb-1"
                  />
                </fieldset>
                <fieldset className="fieldset py-1">
                  <legend className="fieldset-legend">About</legend>
                  <textarea
                    className="textarea h-24"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </fieldset>
              </div>
              <p className="text-red-500 text-center font-bold">
                {errorMessage}
              </p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary m-2" onClick={saveProfile}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, skills, photoUrl }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Profile has been Updated Successfull!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
