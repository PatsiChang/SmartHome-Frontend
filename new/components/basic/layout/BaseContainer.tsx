import { PropsWithChildren } from "react";
import BaseBlock from "./BaseBlock";
import {AppStyleClassProp} from "@/components/basic/style/StyleProvider";
import {concatStyleClass} from "@/lib/appStyleApi";

export interface BaseContainerProps extends PropsWithChildren<{}>, AppStyleClassProp {}

const BaseContainer = ({ children, styleClass, ...props }: BaseContainerProps) => {
    return (
        <BaseBlock styleClass={concatStyleClass("baseContainer", styleClass)}>
            {children}
        </BaseBlock>
    )
}

export default BaseContainer;