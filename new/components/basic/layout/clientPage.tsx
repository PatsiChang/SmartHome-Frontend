"use client"
import * as UserSessionApi from "@/lib/userSessionApi";
import React, {PropsWithChildren, useEffect, useState} from "react";
import {useWrappedRouter} from "@/hooks/navigation/useWrappedRouter";
import {useWrappedPathName} from "@/hooks/navigation/useWrappedPathName";
import {Alert, View} from "react-native";
import {Stack} from "expo-router";

interface ClientPageProps extends PropsWithChildren<{}>{
    pageTitle ?: string
    requireLogin ?: boolean,
    fetchData ?: () => Promise<void | any>
}

export default function ClientPage({requireLogin, fetchData, children, ...props} : ClientPageProps) {
    const shouldRedirectToLoginPage = requireLogin === true && !UserSessionApi.hasLoggedIn();
    const router = useWrappedRouter();

    const needToFetchData = fetchData != null;
    const [isLoading, setIsLoading] = useState(needToFetchData);

    if (shouldRedirectToLoginPage) {
        router.replace("/loginPage?redirect=" + useWrappedPathName());
        return null;
    } else {
        if (needToFetchData) {
            fetchData()
                .catch(() => Alert.alert("Error!", "Idk what happened."))
                .then(() => setIsLoading(false));
        }

        return isLoading ? <View>I am loading!!!!!!!!</View> : <View>{children}</View>;
    }
}