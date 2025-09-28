import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function Coupon({ coupon, onEdit, onDelete }) {
    return (
        <div className="relative group w-full max-w-sm bg-white border-2 border-dashed border-gray-400 rounded-xl shadow-md px-7 py-12 flex flex-col items-center justify-center">

            {/* Edit/Delete buttons (top-right corner) */}
            <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out top-4 right-3 flex space-x-2">
                <button
                    onClick={() => onEdit && onEdit(coupon)}
                    className="p-1.5 cursor-pointer group rounded-full hover:bg-gray-100"
                >
                    <FiEdit className="text-slate-500 group-hover:text-slate-800 w-5 h-5" />
                </button>
                <button
                    onClick={() => onDelete && onDelete(coupon)}
                    className="p-1.5 cursor-pointer rounded-full group hover:bg-gray-100"
                >
                    <FiTrash2 className="text-slate-500 group-hover:text-slate-800 w-5 h-5" />
                </button>
            </div>

            {/* Coupon Code */}
            <h2 className="text-lg font-bold tracking-wider text-gray-800">
                {coupon?.code}
            </h2>

            {/* Claimed / Available */}
            {coupon?.is_claimed ? (
                <span className="mt-3 px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
                    Claimed
                </span>
            ) : (
                <span className="mt-3 px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
                    Available
                </span>
            )}

            {/* Perforation circles */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white border-2 border-gray-400 rounded-full transform -translate-y-1/2"></div>
            {/* <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white border-2 border-gray-400 rounded-full transform -translate-y-1/2"></div> */}
        </div>
    );
}

export default Coupon;
