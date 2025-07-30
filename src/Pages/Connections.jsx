import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Slices/connectionSlices";
import { Link } from "react-router-dom";

const Connections = () => {
  //Dispatch
  const dispatch = useDispatch();

  //Subscribe store
  const connections = useSelector((state) => state.connections);

  //fetchUserConnections
  const fetchConnectionsData = async () => {
    try {
      const resConnections = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(resConnections.data.Connection_data));
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchConnectionsData();
  }, []);
  if (!connections) return null;
  if (connections.length === 0)
    return (
      <h1 className="font-bold text-3xl flex justify-center m-52">
        No Connections Found
      </h1>
    );
  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-bold text-3xl mb-6">Connections</h1>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            age,
            gender,
            photoUrl,
            about,
            skills,
          } = connection;

          return (
            <div
              key={_id}
              className="flex flex-row items-center gap-4 p-6 border rounded-xl shadow-md bg-base-300 hover:shadow-lg transition duration-300"
            >
              {/* Profile Picture */}
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 flex-shrink-0"
              />

              {/* Profile Info */}
              <div className="flex-grow text-left min-w-0">
                <h2 className="text-xl font-semibold break-words">
                  {firstName} {lastName}
                </h2>
                <p className="mt-2 break-words text-gray-300">
                  Age: {age} | Gender: {gender}
                </p>
                <p className="mt-2 text-gray-400">{about}</p>

                {skills && (
                  <p className="mt-1 text-sm text-blue-600 font-medium break-words">
                    Skills: {skills.join(", ")}
                  </p>
                )}
              </div>
              <Link to={`/chat/${firstName}/${_id}`}>
                <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                  Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
