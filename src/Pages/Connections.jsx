import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Slices/connectionSlices";

const Connections = () => {
  //Dispatch
  const dispatch = useDispatch();

  //Subscribe store
  const connections = useSelector((state) => state.connections);

  //fetchUserConnections
  const fetchConnectionsData = async () => {
    try {
      const resConnections = await axios.get(BASE_URL + "/user/connections", {
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
  if (!connections) return;
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
        {connections.map((connection, index) => {
          const { firstName, lastName, age, gender, photoUrl, about, skills } =
            connection;

          return (
            <div
              key={index}
              className="flex items-center gap-6 p-6 border rounded-xl shadow-md bg-base-300 hover:shadow-lg transition duration-300"
            >
              {/* Profile Picture */}
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
              />

              {/* Profile Info */}
              <div className="text-left">
                <h2 className="text-xl font-semibold">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-300">
                  Age: {age} | Gender: {gender}
                </p>
                <p className="mt-2 text-gray-400">{about}</p>

                {skills && (
                  <p className="mt-1 text-sm text-blue-600 font-medium">
                    Skills: {skills.join(", ")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
