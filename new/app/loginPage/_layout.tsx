import React from "react";
import BasePage from "@/components/basic/layout/BasePage";
import LoginPage from "@/app/loginPage/index";

export default function LoginPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <BasePage>
            <LoginPage />
        </BasePage>
    );
}