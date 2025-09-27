'use client'

import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Link from "next/link";
import AXIOS_INSTANCE from "@/app/lib/axios";
import { toast } from 'sonner';
import { SIDEBAR_ITEMS } from "@/app/constants/admin";


const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [itemName, setItemName] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isChangePasswordModal, setIsChangePasswordModal] = useState(false)



    useEffect(() => {
        const item = SIDEBAR_ITEMS.find(item => item.path === pathname)
        if (item) setItemName(item.name)
    }, [pathname])


    const handleLogout = async () => {
        try {
            const response = await AXIOS_INSTANCE.post(`logout/`, {});
            toast.success('Logged out successfully')
            router.replace("/login");

        } catch (error) {
            toast.error(error?.response?.data?.error)

        } finally {
            // setIsLoading(false);
        }

    }

   
    return (
        <>
            <div className=" min-h-12  bg-white "></div>
        </>
    )
}

export default Navbar