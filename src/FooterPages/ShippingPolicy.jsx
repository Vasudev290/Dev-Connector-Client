import { Link } from "react-router-dom";

const ShippingPolicy = () => (
  <div className="max-w-4xl mx-auto px-4 py-10 text-gray-100">
    <h1 className="text-3xl font-bold mb-6">
      <Link
        to="https://merchant.razorpay.com/policy/QxeUaH7am5M6Wk/shipping"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-300"
      >
        Shipping Policy
      </Link>
    </h1>
    <p className="mb-4">Last updated: July 25, 2025</p>
    <p className="mb-4">
      DevConnector offers digital services, not physical products. Therefore,
      shipping is not applicable to our business model.
    </p>
    <h3 className="text-xl font-semibold mt-6 mb-2">Delivery Method</h3>
    <p className="mb-4">
      All services or digital deliverables are provided electronically via
      email, website login, or third-party integrations.
    </p>
    <h3 className="text-xl font-semibold mt-6 mb-2">Delivery Timeline</h3>
    <p className="mb-4">
      Most services are delivered immediately or within 1–3 business days of
      successful payment unless specified otherwise.
    </p>
    <h3 className="text-xl font-semibold mt-6 mb-2">Contact</h3>
    <p className="mb-4">
      If you have any questions about service delivery, feel free to contact us
      at contact@devconnector.info
    </p>
  </div>
);

export default ShippingPolicy;
