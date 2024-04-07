import React, { PropsWithChildren } from "react";
import { BaseLargeText } from "./BaseText";


interface BaseHeaderProps extends PropsWithChildren<{}> {
}

export default function BaseHeader({ children, ...props }: BaseHeaderProps) {
    return (
        <BaseLargeText>{children}</BaseLargeText>
    )
}
