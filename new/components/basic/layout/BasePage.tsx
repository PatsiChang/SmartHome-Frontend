import * as UserSessionApi from "@/lib/userSessionApi";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { useWrappedPathName } from "@/hooks/navigation/useWrappedPathName";
import { Alert, View } from "react-native";
import BaseLoading from "./BaseLoading";
import ScrollableContainer from "@/components/basic/layout/ScrollableContainer";

interface ClientPageProps extends PropsWithChildren<{}> {
    pageTitle?: string
    requireLogin?: boolean,
    fetchData?: <T>() => Promise<void | T>
}

export default function BasePage({ requireLogin, fetchData, children, ...props }: ClientPageProps) {
    const shouldRedirectToLoginPage = requireLogin === true && !UserSessionApi.hasLoggedIn();
    const router = useWrappedRouter();
    const currentPathName = useWrappedPathName();

    const needToFetchData = fetchData != null;
    const [isLoading, setIsLoading] = useState(needToFetchData);

    //Do the below after Page OnMount
    useEffect(() => {
        if (shouldRedirectToLoginPage) {
            const delayPromise = new Promise(resolve => setTimeout(resolve, 5000)); // Set delay for 10 seconds
            delayPromise.then(() => router.replace("/loginPage?redirect=" + currentPathName))
        } else {
            if (needToFetchData && isLoading) {
                fetchData()
                    .catch(() => Alert.alert("Error!", "Idk what happened."))
                    .then(() => setIsLoading(false));
            }
        }
    }, []);

    return isLoading
        ? <BaseLoading title="I am loading..."></BaseLoading>
        : <ScrollableContainer styleClass={"basePage"}>{ children }</ScrollableContainer>;

}