import React, { useEffect, useState } from "react";
import axios from "axios";
import Invoice from "../../pages/Invoice";

const PlateTable = () => {
  const [plates, setPlates] = useState([]);
  const [selectedPlate, setSelectedPlate] = useState(null);

  // Fetch function
  const fetchPlates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/plates");
      setPlates(res.data);
    } catch (error) {
      console.error("Failed to fetch plates:", error);
    }
  };

  useEffect(() => {
    fetchPlates(); // Initial fetch

    const interval = setInterval(() => {
      fetchPlates(); // Refresh every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Parking Records</h2>
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2">Plate Number</th>
            <th className="px-4 py-2">Vehicle Type</th>
            <th className="px-4 py-2">Entry Time</th>
            <th className="px-4 py-2">Exit Time</th>
            <th className="px-4 py-2">Duration (mins)</th>
            <th className="px-4 py-2">Price ($)</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plates.map((item, index) => {
            const entry = item.entryTime ? new Date(item.entryTime) : null;
            const exit = item.exitTime ? new Date(item.exitTime) : null;
            const duration =
              entry && exit ? Math.ceil((exit - entry) / 60000) : null;

            return (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">
                  {item.vehicleNumber?.trim() ? item.vehicleNumber : item.plate}
                </td>

                <td className="px-4 py-2">{item.vehicleType || "-"}</td>
                <td className="px-4 py-2 text-gray-600">
                  {entry ? entry.toLocaleString() : "-"}
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {exit ? exit.toLocaleString() : "-"}
                </td>
                <td className="px-4 py-2">
                  {duration !== null ? `${duration} min` : "-"}
                </td>
                <td className="px-4 py-2 text-green-700 font-semibold">
                  {item.price != null ? `$${item.price}` : "-"}
                </td>
                <td className="px-4 py-2">
                  {entry && exit && (
                    <button
                      onClick={() => setSelectedPlate(item)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Generate Bill
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedPlate && (
        <Invoice data={selectedPlate} onClose={() => setSelectedPlate(null)} />
      )}
    </div>
  );
};

export default PlateTable;
  