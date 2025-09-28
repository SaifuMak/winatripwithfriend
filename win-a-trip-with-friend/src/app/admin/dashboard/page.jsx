'use client'
import Sidebar from "@/app/components/admin/Sidebar";
import Navbar from "@/app/components/admin/Navbar";
import { useState, useEffect } from "react";
import AXIOS_INSTANCE from "@/app/lib/axios";
import LoaderIcon from "@/app/components/general-components/LoaderIcon";


import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const getAnalytics = async () => {
        try {
            const response = await AXIOS_INSTANCE.get("coupon-analytics/");
            setStats(response.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoaderIcon />
            </div>
        );
    }

    const pieData = {
        labels: ["Claimed", "Unclaimed"],
        datasets: [
            {
                data: [stats?.claimed, stats?.unclaimed],
                backgroundColor: ["#16a34a", "#ef4444"],
                borderColor: ["#ffffff", "#ffffff"],
                borderWidth: 1,
            },
        ],
    };
    const pieOptions = {
        plugins: {
            legend: {
                display: false, // ❌ hide legend
            },
            tooltip: {
                enabled: true, // you can turn this off too if you don’t want hover tooltips
            },
            datalabels: {
                color: "#fff",
                font: {
                    weight: "bold",
                    size: 14,
                },
                formatter: (value) => value, // show numbers inside
            },
        },
    };



    return (
        <div className="   h-screen w-full ">

            <Navbar />

            <div className=" w-full h-full  flex">

                {/* sidebar */}
                <Sidebar />

                <div className=" flex-1  ml-4  mr-8 mb-0 rounded-xl bg-slate-50 space-x-8 w-full flex  xl:justify-around  p-10  h-[97vh] z-50">
                    <div className=" flex w-3/4  h-fit gap-6   mt-5">
                        {/* Total Coupons */}
                        <div className="bg-white w-full xl:w-1/2  flex flex-col  justify-center h-[170px] xl:h-[300px] hover:shadow-xl transition-all duration-500 shadow-md rounded-lg p-6 text-center ">
                            <h2 className="text-lg font-bold text-gray-600">Total Coupons</h2>
                            <p className="text-3xl font-bold text-blue-500 mt-2">
                                {stats?.total}
                            </p>
                        </div>

                        {/* Claimed */}
                        <div className="bg-white w-full xl:w-1/2 flex flex-col hover:shadow-xl transition-all duration-500  justify-center shadow-md rounded-lg p-6 text-center ">
                            <h2 className="text-lg font-bold text-gray-600">Claimed Coupons</h2>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                                {stats?.claimed}
                            </p>
                        </div>

                    </div>

                    <div className="bg-white  shadow-md rounded-lg p-10 h-fit flex flex-col  justify-center">
                        <div className=" 2xl:size-72 xl:size-64 size-36">
                            <Pie data={pieData} options={pieOptions} />
                        </div>
                        <div className=" mt-6 space-y-2">
                            <div className=" flex items-center max-xl:text-sm"><span className="xl:size-4 size-3  rounded-sm mr-2 bg-[#16a34a] "></span> Claimed coupons ({stats?.claimed})</div>

                            <div className=" flex items-center max-xl:text-sm"><span className="xl:size-4 size-3  rounded-sm mr-2 bg-[#ef4444] "></span> Unclaimed coupons ({stats.unclaimed}) </div>
                        </div>
                    </div>

                </div>

            </div>
        </div >
    )
}