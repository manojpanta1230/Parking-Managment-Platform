import React, { useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    avatar: "https://i.pravatar.cc/100?img=3", // Example avatar
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const bookings = [
    {
      slot: 2,
      entryTime: "2025-03-31 10:00 AM",
      exitTime: "2025-03-31 02:00 PM",
      price: "$8.00",
    },
    {
      slot: 4,
      entryTime: "2025-03-29 11:30 AM",
      exitTime: "2025-03-29 01:00 PM",
      price: "$5.00",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setUser(formData);
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded mt-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">User Profile</h1>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="rounded-full h-24 w-24 border-4 border-indigo-500"
        />
      </div>

      {/* Profile Section */}
      <div className="mb-10 text-center">
        {editing ? (
          <div className="space-y-4 max-w-md mx-auto">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              placeholder="Phone Number"
            />
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="space-y-1 text-gray-700">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone}</p>
            <button
              onClick={() => setEditing(true)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Booking History */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600 text-center">Booking History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-200 shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border">Slot No.</th>
                <th className="p-3 border">Entry Time</th>
                <th className="p-3 border">Exit Time</th>
                <th className="p-3 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-3 border">{b.slot}</td>
                  <td className="p-3 border">{b.entryTime}</td>
                  <td className="p-3 border">{b.exitTime}</td>
                  <td className="p-3 border">{b.price}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 p-4">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
