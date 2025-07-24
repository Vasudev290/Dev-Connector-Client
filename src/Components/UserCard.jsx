import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useDispatch } from "react-redux";
import { removeFeed } from "../Slices/feedSlices";

const UserCard = (props) => {
  const { user } = props;
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;

  //Dispatch
  const dispatch = useDispatch();

  //Handle Send Request
  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div>
      <div className="card bg-base-300 w-80 h-full shadow-xl">
        <figure>
          <img src={photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{age + ",  " + gender}</p>
          <p>
            <strong>{skills}</strong>
          </p>
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Intersted
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
