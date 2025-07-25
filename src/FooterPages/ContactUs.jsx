import { Link } from "react-router-dom";


const ContactUs = () => (
  <div className="max-w-4xl mx-auto px-4 py-10 text-gray-100">
    <h1 className="text-3xl font-bold mb-6"><Link
        to="https://merchant.razorpay.com/policy/QxeUaH7am5M6Wk/contact_us"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-300"
      >
        Contact Us
      </Link></h1>
    <p className="mb-4">If you have any questions, feedback, or need support, please reach out to us:</p>
    <ul className="list-disc list-inside space-y-2">
      <li><strong>Email:</strong> contact@devconnector.info</li>
      <li><strong>Phone:</strong> +91-9360390832</li>
      <li><strong>Address:</strong> 123, 12th Main, Indiranagar, Bangalore, Karnataka, 560038.</li>
    </ul>
  </div>
);

export default ContactUs;
