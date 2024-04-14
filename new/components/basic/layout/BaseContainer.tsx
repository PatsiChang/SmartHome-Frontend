
import { PropsWithChildren } from "react";
import BaseBlock from "./BaseBlock";
import { useStyle } from "@/hooks/styles/useTheme";
import { setDarkTheme, setLightTheme } from "@/app/stylesheet";
import { customStyleInput } from "@/lib/customStyleApi";

interface BaseContainerProps extends PropsWithChildren<{}> {
    styleClass?: string,

}

const BaseContainer = ({ children, styleClass = "baseContainer", ...props }: BaseContainerProps) => {
    const styleWithClass = customStyleInput(useStyle(styleClass), defaultContainerStyle);

    return (
        <BaseBlock style={styleWithClass}>
            {children}
        </BaseBlock>
    )
}
const defaultContainerStyle = {
};
const defaultContainerDarkStyle = {
    ...defaultContainerStyle,
    backgroundColor: "#222831",
};
const defaultContainerLightStyle = {
    ...defaultContainerStyle,
    backgroundColor: "#eeeeee",
};
//Todo: add these remaining styles into the style sheet to avoid too much extra setting attributes
setDarkTheme("baseContainer", defaultContainerDarkStyle);
setLightTheme("baseContainer", defaultContainerLightStyle);


export default BaseContainer;