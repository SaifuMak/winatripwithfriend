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

export default function Coupons() {


    const [coupons, setCoupons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
      const [query, setQuery] = useState("");

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    const [openedModal, setOpenedModal] = useState(null)
    const [selectedCoupon, setSelectedCoupon] = useState(null)

    const [newCode, setNewCode] = useState('');
    const [isWriting, setIsWriting] = useState(false)



    const getCoupons = async (page = 1, query='') => {
        try {
            setIsLoading(true)
            const response = await AXIOS_INSTANCE.get(`coupons/?page=${page}&query=${query}`);
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

    const onEdit = (coupon) => {
        setOpenedModal('edit')
        setSelectedCoupon(coupon)
        setNewCode(coupon.code)
    }

    const onAdd = () => {
        setOpenedModal('add')
    }

    const onDelete = (coupon) => {
        setOpenedModal('delete')
        setSelectedCoupon(coupon)
    }

    const handleCloseModal = () => {
        setOpenedModal(null)
        setSelectedCoupon(null)
        setNewCode('')
    }



    const confirmAddCoupon = async () => {
        toast.dismiss()
        if (isWriting) {
            return
        }

        if (!newCode) {
            toast.error('please add the coupon code')
            return
        }
        const data = {
            'code': newCode
        }
        setIsWriting(true)
        try {
            const response = await AXIOS_INSTANCE.post(`coupons/`, data);
            getCoupons()
            toast.success(response.data.message)
            handleCloseModal()

        } catch (e) {
            console.log(e);
            toast.error(e.response.data.error)
        } finally {
            setIsWriting(false);
        }
    };


    const confirmEditCoupon = async () => {
        toast.dismiss()
        if (isWriting) {
            return
        }

        if (!newCode) {
            toast.error('please fill the coupon code')
            return
        }
        const data = {
            'code': newCode
        }
        setIsWriting(true)
        try {
            const response = await AXIOS_INSTANCE.patch(`coupons/${selectedCoupon.id}/`, data);
            getCoupons(currentPage)
            toast.success(response.data.message)
            handleCloseModal()

        } catch (e) {
            console.log(e);
            toast.error(e.response.data.error)
        } finally {
            setIsWriting(false);
        }
    };

    const handleConfirmDelete = async () => {

        if (isWriting) {
            return
        }

        toast.dismiss()

        if (!selectedCoupon) {
            toast.error('please select a coupon')
            return
        }

        setIsWriting(true)
        try {
            const response = await AXIOS_INSTANCE.delete(`coupons/${selectedCoupon.id}/`);
            getCoupons(currentPage)
            toast.success(response.data.message)
            handleCloseModal()

        } catch (e) {
            console.log(e);
            toast.error(e.response.data.error)
        } finally {
            setIsWriting(false);
        }
    };


    const onSearch = (query) => {
        getCoupons(1,query)
    }

    useEffect(() => {
        getCoupons();
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
                            Coupons
                        </h1>

                        <div
                            onClick={onAdd}
                            className="cursor-pointer px-4 py-2 flex items-center text-white font-semibold bg-slate-900 rounded-md hover:bg-slate-800"
                        >
                            <IoMdAdd className="text-xl mr-2" />
                            <span>Add</span>
                        </div>

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
                                    {coupons.map((coupon) => (
                                        <Coupon key={coupon.id} coupon={coupon} onEdit={onEdit} onDelete={onDelete} />
                                    ))}
                                </div>
                            )}

                    {coupons?.length > 0 && (<Pagination
                        prevPage={prevPage}
                        nextPage={nextPage}
                        function_to_call={getCoupons}
                        currentPage={currentPage}
                        TotalPages={totalPages}
                        queryParameter={query}
                        buttonColor='bg-slate-500'
                    />)}
                </div>

                {(openedModal === 'edit' || openedModal === 'add') && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                            <h3 className="text-lg font-semibold text-blue-600 mb-3">
                                {openedModal === 'edit'
                                    ? '✏️ Edit Coupon'
                                    : '➕ Add Coupon'}

                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                {openedModal === "edit" ? (
                                    <>
                                        Update the coupon code below and click <b>Save</b>.
                                    </>
                                ) : (
                                    <>
                                        Enter a new coupon code below and click <b>Save</b>.
                                    </>
                                )}
                            </p>

                            <input
                                type="text"
                                value={newCode}
                                onChange={(e) => setNewCode(e.target.value)}
                                className="w-full border outline-none border-gray-300 rounded-md p-2 mb-4"
                            />
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-sm cursor-pointer bg-gray-200 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={openedModal === "edit" ? confirmEditCoupon : confirmAddCoupon}
                                    className="px-4 py-2 text-sm bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700"
                                >
                                    {isWriting ? <LoaderIcon className="" /> : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {openedModal === 'delete' && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                            <h3 className="text-lg font-semibold text-red-600 mb-3">
                                🗑️ Delete Coupon
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Are you sure to delete coupon{" "}
                                <b className="text-gray-800">{selectedCoupon?.code}</b>
                            </p>
                            {selectedCoupon?.is_claimed && (
                                <p className="text-xs text-red-600 font-medium mb-4">
                                    Warning: You are trying to delete a claimed coupon.
                                </p>
                            )}
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 bg-gray-200 text-sm cursor-pointer rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="px-4 py-2 bg-red-600 text-sm text-white cursor-pointer rounded-md hover:bg-red-700"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
