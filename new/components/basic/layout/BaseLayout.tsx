import React, { createContext, ReactNode, useContext, useState } from "react";
import { View } from "react-native";
import BaseNavBar from "./BaseNavBar";
import BaseContainer from "./BaseContainer";
import BaseButton from "@/components/basic/buttons/BaseButton";
import { BaseMiddleText } from "@/components/basic/layout/BaseText";
import { hasLoggedIn } from "@/lib/userSessionApi";
import PlatformApi from "@/lib/PlatformApi";
import BaseRow from "./BaseRow";

const PopUpContext = createContext((content: ReactNode) => { });
export const usePopUp = () => useContext(PopUpContext);
export default function BaseLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const [popUpContent, setPopUpContent] = useState<ReactNode>();
    const showPopup = (content: ReactNode) => setPopUpContent(content);
    const menuBar = ["Home", "Feeds", "AddRecipe", "Grocery", "Setting"];

    switch (PlatformApi.getCurrentPlatform()) {
        case PlatformApi.PLATFORM_IOS:
        case PlatformApi.PLATFORM_ANDROID:
            return (
                <BaseContainer>
                    <PopUpContext.Provider value={showPopup}>
                        <PopUp popUpContent={popUpContent} />
                        {children}
                    </PopUpContext.Provider>
                    <BaseNavBar pages={menuBar} type="menuBar" platform="mobile"></BaseNavBar>
                </BaseContainer>
            )
        default:
            return (
                <BaseContainer>
                    <BaseRow styleClass={"pageHeaderRow"}>
                        <BaseNavBar pages={menuBar} type="menuBar" platform="web"></BaseNavBar>
                    </BaseRow>
                    <PopUpContext.Provider value={showPopup}>
                        <PopUp popUpContent={popUpContent} />
                        {children}
                    </PopUpContext.Provider>
                </BaseContainer>
            )
    }


}

function PopUp({ popUpContent }: { popUpContent: ReactNode }) {
    const showPopup = usePopUp();
    if (popUpContent != null) {
        return (
            <div style={{
                width: "50vw", height: "50vh",
                backgroundColor: "white", color: "black",
                position: "fixed", marginLeft: "25vw"
            }}>
                <BaseButton onPress={() => showPopup(null)} title="X"></BaseButton>
                <View>
                    {popUpContent}
                </View>
            </div>
        );
    }
    return null;
}