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
import { IoMdAdd } from "react-icons/io";
import SearchComponent from "@/app/components/admin/SearchComponent";

export default function ClaimedCoupons() {


    const [coupons, setCoupons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)


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

            const totalPages = getTotalPagesCount(response.data.count, 5)
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

                        <div className="flex-1 max-w-2xl ml-auto">
                            <SearchComponent onSearch={onSearch} query={query} setQuery={setQuery} />
                        </div>
                    </div>


                    {
                        isLoading ? (<div className="flex items-center justify-center h-screen w-full">
                            <LoaderIcon />
                        </div>) :
                            coupons.length === 0 ? (
                                <div className="flex items-center h-[50vh] justify-center w-full">
                                    <p className="text-gray-500 text-lg">No coupons found</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 xl:grid-cols-3  2xl:grid-cols-4 gap-12 w-full mb-5">
                                    {/* {coupons.map((coupon) => (
                                        <Coupon key={coupon.id} coupon={coupon} onEdit={onEdit} onDelete={onDelete} />
                                    ))} */}
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
