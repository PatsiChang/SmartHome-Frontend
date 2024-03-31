"use client"
import React from "react";
import ClientPage from "@/components/basic/layout/clientPage";

export default function AfterLoginPageLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <ClientPage requireLogin={true}>
            {children}
        </ClientPage>
    );
}