import { PropsWithChildren } from "react";
import BaseRow from "./BaseRow";
import { BaseMiddleText } from "./BaseText";
import BaseImg from "./BaseImg";
import BaseContainer from "./BaseContainer";

interface NavBarType extends PropsWithChildren {
    pages: string[],
    styleClass?: string,
    type: "menuBar" | "navbar" | "others"
    platform: "web" | "mobile"
}
const BaseNavBar = ({ platform, pages, children, styleClass, type, ...props }: NavBarType) => {
    switch (type) {
        case "navbar":
            return (
                <BaseRow styleClass={"baseNavBar"}>
                    {platform == "mobile" && pages.map((page, index) =>
                        <BaseImg key={"baseNavBarImg_" + index} imageName={page}></BaseImg>
                    )}
                    {pages.map((page, index) =>
                        <BaseMiddleText key={"baseNavBarText_" + index}>{page}</BaseMiddleText>
                    )}
                </BaseRow>
            );
        case "menuBar":
            return (
                <BaseContainer>
                    <BaseRow styleClass={"baseMenuBar"}>
                        {platform == "mobile" && pages.map((page, index) =>
                            <BaseImg key={"baseMenuBarImg_" + index} imageName={page}></BaseImg>
                        )}
                        {platform == "web" && pages.map((page, index) =>
                            <BaseMiddleText key={"baseMenuBarText_" + index}>{page}</BaseMiddleText>
                        )}
                    </BaseRow>
                </BaseContainer>
            );
    }
}

export default BaseNavBar;