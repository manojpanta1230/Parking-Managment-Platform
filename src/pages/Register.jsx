// Register.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaParking } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyOtp from "./VerifyOTP";

const Register = () => {
  const [step, setStep] = useState("register"); // "register" or "verify"
  const [emailForOtp, setEmailForOtp] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone_no: formData.phone_no,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("✅ OTP sent to your email. Please verify to complete registration.");
        setEmailForOtp(formData.email);
        setStep("verify");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone_no: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
      } else {
        toast.error(data.message || "Registration failed.");
      }
      
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Something went wrong.");
    }
  };

  if (step === "verify") {
    return <VerifyOtp email={emailForOtp} />;
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <FaParking className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or {" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {[
              { name: "firstName", type: "text", placeholder: "First Name" },
              { name: "lastName", type: "text", placeholder: "Last Name" },
              { name: "email", type: "email", placeholder: "Email address" },
              { name: "phone_no", type: "number", placeholder: "Phone Number" },
              { name: "password", type: "password", placeholder: "Password" },
              { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
            ].map((field) => (
              <div key={field.name}>
                <input
                  name={field.name}
                  type={field.type}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div>
              <select
                name="role"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
          </div>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Register;