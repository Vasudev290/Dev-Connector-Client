import { useSelector } from "react-redux";
import EditProfile from "../Components/EditProfile";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
