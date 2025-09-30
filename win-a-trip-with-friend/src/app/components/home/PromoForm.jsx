"use client";

import { useState } from "react";

import { toast } from "sonner";
import AXIOS_INSTANCE from "@/app/lib/axios";
import LoaderIcon from "../general-components/LoaderIcon";


export default function PromoForm() {

    const formFieldsStyle = 'w-full md:p-1.5 p-2  bg-white outline-none  placeholder:font-bold placeholder:text-red-600'

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        uniqueCode: "",
        agree: false,
    });

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleClearForm = ()=>{
        setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        uniqueCode: "",
        agree: false,
    })
    }

    const handleSubmit = async (e) => {
        toast.dismiss()
        e.preventDefault();
        // if (!formData.agree) {
        //     toast.error('please agree it ')
        // }
        setIsLoading(true)
        try {
            const response = await AXIOS_INSTANCE.post(`claim-coupon/`, formData);
            toast.success(response.data.message)
            handleClearForm()

        } catch (e) {
            console.log(e);
            toast.error(e.response?.data?.error)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col  items-center  mx-auto p-6 space-y-6 "
        >
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={formFieldsStyle}
            />

            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className={formFieldsStyle}
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={formFieldsStyle}
            />

            <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className={formFieldsStyle}
            />

            <input
                type="text"
                name="uniqueCode"
                placeholder="Enter Unique Code Here"
                value={formData.uniqueCode}
                onChange={handleChange}
                required
                className={formFieldsStyle}
            />

            <div className="flex xl:mt-2 2xl:mt-4 space-x-2 md:w-10/12 mx-auto">
                <label className="flex items-center cursor-pointer">
                    {/* Hidden native checkbox to handle form state */}
                    <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className="sr-only" // hides the native checkbox
                    />
                    <div
                        className={` size-3 lg:size-4 border  border-white flex items-center justify-center
                  bg-transparent`}
                    >
                        {formData.agree && (
                            <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                </label>
                <p className="text-xs text-center text-white">
                    Yes, I agree to receive news, offers and promotions via email from
                    The Star Gold Coast relating to the hotel, theatre, restaurants and
                    events. You can opt out directly with The Star at anytime. Please
                    share my personal information with The Star Gold Coast for this
                    purpose.
                </p>
            </div>


            <button
                type="submit"
                className="w-56 flex-center cursor-pointer bg-black text-white py-1.5 rounded-full text-lg font-bold hover:bg-gray-800 transition"
            >
              {isLoading ? <LoaderIcon className="text-2xl animate-spin" /> : 'Submit' }  
            </button>
        </form>
    );
}
