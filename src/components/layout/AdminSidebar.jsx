import React from "react";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navItem = (label, key) => (
    <button
      onClick={() => setActiveTab(key)}
      className={`w-full text-left px-6 py-3 ${
        activeTab === key ? "bg-indigo-600 text-white" : "hover:bg-indigo-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <h2 className="text-2xl font-bold p-6 border-b">Admin</h2>
      {navItem("Dashboard", "dashboard")}
      {navItem("Manage Parking Slots", "slots")}
      {navItem("Vechile Details ", "users")}
      {navItem("User Details ", "users_details")}
      
    </div>
  );
};

export default AdminSidebar;
