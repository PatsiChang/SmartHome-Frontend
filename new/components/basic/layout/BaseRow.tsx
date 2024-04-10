import { PropsWithChildren } from "react";
import BaseBlock from "./BaseBlock";
import { ViewStyle } from "react-native";
import { useStyle } from "@/hooks/navigation/useTheme";
import { setDarkTheme, setLightTheme } from '@/app/stylesheet';
import { customStyleInput } from "@/lib/customStyleApi";

interface BaseRowProps extends PropsWithChildren<{}> {
    styleClassName?: string,
}


//Todo: create "baseRow" class in stylesheet as default, create styleClassName(s) for customisaion
const BaseRow = ({ children, styleClassName = "baseRow", ...props }: BaseRowProps) => {
    const styleWithClass = customStyleInput(useStyle(styleClassName), baseRowStyle);
    return (
        <BaseBlock style={styleWithClass as ViewStyle}>
            {children}
        </BaseBlock>
    )
}

const baseRowStyle = {
    flexDirection: 'row',
};
const baseRowDarkStyle = {
    ...baseRowStyle,
    backgroundColor: "#31363F",
};
const baseRowLightStyle = {
    ...baseRowStyle,
    backgroundColor: "#EEEEEE",
};
//Todo: add these remaining styles into the style sheet to avoid too much extra setting attributes
setDarkTheme("baseRow", baseRowDarkStyle);
setLightTheme("baseRow", baseRowLightStyle);

export default BaseRow;