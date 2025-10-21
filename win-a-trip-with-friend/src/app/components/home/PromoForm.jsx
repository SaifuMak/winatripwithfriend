"use client";

import { useState } from "react";

import { toast } from "sonner";
import AXIOS_INSTANCE from "@/app/lib/axios";
import LoaderIcon from "../general-components/LoaderIcon";
import DobPicker from "./DobPicker";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function PromoForm({ showPopup, setHasSuccessfullyClaimed }) {

    const formFieldsStyle = 'w-full md:p-1.5 p-2  bg-white outline-none  placeholder:font-bold placeholder:text-red-600'

    const statesOfAustralia = [
        "New South Wales (NSW)",
        "Victoria (VIC)",
        "Queensland (QLD)",
        "Western Australia (WA)",
        "South Australia (SA)",
        "Tasmania (TAS)",
        "Australian Capital Territory (ACT)",
        "Northern Territory (NT)",
    ];


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        address: "",
        state: "",
        postcode: "",
        email: "",
        mobileNumber: "",
        uniqueCode: "",
        agree: false,
        termsAndCondition: false,

    });

    const [isLoading, setIsLoading] = useState(false)
    const [isStateDropdownOpened, setIsStateDropdownOpened] = useState(false)

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSelect = (state) => {

        setFormData((prev) => ({
            ...prev,
            ['state']: state,
        }));
        setIsStateDropdownOpened(false)

    };


    const handleClearForm = () => {
        setFormData({
            firstName: "",
            lastName: "",
            dob: "",
            address: "",
            state: "",
            postcode: "",
            email: "",
            mobileNumber: "",
            uniqueCode: "",
            agree: false,
            termsAndCondition: false,
        })
    }


    const handleSubmit = async (e) => {
        toast.dismiss()

        e.preventDefault();
        console.log(formData);

        setIsLoading(true)
        try {
            const response = await AXIOS_INSTANCE.post(`claim-coupon/`, formData);
            // toast.success(response.data.message)
            // showPopup('success', 'Success', response.data.message)
            setHasSuccessfullyClaimed(true)
            handleClearForm()
        } catch (e) {
            console.log(e);
            // toast.error(e.response?.data?.error)
            showPopup('error', 'Error', e.response?.data?.error)
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col h-full  items-center  mx-auto p-6 space-y-6 "
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

                <div className=" bg-white w-full">
                    <DobPicker setFormData={setFormData} />
                </div>

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className={formFieldsStyle}
                />

                <div className=" w-full  relative">
                    <div onClick={() => setIsStateDropdownOpened(!isStateDropdownOpened)} className="w-full md:p-1.5 p-2  bg-white outline-none font-bold text-red-600 cursor-pointer flex justify-between items-center">
                        <p className={` capitalize ${formData.state ? 'text-black font-normal' : ''}`}>{formData.state ? formData.state : 'State'}</p>
                        <MdKeyboardArrowDown className={`text-2xl transition-transform  duration-500 ${isStateDropdownOpened ? ' rotate-180' : ' rotate-0'}`} />
                    </div>
                    <div className={`absolute left-0 right-0 mt-1 w-full  transition-all duration-700 ease-in-out bg-white border-gray-200  shadow-lg z-10 ${isStateDropdownOpened ? 'max-h-60  ' : 'max-h-0'}  overflow-y-auto`}>
                        {statesOfAustralia.map((state, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelect(state)}
                                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                            >
                                {state}
                            </div>
                        ))}
                    </div>
                </div>

                <input
                    type="text"
                    name="postcode"
                    placeholder="Post Code"
                    value={formData.postcode}
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
                    <label className="flex  cursor-pointer">
                        {/* Hidden native checkbox to handle form state */}
                        <input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            className="sr-only" // hides the native checkbox
                            required
                            onInvalid={(e) => e.target.setCustomValidity("Please check this box to proceed")}
                            onInput={(e) => e.target.setCustomValidity("")}
                        />
                        <div
                            className={` size-3 lg:size-4 border mt-1  border-white flex items-center justify-center
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


                <div className="flex   md:w-10/12 mx-auto">
                    <label className="flex  cursor-pointer ">
                        {/* Hidden native checkbox to handle form state */}
                        <input
                            type="checkbox"
                            name="termsAndCondition"
                            checked={formData.termsAndCondition}
                            onChange={handleChange}
                            className="sr-only" // hides the native checkbox
                            required
                            onInvalid={(e) => e.target.setCustomValidity("Please check this box to proceed")}
                            onInput={(e) => e.target.setCustomValidity("")}
                        />
                        <div
                            className={` size-3 lg:size-4 border   border-white flex items-center justify-center
                  bg-transparent`}
                        >
                            {formData.termsAndCondition && (
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
                        I confirm my details are correct, and I have read & accept the promotion{" "}
                        <a
                            href="/terms-and-conditions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 underline"
                        >
                            Terms & Conditions
                        </a>
                    </p>

                </div>


                <button
                    type="submit"
                    className="w-56 flex-center cursor-pointer bg-black text-white py-1.5 rounded-full text-lg font-bold hover:bg-gray-800 transition"
                >
                    {isLoading ? <LoaderIcon className="text-2xl animate-spin" /> : 'Submit'}
                </button>

            </form>

            <div className=" text-center md:hidden text-xs mb-6 space-y-2 -mt-2 max-w-xs mx-auto text-white">
                <p className="">The Star practises the responsible service of alcohol. Guests must be 18 years or over to enter the casino. BET WITH YOUR HEAD, NOT OVER IT. </p>
                <p className="">
                    Gambling Helpline{" "}
                    <a href="tel:1800858858" className="hover:underline">
                        1800 858 858
                    </a>{" "}
                    |{" "}
                    <a
                        href="https://gamblinghelpqld.org.au"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        gamblinghelpqld.org.au
                    </a>
                </p>

            </div>


            <div className=" space-x-2  md:hidden text-white w-full  pb-5 mx-auto text-nowrap  flex   justify-center text-xs">
                <a href="https://www.cocacolaep.com/company/privacy-notice/" target="_blank" rel="noopener noreferrer" className="underline">
                    Privacy Policy
                </a>
                <span>|</span>
                <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline">
                    Terms & Conditions
                </a>
                <span>|</span>
                <a href="/star-ctw-trip-to-coachella-promotion-abridged-terms" target="_blank" rel="noopener noreferrer" className="underline">
                    Abridged Terms
                </a>
            </div>

        </>
    );
}
