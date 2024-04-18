import { PropsWithChildren } from "react";
import BaseRow from "./BaseRow";
import { AppStyleClassProp } from "@/components/basic/style/StyleProvider";
import {concatStyleClass} from "@/lib/appStyleApi";

interface NavBarType extends PropsWithChildren, AppStyleClassProp {
    pages?: "home" | "socialMedia" | "grocery" | "MyRecipes" | "Setting"
}
const BaseNavBar = ({ children, styleClass, ...props }: NavBarType) => {
    return (
        <BaseRow styleClass={concatStyleClass("baseNavBar", styleClass)}>
            {children}
        </BaseRow>
    )
}

export default BaseNavBar;