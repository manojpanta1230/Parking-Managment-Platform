import React, { useState, useEffect } from "react";
import { FaCar } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

Modal.setAppElement("#root");

const ParkingLots = () => {
  const navigate = useNavigate(); // Initialize navigate function for redirection
  const [slots, setSlots] = useState([]);
  const totalSlots = 2;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState("");

  // Initialize state for the user and login status
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for user data on component mount
  useEffect(() => {
    let stored = null;
    try {
      const raw = localStorage.getItem("user");
      console.log(raw);
      stored = raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error("Invalid user data in localStorage");
      stored = null;
    }

    if (stored?.name) {
      setUserName(stored.name);
      setIsLoggedIn(true);  // If user is found in localStorage, set isLoggedIn to true
    } else {
      setUserName("");
      setIsLoggedIn(false); // If no user found, set isLoggedIn to false
    }
  }, []);

  // Fetch parking slots from backend
  const fetchOccupiedSlots = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/plates/getallplates");
      const activePlates = res.data.filter(p => !p.exitTime);

      const updatedSlots = Array(totalSlots)
        .fill({ isOccupied: false })
        .map((_, i) => ({
          isOccupied: !!activePlates.find(p => p.slot === i),
        }));

      setSlots(updatedSlots);
    } catch (err) {
      toast.error("Error checking slot status");
      console.error("Axios error:", err);
    }
  };

  useEffect(() => {
    fetchOccupiedSlots();
    const interval = setInterval(fetchOccupiedSlots, 5000);
    return () => clearInterval(interval);
  }, []);

  // Open modal to book slot
  const openModal = (slotIndex) => {
    if (!isLoggedIn) {
      toast.error("Please log in to book a slot");
      navigate("/login"); // Redirect to login page if not logged in
      return;
    }
    setSelectedSlot(slotIndex);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedSlot(null);
    setVehicleNumber("");
    setModalIsOpen(false);
  };

  const handleBooking = async () => {
    if (!vehicleNumber.trim()) {
      toast.error("Please enter a vehicle number");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/plates/book", {
        name: userName,
        vehicleNumber,
        slot: selectedSlot,
      });

      toast.success("Slot booked successfully");
      closeModal();
      fetchOccupiedSlots();
    } catch (err) {
      toast.error("Failed to book slot");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8">
      <Toaster />
      <h1 className="text-3xl font-bold mb-10">Fixed Parking Slots</h1>
      <div className="grid grid-cols-2 gap-6">
        {slots.map((slot, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => openModal(index)} // Open modal on click
              className={`w-40 h-40 rounded-xl flex items-center justify-center transition-all ${
                slot.isOccupied ? "bg-red-200" : "bg-green-200 hover:bg-green-300"
              }`}
              disabled={slot.isOccupied}
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

      {/* Modal for booking */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white rounded p-6 max-w-md mx-auto mt-20 shadow"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40"
      >
        <h2 className="text-xl font-semibold mb-4">Book Slot {selectedSlot + 1}</h2>
        <p className="mb-2">Name: <strong>{userName}</strong></p>
        <input
          type="text"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          placeholder="Enter vehicle number"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleBooking} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Confirm</button>
        </div>
      </Modal>
    </div>
  );
};

export default ParkingLots;
