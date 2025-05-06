import React, { useRef } from "react";

const Invoice = ({ data, onClose }) => {
  const invoiceRef = useRef();

  if (!data) return null;

  const entry = new Date(data.entryTime);
  const exit = new Date(data.exitTime);
  const durationMinutes = Math.ceil((exit - entry) / (1000 * 60)); // Round up
  const price = durationMinutes * 1; // $1 per minute

  const handlePrint = () => {
    const printContents = invoiceRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=800,height=700');
    printWindow.document.write(`
      <html>
        <head>
          <title>Parking Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; margin-bottom: 20px; }
            .header img { height: 50px; }
            .header h1 { font-size: 24px; }
            .section { margin-bottom: 20px; }
            .section p { margin: 5px 0; font-size: 14px; }
            .bold { font-weight: bold; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-xl w-full bg-white p-6 shadow-lg rounded-lg relative" ref={invoiceRef}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <img src="Images/Logo.png" alt="Parking Logo" className="h-12" />
          <h1 className="text-2xl font-bold text-gray-800">Parking Invoice</h1>
        </div>

        {/* Customer & Vehicle Info */}
        <div className="mb-6 space-y-2 text-sm text-gray-700">
          <p><span className="font-semibold">Plate Number:</span> {data.plate}</p>
          <p><span className="font-semibold">Entry Time:</span> {entry.toLocaleString()}</p>
          <p><span className="font-semibold">Exit Time:</span> {exit.toLocaleString()}</p>
          <p><span className="font-semibold">Total Duration:</span> {durationMinutes} minute(s)</p>
        </div>

        {/* Charges */}
        <div className="border-t pt-4 text-sm text-gray-800">
          <p><span className="font-semibold">Rate per Minute:</span> $1</p>
          <p className="mt-1">
            <span className="font-semibold text-lg">Total Amount:</span>{" "}
            <span className="text-indigo-600 font-bold">${price}</span>
          </p>
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="absolute bottom-10 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Print Invoice
      </button>
    </div>
  );
};

export default Invoice;
