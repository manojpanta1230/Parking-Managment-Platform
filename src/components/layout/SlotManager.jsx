import React, { useState } from "react";
import { FaCar } from "react-icons/fa";

const SlotManager = () => {
  const [slots, setSlots] = useState(Array(4).fill({ isOccupied: false }));

  const toggleSlot = (index) => {
    const updated = [...slots];
    updated[index] = { isOccupied: !updated[index].isOccupied };
    setSlots(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Parking Slots</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {slots.map((slot, i) => (
          <div key={i} className="p-4 bg-white shadow rounded-lg text-center">
            <button
              onClick={() => toggleSlot(i)}
              className={`w-full h-20 flex items-center justify-center rounded transition-colors duration-200 ${
                slot.isOccupied
                  ? "bg-red-200 cursor-not-allowed"
                  : "bg-green-200 hover:bg-green-300"
              }`}
            >
              <FaCar
                className={`h-6 w-6 ${
                  slot.isOccupied ? "text-red-600" : "text-green-600"
                }`}
              />
            </button>
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
