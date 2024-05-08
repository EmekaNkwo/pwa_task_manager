"use client";
import React, { useEffect } from "react";

import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";


const template = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="flex items-start ">
                <div className="hidden lg:flex" >
                    <Sidebar />
                </div>
                <div className="flex flex-col w-full">
                    <Topbar />
                    <div className="p-2">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default template;
