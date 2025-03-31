import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally clear any user-related state here
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-700">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Logged in as Admin</span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
