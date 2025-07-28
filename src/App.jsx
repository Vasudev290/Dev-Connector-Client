import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Feed from "./Pages/Feed";
import Connections from "./Pages/Connections";
import Requests from "./Pages/Requests";
import Signup from "./Pages/SignUp";
import TermsAndConditions from "./FooterPages/TermsAndConditions";
import CancellationRefund from "./FooterPages/CancellationRefund";
import ShippingPolicy from "./FooterPages/ShippingPolicy";
import ContactUs from "./FooterPages/ContactUs";
import PrivacyPolicy from "./FooterPages/PrivacyPolicy";
import Premium from "./Pages/Premium";

const App = () => {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route
              path="/cancellation-refund-policy"
              element={<CancellationRefund />}
            />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
