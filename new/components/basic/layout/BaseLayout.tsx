import React, { createContext, ReactNode, useContext, useState } from "react";
import { View } from "react-native";
import BaseNavBar from "./BaseNavBar";
import BaseContainer from "./BaseContainer";
import BaseButton from "@/components/basic/buttons/BaseButton";

const PopUpContext = createContext((content: ReactNode) => { });
export const usePopUp = () => useContext(PopUpContext);
export default function BaseLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const [popUpContent, setPopUpContent] = useState<ReactNode>();
    const showPopup = (content: ReactNode) => setPopUpContent(content);

    return (
        <BaseContainer styleClassName="defaultLayoutStyle">
            <BaseNavBar> NavBarHere </BaseNavBar>
            <PopUpContext.Provider value={showPopup}>
                <PopUp popUpContent={popUpContent} />
                {children}
            </PopUpContext.Provider>
            <BaseNavBar> NavBarHere </BaseNavBar>
        </BaseContainer>
    )
}

const defaultLayoutstyles = {
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