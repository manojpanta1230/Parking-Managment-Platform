import React from 'react'

const RevenueSummary = () => (
    <div className="grid grid-cols-4 gap-4 mt-4 ">
      <div className="bg-white shadow rounded-lg  text-center p-10">
        <p className="text-red-600 text-xl font-bold">$135,600</p>
        <p className="text-sm text-gray-500">Total Revenue Last 12 Months</p>
      </div>
      <div className="bg-white shadow rounded-lg p-10 text-center">
        <p className="text-indigo-700 text-xl font-bold">$1,280</p>
        <p className="text-sm text-gray-500">Last Month (May)</p>
      </div>
      <div className="bg-white shadow rounded-lg p-10 text-center">
        <p className="text-indigo-700 text-xl font-bold">$11,126</p>
        <p className="text-sm text-gray-500">Last Quarter</p>
      </div>
      <div className="bg-white shadow rounded-lg p-10 text-center">
        <p className="text-indigo-700 text-xl font-bold">$126</p>
        <p className="text-sm text-gray-500">Today's Collection</p>
      </div>
    </div>
  );
  

export default RevenueSummary