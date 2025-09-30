// components/CustomPopup.jsx
import React from "react";

const CustomPopup = ({ isOpen, status, title, subtitle, onClose }) => {
  if (!isOpen) return null;

  const isSuccess = status === "success";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 max-md:px-7">
      <div className="bg-white rounded-lg shadow-lg md:px-20 px-5 py-8 max-w-md w-full text-center">
        {/* Status Icon */}
        <div className="flex justify-center mb-1">
          <img
            src={isSuccess ? "/image/home/tick.png" : "/image/home/cross.png"}
            alt={isSuccess ? "Success" : "Error"}
            className="w-16 h-16"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-600 mb-6">{title}</h2>

        {/* Subtitle */}
        <p className="text-gray-700 mb-6 text-lg capitalize">{subtitle}</p>

        {/* Button */}
        <button
          onClick={onClose}
          className={`px-6 py-1.5 cursor-pointer rounded-md text-white font-semibold ${
            isSuccess ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isSuccess ? "Okay" : "Try Again"}
        </button>
      </div>
    </div>
  );
};

export default CustomPopup;
