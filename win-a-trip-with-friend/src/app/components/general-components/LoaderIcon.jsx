import React from 'react'
import { BiLoaderCircle } from "react-icons/bi";
import { BiLoaderAlt } from "react-icons/bi";

const LoaderIcon = ({className='text-sky-blue-1 text-3xl animate-spin'}) => {
    return (

        <BiLoaderAlt className={`  ${className} `} />

    )
}

export default LoaderIcon