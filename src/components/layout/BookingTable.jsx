import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch booking details
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/plates/getallplates");
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings(); // Initial fetch

    const interval = setInterval(() => {
      fetchBookings(); // Refresh data every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup
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
            <th className="px-4 py-2">Exit Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((item, index) => {
            const personName = item.name?.trim() ? item.name : "Guest";
            const vehicleNum = item.vehicleNumber?.trim() ? item.vehicleNumber : item.plate;
            const bookingTime = item.entryTime ? new Date(item.entryTime).toLocaleString() : "-";
            const exitTime = item.exitTime ? new Date(item.exitTime).toLocaleString() : "-";

            return (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{item.slot}</td>
                <td className="px-4 py-2">{personName}</td>
                <td className="px-4 py-2">{vehicleNum}</td>
                <td className="px-4 py-2">{bookingTime}</td>
                <td className="px-4 py-2">{exitTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
