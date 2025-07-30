import React, { useState, useEffect } from "react";
import { FaCar } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

Modal.setAppElement("#root");

const ParkingLots = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const totalSlots = 2;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false); // New state for confirmation modal

  // Initialize state for the user and login status
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for user data on component mount
  useEffect(() => {
    let stored = null;
    try {
      const raw = localStorage.getItem("user");
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
      const activePlates = res.data.filter(p => p.booked === true);  // Filter by booked status

      const updatedSlots = Array(totalSlots)
        .fill({ isOccupied: false })
        .map((_, i) => ({
          isOccupied: !!activePlates.find(p => p.slot === i),
          _id: activePlates.find(p => p.slot === i)?._id,  // Add _id to each slot
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
    setModalIsOpen(true);
    setSelectedSlot(slotIndex);
  };

  const closeModal = () => {
    setSelectedSlot(null);
    setVehicleNumber("");
    setModalIsOpen(false);
  };

  // Handle booking of a slot
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
        booked: true,  // Add booked flag
      });

      toast.success("Slot booked successfully");
      closeModal();
      fetchOccupiedSlots();
    } catch (err) {
      toast.error("Failed to book slot");
      console.error(err);
    }
  };

  // Handle cancel booking for the selected slot
const handleCancelBooking = async () => {
  console.log("selectedSlot before cancellation:", selectedSlot);  // Log selectedSlot before making the request

  if (selectedSlot === null) {
    toast.error("No slot selected for cancellation");
    return;
  }

  try {
    const slotId = slots[selectedSlot]?._id;  // Get the _id of the selected slot booking

    if (!slotId) {
      toast.error("Slot ID not found");
      console.error("Slot ID is missing or invalid.");
      return;
    }

    // Send a DELETE request to remove the booking based on the slotId
    await axios.delete(`http://localhost:5000/api/plates/delete/${slotId}`, {
      data: { name: userName },  // Pass the user's name in the body to ensure the correct booking is canceled
    });

    toast.success("Booking canceled and data removed successfully");
    fetchOccupiedSlots(); // Refresh the slots after canceling
    setConfirmationModalIsOpen(false); // Close the confirmation modal after successful cancellation
  } catch (err) {
    toast.error("Failed to cancel booking");
    console.error(err);
  }
};

  // Show confirmation modal for unbooking
  const openConfirmationModal = (slotIndex) => {
    setSelectedSlot(slotIndex);  // Set the selected slot for confirmation
    setConfirmationModalIsOpen(true);  // Open the confirmation modal
  };

  const closeConfirmationModal = () => {
    setConfirmationModalIsOpen(false);  // Close the confirmation modal
    setSelectedSlot(null);  // Reset selected slot
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8">
      <Toaster />
      <h1 className="text-3xl font-bold mb-10">Fixed Parking Slots</h1>
      <div className="grid grid-cols-2 gap-6">
        {slots.map((slot, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => openModal(index)}  // Open modal on click
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

            {/* Show cancel booking button for occupied slots */}
            {slot.isOccupied && (
              <div
                className="absolute top-0 right-0 text-red-600 text-xl cursor-pointer"
                onClick={() => openConfirmationModal(index)} // Open confirmation modal on click
              >
                × Cancel Booking
              </div>
            )}
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

      {/* Confirmation Modal for Canceling Booking */}
      <Modal
        isOpen={confirmationModalIsOpen}
        onRequestClose={closeConfirmationModal}
        className="bg-white rounded p-6 max-w-md mx-auto mt-20 shadow"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40"
      >
        <h2 className="text-xl font-semibold mb-4">Cancel Booking for Slot {selectedSlot + 1}</h2>
        <p className="mb-2">Are you sure you want to cancel the booking for slot {selectedSlot + 1}?</p>
        <div className="flex justify-end gap-2">
          <button onClick={closeConfirmationModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleCancelBooking} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Confirm</button>
        </div>
      </Modal>
    </div>
  );
};

export default ParkingLots;
