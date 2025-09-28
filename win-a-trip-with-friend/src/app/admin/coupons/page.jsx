'use client'
import Sidebar from "@/app/components/admin/Sidebar";
import Navbar from "@/app/components/admin/Navbar";
import Coupon from "@/app/components/admin/Coupon";
import { useState, useEffect } from "react";
import AXIOS_INSTANCE from "@/app/lib/axios";
import LoaderIcon from "@/app/components/general-components/LoaderIcon";
import Pagination from "@/app/components/general-components/Pagination";
import { getPageNumber, getTotalPagesCount } from "@/app/utils/paginationHelpers";

export default function Coupons() {


    const [coupons, setCoupons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)


    const getCoupons = async (page = 1) => {
        try {
            setIsLoading(true)
            const response = await AXIOS_INSTANCE.get(`coupons/?page=${page}`);
            setCoupons(response.data.results || []); // adjust based on your API response
            setCurrentPage(page)
            const nextpage = getPageNumber(response.data.next)
            const previous = getPageNumber(response.data.previous)
            setNextPage(nextpage)
            setPrevPage(previous)

            const totalPages = getTotalPagesCount(response.data.count, 20)
            setTotalPages(totalPages)

        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCoupons();
    }, []);

    // if (isLoading) {
    //     return (
    //         <div className="flex items-center justify-center h-screen w-full">
    //             <LoaderIcon />
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen w-full">
            <Navbar />
            <div className="w-full h-full flex">
                {/* Sidebar */}
                <Sidebar />

                <div className="flex-1 ml-4 mr-8 mb-0 rounded-xl bg-slate-50 w-full flex flex-col  z-50 p-10">
                    <h1 className=" text-4xl font-semibold tracking-wide  mb-10  ">Coupons</h1>
                    {
                        isLoading ? (<div className="flex items-center justify-center h-screen w-full">
                            <LoaderIcon />
                        </div>) :
                            coupons.length === 0 ? (
                                <div className="flex items-center justify-center w-full">
                                    <p className="text-gray-500 text-lg">No coupons found</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-4 gap-12 w-full mb-5">
                                    {coupons.map((coupon) => (
                                        <Coupon key={coupon.id} coupon={coupon} />
                                    ))}
                                </div>
                            )}

                    {coupons?.length > 0 && (<Pagination
                        prevPage={prevPage}
                        nextPage={nextPage}
                        function_to_call={getCoupons}
                        currentPage={currentPage}
                        TotalPages={totalPages}
                        // queryParameter={selectedItineraryStatus}
                        buttonColor='bg-[#394C5D]'
                    />)}
                </div>
            </div>
        </div>
    );
}
