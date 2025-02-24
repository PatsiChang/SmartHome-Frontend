import * as UserSessionApi from "@/lib/userSessionApi";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { useWrappedPathName } from "@/hooks/navigation/useWrappedPathName";
import { Alert } from "react-native";
import BaseLoading from "./BaseLoading";
import ScrollableContainer from "@/components/basic/layout/ScrollableContainer";
import BaseContainer from "./BaseContainer";
import { AppStyleClassProp } from "../style/StyleProvider";
import { concatStyleClass } from "@/lib/appStyleApi";

interface ClientPageProps extends PropsWithChildren<{}>, AppStyleClassProp {
    pageTitle?: string,
    requireLogin?: boolean,
    fetchData?: <T>() => Promise<void | T>,
    scrollable?: boolean,
}

export default function BasePage({ requireLogin, fetchData, children, styleClass, scrollable = true, ...props }: ClientPageProps) {
    const shouldRedirectToLoginPage = requireLogin === true && !UserSessionApi.hasLoggedIn();
    const router = useWrappedRouter();
    const currentPathName = useWrappedPathName();

    const needToFetchData = fetchData != null;
    const [isLoading, setIsLoading] = useState(needToFetchData);

    //Do the below after Page OnMount
    useEffect(() => {
        if (shouldRedirectToLoginPage) {
            const delayPromise = new Promise(resolve => setTimeout(resolve, 1000)); // Set delay for 10 seconds
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
        : scrollable
            ? <ScrollableContainer styleClass={concatStyleClass("basePage", styleClass)}>{children}</ScrollableContainer>
            : <BaseContainer styleClass={concatStyleClass("basePage", styleClass)}>{children}</BaseContainer>


}