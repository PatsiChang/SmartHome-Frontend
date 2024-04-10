import { PropsWithChildren } from "react";
import BaseBlock from "./BaseBlock";
import { useStyle } from "@/hooks/navigation/useTheme";
import { setDarkTheme, setLightTheme } from "@/app/stylesheet";
import { customStyleInput } from "@/lib/customStyleApi";

interface BaseColumnProps extends PropsWithChildren<{}> {
    styleClassName?: string,

}

const BaseColumn = ({ children, styleClassName = "baseColumn", ...props }: BaseColumnProps) => {
    const styleWithClass = customStyleInput(useStyle(styleClassName), baseColumnStyle);
    return (
        <BaseBlock style={styleWithClass}>
            {children}
        </BaseBlock>
    )
}

const baseColumnStyle = {
    flexDirection: 'column',
};
const baseColumnDarkStyle = {
    ...baseColumnStyle,
    backgroundColor: "#222831",
};
const baseColumnLightStyle = {
    backgroundColor: "#eeeeee",
};

//Todo: add these remaining styles into the style sheet to avoid too much extra setting attributes
setDarkTheme("baseColumn", baseColumnDarkStyle);
setLightTheme("baseColumn", baseColumnLightStyle);
export default BaseColumn;