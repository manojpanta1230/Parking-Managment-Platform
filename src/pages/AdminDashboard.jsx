import React, { useState } from "react";
import AdminSidebar from "../components/layout/AdminSidebar";
import AdminHeader from "../components/layout/AdminHeader";
import SlotManager from "../components/layout/SlotManager";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="p-6 overflow-y-auto">
          {activeTab === "dashboard" && (
            <h2 className="text-2xl font-bold mb-4">Welcome to Admin Panel</h2>
          )}
          {activeTab === "slots" && <SlotManager />}
          {activeTab === "users" && (
            <p className="text-lg">User Management Coming Soon...</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
