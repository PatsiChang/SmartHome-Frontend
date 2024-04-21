import { AppStyles } from "@/lib/appStyleApi";
import { useContext } from "react";
import { StyleContext } from "@/context/StyleContext";

export const useStyle = (...styleClassName: string[]): AppStyles | AppStyles[] => {
    let styleObject = useContext(StyleContext);

    let styleObjects = [];
    for (let styleClass of styleClassName) {
        if (styleClass && styleObject[styleClass]) {
            styleObjects.push(styleObject[styleClass]);
        }
    }
    if (styleObjects.length == 0) {
        return {};
    } else if (styleObjects.length == 1) {
        return styleObjects[0];
    } else {
        return styleObjects;
    }
}

// export const useStyle = <T extends AppStylesSheet>(styleClassName : string) : T=> {
//     let styleObject = useContext(StyleContext);
//     return buildStyleObject(styleObject, styleClassName) as T;
// }
//
// const buildStyleObject = (appStyleSheet: AppStylesSheet, styleClasses : string = "", style : AppStyles = {}) : AppStyles => {
//     const trimmerStyleClasses = styleClasses.trim();
//     const firstSpace = trimmerStyleClasses.indexOf(" ");
//     if (firstSpace > 0) {
//         const styleClass = trimmerStyleClasses.substring(0, firstSpace);
//         const remainingStyleClass = trimmerStyleClasses.substring(firstSpace + 1);
//         return buildStyleObject(appStyleSheet, remainingStyleClass, mergeAppStyles(style, appStyleSheet[styleClass]));
//     } else if (trimmerStyleClasses) {
//         return mergeAppStyles(style, appStyleSheet[trimmerStyleClasses]);
//     } else {
//         return style;
//     }
// }