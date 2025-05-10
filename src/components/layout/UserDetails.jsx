import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/allusers");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
      console.error("❌ Axios error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">All Registered Users</h2>
      <table className="min-w-full text-sm text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">SN</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={u._id} className="border-t">
              <td className="px-4 py-2">{idx + 1}</td>
              <td className="px-4 py-2">{u.name}</td>
              <td className="px-4 py-2">{u.email || "-"}</td>
              <td className="px-4 py-2">{u.role || "user"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
