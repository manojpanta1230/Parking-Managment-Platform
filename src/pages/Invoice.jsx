import React from "react";

const Invoice = () => {
  // Sample data (replace with props or actual state if needed)
  const invoiceData = {
    name: "John Doe",
    vehicleNumber: "TX-2345",
    entryTime: "2025-03-31 10:00 AM",
    exitTime: "2025-03-31 02:30 PM",
    ratePerHour: 2.5,
  };

  // Calculate hours parked
  const parseTime = (timeStr) => new Date(Date.parse(timeStr));
  const entry = parseTime(invoiceData.entryTime);
  const exit = parseTime(invoiceData.exitTime);
  const hoursParked = Math.ceil((exit - entry) / (1000 * 60 * 60)); // Round up
  const totalAmount = (hoursParked * invoiceData.ratePerHour).toFixed(2);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Header with Logo */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <img src="Images/Logo.png" alt="Parking Logo sdd" className="h-12" />
        <h1 className="text-2xl font-bold text-gray-800">Parking Invoice</h1>
      </div>

      {/* Customer & Vehicle Info */}
      <div className="mb-6 space-y-2 text-sm text-gray-700">
        <p><span className="font-semibold">Customer Name:</span> {invoiceData.name}</p>
        <p><span className="font-semibold">Vehicle Number:</span> {invoiceData.vehicleNumber}</p>
        <p><span className="font-semibold">Entry Time:</span> {invoiceData.entryTime}</p>
        <p><span className="font-semibold">Exit Time:</span> {invoiceData.exitTime}</p>
        <p><span className="font-semibold">Total Duration:</span> {hoursParked} hour(s)</p>
      </div>

      {/* Charges */}
      <div className="border-t pt-4 text-sm text-gray-800">
        <p><span className="font-semibold">Rate per Hour:</span> ${invoiceData.ratePerHour}</p>
        <p><span className="font-semibold text-lg">Total Amount:</span> <span className="text-indigo-600 font-bold">${totalAmount}</span></p>
      </div>
    </div>
  );
};

export default Invoice;
