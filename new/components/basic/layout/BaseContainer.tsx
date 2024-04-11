
import { PropsWithChildren } from "react";
import BaseBlock from "./BaseBlock";
import { useStyle } from "@/hooks/styles/useTheme";
import { setDarkTheme, setLightTheme } from "@/app/stylesheet";
import { customStyleInput } from "@/lib/customStyleApi";

interface BaseContainerProps extends PropsWithChildren<{}> {
    styleClassName?: string,

}

const BaseContainer = ({ children, styleClassName = "baseContainer", ...props }: BaseContainerProps) => {
    const styleWithClass = customStyleInput(useStyle(styleClassName), baseContainerStyle);

    return (
        <BaseBlock style={styleWithClass}>
            {children}
        </BaseBlock>
    )
}
const baseContainerStyle = {
};
const baseContainerDarkStyle = {
    ...baseContainerStyle,
    backgroundColor: "#222831",
};
const baseContainerLightStyle = {
    ...baseContainerStyle,
    backgroundColor: "#eeeeee",
};
//Todo: add these remaining styles into the style sheet to avoid too much extra setting attributes
setDarkTheme("baseContainer", baseContainerDarkStyle);
setLightTheme("baseContainer", baseContainerLightStyle);


export default BaseContainer;