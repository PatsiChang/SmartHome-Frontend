import React from "react";
import BasePage from "@/components/basic/layout/BasePage";
import SignupPage from "@/app/signupPage/index";

export default function SigninPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <BasePage styleClass={"justifyContent_spaceEvenly"} scrollable={false}>
            <SignupPage />
        </BasePage>
    );
}