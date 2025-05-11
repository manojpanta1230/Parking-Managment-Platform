import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch booking details (this can be a separate API endpoint for bookings)
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/plates/getallplates"); // Example endpoint for bookings
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings(); // Initial fetch of booking data

    const interval = setInterval(() => {
      fetchBookings(); // Refresh booking data every 5 seconds (if needed)
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Booking Details</h2>
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2">Slot</th>
            <th className="px-4 py-2">Person's Name</th>
            <th className="px-4 py-2">Vehicle Number</th>
            <th className="px-4 py-2">Booking Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{item.slot}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.vehicleNumber}</td>
              <td className="px-4 py-2">
                {new Date(item.entryTime).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
