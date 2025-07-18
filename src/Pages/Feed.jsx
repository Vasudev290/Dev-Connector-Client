import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../Slices/feedSlices";
import { useEffect } from "react";
import UserCard from "../Components/UserCard";

const Feed = () => {
  //disptach
  const dispatch = useDispatch();

  //feed-useSelector
  const feedData = useSelector((state) => state.feed);

  //fetchFeedData
  const getFeedData = async () => {
    try {
      if (feedData) return;
      const resFeed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeedData(resFeed?.data?.User_Feed_Data));
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    getFeedData();
  }, []);
  if (!feedData) return;
  if (feedData.length < 0)
    return (
      <h1 className="text-3xl font-semibold text-gray-400">
        No new users found!
      </h1>
    );
  return (
    feedData && (
      <div className="flex justify-center my-6">
        <UserCard user={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
