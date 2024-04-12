import React, { PropsWithChildren } from "react";
import { router, Slot } from 'expo-router';
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
        <WrappedRouterContext.Provider value={nextAppRouter}>
            <Slot />
        </WrappedRouterContext.Provider>
    )
}