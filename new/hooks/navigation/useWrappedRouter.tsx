import {createContext, useContext} from "react";

export interface WrappedRouter {
    /**
     * Navigate to the previous history entry.
     */
    back(): void;
    /**
     * Refresh the current page.
     */
    refresh(): void;
    /**
     * Navigate to the provided href.
     * Pushes a new history entry.
     */
    push(href: string): void;
    /**
     * Navigate to the provided href.
     * Replaces the current history entry.
     */
    replace(href: string): void;
    /**
     * Navigate to first screen within the navigation stack
     */
    dismiss(count: number): void;
    /**
     * Navigate to first screen within the navigation stack
     */
    dismissAll(): void
}

export const useWrappedRouter = () => useContext(WrappedRouterContext);
export const WrappedRouterContext = createContext({} as WrappedRouter);