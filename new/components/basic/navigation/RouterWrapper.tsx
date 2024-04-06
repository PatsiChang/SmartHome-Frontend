import React, { PropsWithChildren } from "react";
import { router, Slot, Stack } from 'expo-router';
import { WrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { WrappedRouterContext } from '@/hooks/navigation/useWrappedRouter'

type ROUTER_MODE = "client" | "server";


interface BaseRouterProps extends PropsWithChildren<{}> {
}

export default function RouterWrapper({ children, ...props }: BaseRouterProps) {
    const nextAppRouter = {
        back: (mode?: ROUTER_MODE) => router.back(),
        // refresh : (mode ?: ROUTER_MODE) => router.refresh(),
        push: (href: string, mode?: ROUTER_MODE) => { console.log('navigate to: ' + href); router.navigate(href) },
        replace: (href: string, mode?: ROUTER_MODE) => router.replace(href),
        dismiss: (count: number) => router.dismiss(count),
        dismissAll: () => router.dismissAll()
    } as WrappedRouter;

    return (
        <>
            {/*<Stack initialRouteName={unstable_settings.initialRouteName} />*/}
            <WrappedRouterContext.Provider value={nextAppRouter}>
                <Slot />
            </WrappedRouterContext.Provider>
        </>
    )
}