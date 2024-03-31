"use client"
import React, {createContext, ReactNode, useContext, useState} from "react";

const PopUpContext = createContext((content: ReactNode) => {});
export const usePopUp = () => useContext(PopUpContext);
export default function ClientLayout({children}: Readonly<{ children: React.ReactNode}>) {

    const [popUpContent, setPopUpContent] = useState<ReactNode>();
    const showPopup = (content : ReactNode) => setPopUpContent(content);

    return (
        <PopUpContext.Provider value={showPopup}>
            <PopUp popUpContent={popUpContent}/>
            {children}
        </PopUpContext.Provider>
    )
}


function PopUp({popUpContent} : {popUpContent : ReactNode}) {
    const showPopup = usePopUp();

    if (popUpContent != null) {
        return (
            <div style={{width: "50vw", height: "50vh",
                backgroundColor:"white", color: "black",
                position:"fixed", marginLeft:"25vw"}}>
                <button onClick={() => showPopup(null)}> X </button>
                <div>
                    {popUpContent}
                </div>
            </div>
        );
    }
    return null;
}