"use client"
import React from "react";
import ClientPage from "@/components/basic/layout/clientPage";
import LoginPage from "@/app/loginPage/index";

export default function LoginPageLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <ClientPage>
            <LoginPage />
        </ClientPage>
    );
}