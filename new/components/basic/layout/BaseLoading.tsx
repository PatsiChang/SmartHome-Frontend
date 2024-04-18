import BaseContainer from "./BaseContainer";
import { ActivityIndicator, Dimensions } from "react-native";
import { BaseLargeText } from "./BaseText";
import {addStyleBuilder} from "@/lib/appStyleApi";


//Putting these two types as default, if future needs more we add "secondLoadingType" component to this page
interface BaseLoadingType {
    title?: string,
    loadingType?: "default" | "lowOpacity",
    styleClass?: string | string[],
}
const BaseLoading = (props: BaseLoadingType) => {
    const { styleClass = "defaultNavBar", loadingType = "default", title } = props;
    const styleWithClass = ["defaultLoading", ...styleClass];

    return loadingType == "default" ? (
        <BaseContainer styleClass={styleWithClass}>
            <ActivityIndicator size="large" />
            <BaseLargeText>{title}</BaseLargeText>
        </BaseContainer>
    ) :
        <BaseContainer styleClass={styleWithClass}>
        </BaseContainer>
}
// var { width, height } = Dimensions.get('window');

//Todo: set overlay screen at the back
addStyleBuilder("defaultLoading", (config) => {
    return {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: config.themeColorPalette.secondaryBackground,
        width: "100%"
    };
});

export default BaseLoading;