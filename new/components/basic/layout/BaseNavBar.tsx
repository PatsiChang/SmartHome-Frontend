import { PropsWithChildren } from "react";
import BaseRow from "./BaseRow";
import { BaseMiddleText } from "./BaseText";
import BaseImg from "./BaseImg";
import BaseContainer from "./BaseContainer";
import BaseColumn from "./BaseColumn";

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
                    {platform == "mobile" && pages.map((page) =>
                        <BaseImg key={page} imageName={page}></BaseImg>
                    )}
                    {pages.map((page) =>
                        <BaseMiddleText key={page}>{page}</BaseMiddleText>
                    )}
                </BaseRow>
            );
        case "menuBar":
            return (
                <BaseContainer>
                    <BaseColumn>
                        <BaseContainer styleClass={"menubarContainer"}>
                            <BaseRow styleClass={"baseMenuBar"}>
                                {/* //Todo: Make the key unique by page+index or make pages obj with id*/}
                                {platform == "mobile" && pages.map((page) =>
                                    <BaseImg key={page} imageName={page}></BaseImg>
                                )}
                                {platform == "web" && pages.map((page, index) =>
                                    <BaseMiddleText key={page}>{page}</BaseMiddleText>
                                )}
                            </BaseRow>
                        </BaseContainer>
                    </BaseColumn>
                </BaseContainer>


            );
    }
}

export default BaseNavBar;