"use client"
import React from "react";
import ClientPage from "@/components/basic/layout/clientPage";

export default function LoginPageLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <ClientPage>
            {children}
        </ClientPage>
    );
}