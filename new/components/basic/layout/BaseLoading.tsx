import { setDarkTheme, setLightTheme } from "@/app/stylesheet";
import BaseContainer from "./BaseContainer";
import { ActivityIndicator, Dimensions } from "react-native";
import { customStyleInput } from "@/lib/customStyleApi";
import { useStyle } from "@/hooks/styles/useTheme";
import { BaseLargeText } from "./BaseText";


//Putting these two types as default, if future needs more we add "secondLoadingType" component to this page
interface BaseLoadingType {
    title?: string,
    loadingType?: "default" | "lowOpacity",
    styleClass?: string,
}
const BaseLoading = (props: BaseLoadingType) => {
    const { styleClass = "defaultNavBar", loadingType = "default", title } = props;
    const styleWithClass = customStyleInput(useStyle(styleClass), defaultLoading);

    return loadingType == "default" ? (
        <BaseContainer styleClass={styleWithClass}>
            <ActivityIndicator size="large" />
            <BaseLargeText>{title}</BaseLargeText>
        </BaseContainer>
    ) :
        <BaseContainer styleClass={styleWithClass}>
        </BaseContainer>
}
var { width, height } = Dimensions.get('window');
const defaultLoading = {

};
//Todo: set overlay screen at the back
const overlay = {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    width: width
}
// var styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//       fontSize: 20,
//       textAlign: 'center',
//       margin: 10,
//     },
//     // Flex to fill, position absolute, 
//     // Fixed left/top, and the width set to the window width
//     overlay: {
//       flex: 1,
//       position: 'absolute',
//       left: 0,
//       top: 0,
//       opacity: 0.5,
//       backgroundColor: 'black',
//       width: width
//     }  
//   });
setDarkTheme("defaultLoading", defaultLoading);
setLightTheme("defaultLoading", defaultLoading);

export default BaseLoading;