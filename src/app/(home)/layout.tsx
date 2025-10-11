"use server";

import React from "react";
import serverAxios from "@/lib/server-axios";

export default async function Layout({ children }: { children: React.ReactNode }) {
    try {
        const api = await serverAxios();
        const res = await api.get("book/robooks");
        console.log(res.data);
    } catch(err) {
        console.log(err);
    }
    return (
        <>
            {children}
        </>
    )
}