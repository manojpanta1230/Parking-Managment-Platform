import React, { useState } from "react";
import { FaCar } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const ParkingLots = () => {
  const [slots, setSlots] = useState([
    { isOccupied: false },
    { isOccupied: false },
    { isOccupied: false },
    { isOccupied: false },
  ]);

  const handleToggleSlot = (index) => {
    const updatedSlots = [...slots];
    const currentStatus = updatedSlots[index].isOccupied;

    updatedSlots[index].isOccupied = !currentStatus;
    setSlots(updatedSlots);

    if (currentStatus) {
      toast.success(`Slot ${index + 1} unbooked`);
    } else {
      toast.success(`Slot ${index + 1} booked`);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center bg-gray-100 p-8">
      <Toaster position="top-center" reverseOrder={false} />
      
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Fixed Parking Slots</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
        {slots.map((slot, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => handleToggleSlot(index)}
              className={`w-full h-40 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 ${
                slot.isOccupied
                  ? "bg-red-200 hover:bg-red-300"
                  : "bg-green-200 hover:bg-green-300"
              }`}
            >
              <FaCar
                className={`h-12 w-12 ${
                  slot.isOccupied ? "text-red-600" : "text-green-700"
                }`}
              />
            </button>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-700 font-medium">
              Slot {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingLots;
