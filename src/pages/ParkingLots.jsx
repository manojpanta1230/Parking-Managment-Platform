import React, { useState, useEffect } from "react";
import { FaCar } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ParkingLots = () => {
  const [slots, setSlots] = useState([]);
  const totalSlots = 2;

  const fetchOccupiedSlots = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/plates");
      const activePlates = res.data.filter(
        (plate) => plate.entryTime && !plate.exitTime
      );

      // Create a slot array based on number of active vehicles
      const updatedSlots = Array(totalSlots)
        .fill({ isOccupied: false })
        .map((_, i) => ({
          isOccupied: !!activePlates[i],
        }));

      setSlots(updatedSlots);
    } catch (err) {
      toast.error("Error checking slot status");
      console.error("Axios error:", err);
    }
  };

  useEffect(() => {
    fetchOccupiedSlots(); // Initial fetch

    const interval = setInterval(fetchOccupiedSlots, 5000); // Real-time update every 5s
    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8">
      <Toaster />
      <h1 className="text-3xl font-bold mb-10">Fixed Parking Slots</h1>
      <div className="grid grid-cols-2 gap-6">
        {slots.map((slot, index) => (
          <div key={index} className="relative">
            <button
              className={`w-40 h-40 rounded-xl flex items-center justify-center transition-all ${
                slot.isOccupied ? "bg-red-200" : "bg-green-200"
              }`}
              disabled
            >
              <FaCar
                className={`h-12 w-12 ${
                  slot.isOccupied ? "text-red-600" : "text-green-700"
                }`}
              />
            </button>
            <p className="text-center mt-2 font-medium">Slot {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingLots;
