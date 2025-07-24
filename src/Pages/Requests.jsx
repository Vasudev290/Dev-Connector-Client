import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequestData, removeRequestData } from "../Slices/requestSlices";

const Requests = () => {
  //disptach
  const dispatch = useDispatch();

  //subscribe store
  const requests = useSelector((state) => state.requests);

  //fetch Request Data
  const fetchRequestData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      const data = res?.data?.Fetched_Data_Details || [];
      dispatch(addRequestData(data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  //Review the Request
  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequestData(_id));
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchRequestData();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h1 className="text-3xl font-semibold text-gray-400">
          No Request Found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Connection Requests
      </h1>

      <div className="grid gap-6">
        {requests.map((request, index) => {
          const { firstName, lastName, age, gender, photoUrl, about, skills } =
            request.fromUserId;

          return (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-3 p-3 rounded-2xl shadow-lg border border-gray-700 bg-base-300 transition-all hover:scale-[1.01]"
            >
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-400"
              />

              <div className="text-center md:text-left">
                <h2 className="text-2xl font-semibold text-white">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-300 mb-2">
                  Age: {age} | Gender: {gender}
                </p>
                <p className="text-gray-400 mb-2">{about}</p>

                {skills?.length > 0 && (
                  <p className="text-sm text-blue-500 font-medium">
                    Skills: {skills.join(", ")}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
