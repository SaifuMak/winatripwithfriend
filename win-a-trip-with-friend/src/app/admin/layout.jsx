"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../components/general-components/Loader";
import AXIOS_INSTANCE from "../lib/axios";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await AXIOS_INSTANCE.get("check/"); // API to verify auth
                setIsAuthenticated(true);
            } catch (error) {
                console.log("Auth check failed:", error?.response?.status);
                router.replace("/login");
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [router]);


    // While checking, show loader
    if (isLoading) {
        return (
            <Loader />
        );
    }

    if (!isAuthenticated) {
        return null; // avoids flicker
    }

    // If authenticated, render all admin pages
    return (
        <div>
            {/* You can also include a sidebar, navbar, etc. here */}
            {children}
        </div>
    );
}