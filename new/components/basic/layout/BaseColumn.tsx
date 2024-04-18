import { PropsWithChildren } from "react";
import BaseBlock from "./BaseBlock";
import {AppStyleClassProp} from "@/components/basic/style/StyleProvider";
import {concatStyleClass} from "@/lib/appStyleApi";

interface BaseColumnProps extends PropsWithChildren<{}>, AppStyleClassProp {}

const BaseColumn = ({ children, styleClass, ...props }: BaseColumnProps) => {
    return (
        <BaseBlock styleClass={concatStyleClass("baseColumn", styleClass)}>
            {children}
        </BaseBlock>
    )
}

export default BaseColumn;