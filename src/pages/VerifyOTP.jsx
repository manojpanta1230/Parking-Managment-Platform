import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


const VerifyOtp = ({ email }) => {
    const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ OTP Verified! Redirecting to login...");
        localStorage.setItem("token", data.token);
        
        setTimeout(() => {
          navigate("/login");
        }, 2000); // wait 2 seconds before redirecting
      
      
      } else {
        toast.error(data.message || "OTP verification failed.");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleVerify}
        className="bg-white p-8 rounded shadow-md max-w-sm w-full"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Enter OTP sent to {email}
        </h2>
        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Verify OTP
        </button>
        <ToastContainer position="top-center" autoClose={3000} />
      </form>
    </div>
  );
};

export default VerifyOtp;
