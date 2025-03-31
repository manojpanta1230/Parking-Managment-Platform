import React from "react";
import { FaParking, FaHeart, FaUser } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white px-6 py-16 flex items-center justify-center">
      <div className="max-w-4xl w-full text-center">
        {/* Heading */}
        <div className="mb-12">
          <FaParking className="mx-auto text-indigo-600 text-5xl mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
            About This System
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A smart parking management system — built for simplicity, control, and ease.
          </p>
        </div>

        {/* Creator Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 bg-white p-8 rounded-lg shadow-xl">
          <img
            src="Images/photo.jpg" // Place your photo in public folder with this name or update path
            alt="Creator"
            className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-indigo-200"
          />
          <div className="text-left">
            <div className="flex items-center gap-2 mb-2 text-indigo-600 font-semibold">
              <FaUser />
              <span>Meet the Developer</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Hey, I'm Manoj Panta 👋</h2>
            <p className="text-gray-600 mt-2">
              I built this parking management system with a focus on usability, performance, and style.
              Whether you're managing lots or booking slots — this tool is made with 💙 to make your life easier.
            </p>
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default AboutUs;
