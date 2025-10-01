'use client'
import Sidebar from "@/app/components/admin/Sidebar";
import Navbar from "@/app/components/admin/Navbar";
import Coupon from "@/app/components/admin/Coupon";
import { useState, useEffect } from "react";
import AXIOS_INSTANCE from "@/app/lib/axios";
import LoaderIcon from "@/app/components/general-components/LoaderIcon";
import Pagination from "@/app/components/general-components/Pagination";
import { getPageNumber, getTotalPagesCount } from "@/app/utils/paginationHelpers";
import { toast } from "sonner";

import SearchComponent from "@/app/components/admin/SearchComponent";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { exportToExcel } from "@/app/utils/exportToExcel";


export default function ClaimedCoupons() {

    dayjs.extend(utc);
    dayjs.extend(timezone);

    const [coupons, setCoupons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    const tableHeadStyle = 'px-4 py-4 text-left text-sm font-bold text-gray-700 border-b border-black/40'
    const tableRowStyle = "px-4 py-3 xl:py-4 border-b border-black/10 text-sm xl:text-base"

    const getClaimedCoupons = async (page = 1, query = '') => {
        try {
            setIsLoading(true)
            const response = await AXIOS_INSTANCE.get(`claimed-coupons-details/?page=${page}&query=${query}`);
            setCoupons(response.data.results || []); // adjust based on your API response
            setCurrentPage(page)
            const nextpage = getPageNumber(response.data.next)
            const previous = getPageNumber(response.data.previous)
            setNextPage(nextpage)
            setPrevPage(previous)

            const totalPages = getTotalPagesCount(response.data.count, 10)
            setTotalPages(totalPages)

        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const onSearch = (query) => {
        getClaimedCoupons(1, query)
    }

    const handleExport = () => {

        const formattedData = coupons.map((item) => ({
            "Coupon Code": item.code,
            "First Name": item.claimed_by?.first_name || "",
            "Last Name": item.claimed_by?.last_name || "",
            "Email": item.claimed_by?.email || "",
            "Date of Birth": item.claimed_by?.dob || "",
            "Phone": item.claimed_by?.phone || "",
            "Address": item.claimed_by?.address || "",
            "Claimed At": item.claimed_at,

        }));

        exportToExcel(formattedData, "Coupon Claims");
    };

    useEffect(() => {
        getClaimedCoupons();
    }, []);


    return (
        <div className="min-h-screen w-full">
            <Navbar />
            <div className="w-full h-full flex">
                {/* Sidebar */}
                <Sidebar />

                <div className="flex-1 ml-4 mr-8 mb-0 rounded-xl bg-slate-50 w-full flex flex-col  z-50 p-10">
                    <div className="flex items-center mb-10 space-x-6">
                        <h1 className="text-4xl leading-none font-semibold tracking-wide">
                            Claimed Coupons
                        </h1>
                        <button onClick={handleExport} className=" cursor-pointer bg-black text-white  rounded-md px-4 py-1.5 font-medium ">Export Data</button>

                        <div className="flex-1 max-w-2xl ml-auto">
                            <SearchComponent onSearch={onSearch} query={query} setQuery={setQuery} />
                        </div>
                    </div>


                    {
                        isLoading ? (<div className="flex items-center justify-center h-[50vh] w-full">
                            <LoaderIcon />
                        </div>) :
                            coupons.length === 0 ? (
                                <div className="flex items-center h-[50vh] justify-center w-full">
                                    <p className="text-gray-500 text-lg">No claims found</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className={`${tableHeadStyle}`}>Code</th>
                                                <th className={`${tableHeadStyle}`}>First Name</th>
                                                <th className={`${tableHeadStyle}`}>Last Name</th>
                                                <th className={`${tableHeadStyle}`}>Email</th>
                                                <th className={`${tableHeadStyle}`}>Date of Birth</th>
                                                <th className={`${tableHeadStyle}`}>Phone</th>
                                                <th className={`${tableHeadStyle}`}>Address</th>
                                                <th className={`${tableHeadStyle}`}>Claimed At (AEST)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {coupons.map((coupon) => (
                                                <tr key={coupon.id} className="hover:bg-gray-50">
                                                    <td className={`${tableRowStyle}`}>{coupon.code}</td>
                                                    <td className={`${tableRowStyle} capitalize`}>{coupon.claimed_by?.first_name}</td>
                                                    <td className={`${tableRowStyle} capitalize`}>{coupon.claimed_by?.last_name}</td>
                                                    <td className={`${tableRowStyle}`}>{coupon.claimed_by?.email}</td>
                                                    <td className={`${tableRowStyle}`}>{coupon.claimed_by?.dob}</td>
                                                    <td className={`${tableRowStyle}`}>{coupon.claimed_by?.phone}</td>

                                                    <td className={`${tableRowStyle}`}>{coupon.claimed_by?.address}</td>
                                                    <td className={`${tableRowStyle}`}>
                                                        {coupon?.claimed_at}
                                                        {/* {dayjs.utc(coupon.claimed_at).tz("Australia/Sydney").format("DD MMM YYYY, hh:mm A")} */}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                    {coupons?.length > 0 && (<Pagination
                        prevPage={prevPage}
                        nextPage={nextPage}
                        function_to_call={getClaimedCoupons}
                        currentPage={currentPage}
                        TotalPages={totalPages}
                        queryParameter={query}
                        buttonColor='bg-slate-500'
                    />)}
                </div>
            </div>
        </div>
    );
}
