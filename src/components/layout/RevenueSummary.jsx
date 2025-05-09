import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RevenueSummary = () => {
  const [plates, setPlates] = useState([]);
  const totalSpaces = 2;

  useEffect(() => {
    const fetchPlates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/plates");
        setPlates(res.data);
      } catch (error) {
        console.error("Error fetching plates:", error);
      }
    };

    fetchPlates();
  }, []);

  // Compute values
  const totalRevenue = plates.reduce((sum, p) => sum + (p.price || 0), 0);
  const totalVehiclesParked = plates.filter(p => p.entryTime && p.exitTime).length;
  const currentlyParked = plates.filter(p => p.entryTime && !p.exitTime).length;
  const availableSpaces = totalSpaces - currentlyParked;

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <div className="bg-white shadow rounded-lg text-center p-10">
        <p className="text-red-600 text-xl font-bold">${totalRevenue}</p>
        <p className="text-sm text-gray-500">Total Revenue</p>
      </div>
      <div className="bg-white shadow rounded-lg text-center p-10">
        <p className="text-indigo-700 text-xl font-bold">{totalVehiclesParked}</p>
        <p className="text-sm text-gray-500">Total Vehicles Parked</p>
      </div>
      <div className="bg-white shadow rounded-lg text-center p-10">
        <p className="text-indigo-700 text-xl font-bold">{totalSpaces}</p>
        <p className="text-sm text-gray-500">Total Parking Spaces</p>
      </div>
      <div className="bg-white shadow rounded-lg text-center p-10">
        <p className="text-green-700 text-xl font-bold">{availableSpaces}</p>
        <p className="text-sm text-gray-500">Available Spaces</p>
      </div>
    </div>
  );
};

export default RevenueSummary;
