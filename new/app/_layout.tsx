import React, { useState } from "react";
import RouterWrapper from '@/components/basic/navigation/RouterWrapper';
import StyleProvider from "@/components/basic/style/StyleProvider";

export default function AppRoot() {
    return (
        <StyleProvider>
            <RouterWrapper />
        </StyleProvider>
    );
}