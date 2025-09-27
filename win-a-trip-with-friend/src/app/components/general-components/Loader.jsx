import React from 'react'
import { BiLoaderCircle } from "react-icons/bi";
import { BiLoaderAlt } from "react-icons/bi";


const Loader = ({ height = 'h-[100vh]' }) => {
    return (
        <div className={` ${height} bg-white  z-50 absolute inset-0 w-full  flex  justify-center items-center  `} >
            <BiLoaderAlt className=' animate-spin text-3xl text-sky-blue-1 ' />
        </div>
    )
}

export default Loader