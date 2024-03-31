"use client"
import * as UserSessionApi from "@/lib/userSessionApi";
import {useRouter, usePathname} from "next/navigation";
import React, {PropsWithChildren} from "react";


interface ClientPageProps extends PropsWithChildren<{}>{
    requireLogin ?: boolean
}

export default function ClientPage({requireLogin, children, ...props} : ClientPageProps) {
    const shouldRedirectToLoginPage = requireLogin === true && !UserSessionApi.hasLoggedIn();
    const router = useRouter();

    if (shouldRedirectToLoginPage) {
        router.replace("/loginPage?redirect=" + usePathname());
        return null;
    } else {
        return (
            <>{children}</>
        )
    }
}