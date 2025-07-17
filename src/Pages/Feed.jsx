import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../Slices/feedSlices";
import { useEffect } from "react";

const Feed = () => {
  //disptach
  const dispatch = useDispatch();

  //feed-useSelector
  const feeduseSelector = useSelector((state) => state.Feed);

  //fetchFeedData
  const getFeedData = async () => {
    try {
      if (feeduseSelector) return;
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
  return <div>Feed</div>;
};

export default Feed;
