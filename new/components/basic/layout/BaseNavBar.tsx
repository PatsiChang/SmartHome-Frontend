import { PropsWithChildren } from "react";
import BaseRow from "./BaseRow";
import { setDarkTheme, setLightTheme } from "@/app/stylesheet";

interface NavBarType extends PropsWithChildren {
    pages?: "home" | "socialMedia" | "grocery" | "MyRecipes" | "Setting",
    styleClass?: string,
}
const BaseNavBar = ({ children, styleClass = "defaultNavBar", ...props }: NavBarType) => {
    return (
        <BaseRow styleClassName={styleClass}>
            {children}
        </BaseRow>
    )
}
const defaultNavBar = {
    backgroundColor: "#135D66",
};
setDarkTheme("defaultNavBar", defaultNavBar);
setLightTheme("defaultNavBar", defaultNavBar);

export default BaseNavBar;