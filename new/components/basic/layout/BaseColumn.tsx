import { PropsWithChildren } from "react";
import BaseBlock from "./BaseBlock";
import { useStyle } from "@/hooks/styles/useTheme";
import { setDarkTheme, setLightTheme } from "@/app/stylesheet";
import { customStyleInput } from "@/lib/customStyleApi";

interface BaseColumnProps extends PropsWithChildren<{}> {
    styleClass?: string,

}

const BaseColumn = ({ children, styleClass = "baseColumn", ...props }: BaseColumnProps) => {
    const styleWithClass = customStyleInput(useStyle(styleClass), defaultColumnStyle);
    return (
        <BaseBlock style={styleWithClass}>
            {children}
        </BaseBlock>
    )
}

const defaultColumnStyle = {
    flexDirection: 'column',
};
const defaultColumnDarkStyle = {
    ...defaultColumnStyle,
    backgroundColor: "#222831",
};
const defaultColumnLightStyle = {
    backgroundColor: "#eeeeee",
};

//Todo: add these remaining styles into the style sheet to avoid too much extra setting attributes
setDarkTheme("baseColumn", defaultColumnDarkStyle);
setLightTheme("baseColumn", defaultColumnLightStyle);
export default BaseColumn;