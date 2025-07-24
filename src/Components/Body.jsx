import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Slices/userSlices";
import { useEffect } from "react";

const Body = () => {
  //Dispatch
  const dispatch = useDispatch();

  //Navigate
  const navigate = useNavigate();

  //use Selector
  const userStoreData = useSelector((state) => state.user);

  //Fetch data
  const fetchUserData = async () => {
    if (userStoreData) return;
    try {
      const userData = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(userData.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
