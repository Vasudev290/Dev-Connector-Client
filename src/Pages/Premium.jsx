import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useEffect, useState } from "react";

const Premium = () => {
  //local Variable
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/payment/premium/verify`, {
        withCredentials: true,
      });
      if (response.data && response.data.isPremium === true) {
        setIsUserPremium(true);
      } else {
        setIsUserPremium(false);
      }
    } catch (error) {
      console.error("Error verifying premium user:", error);
      setIsUserPremium(false);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const handleMembershipPurchase = async (type) => {
    try {
      const order = await axios.post(
        `${BASE_URL}/payment/create-order`,
        { membershipType: type },
        { withCredentials: true }
      );

      const { orderId, amount, currency, keyId, notes } = order.data;
      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Connector",
        description: `${type} Membership Payment`,
        order_id: orderId,
        prefill: {
          name: notes.firstName,
          email: notes.emailId,
        },
        theme: {
          color: "#F37254",
        },
        handler: async (response) => {
          console.log(
            "Razorpay payment successful. Re-verifying premium status...",
            response
          );
          setTimeout(async () => {
            await verifyPremiumUser();
          }, 1500);
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error handling membership purchase:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  return isUserPremium ? (
    <h1 className="font-bold text-3xl flex justify-center m-52">
      You're already a Premium User
    </h1>
  ) : (
    <div className="m-10">
      <h1 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h1>
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card bg-yellow-200 text-yellow-900 border-yellow-400 rounded-box grid h-72 grow place-items-center">
            <h1 className="font-bold text-3xl">Gold Membership</h1>
            <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
              Recommended
            </span>
            <ul className="font-semibold">
              <li>- Chat with other members</li>
              <li>- Connection Requests per day</li>
              <li>- Profile featured in top results</li>
              <li>- Priority customer support</li>
              <li>- 3 Months</li>
            </ul>
            <button
              onClick={() => handleMembershipPurchase("gold")}
              className="font-bold border border-dashed border-red-900 px-4 py-2 cursor-pointer hover:bg-yellow-300 transition duration-300 rounded-sm hover:rounded-lg"
            >
              Buy Now
            </button>
          </div>
          <div className="divider lg:divider-horizontal">OR</div>
          <div className="card bg-gray-200 text-gray-800 border-gray-400 rounded-box grid h-72 grow place-items-center">
            <h1 className="font-bold text-3xl">Silver Membership</h1>
            <ul className="font-semibold">
              <li>- Chat with other members</li>
              <li>- 50 Connection Requests per day</li>
              <li>- Standard customer support</li>
              <li>- 2 Months</li>
            </ul>
            <button
              onClick={() => handleMembershipPurchase("silver")}
              className="font-bold border border-dashed border-red-800 px-4 py-2 cursor-pointer hover:bg-gray-100 transition duration-300 rounded-sm hover:rounded-lg"
            >
              Buy Now
            </button>
          </div>
          <div className="divider lg:divider-horizontal">OR</div>
          <div className="card bg-amber-100 text-amber-900 border-amber-300 rounded-box grid h-72 grow place-items-center">
            <h1 className="font-bold text-3xl">Bronze Membership</h1>
            <ul className="font-semibold">
              <li>- 20 Connection Requests per day</li>
              <li>- Basic customer support</li>
              <li>- 15 Days</li>
            </ul>
            <button
              onClick={() => handleMembershipPurchase("bronze")}
              className="font-bold border border-dashed border-red-900 px-4 py-2 cursor-pointer hover:bg-amber-100 transition duration-300 rounded-sm hover:rounded-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
