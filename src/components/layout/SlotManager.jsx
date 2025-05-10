import React, { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import axios from "axios";

const SlotManager = () => {
  const [slots, setSlots] = useState([]);
  const totalSlots = 2;

  const fetchParkingStatus = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/plates/getallplates");
      const activePlates = res.data.filter((plate) => !plate.exitTime);

      // Match booking logic: set slot based on stored slot number
      const updatedSlots = Array(totalSlots).fill({ isOccupied: false }).map((_, i) => ({
        isOccupied: !!activePlates.find(p => p.slot === i),
      }));

      setSlots(updatedSlots);
    } catch (error) {
      console.error("Failed to fetch slot status:", error);
    }
  };

  useEffect(() => {
    fetchParkingStatus();
    const interval = setInterval(fetchParkingStatus, 5000); // auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Parking Slot Status</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {slots.map((slot, i) => (
          <div key={i} className="p-4 bg-white shadow rounded-lg text-center">
            <div
              className={`w-full h-20 flex items-center justify-center rounded transition-colors duration-200 ${
                slot.isOccupied ? "bg-red-200" : "bg-green-200 hover:bg-green-300"
              }`}
            >
              <FaCar
                className={`h-6 w-6 ${
                  slot.isOccupied ? "text-red-600" : "text-green-600"
                }`}
              />
            </div>
            <div className="mt-2 text-sm text-gray-700">Slot {i + 1}</div>
            <div className="text-xs text-gray-500">
              {slot.isOccupied ? "Occupied" : "Available"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotManager;
