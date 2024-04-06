"use client"
import React, { createContext, ReactNode, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import BasicButton from "@/components/basic/buttons/BasicButton";

const PopUpContext = createContext((content: ReactNode) => { });
export const usePopUp = () => useContext(PopUpContext);
export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const [popUpContent, setPopUpContent] = useState<ReactNode>();
    const showPopup = (content: ReactNode) => setPopUpContent(content);

    return (
        <View style={styles.container}>
            <PopUpContext.Provider value={showPopup}>
                <PopUp popUpContent={popUpContent} />
                {children}
            </PopUpContext.Provider>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function PopUp({ popUpContent }: { popUpContent: ReactNode }) {
    const showPopup = usePopUp();

    if (popUpContent != null) {
        return (
            <div style={{
                width: "50vw", height: "50vh",
                backgroundColor: "white", color: "black",
                position: "fixed", marginLeft: "25vw"
            }}>
                <BasicButton onClick={() => showPopup(null)}> X </BasicButton>
                <View>
                    {popUpContent}
                </View>
            </div>
        );
    }
    return null;
}