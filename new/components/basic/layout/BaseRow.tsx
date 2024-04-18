import { PropsWithChildren } from "react";
import BaseBlock from "./BaseBlock";
import {AppStyleClassProp} from "@/components/basic/style/StyleProvider";
import {concatStyleClass} from "@/lib/appStyleApi";

interface BaseRowProps extends PropsWithChildren<{}>, AppStyleClassProp {}

const BaseRow = ({ children, styleClass, ...props }: BaseRowProps) => {
    return (
        <BaseBlock styleClass={concatStyleClass("baseRow", styleClass)}>
            {children}
        </BaseBlock>
    )
}

export default BaseRow;